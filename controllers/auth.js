
const { response} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req,res = response) => {

    const  {correo,password} = req.body;

    try {

        //email
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: "User / pass no sosn correctos"
            });
        }


        //usuario

       
        if(!usuario.estado){
            return res.status(400).json({
                msg: "User / pass no sosn correctos - estado:false"
            });
        }



        //pass
        const validaPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validaPassword){
            return res.status(400).json({
                msg: "User / pass no sosn correctos - password"
            });
        }


        //generar  JWT


        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
        
    }



}

module.exports = {
    login
}