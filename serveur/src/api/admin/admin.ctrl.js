import Admin from './adminModel'
import adminService from './admin.service'

export default {
  async signup(req, res){
    try{
      const { value, error} = adminService.validateSignup(req.body);
      if(error){
        return res.status(400).json(error)
      }
      const encryptedPass = adminService.encryptedPass(value.password)

      const admin = await Admin.create({
        firstname:value.firstname,
        lastname:value.lastname,
        email:value.email,
        password:encryptedPass,
      });
      return res.json({success:true});
    }catch(err){
      console.error(err);
      return res.status(500).send(err);
    }
    return res.json(value)
  },

  async login(req, res){
    try{
      const { value, error } = adminService.validateLogin(req.body);
      if(error){
        return res.status(400).json(error)
      }
      const admin = await Admin.findOne({email:value.email});
      if(!admin){
        return res.status(401).json({err: "not authorized"})
      }
      const authenticated = adminService.comparePassword(
        value.password,
        admin.password
      );
      if(!authenticated){
        return res.status(401).json({err:"not auhtorized"});
      }
      return res.json({success: true})
    }catch(err){
      console.error(err);
      return res.status(500).send(err)
    }
  },
  authenticated(req, res){
    return res.json(req.admin)
  },
};
