const {Sequelize} = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('sequelize-validation');
Sequelize.useCLS(namespace);

const seqeulize = new Sequelize('practice_validation','root','', {
    host :'127.0.0.1',
    dialect : 'mysql',
    logQueryParameters : true
})

const checkConnection = async()=>{
    try{
        await seqeulize.authenticate();
        console.log("연결 성공");
    }catch(err){
        console.log("연결 실패");
    }
}

checkConnection();

module.exports = seqeulize;