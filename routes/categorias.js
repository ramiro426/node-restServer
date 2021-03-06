const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearCategoria,
        obtenerCategorias, 
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria} = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');



const router = Router(); 

//todas las categorias
router.get('/',obtenerCategorias);


//una categoria por id
router.get('/:id',[
    check('id', 'No es un ID de mongoo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],obtenerCategoria);


//Crear categoria cualquier persona con token valido

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria );

//Actualizar- privado- cualquier persona con token valido


router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio ').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);


//Borrar - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de mongoo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);


module.exports = router;