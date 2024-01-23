import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('Database ORM Tests', () => {
    const email = "testorm@example.com";
    const password = "password123"; // Senha de teste
    const name = "Test ORM";

    beforeAll(async () => {
        // Criar um usuário de teste
        await prisma.user.create({
            data: { email:email, password:password, name:name }
        });

        await prisma.user.create({
            data: { email:"validuser@example.com", password:"password123", name:name }
        });
    });

    afterAll(async () => {
        // Limpar o usuário de teste
        await prisma.user.delete({
            where: { email }
        });

        await prisma.user.delete({
            where:{email:"validuser@example.com"}
        })
    });

    test('Buscar usuário por e-mail', async () => {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        expect(user).toBeDefined();
        expect(user?.email).toBe(email);
        expect(user?.name).toBe(name);
    });

    test('Testar injeção SQL em operações de usuário', async () => {
        const email = "test' OR '1'='1";
      
        const user = await prisma.user.findUnique({
            where: { email }
        });

        expect(user).toBeNull(); // Espera-se que não encontre o usuário
    });

    test('Buscar usuário por e-mail válido', async () => {
        const email = "validuser@example.com";
        const password = "password123"

        const user = await prisma.user.findUnique({
            where: { email }
        });


        expect(user).toBeDefined();
        expect(user).not.toBeNull();

        if(user){
            expect(user.password).toBe(password); 
        }
    });
    //Outros testes CRUD aqui...
});
