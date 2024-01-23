import { Response, Request, NextFunction } from "express"
import jwt, { decode, verify } from "jsonwebtoken"
import { config } from "dotenv"

config()

export function authenticatedMiddleware(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization

    if(!authToken){
        return res.status(403).send("Unauthorized")
    }

    if (!process.env.SECRETE_KEY_TOKEN) {
		return res.status(500).send("Server error")
	}

    const [bearer, token] = authToken.split(" ");
	if (bearer.toLowerCase() !== 'bearer') {
    	return res.status(401).send("Formato de token inválido");
	}


    try {
		const _token = verify(token, process.env.SECRETE_KEY_TOKEN) as { [key: string]: any }

		const currentTime = Math.floor(Date.now() / 1000)

		if (currentTime > _token.exp) {
			throw new Error("Token expired");
		}

		return next()

	} catch (error: any) {
		return res.status(401).send(error.message)
	}
}