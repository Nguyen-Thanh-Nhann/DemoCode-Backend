const createUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            resolve({})
        }catch(e) {
            reject(e)
        } 
    })
}
        
module.exports = {
    createUser
}