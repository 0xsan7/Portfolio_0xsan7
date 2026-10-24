import { build, transform } from 'esbuild'
import { compile, optimize } from '@tailwindcss/node'
import { Scanner } from '@tailwindcss/oxide'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { parseHTML } from 'linkedom'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { House, Cpu, UserRound, SquareTerminal, FlaskConical, UsersRound, ChartNoAxesColumnIncreasing, Mail } from 'lucide-react'
import { dockItems } from '../js/dock-items.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const stylesheet = resolve(root, 'styles/skyline.css')
const compiler = await compile(await readFile(stylesheet, 'utf8'), { base: dirname(stylesheet), from: stylesheet, onDependency() {} })
const scanner = new Scanner({ sources: compiler.sources })
await writeFile(resolve(root, 'css/skyline.generated.css'), optimize(compiler.build(scanner.scan()), { minify: true }).code)
await rm(resolve(root, 'js/chunks'), { recursive: true, force: true })
await mkdir(resolve(root, 'js/chunks'), { recursive: true })
await build({
  absWorkingDir: root,
  entryPoints: { 'portfolio-ui.generated': 'js/portfolio-ui.tsx' },
  outdir: 'js',
  chunkNames: 'chunks/[name]-[hash]',
  bundle: true, splitting: true, minify: true, format: 'esm', jsx: 'automatic',
  target: ['es2022'],
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'linked',
})

const { document } = parseHTML(await readFile(resolve(root, 'index.html'), 'utf8'))
const icons = { House, Cpu, UserRound, SquareTerminal, FlaskConical, UsersRound, ChartNoAxesColumnIncreasing, Mail }
document.getElementById('main-nav').innerHTML = '<div class="macos-dock">' + dockItems.map(item =>
  `<div class="dock-slot"><a class="dock-link" href="#${item.id}" aria-label="${item.name}"${item.id === 'home' ? ' aria-current="location"' : ''}><span class="dock-tile">${renderToStaticMarkup(createElement(icons[item.icon], { size: 24, 'aria-hidden': true }))}</span><span class="dock-dot" aria-hidden="true"></span></a><span class="dock-label" aria-hidden="true">${item.name}</span></div>`
).join('') + '</div>'

// Render the native controls once at build time, preserving IDs and real links.
for (const control of document.querySelectorAll('button, a.button, .project-links a, a.contact-arrow, a.command-item')) {
  if (control.classList.contains('flow-button')) continue
  const icon = control.matches('#theme-toggle, .contact-arrow')
  const compact = control.matches('.utility-button, .project-links a')
  control.classList.add('flow-button', icon ? 'flow-button--icon' : compact ? 'flow-button--compact' : 'flow-button--default')
  if (control.matches('a.button')) control.querySelectorAll('svg').forEach(svg => svg.remove())
  if (control.matches('.project-links a')) {
    const label = control.textContent.trim()
    control.setAttribute('aria-label', label)
    control.textContent = label.replace(/^\[/, '').replace(/\s*->\]$/, '')
  }
  const content = document.createElement('span'); content.className = 'flow-content'
  content.append(...control.childNodes)
  const fill = document.createElement('span'); fill.className = 'flow-fill'; fill.setAttribute('aria-hidden', 'true')
  control.replaceChildren(content, fill)
  if (!icon) {
    for (const direction of ['in','out']) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
      svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('aria-hidden','true'); svg.setAttribute('class',`flow-arrow flow-arrow--${direction}`)
      for (const d of ['M5 12h14','m12 5 7 7-7 7']) { const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);svg.append(path) }
      direction === 'in' ? control.prepend(svg) : control.append(svg)
    }
  }
}
const cssSources = ['styles/fonts.css','css/style.css','styles/flow-button.css','styles/mac-os-dock.css','styles/glass-folder-cards.css']
const primaryCSS = (await transform((await Promise.all(cssSources.map(file => readFile(resolve(root,file),'utf8')))).join('\n'), { loader:'css', minify:true })).code
let style = document.getElementById('portfolio-critical')
if (!style) { style=document.createElement('style');style.id='portfolio-critical';document.head.append(style) }
style.textContent = primaryCSS
for (const link of document.querySelectorAll('link[rel="stylesheet"]')) link.remove()
await writeFile(resolve(root,'index.html'), document.toString().trimEnd()+'\n')
console.log('Built static dock and buttons, inline primary styles, and lazy React chunks.')
