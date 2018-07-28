import express from 'express'
import adminController from "./admin.ctrl"

export const adminRouter = express.Route()

adminRouter.post('/signup', adminController.signup)
adminRouter.post('/login', adminController.login)
