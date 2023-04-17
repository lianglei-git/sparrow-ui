
const default_html_template =
(HtmlDemo : string) => {

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
    ${HtmlDemo}
        <script type="module" src="./index.js"></script>
    </body>
</html>`
        }
    },
    "index.js": {
        "file": {
            "contents": `
import '@sparrowend/ui/dist/spui.js'
import '@sparrowend/ui/dist/spui.css'
import './index.css';
        `
        }
    },
    "package.json": {
        "file": {
            "contents": `
        {
            "name": "dpr-2r_run",
            "version": "0.0.0",
            "private": true,
            "dependencies": {
              "@sparrowend/ui": "latest"
            },
            "scripts": {
              "start": "vite"
            },
            "devDependencies": {
              "vite": "^4.2.0",
              "typescript": "^4.9.3"
            }
          }
        `
        }
    },
    "vite.config.ts": {
        "file": {
            "contents": `
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
server:{
port: 2564
}
})
`
        }
    }
}
return template;
}
export default default_html_template