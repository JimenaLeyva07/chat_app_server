const { response } = require("express");
const bcrypt = require('bcryptjs');


const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, resp = response) =>{ 
    
   const { email, password } = req.body;

   try {

    const existsEmail = await User.findOne({email:email});

    if(existsEmail){
        return resp.status(400).json({
            ok: false,
            message: 'Email is already registered.'
        });
    }

    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(); //salt is used in encryptology to generate random numbers
    user.password = bcrypt.hashSync(password, salt);

    await user.save(); //to save in bd

    // Generar JWT
    const token = await generateJWT(user.id);

    resp.json({
        ok:true,
        user,
        token
    });
    
   } catch (error) {
    console.log(error);
    resp.status(500).json({
        ok:false, 
        message: 'Unexpected error. Talk with management.'
    });
   }
}


const login = async (req, resp = response) => {
    const { email, password } = req.body;



    try {

        const userDB = await User.findOne({email:email});
    
        if(!userDB){
            return resp.status(400).json({
                ok: false,
                message: 'Email is not registered.'
            });
        }
    
        // Validar contraseña
        const isValidPassword = bcrypt.compareSync(password, userDB.password); 
        if (!isValidPassword) {
            return resp.status(400).json({
                ok: false,
                message: 'Password is not valid'
            });
            
        }

        // Generar JWT
        const token = await generateJWT(userDB.id);
    
        resp.json({
            ok:true,
            userDB,
            token
        });
        
       } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false, 
            message: 'Unexpected error. Talk with management.'
        });
       }
}

const renewToken = async (req, resp = response )=>{

    const uid = req.uid;
   
    const token = await generateJWT(uid);

    const user = await User.findById(uid);

    resp.json({
        ok: true, 
        user,
        token
    })
}

module.exports = {
    createUser,
    login, 
    renewToken
}