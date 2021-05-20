const Hapi = require('@hapi/hapi');
const {routes} = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register(require('@hapi/inert'));

    server.route(routes);
    await server.start();

    console.log(`Server is running on ${server.info.uri}`);
};

init();
