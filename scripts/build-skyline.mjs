import { build } from 'esbuild'
import { compile, optimize } from '@tailwindcss/node'
import { Scanner } from '@tailwindcss/oxide'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const stylesheet = resolve(root, 'styles/skyline.css')
const compiler = await compile(await readFile(stylesheet, 'utf8'), { base: dirname(stylesheet), from: stylesheet, onDependency() {} })
const scanner = new Scanner({ sources: compiler.sources })
const css = compiler.build(scanner.scan())
await writeFile(resolve(root, 'css/skyline.generated.css'), optimize(css, { minify: true }).code)
await build({
  absWorkingDir: root,
  entryPoints: ['js/portfolio-ui.tsx'],
  outfile: 'js/portfolio-ui.generated.js',
  bundle: true,
  minify: true,
  format: 'iife',
  jsx: 'automatic',
  target: ['es2022'],
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'linked',
})
console.log('Built the dock and skyline with one React runtime.')
