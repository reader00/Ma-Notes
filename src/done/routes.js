const path = require('path');
const {
    addNoteHandler,
    notFoundHandler,
    getAllNotesHandler,
    getNotesByIdHandler,
    editNotesByIdHandler,
    deleteNotesByIdHandler,
} = require('./handler');

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
    {
        method: '*',
        path: '/*',
        handler: notFoundHandler,
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotesByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesByIdHandler,
    },
];

module.exports = {routes};
