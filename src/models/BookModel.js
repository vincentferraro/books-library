
module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('books',{
        //id
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
            
        },
        author : {
            type : DataTypes.STRING,
            allowNull : false
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        year : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        cover : {
            type : DataTypes.STRING,
            allowNull : false
        },
        genres : {
            type : DataTypes.STRING,
            allowNull : false,
            get(){
                return this.getDataValue()
            },
            set(value){
                this.setDataValue('genres',value.join(','))
                return this.getDataValue()
            }
        },
        
    },
    {
        timestamps: true,
        createdAt: 'created',  //Date création pour une nouvelle instance
        updatedAt: false  //Date de modification de l'instance
      })
}