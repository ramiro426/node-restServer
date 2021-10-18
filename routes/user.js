const {Router} = require('express');

const { usuariosGet, usuariosPost, usuariosPut, usuriosPatch, usuariosDelete } = require('../controllers/user');

const router = Router();


router.get('/', usuariosGet );


router.post('/',  usuariosPost);


  
router.put('/:id',  usuariosPut);


router.patch('/', usuriosPatch);



  
router.delete('/',  usuariosDelete);





module.exports = router;
