const createApp = require("./app");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./index.template.html", "utf-8"),
});

server.get("/ssr", (req, res) => {
  // 创建 vue 实例
  const app = createApp({ url: req.url });

  // 将vue实例渲染为 html
  renderer.renderToString(
    app,
    {
      title: "hello",
      meta: `<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
    },
    (err, html) => {
      if (err) {
        res.status(500).end("Internet Server Error");
        return;
      }
      res.end(html);
    }
  );
});

server.listen(8080);

console.log("Server run at: http://127.0.0.1:8080/ssr");
