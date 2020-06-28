const Vue = require("vue");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer();

server.get("*", (req, res) => {
  // 创建 vue 实例
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>访问的 URL 是：{{ url }}</div>`,
  });

  // 将vue实例渲染为 html
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end("Internet Server Error");
      return;
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `);
  });
});

server.listen(8080);
