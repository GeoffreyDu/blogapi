import express from 'express'
import passport from 'passport'
import articleController from './articles.ctrl'


export const articleRouter = express.Router()

articleRouter.route('/')// creer un bloc de routes
.post(articleController.create)
.get(articleController.findAll)
articleRouter.route('/:id')
.get(articleController.findOne)
.put(articleController.update)
.delete(articleController.delete)
