import { Request, Response } from 'express'

import { UserLoginUseCase } from './user-login-use-case'

class UserLoginController {
    constructor(private readonly userLoginUseCase: UserLoginUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body

            const token = await this.userLoginUseCase.execute({ email, password })

            return res.status(200).json({ token })
        } catch (error) {
            console.error(error)
            return res.status(400).send(error)
        }
    }
}

export { UserLoginController }
