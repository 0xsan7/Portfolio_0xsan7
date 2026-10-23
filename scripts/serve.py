"""Local static preview with byte-range support for scroll-scrubbed video."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import os
import re


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def send_head(self):
        self.byte_range = None
        path = self.translate_path(self.path)
        request = self.headers.get('Range')
        if not request or not os.path.isfile(path):
            return super().send_head()
        stream = open(path, 'rb')
        stat = os.fstat(stream.fileno())
        size = stat.st_size
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', request.strip())
        start, end = 0, size - 1
        valid = match is not None and bool(match.group(1) or match.group(2))
        if valid:
            first, last = match.groups()
            if first:
                start = int(first)
                end = min(int(last), end) if last else end
            else:
                suffix = int(last)
                start = max(0, size - suffix)
                valid = suffix > 0
            valid = valid and 0 <= start <= end < size
        if not valid:
            stream.close()
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Last-Modified', self.date_time_string(stat.st_mtime))
        self.end_headers()
        self.byte_range = start, end
        stream.seek(start)
        return stream

    def copyfile(self, source, outputfile):
        if self.byte_range is None:
            return super().copyfile(source, outputfile)
        remaining = self.byte_range[1] - self.byte_range[0] + 1
        while remaining:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=4173)
    args = parser.parse_args()
    directory = str(Path(__file__).resolve().parents[1])
    handler = partial(PreviewHandler, directory=directory)
    server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
    print(f'Local preview: http://127.0.0.1:{args.port}/', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
