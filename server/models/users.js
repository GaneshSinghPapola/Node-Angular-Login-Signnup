import mongoose  from 'mongoose';

const Schema = mongoose.Schema;
const validateEmail = function(email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};


let UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true, unique: [true, 'This username has already been taken'], },
  password: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
  admin: {type:Boolean, default:false},
  location: String,
  age: {type:Number, min:0, max:120},
  created_at: Date,
  updated_at: Date
});

export default mongoose.model('User', UserSchema);
