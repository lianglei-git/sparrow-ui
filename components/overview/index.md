---
category: Components
type: 组件总览
title: Overview
---

<div align="center" style="width: 80%">
  <a href="https://ant.design">
    <img width="200" src="http://www.sparrowui.cn/6f510c040accd6425367b03b7f930462.png">
  </a>
</div>


<div align="center" style="width: 80%; font-size:27px; font-weight: 600;color:#000">Sparrow UI</div>

<div align="center" style="width: 80%">
An enterprise-class UI design language and React（Vue 、Svelte） UI library. Adapt to HTML,   
and compiled HTML.
</div>

## ✨ Features

- 🌈 Enterprise-class UI designed for web applications.
- 📦 High quality microlibraries out of the box.
- 🛡 Written in TypeScript with predictable static types.
- ⚙️ Whole package of design resources and development tools.
- <p style="text-decoration:line-through">🎨 Powerful theme customization in every detail.</p>
- <p style="text-decoration:line-through">🚌 Super adaptive ability</p>
- 🐍 Don't stick to any framework

## 🖥 Environment Support

- Modern browsers and Internet Explorer 11 (with [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))
- Server-side Rendering
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📦 Install

```bash
  npm i @sparrowend/ui
```
```bash
  yarn add @sparrowend/ui
```
```bash
  pnpm add @sparrowend/ui
```

## 🔨 Usage
- jsx
    ```jsx
    import { Button } from '@sparrowend/ui';
    const App = () => (
    <>
        <Button type="primary">PRESS ME</Button>
    </>
    );
    ```
    And import style manually:

    ```jsx
    import '@sparrowend/ui/dist/spui.css';
    // or
    // import '@sparrowend/ui/es/button/style';
    ```
- html
    ```jsx
    <html>
        <link href='dist/spui.css'></link>
        <script src="dist/spui.js"></script>
        or
        <script type="module">
            import { Message } from 'dist/spui-es.js';
            Message.error('the end');
        </script>
        <sp-button>click me</sp-button>
    </html>
    ```
- import map
  ```jsx
        <html>
        <link href='dist/spui.css'></link>
        <script type="importmap">
            {
                "imports": {
                    "sparrow-ui": "dist/spui-es.js"
                }
            }
        </script>
        <script type="module">
            import { Message } from 'sparrow-ui';
            Message.error('sucessful');
        </script>
    </html>
  ```
- node(compile ---> any)
  - art-template
    ```jsx
    <!--layout.art-->
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
          <title>{{block 'title'}}My Site{{/block}}</title>
          <link href='dist/spui.css'></link>
          <script src="dist/spui.js"></script>

          {{block 'head'}}
            <link rel="stylesheet" href="main.css">
          {{/block}}

      </head>
      <body>
          {{block 'content'}}{{/block}}
      </body>
    </html>
    ```
    ```js
    {{if user}}
        <h2>{{user.name}}</h2>
        <sp-button>Thanks!</sp-button>
    {{/if}}
    ```
    - ejs 等同

  
<div style="opacity:0">占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占占</div>

## ⌨️ Development
Use Gitpod, a free online dev environment for GitHub.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/lianglei-git/sparrow-ui)

Or clone locally:

```bash
$ git clone git@github.com:lianglei-git/sparrow-ui.git
$ cd sparrow-ui
$ npm install
$ npm run start
```

## 🤝 Contributing 
My welcome all contributions. Please contact me at `lianglei_cool@163.com`

## 🙇 Thanks!