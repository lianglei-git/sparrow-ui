
const default_react_template =
    (ReactDemo : any[]) => {

   
const template= {
     
        "index.css": {
            "file": {
                "contents": ""
            }
        },
        "index.html": {
            "file": {
                "contents": `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
</head>

<body>
    <div id="container" style="padding: 24px" />
    <script type="module" src="./index.tsx"></script>
</body>

</html>`
            }
        },
        "index.tsx": {
            "file": {
                "contents": `
import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;
import '@sparrowend/ui/dist/spui.js'
import '@sparrowend/ui/dist/spui.css'
import './index.css';
window.onload = () => {
    window.mountNode = document.getElementById('container');
    import('./demo');

}
            `
            }
        },
        "package.json": {
            "file": {
                "contents": `
            {
                "name": "dpr-1r_run",
                "version": "0.0.0",
                "private": true,
                "dependencies": {
                  "@sparrowend/ui": "latest",
                  "react": "18.2.0",
                  "react-dom": "18.2.0"
                },
                "scripts": {
                  "start": "vite",
                  "build": "react-scripts build",
                  "test": "react-scripts test --env=jsdom",
                  "eject": "react-scripts eject"
                },
                "devDependencies": {
                  "@types/react": "^18.0.28",
                  "@types/react-dom": "^18.0.11",
                  "@vitejs/plugin-react": "^3.1.0",
                  "typescript": "^4.9.3",
                  "vite": "^4.2.0"
                }
              }
            `
            }
        },
        "tsconfig.json": {
            "file": {
                "contents": "{\n    \"compilerOptions\": {\n        \"target\": \"esnext\",\n        \"module\": \"esnext\",\n        \"esModuleInterop\": true,\n        \"moduleResolution\": \"node\",\n        \"jsx\": \"react\",\n        \"jsxFactory\": \"React.createElement\",\n        \"jsxFragmentFactory\": \"React.Fragment\"\n    }\n}"
            }
        },
        "vite.config.ts": {
            "file": {
                "contents": `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 2564
  }
})
`
            }
        }
    }
    ReactDemo.map((contents, idx) => {
        const key = idx == 0? '': idx;
        template["demo"+key+".jsx"] = {
            "file": {contents}
        }
    });
    return template;
 }
export default default_react_template