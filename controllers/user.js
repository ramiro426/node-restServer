
const { response, request} = require('express');


const usuariosGet =  (req = request, res = response) => {
    
    const {q,nombre = 'No name', apikey, page, limit} = req.query;
    
    res.json({
        
        msg: 'get api - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
  }

  const usuariosPost =  (req, res = response) => {
    
    const { nombre,edad }= req.body;
    
    res.status(201).json({
        
        msg: 'post api - controller',
        nombre,
        edad
    })
  }

 const usuariosPut = (req, res = response) => {
    
    const {id} = req.params;

    res.status(400).json({
   
        msg: 'put api - Controller',
        id
    })
  }

  const usuriosPatch =  (req, res = response) => {
    res.json({
  
        msg: 'patch api - controller'
    })
  }

  const usuariosDelete = (req, res= response) => {
    res.json({
  
        msg: 'delete api - controller'
    })
  }


  module.exports={
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuriosPatch,
      usuariosDelete
  }

