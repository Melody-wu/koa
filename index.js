const koa = require('koa');
const path = require('path')
// const static = require('koa-static')
const fs = require('fs');
const staticPath = './pages'
const app = new koa();
// app.use(static(
//     path.join(__dirname, staticPath)
// ));
// app.use(async ctx => {
//     ctx.body = 'koa init'
// })

function render(page) {
    return new Promise((resolve, reject) => {
        let pageUrl = `${staticPath}/${page}`;
        fs.readFile(pageUrl, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

// 识别url,判断所请求的页面
async function route(url) {
    let page = '404.html';
    switch (url) {
        case '/':
            page = 'index.html';
            break;
        case '/index':
            page = 'index.html';
            break;
        default:
            break;
    }
    let html = await render(page);
    return html;
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    let html = await route(url);
    ctx.type = 'text/html;charset=utf-8';
    ctx.body = html;
})

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000');
});