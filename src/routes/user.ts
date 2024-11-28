import { Router, Request, Response } from 'express';
import {createUser, editUser, findUser} from "../models/user";
import { generateRandomPassword, parseUserForResponse, Errors } from "../helper";

const router = Router();

// CreateUser
router.post('/new', async (req: Request, res: Response) => {
    try {
        const { email, username, firstName, lastName } = req.body

        if (!email || !username || !firstName || !lastName) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
        }

        const existingUserByEmail = await findUser('email', email)
        if (existingUserByEmail) {
            return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
        }

        const existingUserByUsername = await findUser('username', username)
        if (existingUserByUsername) {
            return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false })
        }

        await createUser(email, username, generateRandomPassword(16), firstName, lastName)

        return res.status(201).json({
            error: undefined,
            data: { email, username, firstName, lastName },
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false })
    }
})

// EditUser
router.post('/new/:userId', async (req: Request, res: Response) => {
    try {
        const { email, username, firstName, lastName } = req.body
        const { userId } = req.params

        if (!email || !username || !firstName || !lastName) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
        }

        const existingUserById = await findUser('id', parseInt(userId))
        if (!existingUserById) {
            return res.status(404).json({ error: Errors.UserNotFound, data: undefined, success: false })
        }

        if (existingUserById.email != email) {
            const userWithSameEmail = await findUser('email', email)
            if (userWithSameEmail) {
                return res.status(409).json({ error: Errors.EmailAlreadyInUse, data: undefined, success: false })
            }
        }

        if (existingUserById.username != username) {
            const userWithSameUsername = await findUser('username', username)
            if (userWithSameUsername) {
                return res.status(409).json({ error: Errors.UsernameAlreadyTaken, data: undefined, success: false })
            }
        }

        await editUser(parseInt(userId), email, username, firstName, lastName)

        return res.status(200).json({
            error: undefined,
            data: { email, username, firstName, lastName },
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false })
    }
})

// GetUserByEmail
router.get('/', async (req: Request, res: Response) => {
    try {
        const { email } = req.query

        if (!email) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false })
        }

        const user = await findUser('email', email.toString())
        if (!user) {
            return res.status(404).json({ error: Errors.UserNotFound, data: undefined, success: false })
        }
        return res.status(200).json({ error: undefined, data: parseUserForResponse(user), success: true })

    } catch (error) {
        return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false })
    }
})

module.exports = router;