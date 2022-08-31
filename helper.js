module.exports.success = (message,data)=>{
    return {
        message : message,
        data : data
    }
}

module.exports.fail = (message)=>{
    return {
        message : message
    }
}