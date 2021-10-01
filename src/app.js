const express = require('express')
const path = require('path')
const nodemon = require('nodemon')
const hbs = require('hbs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()




//analizador del body desde un formulario o archivo json
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//variables de entorno
require('dotenv').config()

//conexión a base de datos mongoDB
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.zclqe.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

    .then(()=>console.log('conectado a mongoDB'))
    .catch(e => console.log('error en la conexión', e))



//port
app.set('port', process.env.PORT || 3000);    
//motor de plantillas
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))


//archivos staticos
app.use(express.static(path.join(__dirname, '../dist')))

//rutas
app.use('/', require('./routes/index-router'))

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    })
})

//servidor a la escucha
app.listen(app.get('port'), ()=>{
    console.log(`servidor escuchando en el puerto ${app.get('port')}`)
})


module.exports = app