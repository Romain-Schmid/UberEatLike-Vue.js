export {};
const bcrypt = require('bcrypt')
const db_sql = require("../models");
const User = db_sql.model.User;
const { createJWT, createRefreshJWT } = require('../modules/jwt');

exports.loginAccount = async (req : any, res : any) => {
  const {email, role, password} = req.body;
  const user = await User.findOne({ where : {email : email, role : role }})
  if(user == null){
      return res.status(400).send('Cannot find user')   
  }
  try {
    console.log(await bcrypt.compare(password, user.password))
      if(await bcrypt.compare(password, user.password)){      
          let accessToken = createJWT({ email : email, role : role })
          let refreshToken = await createRefreshToken( email, role );
          res.cookie("accessToken", accessToken, {
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: true,
            sameSite: "none",
          });
          res.cookie("refreshToken", refreshToken, {
            expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: true,
            sameSite: "none",
          });
          return res.set({accessToken : accessToken}).send('Vous êtes connecté')
      }else{
        return res.send('Not Allowed')
      }
  }catch{
    return res.status(500).send("Probleme avec la connextion")
  }
};


async function createRefreshToken(email : string, role : string){
  const refreshToken = createRefreshJWT({ email : email, role : role })
  const expiredToken = new Date(new Date().getTime() +  7 * 24 * 60 * 60 * 1000);
  User.update(
      { refreshToken : refreshToken, expiredToken: expiredToken }, 
      { where : { email : email } }
      )
  return refreshToken
}
