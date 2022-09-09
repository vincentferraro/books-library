module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password: {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        timestamps: true,
        createdAt: 'created',  //Date création pour une nouvelle instance
        updatedAt: false  //Date de modification de l'instance
      })
}