import mongoose from 'mongoose'

const { Schema } = mongoose

const adminSchema = new Schema({
  firstname:{type:String, required:true},
  lastname:{type:String, required:true},
  email:{type:String, unique:true, required:true},
  password:{type:String,required:true}
})

export default mongoose.model('Admin', adminSchema)
