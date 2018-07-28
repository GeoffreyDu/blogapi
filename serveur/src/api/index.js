import express from 'express'
import { articleRouter } from './articles/articlesRoute'
import { adminRouter } from './admin/adminRoute.js'


export const restRouter = express.Router()

restRouter.use('/articles', articleRouter)
restRouter.use('/admin', adminRouter)
