const bcrypt = require('bcryptjs');
const jwt  =  require('jsonwebtoken');
const Users =  require('../models/Users');

const signUp = async(req,res)=>{

    let username =  req.body.username
    let email =  req.body.email
    let password = req.body.password
    let roles = req.body.role

    const salt = await bcrypt.genSalt(10);

    const hashPassword  = await bcrypt.hash(password,salt)

    const record = await Users.findOne({email:email});

    if(record){
        res.status(400).send({
            message:'Email Already Registered'
        })
    }
    else{
        const user = new Users({
            username: username,
            email: email,
            password: hashPassword,
            role : roles
        })
        
        const result = await user.save()

        if(!result){
            res.status(400).send({
                message:"User cannot be created"
            })
        }
        else{
        res.status(200).send({
            message: "User created"
        })
    }
    }
}

const login = async (req,res)=>{
    const user = await Users.findOne({email:req.body.email});
    if(!user){
         return res.status(400).send({
             message:"User not found or invalid Email/Password"
         })
    }
 
    if(!(await bcrypt.compare(req.body.password,user.password))){
         return res.status(400).send({
             message:"Password is incorrect"
         })
    }
 
    const payload = {
     username: user.username,
     email: user.email,
     _id: user._id
   };
 
    const token = jwt.sign(payload,"secretkey",{expiresIn:'3d'});
 
    res.send({
     message:"Login Successs",
     token: token
    })
 
 }


 const getUsers = async(req,res)=>{
    
    const token = req.headers.authorization.split(' ')[1]; // Get token from Authorization header
    try {
      // Verify token and decode payload
      const decoded = jwt.verify(token,"secretkey");
  
      // Get user email from payload
      const userEmail = decoded.email;
  
      // Find user by email in the database
      const user = await Users.findOne({ email: userEmail });
        
      if (user) {
        res.json({ message: 'authenticated' ,data: user });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
}


const updateProfile =  async(req,res)=>{
    try{
      const {id} = req.params;
      const user = await Users.findByIdAndUpdate(id,req.body)
      const userProfile =  await Users.findById(id)
      res.status(200).send({
            message:"Profile Updated",
            data: userProfile
      }) 
    }      
    catch(e){
         res.send(e)
    }
        
}




module.exports = {signUp, login, getUsers,updateProfile}