# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
  <img src="https://i.imgur.com/aIfBsxk.png" alt="Inteli logo" border="0" width="312px">
</p>

# Proposta de Arquitetura de Software

## Grupo 3

### 🚀 Integrantes

- <a href="https://www.linkedin.com/in/abner-silva-barbosa-8a3542225/">Abner Silva</a>
- <a href="https://www.linkedin.com/in/ana-clara-loureiro-muller-zaidan/">Ana Clara Zaidan</a>
- <a href="https://www.linkedin.com/in/beatriz-hirasaki-leite-b2261923a/">Beatriz Hirasaki</a>
- <a href="https://www.linkedin.com/in/felipe-gomes-dev/">Felipe Santos</a>
- <a href="https://www.linkedin.com/in/luiz-k-alencar/">Luiz Alencar</a>
- <a href="https://www.linkedin.com/in/stefano-tinelli-b59515270/">Stefano Tinelli</a>

## 🔍 Sumário

- [Descrição](#descrição)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Documentação do sistema atual](#-documentação-do-sistema-atual)
- [Documentação do sistema novo](#-documentação-do-sistema-novo)
- [Documentação da simulação](#-documentação-da-simulação)
- [Instalação](#-instalação)
  - [Tecnologias](#tecnologias)
  - [Implementações](#implementações)
  - [Demo](#demo)
- [Histórico de lançamentos](#-histórico-de-lançamentos)
- [Licença/License](#-licençalicense)
- [Referências](#-referências)

## 📜 Descrição

A solução de arquitetura desenvolvida para a Meta foi projetada para aprimorar requisitos funcionais específicos, visando proporcionar uma abordagem inovadora para obter informações atualizadas sobre tópicos relevantes para empresas. Ao integrar interações de voz e texto, os usuários podem realizar buscas precisas sobre as discussões das empresas em relação a temas específicos. Por exemplo, é possível explorar o que empresas do setor financeiro estão debatendo sobre otimização e planejamento financeiro. Além disso, o robusto mecanismo de IA por trás dessa solução é capaz de compreender não apenas as perspectivas da Meta, mas também de outras empresas de tecnologia sobre esses temas, identificando quais tecnologias da Meta estão relacionadas, oferecendo assim um acesso conveniente a insights de mercado, tendências e informações competitivas.

**Principais melhorias da arquitetura:**

- **Acurácia do modelo:** implementação do modelo KNN revisado, observamos uma precisão significativa, alcançando 93% na identificação de padrões e tendências nos dados empresariais analisados.

- **Disponibilidade:** Garantimos uma disponibilidade contínua da plataforma, utilizando tecnologias de fila e realizando a nova arquitetura, assegurando 95.9% de uptime para os usuários, inclusive em períodos de alta demanda.
- **Segurança:** Implementamos camadas adicionais de segurança para proteger os dados dos usuários, incluindo criptografia, protocolos de segurança, rastreabilidade de ações de possíveis ataques.

## 📁 Estrutura de pastas

- 📂 **Projeto3M8**
  - 📂 **[Apresentações](Apresentações/)**
    - <a href="https://github.com/2022M2T3/Projeto4/blob/main/documentos/WAD%20-%20Yamaha%20Planning%20System.pdf"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px">slides-sprint1.pptx.pdf</a>
    - <a href="https://github.com/2022M2T3/Projeto4/blob/main/documentos/WAD%20-%20Yamaha%20Planning%20System.pdf"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px">slides-sprint2.pptx.pdf</a>
    - <a href="https://github.com/2022M2T3/Projeto4/blob/main/documentos/WAD%20-%20Yamaha%20Planning%20System.pdf"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px">slides-sprint3.pptx.pdf</a>
    - <a href="https://github.com/2022M2T3/Projeto4/blob/main/documentos/WAD%20-%20Yamaha%20Planning%20System.pdf"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px">slides-sprint4.pptx.pdf</a>
    - <a href="https://github.com/2022M2T3/Projeto4/blob/main/documentos/WAD%20-%20Yamaha%20Planning%20System.pdf"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px">slides-sprint5.pptx.pdf</a>
  - 📁 **[Atual](Atual/)**
    - 📄 README.md
  - 📁 **[Novo](Novo/)**
    - 📄 README.md
  - 📁 **[Implementações](Implementações/)**
    - 📂 **[RNF-acuracia](Implementações/RNF-acuracia)**
    - 📂 **[RNF-disponibilidade](Implementações/RNF-disponibilidade)**
    - 📂 **[RNF-segurança](Implementações/RNF-segurança)**
  - 📁 **[Simulação](Simulação/)**
    - 📂 **[RNF1](Simulação/RNF1)**
    - 📂 **[RNF2](Simulação/RNF2)**
    - 📂 **[RNF3](Simulação/RNF3)**
    - 📂 **[assets](Simulação/assets)**
    - 📄 README.md
  - 📁 **[demo](demo/)**
    - 📂 **[backend-node](demo/backend-node)**
    - 📂 **[backend-python](demo/backend-python)**
    - 📂 **[frontend](demo/frontend)**
    - 📄 [README.md](demo/README.md)
  - 📄 README.md

<br>

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>README.md</b>: Arquivos que possuem a documentação daquela pasta, logo caso queira consultar algo de documentação saiba que os README são as documentações referente ao projeto.

- <b>Apresentações</b>: aqui estão os arquivos em formato de pdf das apresentações de cada sprint, caso queira dar uma olhada mais afundo na evolução do projeto.

- <b>Atual</b>: Aqui você encontrara a documentação referente a parte do sistema atual da Meta, com dados e pesquisas voltadas para área de negócios e também os requisitos do sistema Atual.

- <b>Novo</b>: Aqui você encontrara a documentação referente a parte do sistema novo que nós desenvolvemos para melhorar ou resolver problemas da arquitetura atual, possuindo novos requisitos.

- <b>Implementações</b>: Aqui você encontra a implementação ou seja, demonstrações do sistema novo, caso queira ser usado para testes ou para visualizar que a nova arquitetura tem seus pontos fortes

- <b>Simulação</b>: Aqui você encontra a simulação do sistema novo, ou seja, como seria a reposta ou os resultados caso fosse o sistema novo.

- <b>demo</b>: Aqui você encontra uma pequena demostração de uma aplicação onde é possível ter a classificação de uma compra feita pela Meta.

Caso tenha alguma dúvida consultar alguns dos alunos ou até mesmo o Inteli - Instituto de tecnologia e liderança.

## 📄 Documentação do sistema atual

- <a href="./Atual/README.md#11-busines-drivers"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px"> README.md</a>

## 📄 Documentação do sistema novo

- <a href="./Novo/README.md#elicitação-e-análise-de-requisitos"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px"> README.md</a>

## 📄 Documentação da simulação

- <a href="./Simulacao/README.md#sprint-1"><img src="https://user-images.githubusercontent.com/99209356/174968401-abc5cae1-7a1e-4f06-aca6-c859c993c038.svg" width="18px" height="18px"> README.md</a>

## 🔧 Instalação

Para a instalação desse projeto, é necessário ter alguns recursos instalados na máquina que irá executar. Nota-se que além das instalações necessárias, também destaca-se que é relevante a versão de cada uma dessas tecnologias, haja vista que podem ocorrer falhas na execução, devido a configuração do projeto.

### Tecnologias

- Python 3.9.6
- Docker 20.10.8
- TypeScript 4.3.5
- Node 18.17.6
- K6 0.48.0
- Kafka 3.6.1

### Implementações

- Passo a Passo de como inicializar as implementações localmente.

No caso so nosso projeto nós possuímos 3 implementações diferentes, nesse caso temos a implementação de RNF de Acurácia, Disponibilidade e Segurança, onde cada um representa uma pequena implementação do requisito em si.

#### Acurácia:

No caso da Acurácia é necessário ter uma base de dados já tratada dento da pasta modeloKNN/data, também é necessário ter o modelo em .pkl na pasta modeloKNN/

```bash
  git clone https://github.com/2023M8T3Inteli/Grupo-03.git
  cd Grupo-3/Implementações/RNF-acuracia

  docker compose up
```

Após isso acredito que já possa realizar o teste da implementação, caso queira ver se a api está rodando basta dar um GET na rota http://localhost:5000/, retornado para o usuário um "ok" status:200

#### Disponibilidade:

No caso da Disponibilidade nós estamos utilizando o kafka para fazer o processo de mensageira, então para se utilizar e testar o nível de disponibilidade dos dois sistemas, é necessário criar um arquivo .env dentro das pastas backend, onde pode ser usado os mesmo valores do .env.example

<strong>Atual:</strong>

```bash
  git clone https://github.com/2023M8T3Inteli/Grupo-03.git
  cd Grupo-3/Implementações/RNF-disponibilidade/disponibilidade-atual

  # Lembre de criar o .env como falado acima para executar o projeto.
  docker compose up

  # Para rodar o teste de disponibilidade deve ser seguido os próximos passos:

  # Precisa ter instalado o K6 na sua maquina:
  # https://k6.io/docs/get-started/installation/

  cd Grupo-3/Implementações/RNF-disponibilidade/disponibilidade-atual/test

  k6 run index.js
```

<strong>Novo:</strong>

```bash
  git clone https://github.com/2023M8T3Inteli/Grupo-03.git
  cd Grupo-3/Implementações/RNF-disponibilidade/disponibilidade-novo-kafka

  # Lembre de criar o .env como falado acima para executar o projeto.
  docker compose up

  # Para rodar o teste de disponibilidade deve ser seguido os próximos passos:

  # Precisa ter instalado o K6 na sua maquina:
  # https://k6.io/docs/get-started/installation/

  cd Grupo-3/Implementações/RNF-disponibilidade/disponibilidade-novo-kafka/backend/src/k6

  k6 run k6-test.js
```

Seguindo esses passos você deve ver o resultado de cada um das implementações e tirar as suas conclusões sobre a diferenças do sistema.

#### Segurança:

No caso da Segurança, é necessário ter um .env na root do projeto de RNF-segurança, para assim conseguir fazer conexão com o banco além de configurar variáveis de segurança, nesse caso é possível visualizar um exemplo do .env me um arquivo chamado .env.example que deve ser seguido.

```bash
  git clone https://github.com/2023M8T3Inteli/Grupo-03.git
  cd Grupo-3/Implementações/RNF-segurança

  # Lembre de criar o .env como falado acima para executar o projeto.
  docker compose up
```

Para confirmar se deu tudo certo, bastar dar um GET no http://localhost:3001/, recebendo um retorno com status 200

### Demo

- Passo a Passo de como inicializar a demo localmente

Para utilizar as funcionalidades dessa demo é necessário ter tais items dentro das pastas do backend-python, necessário ter uma base de dados já tratada dento da pasta modeloKNN/data, também é necessário ter o modelo em .pkl na pasta modeloKNN/

Caso tenha alguma dúvida entrar em contato com os responsáveis do projeto construído.

```bash
  git clone https://github.com/2023M8T3Inteli/Grupo-03.git
  cd Grupo-3/demo

  docker compose up
```

Em seguida já sera possível acessar o frontend pela url http://localhost:3000/. Para mais informações entrar no readme dentro da pasta Demo.

## 🗃 Histórico de Lançamentos

**1.0 — 16/10/2023 (Sprint I)**

- Compreensão de Negócios

- Elicitação de Requisitos Não Funcionais (RNF)

- Análise e preparação de dados

- Simulações v01

**2.0 — 30/10/2023 (Sprint II)**

- Avaliação do sistema atual (tecnologias, arquitetura, etc.)

- Proposta de Arquitetura 2.0 (especificação e melhorias)

- Explorar pontos de entrada de IA e ML

- Simulações de componentes e serviços

**3.0 — 13/11/2023 (Sprint III)**

- Desenvolvimento de testes não funcionais

- Implementação de mecanismos de arquitetura

- Desenvolvimento orientado a testes (TDD)

**4.0 — 27/11/2023 (Sprint IV)**

- Melhorias em Aprendizado de Máquina (normalização de dados, seleção de características, etc.)

- Análise profunda dos resultados

- Análise de compensação de arquitetura

**5.0 — 11/12/2023 (Sprint V)**

- Análise de classificação de precisão

- Testes com outras regiões

- Relatório final

## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2023M8T3Inteli/Grupo-03">Grupo 3</a> by 
<a href="https://www.inteli.edu.br/">
  Inteli
</a>,
<a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/abner-silva-barbosa-8a3542225/"
>
  Abner Silva
</a>,
<a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/ana-clara-loureiro-muller-zaidan/"
>
  Ana Clara Zaidan
</a>,
<a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/beatriz-hirasaki-leite-b2261923a/"
>
  Beatriz Hirasaki
</a>,
<a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/felipe-gomes-dev/"
>
  Felipe Santos
</a>,
<a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/luiz-k-alencar/"
> Luiz Alencar
</a>,
<a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/stefano-tinelli-b59515270/"
>
Stefano Tinelli
</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Node. Encontre respostas rapidamente com documentos e soluções utilizando a tecnologia Node. Disponível em: https://nodejs.org/docs/latest/api/ . Acesso em: out. 2023.

Python. Encontre respostas rapidamente com documentos e soluções utilizando a linguagem de programação Python. Disponível em: https://www.python.org/doc/ . Acesso em: out. 2023.

Docker. Encontre respostas rapidamente com documentos e soluções utilizando a tecnologia docker. Disponível em: https://docs.docker.com/ . Acesso em: out. 2023.

Kafka. Encontre respostas rapidamente com documentos e soluções utilizando a tecnologia kafka. Disponível em: https://kafka.apache.org/documentation/. Acesso em: nov. 2023.

K6. Encontre respostas rapidamente com documentos e soluções utilizando a tecnologia K6. Disponível em: href="https://k6.io/docs/ . Acesso em: nov. 2023.

Design System Meta. Design da demo teve como base para interface encontrados na documentação da propria Meta. Disponível em: href="https://design.facebook.com/toolsandresources/" . Acesso em: nov. 2023.
