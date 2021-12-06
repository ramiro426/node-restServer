const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearProducto,
        obtenerProductos, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto} = require('../controllers/productos');

const { existeCategoriaPorId,existeProductoPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');



const router = Router(); 

//todas las categorias
router.get('/',obtenerProductos);


//una categoria por id
router.get('/:id',[
    check('id', 'No es un ID de mongoo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],obtenerProducto);


//Crear categoria cualquier persona con token valido

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto );

//Actualizar- privado- cualquier persona con token valido


router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID de mongoo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto);


//Borrar - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de mongoo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto);


module.exports = router;