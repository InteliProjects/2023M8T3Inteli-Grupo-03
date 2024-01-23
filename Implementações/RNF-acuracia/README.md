# (Sprint 3) Implementação dos Mecanismos Arquiteturais

## 3.1.a) Especificação e Codificação dos Testes Não Funcionais dos Componentes (TDD)

Foi desenvolvido um modelo de classificação de KNN (K-nearest neighbors), que faz a classificação do 'Level 2' de itens de compras da Meta. O modelo foi treinado a partir de dados da NORAM - database que contém 474.230 dados-, e, para isso, foram utilizados 100.000 dados aleatórios, em que 70% foram utilizados para o treinamento (70.000 dados), e 30% para teste (30.000 dados).

O requisito não funcional de "Acurácia" foi medido apartir desse modelo, que performou com 72% de acurácia de treino, e 69% de acurácia de teste.

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.12.09.png">

Além da separação do conjunto de testes de 30.000 dados, foram realizados testes isolados com 10 dados novos (que não estão presentes no conjunto de treino e teste anteriores), para possibilitar uma análise mais direta dos inputs e outputs do modelo, além de uma comparação entre o autput esperado (Level 2 conhecido) e o retornado. Para isso, foi criada uma pipeline de teste, que aplica o pré processamento necessário, e aplica o modelo em cima dos novos dados.

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.12.21.png">

A acurácia de testes calculada entre as 10 novas predições foi de 80%, e, visto que é um conjunto de dados muito pequeno comparado ao total, a acurácia foi relativamente próxima ao esperado, comparando ao cenário de treino (72%) e testes(69%). Nesse sentido, é importante enfatizar que, quanto mais próxima a acurácia de treino da de testes, mais confiável é o modelo, visto que isso mostra que não ouve um over-fitting, por exemplo.

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.12.39.png">

Foi definido como critério de aceitação de do modelo de classificação novo (proposto) uma acurácia de no mínimo 90%, que ainda não foi atingida com os testes realizados.

### Parâmetros de entrada e saída

Para a pipeline de testes definida, são considerados os seguintes parâmetros:

- Parâmetro de entrada: um (ou mais) itens de compra da meta, que inclui as seguintes informações: 'Supplier Name', 'Normalized Supplier Name', 'Parent Supplier Name', 'Region', 'Country Name', 'Strategic Region', 'Requestor Name','Preparer Name', 'Level 1', 'Level 2', 'Level 3', 'Business Unit', 'Legal Entity', 'Cost Center', 'Cost Center (Base Level)','Cost Center (Level 4)', 'Cost  Center (Level 5)', 'Cost Center (Level 6)', 'GL Desc (Level 4)', 'GL Desc (Level 5)', 'GL Desc (Level 6)', 'Invoice ID', 'Invoice Number', 'Invoice Source', 'GL Description', 'Product', 'Project', 'Month, Day, Year of Payment Date', 'PO Number', 'Amout USD';

- Parâmetro de saída: o 'Level 2' gerado pelo modelo de predição (a categoria).

### Cenários de teste

critério de sucesso: classificação correta do Level 2.

<b> Cenário de falha </b>
- entrada: dados sobre um item de compra
- saída esperada: 'Talent Management' (categoria correta)
- saída: Level 2 = 'Software & Support' (categoria incorreta)

<b> Cenário de sucesso </b>
- entrada: dados sobre um item de compra
- saída esperada: 'Talent Management' (categoria correta)
- saída: 'Talent Management' (categoria correta)

## 3.1.b) Especificação e Codificação dos Componentes que Compõem os Mecanismos Indicados na Tática

### Componentes utilizados e arquitetura especificada

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.12.58.png">

A imagem acima representa, de forma simplificada, o fluxo proposto pela nossa arquitetura do sistema novo anteriormente. Ela está diretamente relacionada com a implementação proposta para o requisito de acurácia, e o único componente (novo) proposto por essa nova implementação seria a forma de armazenamento dos dados, que está descrita abaixo.

Os componentes utilizados para essa parte específica da arquitetura proposta estão diretamente relacionados ao processo de classificação de um item de compra, presente na arquitetura proposta para o sistema novo. Logo, os componentes são: 
- Fila que recebe novos dados de compra, e armazena e organiza esses dados para enviá-los para a pipeline de tratamento, proporcioinando uma grande eficiência;
- Pipeline de tratamento e pré-processamento de dados, que prepara os dados e os envia para o modelo de classificação;
- um modelo de classificação KNN treinado com base em 70.000 dados da NORAM (América do Norte), atualmente com 72% de acurácia de treino, e 69% de acurácia de teste;
- Banco de dados SQL, que irá armazenar os itens classificados.
- Curadoria humana, que será acionada no processo de aprendizagem retreinamento constante do modelo, a partir dos resultados obtidos e do nível de acurácia. Porém, ainda não foi implementada.

### Instalação dos componentes
Atualmente, para instalar e executar os componentes codificados, é necessário:
- Fazer download da pasta "modeloKNN" ("Implementações > RNF-acuracia > modeloKNN)
- Rodar o notebook "modelo.ipynb", que contém todas as instalações e importações necessárias para executar a pipeline de tratamento e o modelo de classificação.

### Proposta de processo de deploy

Para realizar o processo de deploy do nosso modelo de classificação podemos seguir esses passos:

1. Preparação do modelo de classificação: após a preparação do modelo de classificação (no nosso caso foi o modelo KNN), devemos treinar e salvar esse modelo como um arquivo pickle ou com um formato que preserve o modelo e suas configurações;

2. Criação do serviço de fila: é preciso configurar uma solução de fila para receber os dados do nosso sistema, isso pode ser feito utilizando, por exemplo, o Apache Kafka.

3. Criação do Dockerfile: essa parte é necessária para construir a imagem do contêiner, para isso podemos usar como exemplo básico o seguinte passo a passo:

     3.1 Usar uma imagem base adequada
     FROM python:3.9

     3.2 Copiar os arquivos necessários para o contêiner
     COPY model.pkl /app/model.pkl
        ou
     COPY your_python_script.py /app/your_python_script.py

     3.3 Instalar as dependências
   
     3.4 Comando para executar o script Python
     CMD ["python", "/app/your_python_script.py"]

5. Detalhar o Script Python: nessa parte é necessário escrever um script Python que conecte-se à fila para receber os dados, carregue o modelo salvo (no nosso caso, o KNN) e use o modelo para classificar os dados recebidos da fila.

6. Construção e execução do contêiner docker: aqui é necessário criar a imagem Docker executando o comando 'docker build -t modelo_knn' no diretório onde está o 'Dockerfile'. Após isso, é só executar o contêiner a partir da imagem criada com o comando 'docker run' e fornecer as configurações da fila, como variáveis ou argumentos de linha de comando.

7. Testes e monitoramento: Após todos esses passos, é preciso enviar os dados para a fila e monitorar o contêiner docker para garantir que o mesmo está recebendo esses dados, processando-os e classificando-os corretamente.


### Registros de execução de testes com casos de sucesso e falha:

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.13.20.png">


### Resultados obtidos

Testes realizados (5/10):
* Para não poluir a documentação, o código completo contendo o teste de classificação de 10 itens está na pasta "Implementações > RNF-acuracia > modelo".

<b> Teste 1: falha </b>
- entrada: AERONET WORLDWIDE,AERONET WORLDWIDE,"Aeronet Worldwide, Inc.",NORAM,United States of America ,NORAM,Keith Senelly,Shivam Vakil,Logistics,Expedited Freight,Air Freight,Infrastructure,"Meta Platforms, Inc.","4350 - Design, Engineering & Construction Group","Design, Engineering & Construction Group",Infra R&D,Research & Development,Parent for Cost Center,Infrastructure Logistics (IBOS),Indirect COGS,Cost of Goods Sold,300002604625312,101233156,LETTERBOX,Infrastructure Logistics (IBOS),Default Product,57884 - DC COR & OPEX - Transportation,2023-02-25,70000408898.0,2156
- saída esperada: 'Expedited Freight'
- saída: 'Temporary Personnel Services'

<b> Teste 2: sucesso </b>
- entrada: ALLEGIS GROUP HOLDINGS INC,ALLEGIS GROUP,"Allegis Group, Inc.",NORAM,United States of America ,NORAM,,,Human Resources,Talent Management,Recruiting,RL,"Meta Platforms, Inc.",4572 - VR Product Platform Group,VR Product Platform Group,RL R&D,Research & Development,Parent for Cost Center,Temporary services,Opex w/o Allocations & Interco,Operating Expenses w/o Allocations,300002526034012,AGS35506324141,BEELINE,Temporary services,,43304 - VR Products,2023-01-21,,20
- saída esperada: 'Talent Management'
- saída: 'Talent Management'

<b> Teste 3: sucesso </b>
- entrada: BEELINECOM INC,BEELINECOM INC,"Beeline.com, LLC",NORAM,United States of America ,NORAM,,,Technology/Telecom,Software & Support,IT Software Applications - Perpetual,R&D,"Meta Platforms, Inc.",5227 - Biz Messaging XFN,Biz Messaging XFN,Monetization R&D,Research & Development,Parent for Cost Center,Temporary services,Opex w/o Allocations & Interco,Operating Expenses w/o Allocations,300002670852356,INV16124016784856296959,BEELINE,Temporary services,,47009 - Business Messaging,2023-04-06,,31
- saída esperada: 'Software & Support'
- saída: 'Software & Support'

<b> Teste 4: sucesso </b>
- entrada: ALLEGIS GROUP HOLDINGS INC,ALLEGIS GROUP,"Allegis Group, Inc.",NORAM,United States of America ,NORAM,,,Human Resources,Talent Management,Recruiting,Corp G&A,"Meta Platforms, Inc.",0002 - G&A (Corp),G&A (Corp),Corporate G&A,General & Administrative,Parent for Cost Center,Temporary services,Opex w/o Allocations & Interco,Operating Expenses w/o Allocations,300002520028106,AGS57276322741,BEELINE,Temporary services,,00000 - Default Project,2023-01-19,,23
- saída esperada: 'Talent Management'
- saída: 'Talent Management'

<b> Teste 5: falha </b>
- entrada: ACCENTURE INTERNATIONAL LIMITED,ACCENTURE,ACCENTURE PUBLIC LIMITED COMPANY,NORAM,Ireland,NORAM,Paxton Rome,Ryan Yokogawa,Professional Services,Outsourced Operations,Content Moderation,Comms & Policy,"Meta Platforms, Inc.",2110 - Communications Group,Communications Group,Global Affairs G&A,General & Administrative,Parent for Cost Center,Consultants,Opex w/o Allocations & Interco,Operating Expenses w/o Allocations,300002672753715,709319024,SUPP_CONNECT,Consultants,Default Product,95062 - 2110 - KTBR Strategy & PgM: Ops & Planning,2023-04-08,70000651685.0,27176
- saída esperada: 'Outsourced Operations'
- saída: 'Facilities Services'

# (Sprint 3) Testes  não funcionais

## 3.2.a) Mapa de Testes

### Mapa dos testes realizados

1. Teste de classificação
     - entrada: item de compra que inclui as seguintes informações: 'Supplier Name', 'Normalized Supplier Name', 'Parent Supplier Name', 'Region', 'Country Name', 'Strategic Region', 'Requestor Name','Preparer Name', 'Level 1', 'Level 2', 'Level 3', 'Business Unit', 'Legal Entity', 'Cost Center', 'Cost Center (Base Level)','Cost Center (Level 4)', 'Cost  Center (Level 5)', 'Cost Center (Level 6)', 'GL Desc (Level 4)', 'GL Desc (Level 5)', 'GL Desc (Level 6)', 'Invoice ID', 'Invoice Number', 'Invoice Source', 'GL Description', 'Product', 'Project', 'Month, Day, Year of Payment Date', 'PO Number', 'Amout USD';
    - saída esperada: 'Level 2' gerado pelo modelo de predição (a categoria).
    - código:
      
      <img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.13.57.png">

-> O teste de classificação realizado, ao ser comparado com as simulações de acuracia desenvolvidas anteriormente, revela-se muito mais preciso e realista. Isso porque os testes são feitos em cima de uma implementação muito consistente, que considera todo o contexto das diferentes features, métricas e características do modelo de classificação, diferente da simulação que leva em conta apenas probabilidades e cenários superficiais de diferentes possibilidades. Logo, pelo panorama dos testes considerar uma grande massa de dados e um modelo de AI, ele se mostra muito mais realista e preciso que as simulações, que tem um papel inicial importante quando não temos acesso à quantidade de dados obtida no momento atual.

### Abordagem dos testes e massa de dados utilizada

A abordagem escolhida para realizar os testes levou em conta o contexto específico entorno do requisito não funcional de Acurácia, que requer análises e buscas por um entendimento aprofundado do motivo dos resultados obtidos, que podem variar muito de acordo com caracteriscas da base de dados fornecida. Logo, a abordagem de testagem conta com uma pipeline de tratamento que recebe um dado de uma compra, retorna esse dado tratado, e esse dado é enviado para o modelo de classificação KNN, que, ao considerar os 13 itens da base de treinamento mais próximos ao novo, consegue classificá-lo com uma acurácia de aproximadamente 70%.

Foi utilizada uma grande massa de dados tanto para o treinamento do modelo, como para testes. Ou seja, a partir de uma base de dados de aproximadamente 400.000 dados sobre as compras da América do Norte (NORAM), foram utilizados 70.000 dados para treinamento do modelo, e 30.000 para testagem em massa, além de 10 dados para testes isolados individuais, em que podemos analisar de perto os resultados da classificação e comparar saídas obtidas/saídas esperadas.

## 3.2.b) Registros de Testes Automatizados

### Descrição dos resultados obtidos
O resultado obtido nos testes em cima do conjunto de 30% da base (30.000 dados), foi de uma acurácia de 69%, e esse resultado pode ser visualizada a partir do seguinte gráfico: 
- Acurácia na classificação do modelo (69% do conjunto de testes de 30.000 dados):
  
  <img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.14.08.png">

Além disso, o resultado obtido nos testes com os 10 dados separados da base, foi de uma acurácia de 80%, ou seja, de 10 itens, 8 foram classificados corretamente. Segue um matriz de disperção que mostra isso:
- Matriz de dispersão dos 10 testes isolados (80% de acurácia)
  
  <img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.14.16.png">


- E uma matriz de confusão do resultado desses testes:

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.14.29.png">

## 3.2.c) Avaliação dos Resultados e Limites do Sistema

### resultados dos testes x resultados das simulações

Para comparar os resultados obtidos nesses diferentes cenários, primeiro, vamos analizar os gráficos de dispersão gerados:

Simulação atual:
  - simulação de acurácia de 65% na classificação

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.14.40.png">

Simulação novo:
  - simulação de acurácia de 95% na classificação

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.14.48.png">

Testes da implementação:
  - 80% de acurácia obtida nos testes isolados (10)

<img width="1242" alt="image" src="https://github.com/2023M8T3Inteli/Grupo-03/blob/5a25d9d7b20b644db511c9c7d9d8f5d7b568fb5e/Implementa%C3%A7%C3%B5es/RNF-acuracia/assets/Captura%20de%20Tela%202023-11-27%20%C3%A0s%2014.14.58.png">

-> A simulação do sistema atual considera um sistema com precisão muita baixa, e que gera muitos problemas de reclassificação humana posterior, visto que muitos itens de compra são classificados de forma errada. Já a simulação do sistema atual, mostra, mesmo que de forma aleatória, visto que não utilizada de dados reais, o cenário esperado a ser atingido pelos testes reais, a partir de melhorias futuras no modelo de classificação. Já os resultados dos testes realizados, são embasados em uma grande base de dados, e são satisfatórios para um sistema de classificação, mas ainda podem melhorar muito, buscando atigir cada vez mais uma precisão melhor do modelo, diminuindo também o retrabalho humano através de retreinamentos constantes do modelo e automatização desse processo.

### Ajustes e melhorias

Alguns ajustes e melhorias que podem ser implementados no modelo de classificação e na preparação de dados, com o objetivo de  melhorar a acurácia do sistema, são:

- Normalização dos dados;
- Utilização de outras métricas como F1 Score como referência para medir a qualidade da classificação;
- Derivação das features atuais, e cruzamento entre features para gerar dados mais específicos e identificar diferentes tendências;
- Análise mais aprofundada do impacto de cada feature, gerando uma definição mais conciente e precisa das features do modelo;
- Testagem de outros tipos de modelos de classificação, além do KNN, a fim de explorar outras possibilidades e encontrar o que mais se encaixa nas necessidades do sistema;
- Atualmente o modelo se encontra em formato de Jupyter Notebook (para fins educativos e de correção, também), mas seria interessante o desenvolvimento de uma API em flask, ou de um arquivo .pkl com o modelo, para melhorar o desempenho.

## 3.2.d) Avaliação dos Riscos Resultantes

### Revisão dos riscos

Risco 1: "Não conseguir aumentar a assertividade da taxonomia"
- anteriormente: risco considerado como uma ameaça de probabilidade média e impacto médio.
- atualmente: a partir do modelo de classificação já implementado, esse risco já foi eliminado, visto que a assertividade da taxonomia atual da Meta é de aproximadamente 65%, e a proposta pela implementação do sistema novo, que ainda passará por mais melhorias, já está com 72% de acurácia de treino e 69% de acurácia de testes. Ou seja, já conseguimos aumentar a assertividade da taxonomia.
- avaliação preliminar de controle: para manter esse risco controlado, e suportar uma evolução constante da taxonomia do sistema proposto, é importante pesquisarmos, testarmos e implementarmos diferentes ajustes e melhorias no modelo, para que a assertividade se mantenha alta, visando atingir a meta de no mínimo 90% de acurácia do sistema.

Risco 2: "Trabalho redobrado por falhas na classificação das compras"
- anteriormente: risco considerado como uma ameaça de baixa probabilidade e médio impacto.
- atualmente: esse risco está relativamente sob controle, visto que a asserticidade de classificação das compras está mostrando uma tendência de melhora, com os ajustes que já estão no nosso radar de implementação nas próximas sprints. Porém, mesmo com uma acurácia satisfatória para a etapa em que estamos, ainda existe o cenário de dados que são classificados de forma errada, gerando a necessidade de uma reclassificação, o que torna esse risco relevante, merecendo a atenção da equipe.
- avaliação preliminar de controle: implementação de aprendizagem e retreinamento automatizado do modelo de classificação, diminuindo consideravelmente o trabalho humano necessário para lidar com erros de classificação, e o impacto negativo desse risco. Dessa forma, possibilitanto uma melhora e controle de riscos cada vez mais alto pelo sistema, através da automatização.
