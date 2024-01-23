import request from 'supertest';
import app from '../server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();




describe('UserController Tests', () => {

    afterAll(async ()=>{
        await prisma.user.delete({
            where:{
                email:"testhash@example.com"
            }
        })
    })
    
    test('Registro com entrada malformada (XSS e SQL Injection)', async () => {
        const responses = await Promise.all([
            request(app).post('/user/').send({ email: 'test@example.com', name: '"><script>alert(1)</script>', password: 'password123' }),
            request(app).post('/user/').send({ email: "test' OR '1'='1", name: 'UserTest', password: 'password123' })
        ]);

        for (const response of responses) {
            expect(response.status).toBe(400); // Espera-se falha devido à validação de entrada
        }
    });


    test('Verificar hash de senha no banco de dados', async () => {
        const email = 'testhash@example.com';
        const password = 'password123';
        const name = 'Test User';

        const result = await request(app).post('/user/').send({ email, name, password })
        
        expect(result.status).toBe(201)
        

        
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // expect(user).toBeDefined();
        expect(user).not.toBeNull();

        if(user){

            expect(user.password).not.toBe(password); 
        }

        
    });
});


