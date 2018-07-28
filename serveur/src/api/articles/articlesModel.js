import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate"

const { Schema } = mongoose

const articleSchema = new Schema({
  titre:{type:String, required:true},
  date:{type:Date},
  texte:{type:String, required:true},
  isPublished:Boolean,
  image:String
})

export default mongoose.model('Article', articleSchema)
