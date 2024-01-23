import { sign } from "jsonwebtoken"
import { TEmail, TLogin, TUser } from "../types/user"
import { userModel } from "../model/user.model"
import { compare } from "bcrypt"



class AuthService {
    private failedLoginAttempts: Map<string, {attempts:number,time:number}> = new Map();
    private readonly MAX_FAILED_ATTEMPTS = 5;
    private readonly BLOCK_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos


    private async generateToken(email: string) {

        try {
            if (process.env.SECRETE_KEY_TOKEN) {

                const token = sign({}, process.env.SECRETE_KEY_TOKEN, {
                    subject: email,
                    expiresIn: "5s"
                })

                return token
            } else {
                throw new Error("Invalid Key")
            }
        } catch (error: Error | any) {

            return { code: 500, msg: error.message }
        }
    }

    private incrementFailedAttempts(email: string) {

   
        if (!this.failedLoginAttempts.has(email)) {
            this.failedLoginAttempts.set(email, {attempts:1,time:Date.now()});
        } else {
            const attempts = Number(this.failedLoginAttempts.get(email)?.attempts);
            this.failedLoginAttempts.set(email, {attempts:attempts+1,time:Date.now()});

            if (attempts >= this.MAX_FAILED_ATTEMPTS) {
                // Usando arrow function para manter o contexto do 'this'
                setTimeout(() => {
                    this.failedLoginAttempts.delete(email);
                }, this.BLOCK_DURATION);
            }
        }
    }

    async login(UserInfo: TLogin) {

        const email = UserInfo.email;

        if (this.failedLoginAttempts.has(email)) {
            const lastFailedTime = this.failedLoginAttempts.get(email)?.time;
            const lastFailedAttempt = this.failedLoginAttempts.get(email)?.attempts;
            const now = Date.now();
            const timeSinceLastAttempt = lastFailedTime ? now - lastFailedTime : 0;


            if (lastFailedAttempt === this.MAX_FAILED_ATTEMPTS) {

                if(this.BLOCK_DURATION - timeSinceLastAttempt <= 0){
                    this.failedLoginAttempts.delete(email);
                    return { code: 401, msg: "Email/Password incorrect" };
                }

                const timeLeft = this.BLOCK_DURATION - timeSinceLastAttempt;
                return { code: 403, msg: `User blocked. Please try again in ${Math.ceil(timeLeft / 1000)} seconds.` };
            }
        }


        const user = await userModel.findUserByEmail(UserInfo.email)

        if (!user) {
            this.incrementFailedAttempts(email);
            return { code: 401, msg: "Email/Password incorrect" };
        }

        const verificationPassword = await compare(UserInfo.password, user.password)

        if (!verificationPassword) {
            this.incrementFailedAttempts(email);
            return { code: 401, msg: "Email/Password incorrect" }
        }

        return { code: 200, infoUser: user, token: await this.generateToken(UserInfo.email) }




    }
}

export const authService = new AuthService()