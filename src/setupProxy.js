const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // 設定你想要代理的路徑，例如 '/api'。
    createProxyMiddleware({
      target: 'https://ytfytw.goeventlab.com',  // 設定代理目標的 URL。
      changeOrigin: true,
    })
  );
};
