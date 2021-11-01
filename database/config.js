const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreatedIndex: true,
            //useFindAndModify: false
            }, (err, resp) => {
                if (err) throw err;
                console.log('Base de datos ONLINE');
            });

        //console.log('Base de datos ONLINE');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}

module.exports = {
    dbConnection
}