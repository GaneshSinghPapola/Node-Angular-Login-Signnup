import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

const Schema = mongoose.Schema;
const validateEmail = function(email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


let UserSchema = new Schema({
  name: {type:String,required:''},
  username: { type: String, required: true, unique: true, unique: [true, 'This username has already been taken'], },
  password: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
  admin: {type:Boolean, default:false},
  location: String,
  age: {type:Number, min:0, max:120},
  created_at: {'type':Date, default:new Date()},
  updated_at: {'type':Date, 'default': new Date()}
});




UserSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) {
      return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
          user.password = hash;
          next();
      });
  });
});


export default mongoose.model('User', UserSchema);
