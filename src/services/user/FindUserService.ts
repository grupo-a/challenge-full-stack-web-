import prisma from "@config/prisma"
import HttpError from "../../http/errors/HttpError"

export class FindUserService {
	public static async execute(userId: string) {
		const user = await prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw HttpError.notFound("User not found")

		return { user }
	}
}