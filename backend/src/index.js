const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')
const app = express();

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
app.listen(3333);