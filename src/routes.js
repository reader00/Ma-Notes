const path = require('path');
const {} = require('./handler');

const routes = [
    {
        method: '*',
        path: '/',
        handler: (req, h) => {
            return h.file(path.join(__dirname, './view/index.html'));
        },
    },
    {
        method: '*',
        path: '/list',
        handler: (req, h) => {
            return h.file(path.join(__dirname, './view/list.html'));
        },
    },
    {
        method: '*',
        path: '/add',
        handler: (req, h) => {
            return h.file(path.join(__dirname, './view/add.html'));
        },
    },
];

module.exports = {routes};
