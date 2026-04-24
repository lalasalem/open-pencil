==> Cloning from https://github.com/lalasalem/open-pencil
==> Checking out commit e5a5a13d94e26bae7b65de10ed05c75001d5366d in branch master
==> Using Node.js version 20.19.0 via environment variable NODE_VERSION
==> Docs on specifying a Node.js version: https://render.com/docs/node-version
==> Using Bun version 1.3.4 (default)
==> Docs on specifying a Bun version: https://render.com/docs/bun-version
==> Running build command 'npm install && npm run build'...
added 452 packages, and audited 453 packages in 16s
126 packages are looking for funding
  run `npm fund` for details
7 high severity vulnerabilities
To address all issues possible (including breaking changes), run:
  npm audit fix --force
Some issues need review, and may require choosing
a different dependency.
Run `npm audit` for details.
> open-pencil-app@0.11.8 build
> vite build
vite v7.3.2 building client environment for production...
transforming...
✓ 2 modules transformed.
✗ Build failed in 119ms
error during build:
[vite]: Rollup failed to resolve import "@/engine/fonts" from "/opt/render/project/src/src/main.ts".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
    at viteLog (file:///opt/render/project/src/node_modules/vite/dist/node/chunks/config.js:33639:57)
    at onRollupLog (file:///opt/render/project/src/node_modules/vite/dist/node/chunks/config.js:33669:7)
    at onLog (file:///opt/render/project/src/node_modules/vite/dist/node/chunks/config.js:33471:4)
    at file:///opt/render/project/src/node_modules/rollup/dist/es/shared/node-entry.js:21383:32
    at Object.logger [as onLog] (file:///opt/render/project/src/node_modules/rollup/dist/es/shared/node-entry.js:23378:9)
    at ModuleLoader.handleInvalidResolvedId (file:///opt/render/project/src/node_modules/rollup/dist/es/shared/node-entry.js:22122:26)
    at file:///opt/render/project/src/node_modules/rollup/dist/es/shared/node-entry.js:22080:26
    at async Promise.all (index 4)
==> Build failed 😞
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
