import request from 'supertest';
import app from '../server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



describe('AuthController Tests', () => {
    const correctEmail = 'user@example.com';
    const correctPassword = 'correctPassword';
    const wrongPassword = 'wrongPassword';

    afterAll(async () => {
        await prisma.user.delete({
            where: { email: correctEmail }
        })
    })

    test('Login bem-sucedido gera token JWT', async () => {
        const createUserForTest = await request(app).post('/user/').send({ email: correctEmail, password: correctPassword, name: "Test Auth" })
        const result = await request(app).post('/auth/').send({ email: correctEmail, password: correctPassword })

        expect(result.status).toBe(200)


        expect(result.body.token).toBeDefined();
    });

    test('Login com senha incorreta deve falhar', async () => {
        await request(app)
            .post('/auth/')
            .send({ email: correctEmail, password: wrongPassword })
            .expect(401); // Unauthorized
    });

    test('JWT deve expirar após o tempo definido', async () => {
        // Gere um token com um tempo de expiração curto, por exemplo, 1 segundo
        const response = await request(app)
            .post('/auth/')
            .send({ email: correctEmail, password: correctPassword })
            .expect(200);

        const { token } = response.body;
        expect(token).toBeDefined();

        // Aguarde um tempo superior ao tempo de expiração do token
        await new Promise(resolve => setTimeout(resolve, 5100));

        // Tente usar o token expirado
        const expiredTokenResponse = await request(app)
            .get('/user/')
            .set('Authorization', `Bearer ${token}`)
            .expect(401); // Unauthorized - o token deve estar expirado
    },5400);

    test('Bloqueio após tentativas de login falhas repetidas', async () => {

        let result: any

        for (let i = 0; i < 5; i++) {
            result = await request(app)
                .post('/auth/')
                .send({ email: correctEmail, password: wrongPassword })
        }

        expect(result.status).toBe(403)

        // Agora o usuário deve estar bloqueado
        await request(app)
            .post('/auth/')
            .send({ email: correctEmail, password: correctPassword })
            .expect(403); // Forbidden or Locked
    });

});
