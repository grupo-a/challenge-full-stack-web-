import { IHttpRequest, IHttpResponse, IController, IAddStudent, IValidation } from './student-controller-protocols'
import { serverError, ok, badRequest } from '@/presentation/helpers/http/http-helpers'

export class StudentController implements IController {
  constructor (
    private readonly addStudent: IAddStudent,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      return ok({})
    } catch (error) {
      return serverError()
    }
  }
}
