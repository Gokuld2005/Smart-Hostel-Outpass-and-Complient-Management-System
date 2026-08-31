const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
    // target: 'http://127.0.0.1:5000/',
    target: "http://localhost:5000/",

    // "proxy": "http://127.0.0.1:5000/",
    // "proxy": "http://localhost:5000/",
  
      changeOrigin: true,
    })
  );
};