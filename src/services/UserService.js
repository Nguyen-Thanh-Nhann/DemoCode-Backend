const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

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
            const hash = bcrypt.hashSync(password, 10)
            const createUser = await User.create({
                name, 
                email, 
                password : hash, 
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

const loginUser = (UserLogin) => {
    return new Promise(async(resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = UserLogin
        try {
            const CheckUser = await User.findOne({ 
                email: email
            })
            if(CheckUser === null) {
                resolve({
                    status: 'ok',
                    message:' the user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, CheckUser.password)
            if (!comparePassword){
                resolve({
                    status: 'ok',
                    message:' the password or user incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: CheckUser.id,
                isAdmin: CheckUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: CheckUser.id,
                isAdmin: CheckUser.isAdmin
            })

            resolve({
                status: 'oke',
                message:'Success',
                access_token,
                refresh_token
            })
           
        }catch(e) {
            reject(e)
        } 
    })
}

module.exports = {
    createUser,
    loginUser
}