import request from 'supertest';
import app from '../server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

describe('Authentication Middleware Tests', () => {
    let token: string;

    beforeAll(async () => {

        await request(app)
        .post('/user/')
        .send({name:"Test", email:"validuser@example.com", password:"validPassword"})
   
        const loginResponse = await request(app)
            .post('/auth/')
            .send({ email: 'validuser@example.com', password: 'validPassword' })
            .expect(200);

        token = loginResponse.body.token;

        expect(token).toBeDefined()
    });

    afterAll(async ()=>{
        await prisma.user.delete({
            where:{
                email:'validuser@example.com'
            }
        })
    })

    test('Acesso à rota protegida sem token deve falhar', async () => {
        await request(app)
            .get('/user/')
            .expect(403); 
    });

    test('Acesso à rota protegida com token inválido deve falhar', async () => {
        await request(app)
            .get('/user/')
            .set('Authorization', 'Bearer invalid_token')
            .expect(401); 
    });

    test('Acesso à rota protegida com token válido', async () => {
        await request(app)
            .get('/user/')
            .set('Authorization', `Bearer ${token}`)
            .expect(200); 
    });
});
