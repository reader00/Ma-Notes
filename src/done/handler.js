const notes = require('./notes');
const {nanoid} = require('nanoid');

const notFoundHandler = (req, h) => {
    return h.response('Colli ma breh.... Deris no pej wit dis yu er el');
};

const addNoteHandler = (request, h) => {
    const {title, body} = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const tags = '';

    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);

        console.log('Not krieyted');
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNotesByIdHandler = (req, h) => {
    const {id} = req.params;
    const note = notes.filter((e) => e.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNotesByIdHandler = (req, h) => {
    const {id} = req.params;
    const {title, body} = req.payload;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((e) => e.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);

        console.log('Not apdeyted');
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: `Gagal memperbarui catatan. ID ${id} tidak ditemukan`,
    });
    response.code(404);
    return response;
};

const deleteNotesByIdHandler = (req, h) => {
    const {id} = req.params;
    const index = notes.findIndex((e) => e.id === id);

    console.log(index);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);

        console.log('Not dileyted');
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: `Catatan gagal dihapus. ID ${id} tidak ditemukan`,
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    notFoundHandler,
    getAllNotesHandler,
    getNotesByIdHandler,
    editNotesByIdHandler,
    deleteNotesByIdHandler,
};
