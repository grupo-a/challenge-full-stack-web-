import { tokens } from '../../../di/Tokens'
import { MissingParamError } from '../../../presentation/errors/MissingParamError'
import { badRequest, ok, serverError } from '../../..//presentation/helpers/HttpHelper'
import { IController } from '../../..//presentation/protocols/IController'
import { HttpRequest, HttpResponse } from '../../..//presentation/protocols/IHttp'
import { inject, injectable } from 'tsyringe'
import jwt from 'jsonwebtoken'
import { ILoginService } from '../../..//application/service/interfaces/ILoginService'

@injectable()
export class LoginController implements IController {
  constructor(
    @inject(tokens.LoginService)
    private readonly loginService: ILoginService,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    let token = ''

    try {
      if (!email || !password) {
        return badRequest(new MissingParamError('Missing Email or Password'))
      }

      const result = await this.loginService.login({ email, password })
      if (!result) {
        return badRequest(new Error('Invalid Email or Password'))
      }

      const { nome } = result
      if (process.env.TOKEN_SECRET) {
        token = jwt.sign({ nome, email }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRATION,
        })
      }

      return ok({ token })
    } catch (error) {
      return serverError()
    }
  }
}