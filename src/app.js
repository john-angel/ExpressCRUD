const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./db')
const { getUsers, getUser, addUser, editUser, deleteUser } = require('./controllers/users')

class App {
    constructor() {
        this.initApp()
        this.routes()
        this.initDatabase()
    }

    initApp() {
        app.use(cors())
        app.use(express.json());
    }

    routes() {
        // Routes
        app.get('/users', getUsers);
        app.get('/user/:id', getUser);
        app.post('/addUser', addUser);
        app.put('/editUser', editUser);
        app.delete('/deleteUser',deleteUser);
    }

    initDatabase() {
        connect('mongodb+srv://AdminEndava:Endava2021@endava.yyroa.mongodb.net/Endava?retryWrites=true&w=majority')
    }

    initServer(port) {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`);
        });
    }
}

module.exports = App
