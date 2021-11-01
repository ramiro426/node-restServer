const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        requerided: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        requerided: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        requerided: [true, 'la contraseña es obligatoria']
    },
    img:{
        type: String        
    },
    rol:{
        type: String,
        requerided: true, 
        enun: ['ADMIN_ROLE', 'USER_ROLE']
            
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password,...usuario } = this.toObject();
    return usuario;
        
    
}

module.exports = model('Usuario', UsuarioSchema);

