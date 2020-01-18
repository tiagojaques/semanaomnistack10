const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// Metodos HTTP: GET, POST, PUT, DELETE
//Tipo de parametros
// Query Params req.query (filtros, ordenacao, paginacao)
// Route Params request.params (Identificar um recurso na alteração, remoção)
// Body: Request.body (dados para criação ou alteração de um registro)

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-jxoel.gcp.mongodb.net/omnistack?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);