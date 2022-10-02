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
An enterprise-class UI design language and React UI library. Adapt to HTML,   
and compiled HTML.
<!-- </div> -->

## 📦 Install

- node (bash)
    ```bash
    npm i @sparrowend/ui
    ```
- 
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