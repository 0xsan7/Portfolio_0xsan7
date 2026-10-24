"""Copy only public portfolio files to the static deployment directory."""
from pathlib import Path
from shutil import copy2, copytree, rmtree, ignore_patterns
root = Path(__file__).resolve().parent.parent
dist = root / 'dist'
if dist.exists():
    rmtree(dist)
dist.mkdir()
copy2(root / 'index.html', dist / 'index.html')
for name in ('css', 'js', 'assets'):
    copytree(root / name, dist / name, ignore=ignore_patterns('*.tsx', '*.ts'))
for name in ('CNAME', '.nojekyll'):
    if (root / name).exists():
        copy2(root / name, dist / name)
(dist / 'data').mkdir()
copy2(root / 'data' / 'github-contributions.json', dist / 'data' / 'github-contributions.json')
if (root / 'classic').exists():
    copytree(root / 'classic', dist / 'classic')
print('Built portfolio into dist/')
