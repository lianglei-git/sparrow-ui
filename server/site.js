

const Koa = require("koa");

const serve = require("koa-static");

const path = require("path");

const app = new Koa();

app.use(
    serve(
        path.join(__dirname, "../_site"), 
        {
            index: true, // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
            hidden: false, // 是否同意传输隐藏文件
            defer: true, // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
        }
    )
);

app.listen(3031, () => {
    console.log("node端口号为：：：：：", 3031);
});
