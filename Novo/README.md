# Elicitação e análise de requisitos

### 1.2 a) Requisitos não funcionais do sistema novo

**RNF-1:** O sistema deve atingir uma acurácia de classificação de 90% ou mais (Taxonomia)

A principal problemática apresentada foi a taxa de acerto no modelo de classificação dos clientes, o qual possua uma acurácia de 65% em sua taxonomia de pedidos de compra. Como agregador de valor e solução do problema, o modelo apresentado (novo) deve contemplar uma acurácia de no mínimo 90% para suas classificações.


**RNF-2:** O sistema deve contemplar uma disponibilidade de 100 requisições por minuto (Disponibilidade)

Por meio dos dados disponibilizados pela Meta, foi feito um cálculo de disponibilidade para analisar um número que se adeque à média de requisições calculadas. Com uma base de aproximadamente 1.000.000 (um milhão) de compras, no intervalo de tempo de janeiro até o final de setembro do ano de 2023, é possível chegar a uma média de aproximadamente 3 requisições por minuto, portanto o sistema deve conseguir suportar 100 requisições por minuto.


**RNF-3:** O sistema deve conseguir classificar uma compra em até uma hora depois que seu pedido for emitido (Desempenho)
	
Com o período atual de desempenho de no máximo 1 hora*, o novo sistema deve buscar manter seu desempenho de classificações abaixo desse período de tempo. É importante também destacar que esse tipo de desempenho leva em consideração a disponibilidade do sistema.

_* **Disclaimer:** o tempo máximo de 1 hora foi um valor estipulado sem base nos dados reais da Meta, já que esse dado não está disponível até o momento que esse documento foi redigido._

### 1.2 b) Justificativa dos RNFs selecionados para o sistema novo

**RNF-1**

Este requisito tem como principal foco garantir uma grande melhora no sistema de classificação das compras internas realizadas pela Meta, impactando na qualidade e na eficácia do sistema. Essa melhora tem um impacto direto nos negócios, pois contribui para um controle aprimorado dos gastos da empresa, possibilitando análises mais precisas em relação aos tipos de gastos, e influenciando até mesmo na declaração de impostos da empresa. Logo, o cumprimendo deste requisito tem também um impacto financeiro, ao evitar gastos desnecessários com a má declaração das compras, e ao evitar o retrabalho do processo de reclassificação dos itens que foram mal classificados - redução de recursos e tempo. 
Além disso, pensando na usabilidade do sistema, uma maior acurácia nas classificações tornará o sistema mais fácil de usar para os colaboradores responsáveis, pois eles poderão confiar mais nas informações geradas.
Portanto, é esperado que a probabilidade de ocorrência do risco da classificação errônea das compras diminua muito, levando a um direcionamento mais exato de verba entre as áreas da empresa, além de mitigar o risco de haver problemas ao prestar contas em relação a gastos não classificados, eliminando vulnerabilidades da empresa.

**RNF-2**

O aumento da disponibilidade do sistema, agora capaz de processar 100 requisições por minuto, será essencial para tornar o sistema mais eficiente operacionalmente, o que certamente terá um impacto no desempenho do sistema e na usabilidade dos usuários que utilizarão e testarão o sistema, visto que ele terá uma capacidade de processamento muito maior. Além disso, pensando no controle de riscos e eliminação de vulnerabilidades, certamente este requisito irá diminuir o risco de indisponibilidade do sistema, o que será uma melhora excepcional para o funcionamento do sistema, evitando perdas até mesmo financeiras ao evitar que o sistema fique fora do ar ou que haja algum problema com aumentos de demanda inesperados. Logo, o aumento da capacidade do sistema leva também a uma infraestrutura mais capaz de lidar com a necessidade de aumento de escalabilidade, reduzindo o risco de sobrecarga do servidor e queda no desempenho - o que impacta muito positivamente nos negócios da empresa, garantindo que os processos aconteçam de forma contínua e não sejam interrompidos.

**RNF-3**

Para manter um desempenho alto do sistema, é necessário que todo o processo, desde a realização da compra, até a classificação final, esteja funcionando corretamente e que esteja disponivel, evitando, ao máximo, falhas que possam atrasar esse processo e entregar um desempenho final baixo. Logo, com esse requisito, é esperado que, com as mudanças arquiteturais propostas para o sistema novo, o tempo gasto no processo de classificação se mantenha abaixo do tempo do sistema atual (1h), entregando uma maior usabilidade, pois o tempo de processamento será mais rápido, proporcionando uma experiência mais satisfatória. Além disso, um menor tempo de classificação da compra proporcionará benefícios como aumento da agilidade do sistema e aumento da eficiência operacional, acelerando os fluxos internos da empresa, visto que outros processos podem depender desse de classificação, posteriormente. Por fim pensando no controle de riscos, um risco que será mitigado ao aplicar esse RNF é o baixo desempenho do sistema, algo que tem um grande impacto nas métricas e resultados finais, contribuindo para a economia de tempo e recursos da empresa.

# (Sprint 2) Arquitetura do Sistema Novo (Versão 2.0). Especificação da solução técnica do novo

## 2.2.a) Mapa de Requisitos Não Funcionais selecionados, com as especificações mensuráveis

A partir de diferentes análises em relação aos requisitos não funcionais do sistema, para o desenvolvimento do mapa de requisitos, foram escolhidos requisitos sobre segurança, disponibilidade e acurácia do sistema de classificação.
Para as entradas, foram considerados dados em relação ao sistema atual; para as saídas, foram considerados dados esperados para o sistema novo; Para a abordagem de controle, foram consideradas táticas e formas de conseguir mensurar e garantir esses RNFs.

### RNF de segurança
- Entrada: Permissão de acesso apenas para usuários autenticados, em um fluxo simples de autenticação de 1 etapa.
- Saída: Permissão de acesso apenas para usuários autenticados no sistema de autenticação de 2 fatores, utilizando criptografia nas credenciais dos usuários autorizados. Isso inclui a implementação de HTTPS durante a transmissão e o armazenamento seguro das senhas usando funções de hash criptográficas, garantindo maior segurança.
- Abordagem de controle: Para garantir a segurança do sistema, serão realizadas auditorias periódicas (semanalmente) nas permissões de acesso para garantir que apenas usuários autenticados tenham permissão de acesso ao sistema, incluindo revisões de políticas de controle de acesso e logs de autenticação para identificar padrões de atividade suspeitas e tentativas de acesso não autorizadas. Além disso, serão realizadas avaliações de vulnerabilidade a fim de detectar brechas de segurança mensalmente.

### RNF de disponibilidade
- Entrada: Disponibilidade de 90%, obedecendo uma distribuição normal com desvio padrão de 10%, no sistema atual.
- Saída: Disponibilidade de 97%, obedecendo uma distribuição normal com desvio padrão de 3%, no sistema novo.
- Abordagem de controle: Como o sistema utilizará de serviços em cloud na AWS, será utilizado o serviço Amazon CloudWatch para monitonar em tempo real a saúde dos recursos utilizados, de forma contínua, possibilitanto uma possível prevenção ou maior controle sobre problemas de disponibilidade, visto que essa ferramenta permite a definição de alertas para notificar métricas importantes, como a disponibilidade do sistema. 

### RNF de acurácia
- Entrada: Modelo de taxonimia com baixa acurácia de classificação das compras internas, próxima a 65%.
- Saída: Modelo de taxonomia com alta acurácia de classificação das compras internas, acima de 90%.
- Abordagem de controle: Como abordagem de controle, serão utilizadas métricas de desempenho específicas, como precisão, recall e F1-score, para monitorar o desempenho do modelo em tempo real. Essas métricas serão essenciais para avaliar a acurácia do modelo de taxonomia, e possibilitar que o nível de acurácia seja acompanhado e mantido acima de 90%.

## 2.2 b) Descrever as táticas arquiteturais que ajudam a execução e o controle do RNF

### RNF de segurança
- Como monitorar: implementar um sistema de logs abrangente para registrar eventos de autenticação, acessos e tentativas de acesso utilizando a ferramenta Amazon CloudWatch;
- Como resolver de forma preventiva e/ou reativa: a prevenção vem justamente do sistema de logs citado no monitoramento, pois esse monitoramento possibilitará a identificação de atividades suspeitas antes mesmo de uma quebra de segurança acontecer, gerando um alerta preventivo;
- Como recuperar ou subsidiar o tratamento dos impactos de quebra de serviços para o requisito: implementar periodicamente (em horários de baixa utilização, por exemplo toda madrugada ou aos finais de semana, dependendo do nível de atividade do sistema) backups criptografados e testados para garantir a recuperação eficiente em caso de violação. Além disso, restaurar o sistema a partir de backups verificados para minimizar o tempo de inatividade.

### RNF de disponibilidade
- Como monitorar: rodar um script a cada um segundo no servidor em que o site está deploiado para monitorar se o sistema está disponível ou não;
- Como resolver de forma preventiva e/ou reativa: uma ação preventiva para resolver os problemas de disponibilidade é utilizar o balanceamento de carga para dividir o tráfego de utilização do sistema entre diferentes instâncias em duas zonas de disponibilidade, por exemplo. Isso garante que se uma das instâncias tiver algum problema de sobrecarga que gere uma indisponibilidade, o sistema tenha uma alternativa de redirecionamento, continuando ativo; 
- Como recuperar ou subsidiar o tratamento dos impactos de quebra de serviços para o requisito: para diminuir os impactos de um possível problema de disponibilidade é necessário que desde o início do planejamento seja definido um SLA de disponibilidade menor do que o SLA da nuvem utilizada, no caso AWS. Isso garante que qualquer problema de disponibilidade esteja dentro do escopo do SLA, reduzindo impactos contratuais. 

### RNF de acurácia
- Como monitorar: para monitoramento do nível da acurácia, o sistema de classificação contará com uma alta rastreabilidade, a partir da produção de logs em todas as etapas de classificação, possibilitanto um monitoramento do nível da confiabilidade das classificações;
- Como resolver de forma preventiva e/ou reativa: quando a confiabilidade da classificação de uma compra for menor que 90%, o alvo dessa classificação será separado para análise e para estudos direcionados para descorbrir a causa do problema e manter o nível alto de acurácia da taxonomia das compras;
- Como recuperar ou subsidiar o tratamento dos impactos de quebra de serviços para o requisito: adicionar uma etapa na arquitetura de curadoria humana, que auxiliará no retreinamento do modelo de classificação, a partir de uma análise e reclassificação das compras com precisão menor de 90%, diminuindo o impacto da má classificação e contribuindo para que isso não se repita posteriormente.
