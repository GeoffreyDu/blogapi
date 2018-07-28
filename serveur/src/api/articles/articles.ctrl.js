import Joi from 'joi'
import Article from './articlesModel.js'

export default {
  async create(req, res) {
    try {
      const schema = Joi.object().keys({ //cree un obj et lui donne les keys du model
        titre: Joi.string().required(),
        date: Joi.date(),
        texte: Joi.string().required(),
        isPublished: Joi.boolean(),
        image: Joi.string()
      });
      const {value, error} = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const article = await Article.create(Object.assign({}, value));
      return res.json(article);
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
      }
    },
    async findAll(req, res) {
    try {
      const articles = await Article.find({})
      if (!articles) {
        return res.status(404).json({err: 'could not find article'})
      }
      res.json(articles)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err)
    }
  },
  async findOne(req, res) {
    try {
      const {id} = req.params
      const article = await Article.findById(id)
      if (!article) {
        return res.status(404).json({err: 'could not find article'})
      }
      return res.json(article)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err)
    }
  },
  async update(req, res) {
    try {
      const {id} = req.params;
      const schema = Joi.object().keys({ //cree un obj et lui donne les keys du model
        titre: Joi.string().required(),
        date: Joi.date(),
        texte: Joi.string().required(),
        isPublished: Joi.boolean(),
        image: Joi.string()
      });
      const {value, error} = Joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const article = await Article.findOneAndUpdate({_id: id}, value, {new: true})
      if (!article) {
        return res.status(404).json({err: 'could not find article'})
      }
      return res.json(article)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err)
    }
  },
  async delete(req, res) {
    try {
      const {id} = req.params;
      const article = await Article.findByIdAndRemove(id)//ou findOneAndRemove({_id:id})
      if (!article) {
        return res.status(404).json({err: 'no article found'})
      }
      return res.json({message: "article deleted"})
    } catch (err) {
      console.error(err);
      return res.status(500).send(err)
    }
  }
}
