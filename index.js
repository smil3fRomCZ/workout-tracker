const http = require('http2');
const app = require('./src/app');

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is listening ${PORT}`));
