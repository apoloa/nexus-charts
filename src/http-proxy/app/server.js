const http = require("http");
const httpProxy = require('http-proxy');
const { http: followHttp, https: followHttps } = require('follow-redirects');

// Crear un nuevo servidor proxy
const proxy = httpProxy.createProxyServer({
  secure: false, // Desactiva la verificación de certificados (no recomendado para producción)
  autoRewrite: true,
  changeOrigin: true,
  followRedirects: true // Habilitar el seguimiento de redirecciones
});


proxy.on('proxyRes', (proxyRes, req, res) => {
    if ([301, 302, 307, 308].includes(proxyRes.statusCode)) {
      const location = proxyRes.headers.location;
      console.log(`Redirigiendo a: ${location}`);
    }
  });

// Crea un servidor HTTP que redirige todas las solicitudes a través del proxy
const server = http.createServer((req, res) => {
    const target = req.url.slice(1); // Extrae la URL de destino de la solicitud
    console.log(target)
    proxy.web(req, res, { target: "http://google.com" }, (error) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Algo salió mal. Y no es tu culpa. ${error}`);
      }
    });
  });
  
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Proxy listening ${PORT}`);
  });