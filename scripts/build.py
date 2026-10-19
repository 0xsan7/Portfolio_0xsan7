"""Copy only public portfolio files to the static deployment directory."""
from pathlib import Path
from shutil import copy2, copytree, rmtree
root = Path(__file__).resolve().parent.parent
dist = root / 'dist'
if dist.exists():
    rmtree(dist)
dist.mkdir()
copy2(root / 'index.html', dist / 'index.html')
for name in ('css', 'js', 'assets'):
    copytree(root / name, dist / name)
print('Built portfolio into dist/')
