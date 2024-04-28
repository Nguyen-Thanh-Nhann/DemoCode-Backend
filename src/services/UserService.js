const User = require('../models/UserModel')

const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const CheckUser = await User.findOne({ 
                email: email
            })
            if(CheckUser !== null) {
                resolve({
                    status: 'ok',
                    message:' the email is already'
                })
            }
            const createUser = await User.create({
                name, 
                email, 
                password, 
                confirmPassword,
                phone
            })
            if (createUser){
                resolve({
                    status: 'oke',
                    message:'Success',
                    data: createUser
                })
            }
        }catch(e) {
            reject(e)
        } 
    })
}

module.exports = {
    createUser
}