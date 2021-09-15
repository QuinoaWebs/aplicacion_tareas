const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tareasSchema = new Schema({

    nombre: String,
    descripcion: String
    
})

const tareas = mongoose.model('tareas', tareasSchema)

module.exports = tareas