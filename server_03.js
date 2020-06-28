const Vue = require("vue");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("./index.template.html", "utf-8"),
});

server.get("/ssr", (req, res) => {
  // 创建 vue 实例
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>访问的 URL 是：{{ url }}</div>`,
    beforeCreate() {
      // setInterval(() => {
      //   console.log(this.url);
      // }, 1000);
      // console.log("beforeCreate");
    },
    created() {
      console.log("created");
    },
    beforeMount() {
      console.log("beforeMount");
    },
    mounted() {
      console.log("mounted");
    },
  });

  const context = {
    title: "hello",
    meta: `
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    `,
  };

  // 将vue实例渲染为 html
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end("Internet Server Error");
      return;
    }
    res.end(html);
  });
});

server.listen(8080);

console.log("Server run at: http://127.0.0.1:8080/ssr");
