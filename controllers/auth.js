
const { response, json} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

    const googleSignIn = async(req, res = response) => {
        const {id_token} = req.body;

        try {

           const {correo, nombre, img} =  await googleVerify( id_token );

           
           //console.log(googleUser);

            let usuario = await Usuario.findOne({correo})

            if(!usuario){


                const data = {
                    nombre,
                    correo,
                    password: '',
                    img,
                    google: true
                };
                usuario = new Usuario(data);
                await usuario.save();
            }  

            if(!usuario.estado){
                return res.status(401).json({
                    msg: 'hable con el dministrador, Usuario bloqueado '
                });
            }

            const token = await generarJWT(usuario.id);

            res.json({
                // msg: 'Todo ok',
                // id_token
                usuario,
                token
            });
            
        } catch (error) {

            res.status(400).json({
                ok: false,
                msg: 'El token no se pudo verificar'
            })
            
        }
    

    }

module.exports = {
    login,
    googleSignIn
}