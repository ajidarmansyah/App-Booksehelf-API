const hapi = require('@hapi/hapi');
const routes = require('./routes')

const init = async () =>{
    const server = hapi.Server({
        port: 5000,
        host: 'localhost'
    })

    server.route(routes)

    await server.start();
    console.log(`server berjalan pada ${server.info.uri}`)
};

init()

