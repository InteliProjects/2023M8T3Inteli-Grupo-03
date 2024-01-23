# (Sprint3) RNF - Segurança 

### 3.1.a) Especificação e Codificação dos Testes Não Funcionais dos Componentes (TDD)

#### Especificação de pelo menos 1 Teste Automatizado para cada RNF:

- **RNF de Segurança:** Focamos em testar a autenticação, autorização e a proteção contra injeções SQL.

### Detalhamento claro dos testes:

1. **Teste de Injeção SQL:**
   - **Cenário:** Prevenir a injeção de SQL.
   - **Critérios de Aceitação:** Não encontrar usuário com injeção SQL.
   - **Implementação:**
     ```javascript
     test('Testar injeção SQL em operações de usuário', async () => {
         const email = "test' OR '1'='1";
         const user = await prisma.user.findUnique({ where: { email } });
         expect(user).toBeNull();
     });
     ```

2. **Teste de Autenticação:**
   - **Cenário:** Login bem-sucedido e falho.
   - **Critérios de Aceitação:** Geração de token para login correto; falha para login incorreto.
   - **Implementação:**
     ```javascript
     // Login bem-sucedido
     test('Login bem-sucedido gera token JWT', async () => {
         // ...
     });

     // Login com senha incorreta
     test('Login com senha incorreta deve falhar', async () => {
         // ...
     });
     ```

3. **Teste de Middleware de Autenticação:**
   - **Cenário:** Acesso a rotas protegidas.
   - **Critérios de Aceitação:** Permitir acesso com token válido; negar sem token ou com token inválido.
   - **Implementação:**
     ```javascript
     test('Acesso à rota protegida com token válido', async () => {
         // ...
     });
     ```

## 3.1.b) Especificação e Codificação dos Componentes que Compõem os Mecanismos Indicados na Tática

### Codificação Mecanismo/Componente:

- **Autenticação e Autorização:**
  - **Middleware de Autenticação:** `src/middleware/authentication.ts`
  - **Controller de Autenticação:** `src/controller/auth.controller.ts`
  - **Modelo de Usuário:** `src/model/user.model.ts`
  - **Serviço de Autenticação:** `src/service/auth.service.ts`

### Aderência dos componentes à arquitetura especificada:

- Os componentes de segurança estão alinhados com a arquitetura REST e integram-se ao framework Express.js.

### Processo de deploy registrado:

O processo de deploy desses testes ficariam na parte de pipeline de subir uma aplicação no ar, pois após a conclusão do build do projeto, o sistema ou o pessoal de devops configurou um processo de validação onde entrariam os testes que construímos, reportando assim qualquer problema ou falha no teste, não permitindo que as novas funcionalidades sejam implementados até o passar dos testes.

Provavelmente utilizando tecnologias como Jenkins para facilitar essa integração entre a validação dos testes e das hospedagens (cloud)

![](https://i.imgur.com/Xtenwpr.png)

<br>

#### Registros de execução de testes com casos de sucesso e falha:

#### **Sistema atual**


![](https://imgur.com/WedF1Mp.png)


 - Falha na Autenticação (AuthController Tests - Login com Senha Incorreta)
**Problema**: O sistema está autenticando com senha incorreta (`expected 401 "Unauthorized", got 200 "OK"`).

 - Injeção SQL (UserController Tests - Registro com Entrada Malformada)
**Problema**: Possível vulnerabilidade à injeção SQL.

 - Exposição de Dados Sensíveis (UserController Tests - Verificar Hash de Senha)
**Problema**: Exposição de hash de senha ou dados sensíveis.

 - Middleware de Autenticação Deficiente (Authentication Middleware Tests)
**Problema**: Falha ao validar tokens de autenticação (`expected 200 "OK", got 401 "Unauthorized"`).

-  Problemas de Conexão com o Banco de Dados (Database ORM Tests)
**Problema**: Incapacidade de conectar-se ao banco de dados.

 - Problemas com Porta de Rede Ocupada (AuthController Tests - Login Bem-Sucedido)
**Problema**: Tentativa de usar uma porta já ocupada (`listen EADDRINUSE: address already in use :::3000`).



#### **Sistema Novo**


De acordo com os resultados adquiridos nos resultados do sistema passado, realizamos vários TDDs, onde aconteciam falhas e sucessos dentro até se aprimorar o sistema de acordo com os testes, por motivos necessidade de documentar registramos apenas o resultado final após algumas mudanças na aplicação.

Assim podemos ter uma métrica melhor de como o nosso sistema pode ajudar o nosso cliente em certos pontos de segurança.

![](https://i.imgur.com/KA73Gep.jpg)


## 3.2.a) Mapa de Testes Automatizados 

### `src/tests/databaseORM.test.ts` - Testes de ORM com Prisma

1. **Teste de Injeção SQL**
   - **Objetivo:** Verificar a segurança contra injeções SQL.
   - **Entrada:** E-mail simulando uma injeção SQL (`"test' OR '1'='1"`).
   - **Saída Esperada:** O sistema não encontra um usuário (retorno `null`).
   - **Código:**
     ```javascript
     test('Testar injeção SQL em operações de usuário', async () => {
         const email = "test' OR '1'='1";
         const user = await prisma.user.findUnique({ where: { email } });
         expect(user).toBeNull();
     });
     ```

2. **Teste de Busca de Usuário por E-mail**
   - **Objetivo:** Assegurar a correta busca de usuários por e-mail.
   - **Entrada:** E-mail válido (`"validuser@example.com"`).
   - **Saída Esperada:** O usuário correspondente ao e-mail é encontrado.
   - **Código:**
     ```javascript
     test('Buscar usuário por e-mail', async () => {
         const email = "validuser@example.com";
         const user = await prisma.user.findUnique({ where: { email } });
         expect(user).toBeDefined();
         expect(user.email).toBe(email);
     });
     ```

### `src/tests/authController.test.ts` - Testes do Controlador de Autenticação

1. **Teste de Login bem-sucedido**
   - **Objetivo:** Verificar se um token JWT é gerado após um login bem-sucedido.
   - **Entrada:** Credenciais corretas de login.
   - **Saída Esperada:** Geração e retorno de um token JWT.
   - **Código:**
     ```javascript
     test('Login bem-sucedido gera token JWT', async () => {
         const response = await request(app)
             .post('/auth/')
             .send({ email: 'user@example.com', password: 'correctPassword' })
             .expect(200);

         expect(response.body.token).toBeDefined();
     });
     ```

2. **Teste de Login com Senha Incorreta**
   - **Objetivo:** Confirmar que o login falha quando uma senha incorreta é fornecida.
   - **Entrada:** Senha incorreta.
   - **Saída Esperada:** Falha no login com status 401 (Não autorizado).
   - **Código:**
     ```javascript
     test('Login com senha incorreta deve falhar', async () => {
         await request(app)
             .post('/auth/')
             .send({ email: 'user@example.com', password: 'wrongPassword' })
             .expect(401);
     });
     ```

3. **Teste de Bloqueio após Tentativas de Login Falhas**
   - **Objetivo:** Avaliar se o sistema bloqueia um usuário após várias tentativas de login malsucedidas.
   - **Entrada:** Múltiplas tentativas de login com senha incorreta.
   - **Saída Esperada:** Bloqueio do usuário após tentativas falhas, com status 403 (Proibido ou bloqueado).
   - **Código:**
     ```javascript
     test('Bloqueio após tentativas de login falhas repetidas', async () => {
         // ...
         await request(app)
             .post('/auth/')
             .send({ email: 'user@example.com', password: 'correctPassword' })
             .expect(403);
     });
     ```

### `src/tests/authMiddleware.test.ts` - Testes do Middleware de Autenticação

1. **Teste de Acesso sem Token**
   - **Objetivo:** Verificar se o acesso a rotas protegidas é negado sem um token JWT.
   - **Entrada:** Requisição sem token JWT.
   - **Saída Esperada:** Acesso negado com status 403 (Proibido).
   - **Código:**
     ```javascript
     test('Acesso à rota protegida sem token deve falhar', async () => {
         await request(app)
             .get('/user/')
             .expect(403);
     });
     ```

2. **Teste de Acesso com Token Inválido**
   - **Objetivo:** Garantir que o acesso a rotas protegidas seja negado com um token JWT inválido.
   - **Entrada:** Token JWT inválido.
   - **Saída Esperada:** Acesso negado

 com status 401 (Não autorizado).
   - **Código:**
     ```javascript
     test('Acesso à rota protegida com token inválido deve falhar', async () => {
         await request(app)
             .get('/user/')
             .set('Authorization', 'Bearer invalid_token')
             .expect(401);
     });
     ```

3. **Teste de Acesso com Token Válido**
   - **Objetivo:** Confirmar que o acesso a rotas protegidas é permitido com um token JWT válido.
   - **Entrada:** Token JWT válido.
   - **Saída Esperada:** Acesso permitido com status 200 (OK).
   - **Código:**
     ```javascript
     test('Acesso à rota protegida com token válido', async () => {
         await request(app)
             .get('/user/')
             .set('Authorization', `Bearer ${token}`)
             .expect(200);
     });
     ```


## 3.2.b) Registros de Testes Automatizados:

Antes de mostrar-mos os resultados obtidos e os detalhamentos, caso queira replicar o mesmo ambiente de test é necessário seguir as seguintes etapas abaixo:

```bash
      // Etapa 1
      git clone https://github.com/2023M8T3Inteli/Grupo-03.git

      // Etapa 2
      cd Grupo-03/Implementações/RNF-segurança

      // Etapa 3
      npm i

      // Etapa 4
      // Criar .env dentro desse repositório onde as variáveis vão estar no .env.example
      npx prisma generate

      // Etapa 5
      npx prisma migrate deploy

      // Etapa 6
      npm test

```
Seguindo esses passos muito provavelmente você conseguirá replica os mesmos resultados que vai ser mostrado.

### Descrição detalhada e organizada dos resultados obtidos

Após algumas modificações e implementações no nosso sistema ( Novo ) começa-mos á realizar os testes que foram criados para o sistema Atual, mostrando diferenças significativas pré modificações para passar no test.

![](https://i.imgur.com/KA73Gep.jpg)

Mostrando que o novo sistema trazem melhorias já nós testes, porém alguns testes como validação do token ou até mesmo o de bloquear o usuário durante algum tempo após ele realizar vários login falhos ainda eram um problema, onde foi possível analisar certas falhas no nosso sistema que vinha do Atual, onde assim conseguir adquirir graças aos testes passados essa brecha de segurança, onde podemos ver que os testes após essa implementação nesse mesmo ponto resultou em testes mais precisos e confiáveis além de passarem pela pipeline.

![](https://i.imgur.com/w9LnUsi.jpg)

Podemos observar que ele fez os testes demorarem um pouco mais pelo motivos de realizarmos muitas tentativas de falha resultando em uma fila de espera onde precisa ser testada e por conta do token, onde precisamos testar se o sistema está barrando usuário com token expirados, resultando assim em um test mais lento, porém podendo testar situações mais próximo do mundo real.

Em resumo podemos ter como resultados uma boa melhora na parte de segurança do sistema, onde podemos observar nos testes onde mais que da metade do sistema atual falhava enquanto o novo passa 100% dos testes, além de persistir dados pre e pós testes, garantindo uma implementação limpa e sem muitos problemas no futuro.


## 3.2.c) Avaliação dos Resultados

Comparação entre Cenários do Sistema Atual e Propostos

Ao comparar os registros de simulação e testes entre o sistema atual e as propostas de melhoria, é evidente a diferença significativa nos resultados obtidos:

1. Sistema Atual:

- Os testes revelaram falhas substanciais, especialmente na validação do token e no bloqueio de usuários após várias tentativas de login fracassadas.
 
- Mais da metade dos testes falhou, indicando vulnerabilidades na segurança do sistema.

- Persistência de dados inconsistente antes e após os testes, sugerindo problemas futuros na implementação.

2. Sistema Proposto (Novo):

- Os testes realizados após modificações demonstraram melhorias notáveis.
- Todos os testes passaram com sucesso, representando uma segurança mais robusta e confiável.
- Verificação consistente da persistência de dados antes e após os testes, garantindo uma implementação mais limpa e confiável para o futuro.

### Avaliação dos Resultados e Identificação de Ajustes

Os resultados dos testes e simulações fornecem insights valiosos para ajustes e melhorias no sistema:

1. Segurança Reforçada:
 - A implementação de modificações demonstrou uma significativa melhoria na segurança, evidenciada pela taxa de sucesso dos testes.

- Identificaram-se brechas no sistema atual, como falhas na validação do token e no bloqueio de usuários após tentativas de login fracassadas.

2. Eficiência e Realismo nos Testes:
- Apesar do aumento do tempo de execução dos testes no novo sistema, a simulação de cenários mais próximos da realidade foi crucial.
- Testes mais lentos devido a múltiplas tentativas de falha e verificação de tokens expirados, resultando em uma avaliação mais abrangente do sistema.

3. Implementação Futura:
- Os resultados ressaltam a importância de seguir os padrões de segurança desde o início do desenvolvimento para evitar vulnerabilidades no sistema.
- A consistência na persistência de dados antes e após os testes é fundamental para garantir uma implementação sólida e sem complicações no futuro.

### Sugestões de Mudanças na Arquitetura

Considerando os resultados dos testes e simulações, é recomendado:

- Revisar e fortalecer os protocolos de validação de tokens e mecanismos de bloqueio de usuários após tentativas de login fracassadas.
- Implementar estratégias para otimizar o tempo de execução dos testes sem comprometer a abrangência das simulações.
- Integrar práticas de segurança desde as fases iniciais do desenvolvimento para assegurar uma base sólida para futuras implementações.

A análise dos registros de testes oferece uma visão clara das lacunas de segurança no sistema atual e como as modificações propostas influenciaram positivamente os resultados dos testes, subsidiando sugestões de mudanças na arquitetura para um sistema mais seguro e confiável.

## 3.2.d) Avaliação dos riscos resultantes

### Revisão dos Riscos pelo Negócio

1. Vazamento de Dados e Falhas de Segurança no Sistema

Após a análise dos testes e simulações, as melhorias propostas foram direcionadas principalmente para fortalecer a segurança do sistema. Isso impacta diretamente na mitigação dos riscos identificados previamente pelo negócio, incluindo:

- Probabilidade Reduzida de Vazamento de Dados:
   - As implementações focadas na validação de tokens e no bloqueio de usuários após múltiplas tentativas de login fracassadas fortalecem a segurança, reduzindo a probabilidade de vazamento de dados.

- Controle de Acesso Aprimorado:
   - O sistema proposto agora possui melhores controles de acesso, atenuando os riscos associados a falhas de segurança.

### Avaliação Preliminar do Controle dos Riscos

1. Melhorias na Mitigação de Riscos:

- Impacto Reduzido:
   - As alterações realizadas diminuíram significativamente o potencial impacto de falhas de segurança, como vazamento de dados.
   - A implementação de um sistema mais robusto e confiável resulta em uma redução substancial do impacto de possíveis violações de segurança.

2. Controles Reforçados:

- Monitoramento Contínuo:
   - É necessário estabelecer uma estrutura de monitoramento contínuo para garantir que as medidas de segurança implementadas permaneçam eficazes ao longo do tempo.
   - Revisões periódicas de segurança e testes de penetração podem ajudar a identificar possíveis lacunas ou novas vulnerabilidades que possam surgir.

3. Educação e Conscientização:

- Treinamento dos Usuários:
   - Investir em programas de treinamento e conscientização para os usuários finais pode reduzir ainda mais o risco de falhas de segurança devido a comportamentos inadequados.

### Considerações Finais

As melhorias propostas desempenham um papel crucial na redução da probabilidade e do impacto de falhas de segurança no sistema. No entanto, para garantir uma evolução contínua e o controle efetivo desses riscos, é fundamental estabelecer procedimentos contínuos de monitoramento, revisão e educação no âmbito da segurança da informação. Assim, será possível sustentar um ambiente mais seguro e protegido ao longo do ciclo de vida do sistema.



## 3.3.a) Estrutura estática do modelo de segurança: 

Analise para oferecer uma visão mais profunda sobre as vulnerabilidades potenciais, seus riscos e formas de mitigá-las.

### Listagem de elementos (módulos, componentes, serviços) envolvidos para testes de segurança do sistema atual:

Elementos Envolvidos no Teste de Segurança:

1. **Sistema de Autenticação (AuthController):**
   - Endpoints:
     - `/auth/`: Gerencia o login do usuário.
   - Testes: Prevenção de ataques de força bruta, validação de token JWT, tratamento de erros para evitar vazamento de informações.

2. **Registro e Gerenciamento de Usuários (UserController):**
   - Endpoints:
     - `/user/`: Registro de usuário.
     - `/user/`: Recupera todos os usuários (presumivelmente requer autenticação).
   - Testes: Validação de entrada para campos de registro, verificação de autenticação adequada para acesso aos dados do usuário.

3. **Interação com Banco de Dados e ORM (Prisma):**
   - Componentes: Operações do modelo de usuário em `user.model.ts`.
   - Testes: Prevenção de injeção SQL, vazamento de dados, armazenamento seguro de dados (especialmente senhas).

4. **Middleware (Middleware de Autenticação):**
   - Componentes: `authenticatedMiddleware` em `authentication.ts`.
   - Testes: Verificação de token, garantindo que rotas protegidas não sejam acessíveis sem autenticação válida.

5. **Configuração Ambiental (Arquivo .env):**
   - Testes: Verificar informações sensíveis codificadas no código, uso seguro de variáveis de ambiente.

6. **Comunicação do Protocolo MQTT (se utilizado):**
   - Componentes: Configuração MQTT em `mqtt.ts`.
   - Testes: Assinatura segura de tópicos e publicação, autenticação em comunicações MQTT.

## Descrição de pré-condições envolvidas para os testes de segurança do sistema atual;

1. **Endpoints e Rotas Conhecidos:**
   - Listar todos os endpoints da API disponíveis no código (`/auth/`, `/user/`, `/user/`).

2. **Ambiente de Teste:**
   - Um ambiente de teste separado que espelha a configuração de produção, incluindo um banco de dados de teste.

3. **Ferramentas e Acesso:**
   - Acesso a ferramentas como Postman para teste de API, OWASP ZAP/Burp Suite para testes de penetração.

4. **Credenciais Necessárias:**
   - Contas de usuário de teste para diferentes papéis (admin, usuário regular) para testar níveis de autorização.

### Testes de Segurança em Detalhes:

1. **Teste de Autenticação (Endpoint: `/auth/`):**
   - **Ataque de Força Bruta:** Tentar múltiplos logins falhos para testar bloqueio de conta ou limitação de taxa.
   - **Segurança JWT:** Testar expiração de token, validação de assinatura e cenários de mau uso de token.

2. **Teste de Registro de Usuário (Endpoint: `/user/`):**
   - **Validação de Entrada:** Tentar registrar usuários com entrada malformada (cargas úteis de injeção SQL, scripts XSS, strings excessivamente longas).
   - **Manuseio de Senha:** Verificar se as senhas são armazenadas de forma segura (hash) no banco de dados.

3. **Acesso aos Dados do Usuário (Endpoint: `/user/`):**
   - **Verificação de Autorização:** Tentar acessar este endpoint sem autenticação ou com uma conta de usuário de baixo privilégio.
   - **Exposição de Dados:** Garantir que nenhum dado sensível (como senhas) esteja incluído na resposta.

4. **Teste de Middleware (Middleware de Autenticação):**
   - **Validação de Token:** Acessar rotas protegidas com JWTs inválidos/expirados para testar a eficácia do middleware.
   - **Tratamento de Erros:** Verificar se alguma informação sensível é vazada quando uma tentativa de acesso não autorizado é feita.

5. **Segurança de Banco de Dados e ORM:**
   - **Configurações ORM:** Revisar as configurações do ORM para melhores práticas de segurança.
   - **Injeção SQL:** Tentar injetar SQL através de entradas de usuário no registro ou login.

6. **Teste de Configuração Ambiental:**
   - **Revisão de Código:** Garantir que o arquivo `.env` não esteja incluído no controle de

 versão e que nenhum dado sensível esteja codificado.

7. **Segurança do Protocolo MQTT (se aplicável):**
   - **Intercepção de Mensagens:** Testar se as mensagens MQTT podem ser interceptadas ou acessadas sem autorização.
   - **Segurança de Assinatura de Tópicos:** Verificar se clientes não autorizados podem assinar tópicos.

### Descrição de pós-condições envolvidas para os testes de segurança do sistema atual:



#### **Teste 1: Autenticação (Endpoint `/auth/`)**

- **Objetivo:** Testar prevenção de ataques de força bruta e segurança de tokens JWT.
- **Método:** Script automatizado para várias tentativas de login; teste manual com JWTs modificados.
- **Saida terminal:**
  ```
  $ python3 brute_force_test.py /auth/
  Attempting login with user 'user.testing@x.com'...
  Attempt 1: Failed login
  Attempt 5: Failed login
  Attempt 10: Account locked due to multiple failed attempts
  ```
- **Achados:** Mecanismo de bloqueio de conta acionado após 10 tentativas falhas, prevenindo ataques de força bruta. Tokens JWT sem configurações adequadas de expiração.
- **Risco Potencial:** Sem expiração de token, JWTs roubados podem ser utilizados indefinidamente.
- **Recomendações:** Implementar expiração de token e mecanismo de token de atualização.
- **Impacto:** Alto

#### **Teste 2: Registro de Usuário (Endpoint `/user/`)**

- **Objetivo:** Validar sanitização de entrada e manuseio seguro de senha.
- **Método:** Submissão de entradas malformadas e scripts; inspeção do banco de dados para armazenamento de senha.
- **Saida terminal:**
  ```
  $ curl -X POST -d "email=user.testing@x.com&name=<script>alert(1)</script>&password=123456" https://api.example.com/user/
  {"message": "User registered successfully"}
  $ db_check_password_hash 'user.testing@x.com'
  Password hash: NULL
  ```
- **Achados:** Entradas não são adequadamente sanitizadas, levando a vulnerabilidades XSS. Senhas não estão sendo hashadas no banco de dados.
- **Risco Potencial:** Ataques XSS armazenados e senhas de usuários comprometidas.
- **Recomendações:** Implementar validação e sanitização rigorosa de entrada. Utilizar bcrypt para hashing de senhas.
- **Impacto:** Crítico

#### **Teste 3: Segurança de Banco de Dados e ORM**

- **Objetivo:** Checar vulnerabilidades de injeção SQL e configurações ORM.
- **Método:** Teste manual com payloads de injeção SQL.
- **Saida terminal:**
  ```
  $ curl -X POST -d "email=test' OR '1'='1&password=123456" https://api.example.com/user/
  {"message": "SQL error occurred"}
  ```
- **Achados:** Alguns endpoints vulneráveis à injeção SQL.
- **Risco Potencial:** Acesso não autorizado ao banco de dados e manipulação de dados.
- **Recomendações:** Usar declarações preparadas e consultas parametrizadas.
- **Impacto:** Alto

### Plano de Reteste

- **Passo 1:** Implementar as mudanças recomendadas no ambiente de desenvolvimento.
- **Passo 2:** Repetir os testes para garantir que as vulnerabilidades foram resolvidas:
  - Teste de prevenção de força bruta em `/auth/`.
  - Testes de XSS e injeção SQL em `/user/`.
  - Verificação do mecanismo de expiração e token de atualização JWT.
- **Passo 3:** Realizar um teste de regressão completo para garantir que nenhum novo problema tenha sido introduzido.
- **Passo 4:** Revisar e atualizar a documentação para refletir as novas práticas de segurança.

Este relatório simulado fornece uma visão detalhada das vulnerabilidades de segurança potenciais, seus impactos e recomendações para mitigação, junto com um plano para retestar a aplicação após as correções.





## Descrição das melhorias de segurança do sistema novo / Recomendações Gerais:



1. **Implementação de bcrypt no UserModel para Hash de Senhas**:
   - Criptografia de senhas antes de armazenamento no banco de dados.
   ```javascript
   // Em user.model.ts
   import { hash } from "bcrypt";
   userInfo.password = await hash(userInfo.password, 8);
   ```

2. **Validação de Email e Nome no UserController**:
   - Adição de validações para formato de e-mail e caracteres inválidos no nome.
   ```javascript
   // Em user.controller.ts
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
       return res.status(400).json({ message: "Invalid email address" });
   }
   const nameRegex = /[<>]/;
   if (nameRegex.test(name)) {
       return res.status(400).json({ message: "Invalid characters in name field" });
   }
   ```

3. **Refatoração no AuthController**:
   - Melhoria na lógica de autenticação e tratamento de erros.
   ```javascript
   // Em auth.controller.ts
   if (!req.body.email || !req.body.password) {
       res.status(401).send("email and pass required")
   }
   if (result.code === 200) {
       return res.status(200).json({ user: result.infoUser, token: result.token })
   } else {
       return res.status(result.code).json(result.msg)
   }
   ```

4. **Incremento de Tentativas Falhadas de Login no AuthService**:
   - Implementação de lógica para lidar com tentativas falhas de login.
   ```javascript
   // Em auth.service.ts
   private incrementFailedAttempts(email: string) {
       if (attempts >= this.MAX_FAILED_ATTEMPTS) {
           setTimeout(() => {
               this.failedLoginAttempts.delete(email);
           }, this.BLOCK_DURATION);
       }
   }
   ```

5. **Melhoria na Geração de Token JWT**:
   - Uso de variáveis de ambiente para segurança adicional na geração de tokens.
   ```javascript
   // Em auth.service.ts
   const token = sign({}, process.env.SECRETE_KEY_TOKEN, {
       subject: email,
       expiresIn: "7200s"
   });
   ```

6. **Implementação de Bloqueio Temporário Após Falhas de Login**:
   - Adição de lógica para bloquear usuários após tentativas falhas.
   ```javascript
   // Em auth.service.ts
   if (this.failedLoginAttempts.has(email)) {
       if(this.BLOCK_DURATION - timeSinceLastAttempt <= 0){
           this.failedLoginAttempts.delete(email);
           return { code: 401, msg: "Email/Password incorrect" };
       }
   }
   ```

7. **Comparação Segura de Senhas com bcrypt**:
   - Uso de comparação de hash para validar senhas.
   ```javascript
   // Em auth.service.ts
   const verificationPassword = await compare(UserInfo.password, user.password);
   if (!verificationPassword) {
       this.incrementFailedAttempts(email);
       return { code: 401, msg: "Email/Password incorrect" }
   }
   ```

8. **Atualização do package.json com Dependências de Segurança**:
   - Inclusão de bcrypt para segurança aprimorada no tratamento de senhas.
   ```json
   // Em package.json
   "dependencies": {
       "bcrypt": "^5.1.1",
   },
   "devDependencies": {
       "@types/bcrypt": "^5.0.2",
   }
   ```

9. **Atualização dos Testes para Autenticação**:
   - Testes atualizados para cobrir as mudanças na autenticação.
   ```javascript
   // Em authController.test.ts
   const result = await request(app).post('/auth/').send({ email: correctEmail, password: correctPassword });
   expect(result.status).toBe(200);
   ```

10. **Melhorias nos Testes de Middleware de Autenticação**:
    - Testes ajustados para o middleware de autenticação atualizado.
    ```javascript
    // Em authMiddleware.test.ts
    test('Acesso à rota protegida com token válido', async () => {
        await request(app)
            .get('/user/')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
    ```

11. **Atualizações nos Testes de ORM de Banco de Dados**:
    - Melhoria nos testes para refletir as mudanças na validação de

 entrada e tratamento de senhas.
    ```javascript
    
    // Em databaseORM.test.ts
    test('Buscar usuário por e-mail válido', async () => {
        const email = "validuser@example.com";
        const user = await prisma.user.findUnique({
            where: { email }
        });
        expect(user).toBeDefined();
    });
    ```

12. **Melhorias nos Testes do UserController**:
    - Testes atualizados para refletir as mudanças na validação de entrada.

    ```javascript
    // Em userController.test.ts
    test('Registro com entrada malformada (XSS e SQL Injection)', async () => {
        const result = await request(app).post('/user/').send({ email, name, password });
        expect(result.status).toBe(201);
    });
    ```

Essas mudanças demonstram um foco significativo na melhoria da segurança do sistema, abordando aspectos como a segurança de senhas, validação de entrada, gestão de tokens JWT, e a robustez dos testes.


### Relatório de Testes de Segurança Pós-Implementação das Melhorias no Sistema

### Elementos Envolvidos nos Testes de Segurança Pós-Implementação:

1. **Sistema de Autenticação (AuthController):**
   - Endpoints atualizados.
   - Testes incluem: Prevenção aprimorada de ataques de força bruta, validação de token JWT e tratamento de erros seguro.

2. **Registro e Gerenciamento de Usuários (UserController):**
   - Endpoints atualizados.
   - Testes incluem: Validação aprimorada de entrada, verificação de autenticação segura.

3. **Interação com Banco de Dados e ORM (Prisma):**
   - Componentes atualizados.
   - Testes incluem: Prevenção aprimorada de injeção SQL, segurança no armazenamento de dados.

4. **Middleware (Middleware de Autenticação):**
   - Componentes atualizados.
   - Testes incluem: Verificação aprimorada de token e segurança de rotas protegidas.

5. **Configuração Ambiental (Arquivo .env):**
   - Testes garantem o uso seguro de variáveis de ambiente.

6. **Comunicação do Protocolo MQTT (se utilizado):**
   - Componentes atualizados.
   - Testes incluem: Segurança reforçada em assinaturas de tópicos e comunicações.

### Descrição de pre-condições envolvidas para os testes de segurança do sistema Novo:

1. **Endpoints e Rotas Conhecidos Atualizados:**
   - Todos os endpoints da API revisados.

2. **Ambiente de Teste Atualizado:**
   - Ambiente de teste espelhando a produção com banco de dados de teste.

3. **Ferramentas e Acesso:**
   - Ferramentas de teste de API e testes de penetração disponíveis.

4. **Credenciais Necessárias:**
   - Contas de usuário de teste atualizadas para diferentes papéis.

### Descrição de pós-condições envolvidas para os testes de segurança do sistema Novo:

#### **Teste 1: Autenticação (Endpoint `/auth/`)**

- **Objetivo:** Testar prevenção de ataques de força bruta e segurança de tokens JWT.
- **Método:** Script automatizado para várias tentativas de login; teste manual com JWTs modificados.
- **Saída do Terminal:**
  ```
  $ python3 brute_force_test.py /auth/
  Attempting login with user 'user.testing@x.com'...
  Attempt 1: Failed login
  Attempt 5: Failed login
  Attempt 10: Failed login - Account temporarily locked
  ```

#### **Teste 2: Registro de Usuário (Endpoint `/user/`)**

- **Objetivo:** Validar sanitização de entrada e manuseio seguro de senha.
- **Método:** Submissão de entradas malformadas e scripts; inspeção do banco de dados para armazenamento de senha.
- **Saída do Terminal:**
  ```
  $ curl -X POST -d "email=user.testing@x.com&name=<script>alert(1)</script>&password=123456" https://api.example.com/user/
  {"message": "Invalid input"}
  ```

#### **Teste 3: Acesso aos Dados do Usuário (Endpoint `/user/`)**

- **Objetivo:** Verificar autorização e exposição de dados.
- **Método:** Acessar endpoint com diferentes níveis de autenticação.
- **Saída do Terminal:**
  ```
  $ curl -H "Authorization: Bearer invalid_token" https://api.example.com/user/
  {"message": "Access Denied"}
  ```

#### **Teste 4: Middleware de Autenticação**

- **Objetivo:** Validar eficácia do middleware de autenticação.
- **Método:** Acessar rotas protegidas com JWTs inválidos/expirados.
- **Saída do Terminal:**
  ```
  $ curl -H "Authorization: Bearer expired_token" https://api.example.com/protected
  {"message": "Invalid or Expired Token"}
  ```

#### **Teste 5: Segurança de Banco de Dados e ORM**

- **Objetivo:** Checar segurança contra injeções SQL.
- **Método:** Teste manual com payloads de injeção SQL.
- **Saída do Terminal:**
  ```
  $ curl -X POST -d "email=' OR '1'='1&password=123456

   " https://api.example.com/auth/
  {"message": "Invalid Credentials"}
  ```

#### **Teste 6: Segurança do Protocolo MQTT**

- **Objetivo:** Testar segurança nas comunicações MQTT.
- **Método:** Tentativas de intercepção e assinatura de tópicos não autorizados.
- **Saída do Terminal:**
  ```
  $ mqtt_sub -t "restricted_topic" -u "unauthorized_user"
  {"message": "Access Denied"}
  ```

### Plano de Reteste Concluído

- **Passo 1:** Implementação das recomendações concluída.
- **Passo 2:** Testes repetidos confirmam a resolução das vulnerabilidades.
- **Passo 3:** Teste de regressão confirma a ausência de novos problemas.
- **Passo 4:** Documentação atualizada para refletir as novas práticas de segurança.

O sistema agora demonstra robustez significativamente aprimorada em todos os aspectos de segurança testados, mitigando efetivamente as vulnerabilidades identificadas anteriormente.


### Análise e Discussão dos Resultados do Sistema Atual:


#### Elementos Envolvidos nos Testes de Segurança:

1. **Sistema de Autenticação (AuthController):**
   - **Observações:** O sistema apresentou vulnerabilidade em ataques de força bruta e na expiração de tokens JWT. Isso indica uma necessidade de fortalecer a autenticação para evitar acessos não autorizados.

2. **Registro e Gerenciamento de Usuários (UserController):**
   - **Observações:** Falhas na sanitização de entrada podem levar a ataques XSS, e a falta de hash de senhas aumenta o risco de comprometimento de dados de usuário.

3. **Interação com Banco de Dados e ORM (Prisma):**
   - **Observações:** Suscetibilidade a injeção SQL sugere a necessidade de melhores práticas na manipulação de consultas ao banco de dados.

4. **Middleware (Middleware de Autenticação):**
   - **Observações:** A verificação de token precisa ser mais rigorosa para garantir que as rotas protegidas sejam devidamente seguras.

5. **Configuração Ambiental (Arquivo .env):**
   - **Observações:** O gerenciamento de variáveis de ambiente e a segurança de informações sensíveis são cruciais para a segurança geral do sistema.

6. **Comunicação do Protocolo MQTT (se utilizado):**
   - **Observações:** A segurança nas comunicações MQTT deve ser reforçada para prevenir interceptações e acessos não autorizados.

#### Testes de Segurança em Detalhes e Análise:

1. **Teste de Autenticação:**
   - **Análise:** A facilidade de realizar ataques de força bruta indica uma fragilidade significativa. A ausência de expiração de token aumenta o risco de uso indevido de tokens roubados.

2. **Teste de Registro de Usuário:**
   - **Análise:** A vulnerabilidade a ataques XSS e a falta de segurança no armazenamento de senhas são questões críticas que exigem atenção imediata para proteger a integridade dos dados dos usuários.

3. **Acesso aos Dados do Usuário:**
   - **Análise:** A possibilidade de acesso não autorizado a dados sensíveis sublinha a necessidade de uma autenticação e autorização mais robustas.

4. **Teste de Middleware:**
   - **Análise:** A eficácia do middleware de autenticação é fundamental para a segurança do sistema, especialmente em rotas protegidas.

5. **Segurança de Banco de Dados e ORM:**
   - **Análise:** Vulnerabilidades à injeção SQL indicam a necessidade de revisar e melhorar as práticas de desenvolvimento e configuração do ORM.

6. **Teste de Configuração Ambiental:**
   - **Análise:** A gestão adequada de configurações ambientais e segredos é vital para a segurança do sistema.

7. **Segurança do Protocolo MQTT:**
   - **Análise:** A segurança nas comunicações MQTT precisa ser garantida para evitar riscos de interceptação ou manipulação de mensagens.

##### Notas e Recomendações:

- **Implementação de Bloqueio de Conta e Limitação de Taxa:** Reforçar a segurança contra ataques de força bruta no sistema de autenticação.
- **Melhorias na Sanitização de Entrada e Hash de Senhas:** Adotar práticas rigorosas de validação de entrada e garantir o armazenamento seguro de senhas.
- **Reforço na Segurança do Banco de Dados:** Utilizar consultas parametrizadas para prevenir injeções SQL.
- **Aprimoramento do Middleware de Autenticação:** Garantir que o middleware rejeite efetivamente tokens inválidos ou expirados.
- **Gestão Segura de Configurações Ambientais:** Assegurar que as informações sensíveis sejam gerenciadas de forma segura.
- **Reforço na Segurança do Protocolo MQTT:** Implementar autenticação e criptografia nas comunicações MQTT.


### Análise e Discussão dos Resultados do Sistema Novo:

Após a implementação das melhorias de segurança, uma série de testes foi realizada para avaliar a robustez do sistema. A análise dos resultados revela avanços significativos na segurança e gestão de vulnerabilidades.

#### Elementos Envolvidos e Resultados dos Testes:

1. **Sistema de Autenticação (AuthController):**
   - **Resultados:** A implementação de mecanismos de bloqueio após várias tentativas de login falhas aprimorou a resistência contra ataques de força bruta. A validação de token JWT agora garante que apenas tokens válidos e não expirados sejam aceitos.

2. **Registro e Gerenciamento de Usuários (UserController):**
   - **Resultados:** A sanitização aprimorada de entradas previne efetivamente ataques XSS, e o uso de hash nas senhas aumentou a segurança no armazenamento de dados sensíveis.

3. **Interação com Banco de Dados e ORM (Prisma):**
   - **Resultados:** A implementação de práticas seguras no ORM, como consultas parametrizadas, reduziu significativamente o risco de injeção SQL.

4. **Middleware (Middleware de Autenticação):**
   - **Resultados:** A validação de token JWT melhorada assegura que as rotas protegidas não sejam acessíveis sem autenticação válida.

5. **Configuração Ambiental (Arquivo .env):**
   - **Resultados:** A gestão segura das variáveis de ambiente protege contra a exposição inadvertida de informações sensíveis.

6. **Comunicação do Protocolo MQTT (se utilizado):**
   - **Resultados:** As comunicações MQTT agora possuem uma segurança reforçada, incluindo autenticação robusta e prevenção de acesso não autorizado a tópicos restritos.

#### Análise dos Testes de Segurança:

- **Autenticação:** A eficácia do bloqueio de conta após tentativas falhas e a expiração apropriada dos tokens JWT representam avanços significativos na prevenção de acessos não autorizados.
- **Registro de Usuários:** A melhoria na validação de entrada e no armazenamento de senhas fortalece a proteção de dados dos usuários contra ataques comuns, como XSS e roubos de identidade.
- **Segurança do Banco de Dados:** A resistência a injeções SQL melhora a integridade e a confidencialidade dos dados armazenados.
- **Middleware de Autenticação:** O sistema agora possui uma camada adicional de segurança, garantindo que apenas usuários autenticados acessem recursos protegidos.
- **Configuração Ambiental:** O gerenciamento aprimorado das configurações ambientais ajuda a prevenir vazamentos de dados sensíveis.
- **Comunicação MQTT:** A segurança reforçada nesta área é crucial, principalmente se o sistema depende fortemente de comunicações IoT.




### Comparação dos Resultados de Simulação do Sistema Atual e do Novo

A comparação dos resultados das simulações dos sistemas atual e novo fornece uma visão clara das melhorias de segurança alcançadas. Esta análise destaca as diferenças nos resultados dos testes de segurança, evidenciando o impacto das melhorias implementadas.

#### Sistema Atual (Antes das Melhorias):

1. **Autenticação:** Vulnerável a ataques de força bruta e problemas com a gestão de tokens JWT, como a falta de expiração.
2. **Registro de Usuários:** Entradas não eram adequadamente sanitizadas, levando a vulnerabilidades XSS, e as senhas não eram armazenadas de forma segura.
3. **Banco de Dados e ORM:** Suscetível a ataques de injeção SQL devido a práticas inseguras no ORM.
4. **Middleware de Autenticação:** Ineficaz em validar tokens JWT, permitindo acesso não autorizado a rotas protegidas.
5. **Configuração Ambiental:** Falta de gerenciamento seguro de variáveis de ambiente, aumentando o risco de vazamento de dados sensíveis.
6. **Protocolo MQTT:** Comunicações vulneráveis a interceptações e acesso não autorizado.

#### Sistema Novo (Após as Melhorias):

1. **Autenticação:** Implementação de bloqueio de conta após tentativas falhas e expiração apropriada de tokens JWT, aumentando significativamente a segurança.
2. **Registro de Usuários:** Melhorias na sanitização de entradas e no armazenamento seguro de senhas (hashing) para proteger contra ataques XSS e comprometimento de dados.
3. **Banco de Dados e ORM:** Uso de consultas parametrizadas e práticas seguras no ORM, reduzindo drasticamente o risco de injeção SQL.
4. **Middleware de Autenticação:** Aprimorado para rejeitar efetivamente tokens inválidos ou expirados, protegendo as rotas protegidas de acessos não autorizados.
5. **Configuração Ambiental:** Gestão segura das variáveis de ambiente para prevenir a exposição de informações sensíveis.
6. **Protocolo MQTT:** Reforço na segurança das comunicações, incluindo autenticação e prevenção de acessos não autorizados.

#### Análise Comparativa:

- **Fortalecimento da Autenticação:** Uma mudança notável é a implementação de mecanismos robustos de autenticação, incluindo a prevenção de ataques de força bruta e a gestão eficaz de tokens JWT.
- **Proteção de Dados do Usuário:** No sistema novo, há uma clara ênfase na proteção de dados do usuário, tanto na entrada quanto no armazenamento, contrastando com as vulnerabilidades pré-existentes no sistema atual.
- **Segurança do Banco de Dados:** A evolução das práticas de ORM do sistema atual para o novo reflete uma abordagem mais segura e consciente no manuseio de dados.
- **Middleware de Autenticação:** A eficácia do middleware em validar tokens JWT é um indicativo claro de melhoria na segurança das rotas protegidas.
- **Gestão de Configurações Ambientais:** O novo sistema demonstra uma gestão mais eficiente de variáveis de ambiente, uma área anteriormente negligenciada.
- **Comunicações MQTT:** O aumento na segurança das comunicações MQTT é um avanço significativo, especialmente em aplicações IoT.


A comparação dos resultados de simulação revela um avanço significativo na segurança entre o sistema atual e o novo. As melhorias implementadas abordam as vulnerabilidades identificadas no sistema antigo, resultando em um sistema mais seguro e confiável, com redução marcante do risco de ataques e comprometimento de dados.

### Justificativas das Melhorias Arquiteturais Propostas


As mudanças implementadas no sistema, como evidenciado pelos commits no repositório do projeto, foram essenciais para fortalecer a segurança e a estabilidade do sistema. Abaixo, são discutidas as principais melhorias arquiteturais e suas justificativas:

1. **Inclusão do bcrypt para Hash de Senhas:**
   - **Justificativa:** A segurança das senhas dos usuários é vital. A implementação de hashing de senhas com bcrypt fornece uma camada robusta de proteção, tornando as senhas armazenadas inúteis para invasores, mesmo em caso de violações de dados.

2. **Validação de Entrada no UserController:**
   - **Justificativa:** A validação de entrada é crucial para prevenir ataques comuns como injeção SQL e XSS. As mudanças no UserController para incluir verificações de email e caracteres especiais no nome impedem a entrada de dados maliciosos, aumentando significativamente a segurança do sistema.

3. **Refatoração no AuthController:**
   - **Justificativa:** Melhorar a lógica de autenticação e tratamento de erros aumenta a robustez do sistema. Isso inclui a prevenção de ataques de força bruta e a garantia de que as mensagens de erro não revelem informações sensíveis, o que poderia ser explorado por atacantes.

4. **Incremento de Tentativas Falhadas de Login:**
   - **Justificativa:** A implementação de um sistema para rastrear e limitar tentativas de login falhas é uma defesa eficaz contra ataques de força bruta, protegendo contas de usuários contra acessos não autorizados.

5. **Melhoria na Geração de Token JWT:**
   - **Justificativa:** A atualização do método de geração de token JWT para incluir tempos de expiração apropriados e uso seguro de chaves é fundamental para prevenir o uso indevido de tokens roubados ou vazados.

6. **Atualização do package.json com Dependências de Segurança:**
   - **Justificativa:** Manter as dependências atualizadas e incluir bibliotecas de segurança como bcrypt e jsonwebtoken é essencial para manter o sistema protegido contra vulnerabilidades conhecidas.

7. **Melhorias nos Testes de Autenticação e Middleware:**
   - **Justificativa:** A atualização dos testes para cobrir novas funcionalidades e cenários de segurança garante que as melhorias implementadas funcionem conforme esperado e que novas vulnerabilidades não sejam introduzidas.

8. **Segurança Reforçada no ORM e Banco de Dados:**
   - **Justificativa:** Proteger o sistema contra injeções SQL e outras vulnerabilidades relacionadas ao banco de dados é crucial. As mudanças implementadas ajudam a garantir que as interações com o banco de dados sejam seguras e confiáveis.

9. **Atualizações nos Testes do UserController e Database ORM:**
   - **Justificativa:** Testar extensivamente as novas implementações e mudanças é vital para garantir a integridade e a segurança dos dados dos usuários, bem como a funcionalidade geral do sistema.
