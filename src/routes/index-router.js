const express = require('express')
const tareas = require('../modelosDB/modeloDB')

const router = express.Router()


    router.get('/', async (req,res)=>{

        try{

            const tareasDB = await tareas.find()

         
            res.render('index', {titulo: 'tareas-app', nombrePagina:'Tareas-app', tareasDB, tareas })

        }catch(error){

            console.log(error)
        }

       
    })

    router.post('/', async (req,res) => {

        const body = req.body
    

        try {
            await tareas.create(body)
            res.redirect('/')
        } catch (error) {
            console.log('error',error)
        }
    })

    router.get('/eliminar/:id', async (req,res) => {

        const id = req.params.id
      

        try {

           

            tareas.deleteOne({_id: id}, (err, tarea) =>{
                
                if(err) throw err
                res.redirect('/')
            })
          
        
                
        } catch (error) {
            console.log(error)
           
        }
    })

    router.get('/editar/:id', async (req,res) => {
        const id = req.params.id

        const tarea = await tareas.findOne({_id: id})

        res.render('editar', { tarea, titulo: 'tareas-editar', nombrePagina:'Editar Tareas' })

    })

    router.post('/editar/:id', async (req,res) => {

        const { id } = req.params
        await tareas.updateOne({_id: id}, req.body)
        res.redirect('/')
    })


    


  


module.exports = router


