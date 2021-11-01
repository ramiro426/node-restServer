
const { response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');
const { countDocuments } = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {
    
   // const {q,nombre = 'No name', apikey, page, limit} = req.query;
   const { limite = 5, desde = 0} = req.query;
   const query = { estado: true}; 

    /*const usuarios = await usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));

   const total = await Usuario.countDocuments(query);*/

   const [total, usuarios] =await  Promise.all([
      Usuario.countDocuments(query),
      usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
   ])
    
    res.json({
        total,
       usuarios
    });
  }

  const usuariosPost = async(req, res = response) => {

     
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar que el correo existe
 

    //encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();
    
    res.status(201).json({        
       
       usuario
    })
  }

 const usuariosPut = async(req, res = response) => {
    
    const {id} = req.params;

    const {_id,password, google,correo,...resto} = req.body;

    if( password){
       //encriptar
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
  }

  const usuriosPatch =  (req, res = response) => {
    res.json({
  
        msg: 'patch api - controller'
    })
  }

  const usuariosDelete = async(req, res= response) => {
    const {id} = req.params;

    //fisico
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false} );
    res.json(usuario);
  }


  module.exports={
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuriosPatch,
      usuariosDelete
  }

