"""Refresh a public GitHub contribution snapshot. No token or proxy is required."""
from argparse import ArgumentParser
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://github.com/users/0xsan7/contributions'


class CalendarParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.dates = {}
        self.counts = {}
        self.tooltip = None
        self.text = []

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag == 'td' and attributes.get('data-date'):
            self.dates[attributes['id']] = attributes['data-date']
        if tag == 'tool-tip' and attributes.get('for', '').startswith('contribution-day-'):
            self.tooltip = attributes['for']
            self.text = []

    def handle_data(self, data):
        if self.tooltip:
            self.text.append(data)

    def handle_endtag(self, tag):
        if tag == 'tool-tip' and self.tooltip:
            text = ''.join(self.text).strip()
            match = re.match(r'(No|[\d,]+) contributions?\b', text)
            if match:
                self.counts[self.tooltip] = 0 if match[1] == 'No' else int(match[1].replace(',', ''))
            self.tooltip = None


def snapshot(html):
    parser = CalendarParser()
    parser.feed(html)
    # Reject a changed/partial GitHub response instead of publishing fabricated zeros.
    if len(parser.dates) < 365 or parser.dates.keys() != parser.counts.keys():
        raise ValueError('GitHub did not return a complete contribution calendar; existing data was kept.')
    days = sorted(({'date': date, 'count': parser.counts[key]} for key, date in parser.dates.items()), key=lambda day: day['date'])
    return {
        'username': '0xsan7',
        'source': SOURCE,
        'profile': 'https://github.com/0xsan7',
        'fetchedAt': datetime.now(timezone.utc).isoformat(timespec='seconds'),
        'rangeStart': days[0]['date'],
        'rangeEnd': days[-1]['date'],
        'total': sum(day['count'] for day in days),
        'days': days,
    }


if __name__ == '__main__':
    args = ArgumentParser(description=__doc__)
    args.add_argument('--input', type=Path, help='Parse a previously downloaded public calendar')
    options = args.parse_args()
    html = options.input.read_text() if options.input else subprocess.run(
        ['curl', '--fail', '--location', '--silent', '--show-error', '--max-time', '30', SOURCE],
        check=True, capture_output=True, text=True,
    ).stdout
    result = snapshot(html)
    destination = ROOT / 'data' / 'github-contributions.json'
    destination.parent.mkdir(exist_ok=True)
    temporary = destination.with_suffix('.tmp')
    temporary.write_text(json.dumps(result, separators=(',', ':')) + '\n')
    temporary.replace(destination)
    # Keep the no-JavaScript source labels consistent with the bundled snapshot.
    index = ROOT / 'index.html'
    markup = index.read_text()
    markup = re.sub(r'(<span data-activity-range>).*?(</span>)',
                    lambda m: m[1] + f"Public GitHub calendar / {result['rangeStart']} to {result['rangeEnd']}" + m[2], markup)
    markup = re.sub(r'(<a data-activity-snapshot[^>]*>).*?(</a>)',
                    lambda m: m[1] + f"Snapshot: {result['rangeEnd']} / GitHub ↗" + m[2], markup)
    index.write_text(markup)
    print(f"Saved {len(result['days'])} real days, {result['total']} contributions, through {result['rangeEnd']}.")
