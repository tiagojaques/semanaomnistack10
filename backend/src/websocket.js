const socketio = require('socket.io');
const parseStringAsArray = require('../src/utils/parseStringAsArray');
const calculateDistance = require('../src/utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        console.log(socket.id);
        console.log(socket.handshake.query);

        const { latitude, longitude, techs = [] } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        })
    });
};

exports.findConnections = ( coordinates, techs = [] ) => {
    return connections.filter(connection =>{
        return calculateDistance(coordinates, connection.coordinates) < 10 
            && connection.techs.some(item => techs.includes(item));
    });
}

exports.SendMessage = (to, messaage, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(messaage, data);
    })
}