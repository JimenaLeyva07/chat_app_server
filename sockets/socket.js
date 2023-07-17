const {io} = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // client.on('message',(payload)=>{
    //     console.log('MENSAJE!!!', payload)
    //     io.emit('message', {kitty:'kitten sends new message'});
    // });

    // client.on('emiting-message',(payload)=>{
    //     //console.log(payload);
    //     //io.emit('new-message', payload) // emite a todos los clientes conectados, incluso al que mando solicitud
    //     client.broadcast.emit('new-message', payload); // emite a todos menos al que lo emite
    // });

    // client.on('vote-band', (payload)=>{
    //     bands.voteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('add-band', (payload)=>{
    //     const newBand = new Band(payload.name);
    //     bands.addBand(newBand);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('delete-band', (payload)=>{
    //     bands.deleteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // });
  });
