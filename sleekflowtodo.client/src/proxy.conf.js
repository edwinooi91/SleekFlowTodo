const { env } = require('process');

const PROXY_CONFIG = [
  {
    context: [
      '/api/**'
    ],
    target: 'https://localhost:5001',
    secure: false,
    changeOrigin: true,
    ws: true
  }
]

module.exports = PROXY_CONFIG;
