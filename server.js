const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('BH Filmes rodando!');
});

const wss = new WebSocket.Server({ server });
let clientes = new Set();

wss.on('connection', (ws) => {
    clientes.add(ws);
    ws.on('message', (dados) => {
        const msg = dados.toString();
        clientes.forEach((c) => {
            if (c !== ws && c.readyState === WebSocket.OPEN) {
                c.send(msg);
            }
        });
    });
    ws.on('close', () => clientes.delete(ws));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Servidor BH rodando na porta ' + PORT);
});
