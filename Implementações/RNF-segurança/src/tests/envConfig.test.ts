import dotenv from 'dotenv';


dotenv.config()

describe('Environment Configuration Tests', () => {
    test('Verificar presença da chave secreta do token JWT', () => {
        expect(process.env.SECRETE_KEY_TOKEN).toBeDefined();
    });

    test('Verificar presença da URL do banco de dados', () => {
        expect(process.env.DATABASE_URL).toBeDefined();
    });
});
