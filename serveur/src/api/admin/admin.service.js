import Joi from 'joi'
import bcrypt from 'bcryptjs'

export default{
  encryptedPass(randomText){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(randomText, salt);
  },


  comparePassword(randomText, encryptedPass){
    return bcrypt.compareSync(randomText, encryptedPass)
  },
  validateSignup(body){
    const schema = Joi.object().keys({
      firstname:Joi.string().required(),
      lastname:Joi.string().required(),
      email:Joi.string().email().required(),
      password:Joi.string().required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if(error && error.details){
      return {error}
    }
    return {value}
  },

  validateLogin(body){
    const schema = Joi.object().keys({
      email:Joi.string().email().required(),
      password:Joi.string().required()
    });
    const { value, error } = Joi.validate(body, schema);
    if(error && error.details){
      return {error}
  }
  return {value}
  },
};
