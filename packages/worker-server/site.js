const https = require("https");

const Koa = require("koa");

const serve = require("koa-static");

const path = require("path");

const { readFileSync } = require("node:fs");

const app = new Koa();

// const sslOptions = {
//     key: readFileSync(path.resolve(__dirname, './www.sparrowui.cn_nginx/www.sparrowui.cn.key')),
//     cert: readFileSync(path.resolve(__dirname, './www.sparrowui.cn_nginx/www.sparrowui.cn_bundle.crt')),
// }

const address = require("address");

app.use(
  serve(path.join(__dirname, "../_site"), {
    index: "index.html", // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
    hidden: false, // 是否同意传输隐藏文件
    defer: false, // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
  })
);

// https.createServer(sslOptions, app.callback())
// .listen(3031, () => {
//     console.log(address.ip() + ':' + 3031);
// });

app.listen(3031, () => {
  console.log("http://" + address.ip() + ":" + 3031);
});
