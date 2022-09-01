const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'books_library',
    'username',
    ' ',
    {
        host : '192.168.64.2',
        dialect : 'mariadb',
        dialectOptions : {
            timezone : 'Etc/GMT-2'
        },
        logging : false
    },
    
)

async function Connect(){
    try{
        await sequelize.authenticate()
        console.log("Connection OK")
    } catch (error){
        console.error("NO OK",error)
    }
}

Connect()