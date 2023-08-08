const {Schema,model} =  require('mongoose');

const UserSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (v) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid email address!`,
        },
    } ,
    password: {
        type:String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin','seller','user'],
        default: 'user'
     }, 
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required: true
    } ,
    gender: {
        type:String,
        required: true
    },
    mobileno: {
        type:String,
        required: true
    },
    country: {
        type:String,
        required: true
    }, 
  
},
{ timestamps:true } )


const UserModel = model('users',UserSchema);

module.exports = UserModel;