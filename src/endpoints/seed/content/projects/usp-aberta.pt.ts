import {
  architecture,
  b,
  bars,
  callout,
  cite,
  compare,
  h2,
  i,
  metricGrid,
  p,
  pipeline,
  root,
  techStack,
  ul,
} from '../../lexical'

export const uspAbertaPt = {
  title: 'USP Aberta',
  summary:
    'Uma plataforma de dados abertos que torna a produção de pesquisa da Universidade de São Paulo pesquisável: docentes, unidades, publicações, redes de colaboração, inovação e eventos, construída a partir de currículos Lattes e fontes abertas.',
  role: 'Engenheiro único: arquitetura, engenharia de dados, busca, backend, frontend, DevOps e segurança',
  attribution:
    'Engenharia de Jonathas Castilho / Xnths como único desenvolvedor, em parceria com o IME-USP e o LabXP, com orientação do Prof. Alfredo Goldman. Uma iniciativa da PRPI-USP.',
  partners: [
    { name: 'PRPI-USP', url: 'https://prpi.usp.br', role: 'initiative' },
    { name: 'IME-USP', url: 'https://www.ime.usp.br', role: 'partner' },
    { name: 'LabXP', role: 'lab' },
    { name: 'Prof. Alfredo Goldman', role: 'supervisor' },
  ],
  links: [
    { label: 'uspaberta.ime.usp.br', url: 'https://uspaberta.ime.usp.br', kind: 'live' },
    { label: 'Página pública de status', url: 'https://uspaberta.ime.usp.br/status', kind: 'live' },
    { label: 'llms.txt', url: 'https://uspaberta.ime.usp.br/llms.txt', kind: 'docs' },
  ],
  keyMetrics: [
    { value: '5.697', label: 'docentes indexados', context: 'com currículo Lattes e unidade' },
    { value: '1,34 mi', label: 'produções únicas', context: 'ligadas a partir de 1,51 mi de autorias' },
    { value: '≈4.800×', label: 'travessia de grafo de 1 salto mais rápida', context: 'Neo4j vs Elasticsearch, mediana' },
    { value: '6.200+', label: 'URLs no sitemap', context: 'eram 3' },
    { value: '53', label: 'unidades em 8 campi', context: '43 unidades de ensino, 4 museus, 6 institutos' },
    { value: '41', label: 'provedores de dados abertos', context: 'somente fontes livres e abertas' },
    { value: '1.087', label: 'commits em 15 meses', context: '≈125 mil linhas de Python, TypeScript, Go e SQL' },
  ],
  meta: {
    title: 'USP Aberta — estudo de caso',
    description:
      'Como a Xnths projetou o USP Aberta, uma plataforma de dados acadêmicos abertos da Universidade de São Paulo: arquitetura, engenharia de dados, busca, cache, DevOps, segurança, privacidade e SEO.',
  },
  references: [
    { key: 'lattes', title: 'Plataforma Lattes', authors: 'CNPq', url: 'https://lattes.cnpq.br' },
    { key: 'iso25012', title: 'ISO/IEC 25012:2008 — Modelo de qualidade de dados', authors: 'ISO/IEC', year: '2008' },
    { key: 'rfc9309', title: 'Robots Exclusion Protocol (RFC 9309)', authors: 'Koster, M., et al.', year: '2022', url: 'https://www.rfc-editor.org/rfc/rfc9309' },
    { key: 'fs1969', title: 'A theory for record linkage', authors: 'Fellegi, I. P., & Sunter, A. B.', venue: 'Journal of the American Statistical Association 64(328)', year: '1969' },
    { key: 'zl2004', title: 'A study of smoothing methods for language models applied to information retrieval', authors: 'Zhai, C., & Lafferty, J.', venue: 'ACM Transactions on Information Systems 22(2)', year: '2004' },
    { key: 'jk2002', title: 'Cumulated gain-based evaluation of IR techniques', authors: 'Järvelin, K., & Kekäläinen, J.', venue: 'ACM Transactions on Information Systems 20(4)', year: '2002' },
    { key: 'forsgren2018', title: 'Accelerate: The Science of Lean Software and DevOps', authors: 'Forsgren, N., Humble, J., & Kim, G.', venue: 'IT Revolution', year: '2018' },
    { key: 'rfc7638', title: 'JSON Web Key (JWK) Thumbprint (RFC 7638)', authors: 'Jones, M., & Sakimura, N.', year: '2015', url: 'https://www.rfc-editor.org/rfc/rfc7638' },
    { key: 'rfc8058', title: 'Signaling One-Click Functionality for List Email Headers (RFC 8058)', authors: 'Levine, J., & Herkula, T.', year: '2017', url: 'https://www.rfc-editor.org/rfc/rfc8058' },
    { key: 'lgpd', title: 'Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)', authors: 'República Federativa do Brasil', year: '2018' },
    { key: 'tornhill2015', title: 'Your Code as a Crime Scene', authors: 'Tornhill, A.', venue: 'Pragmatic Bookshelf', year: '2015' },
    { key: 'ccbyncsa', title: 'Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0', authors: 'Creative Commons', url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br' },
  ],
  stack: [
    'Next.js 15', 'TypeScript', 'Tailwind v4', 'Django 5.2', 'DRF', 'Go', 'PostgreSQL', 'Elasticsearch 8.12',
    'Neo4j', 'Apache Airflow', 'Docker Compose', 'nginx', 'Prometheus', 'Grafana', 'Terraform', 'Ansible',
    'GitLab CI', 'pytest-bdd', 'Playwright', 'Cypress',
  ],
  body: root(
    h2('Contexto e problema'),
    p(
      'Os currículos de pesquisadores brasileiros vivem na Plataforma Lattes',
      cite('lattes'),
      ', uma fonte rica, mas com formato fechado: cada currículo é um grande documento XML e os dados dos docentes da USP estavam dentro de uma view de banco de 9 GB. Quem fazia perguntas simples (quem trabalha neste tema, quais unidades colaboram, como a produção se distribui) precisava contornar a plataforma em vez de passar por ela.',
    ),
    p(
      b('Problema. '),
      'Tornar a produção de pesquisa da universidade pesquisável e explorável pelo público, sem APIs de busca pagas, sem dados pessoais e em uma infraestrutura pequena o bastante para uma única pessoa operar. As primeiras versões caíam por falta de memória sob carga de crawlers e analytics.',
    ),
    p(
      b('Decisão. '),
      'Tratar como produto de dados: um pipeline reproduzível da view de origem até armazenamentos dedicados (Elasticsearch para busca e estatísticas, Neo4j para consultas de grafo), uma API Django enxuta e um front-end Next.js que renderiza tudo no servidor e usa cache de forma agressiva.',
    ),
    callout(
      'note',
      'Todos os números são de outubro de 2026 e vêm da documentação do repositório, dos dados brutos de benchmark e do site no ar. Quando um resultado tem limites, o limite está ao lado dele.',
      'Como ler os números',
    ),

    h2('Arquitetura'),
    p(
      'Uma única porta de entrada pública e um único caminho do servidor até os dados. O navegador nunca fala direto com o Django: o Next.js chama a API no servidor, então a superfície da API pode ficar privada e a política de cache fica em um só lugar.',
    ),
    architecture({
      title: 'Arquitetura do sistema USP Aberta',
      caption:
        'Camadas da borda até os armazenamentos de dados. Os serviços em Go são processos pequenos e de propósito único; cada schema do Postgres tem seu próprio papel.',
      source: 'Documentação de arquitetura do repositório, outubro de 2026',
      layers: [
        { label: 'Borda', nodes: ['TLS na borda da USP', 'nginx (roteamento, limites de taxa)'] },
        { label: 'Web', nodes: ['Next.js 15 (SSR + ISR)', 'TypeScript', 'Tailwind v4'] },
        { label: 'API', nodes: ['Django 5.2 + DRF', 'Gunicorn', 'pytest-bdd'] },
        { label: 'Serviços Go', nodes: ['auth-server (JWT, OAuth)', 'Ágora (eventos)', 'Hermes (e-mail)', 'Argos (status)'] },
        { label: 'Pipelines', nodes: ['Airflow 3: bots Mnemosine', 'DAGs da Ágora', 'Jobs de ETL e reindexação'] },
        { label: 'Dados', nodes: ['PostgreSQL (schemas isolados)', 'Elasticsearch 8.12', 'Neo4j 5', 'Apache Jena Fuseki (RDF)'] },
        { label: 'Operações', nodes: ['Prometheus', 'Grafana', 'Alertmanager', 'sondas blackbox'] },
      ],
    }),
    techStack([
      { category: 'Aplicação', items: ['Next.js 15', 'React 19', 'TypeScript 5', 'Tailwind v4', 'Django 5.2', 'DRF', 'Go'] },
      { category: 'Dados', items: ['PostgreSQL', 'Elasticsearch 8.12', 'Neo4j 5', 'Apache Airflow', 'Apache Jena Fuseki'] },
      { category: 'Entrega', items: ['Docker Compose', 'GitLab CI', 'Terraform', 'Ansible', 'systemd'] },
      { category: 'Qualidade', items: ['pytest-bdd', 'Vitest', 'Playwright + axe', 'Cypress', 'k6', 'OWASP ZAP'] },
    ]),
    callout(
      'tradeoff',
      'O Elasticsearch cuida da busca e de toda agregação estatística; o Neo4j atende apenas o grafo de colaboração. Dois motores custam atenção operacional, mas cada um faz bem o que o outro faz mal (veja o benchmark de grafos abaixo).',
      'Persistência poliglota',
    ),

    h2('Engenharia de dados'),
    p(
      b('Problema. '),
      'A origem é uma view de banco com currículos brutos, que inclui dados pessoais, duplicatas e qualidade irregular; o produto precisa de documentos limpos, deduplicados e seguros do ponto de vista de privacidade, atualizados repetidamente sem indisponibilidade.',
    ),
    p(
      b('Decisão. '),
      'Um papel dedicado de somente leitura acessa a view; o ETL remove 13 tags privadas (CPF, endereço, telefones, e-mail, dados de nascimento e outras) antes de qualquer armazenamento, e vale a versão mais recente do currículo. Uma única cadeia de comandos atualiza tudo o que vem depois.',
    ),
    pipeline({
      title: 'Pipeline de atualização',
      caption: 'Cada etapa é idempotente e pode ser reexecutada isoladamente.',
      source: 'Documentação do motor de busca e da reindexação',
      layers: [
        { label: 'ETL Lattes', nodes: ['sanitizar', 'upsert'] },
        { label: 'Reindexação da busca', nodes: ['índice de docentes'] },
        { label: 'Índice de produções', nodes: ['deduplicar'] },
        { label: 'Grafo de coautoria', nodes: ['construir'] },
        { label: 'Sincronização Neo4j', nodes: ['lotes'] },
        { label: 'Relatório de qualidade', nodes: ['7 dimensões'] },
      ],
    }),
    ul(
      [
        b('Execução do ETL de 05/10/2026: '),
        '436.480 linhas de origem lidas, 347.554 gravadas, 168 ilegíveis, 0 erros; o restante não tinha ID Lattes e foi ignorado.',
      ],
      [
        b('Ligação de registros: '),
        'as produções são casadas por DOI normalizado ou, na falta dele, por título, ano e categoria. Isso transforma 1.514.901 autorias em 1.339.162 produções únicas (88,4%); 132.098 delas têm mais de um autor da USP. A mesma ideia, aplicada a eventos com uma regra de blocagem no estilo Fellegi–Sunter',
        cite('fs1969'),
        ', alimenta o calendário Ágora.',
      ],
      [
        b('Qualidade de dados: '),
        'medida nas sete dimensões da ISO/IEC 25012',
        cite('iso25012'),
        ', armazenada em snapshots, exposta por uma API e exportada ao Prometheus como razão.',
      ],
      [
        b('Inferência de gênero: '),
        'primeiro uma tabela de primeiros nomes do IBGE, depois um SVM que se abstém quando não tem certeza: 98,0% de acurácia com 94% de cobertura em 3.000 nomes, com 4,7% dos docentes informados como “indeterminado” em vez de chutados.',
      ],
    ),
    p(
      b('Bots Mnemosine. '),
      'Fontes externas (notícias da universidade, hub de inovação, patentes, catálogos de cursos, provedores de dados abertos) são coletadas por oito bots baseados em Airflow. Cada bot tem seu próprio schema; as respostas brutas ficam comprimidas em uma camada bronze, deduplicadas por SHA-256 e versionadas somente por acréscimo, então a correção de um parser reprocessa o histórico sem refazer requisições. Um exemplo: o arquivo de notícias tem 52.606 matérias e 6.552 episódios de podcast.',
    ),
    ul(
      [b('Educado por construção. '), 'user agent assinado com cabeçalho de contato, robots.txt respeitado',
        cite('rfc9309'),
        ', no mínimo 3 s entre requisições a hosts da universidade com jitter, um único slot de pool do Airflow, backoff que respeita Retry-After, um circuit breaker cujo tempo de espera dobra até 24 h e trabalho pesado somente fora do horário de pico.'],
      [b('Somente livre e aberto. '), 'uma regra permanente: toda fonte precisa ter licença aberta, ser gratuita e dispensar aprovação, e aparece no site com um selo de citação. 41 provedores alimentam o enriquecimento do calendário de eventos.'],
    ),

    h2('Busca e recuperação de informação'),
    p(
      b('Problema. '),
      'Nomes, áreas de pesquisa e biografias se comportam de formas diferentes, e uma única função de ranqueamento trata todos do mesmo jeito.',
    ),
    p(
      b('Decisão. '),
      'Similaridade por campo: modelos de linguagem com suavização de Dirichlet (μ = 2000)',
      cite('zl2004'),
      ' em nomes e biografias, divergence-from-independence nas áreas de atuação, BM25 nos títulos de produção e um analisador de edge n-grams para o autocompletar. Deliberadamente não há stemmer, lista de stop words nem tabela de sinônimos: o corpus é feito de nomes e termos técnicos.',
    ),
    p(
      b('Avaliação. '),
      'Um harness offline executa 1.200 consultas (12 classes × 100) e calcula nDCG@k',
      cite('jk2002'),
      ' com k = 3. A regra de aceite é que nenhuma classe de consulta pode piorar. A comparação entre BM25 e Dirichlet é o tema de uma submissão a congresso; não cito valores de nDCG aqui até esse artigo ser público.',
    ),
    ul(
      [b('Telemetria para modelos de clique. '), 'consultas e interações (impressões, cliques ranqueados, tempo de permanência, retornos) são registradas contra um id de sessão pseudônimo de 30 minutos, exportáveis para learning-to-rank não enviesado e resumidas em um painel do Grafana que acompanha o mean reciprocal rank.'],
      [b('Limites de entrada. '), 'consultas de até 1.000 caracteres, validadas no navegador com um contador inline, de modo que o usuário nunca provoca um erro no backend; consultas com mais de oito palavras dispensam correspondência aproximada.'],
    ),

    h2('Benchmark de grafos'),
    p(
      'Redes de coautoria são a única carga em que um índice invertido é a ferramenta errada. Em vez de discutir, medi.',
    ),
    bars({
      title: 'Latência mediana, Elasticsearch versus Neo4j',
      caption:
        'A travessia de coautores com um salto é cerca de 4.800× mais rápida no Neo4j (mediana de 1,6 ms contra 7.691,8 ms). A busca simples por nome fica praticamente empatada.',
      source: 'Tempos brutos do benchmark, 12/07/2026',
      scale: 'log',
      unit: 'ms',
      bars: [
        { label: 'Travessia de coautores, 1 salto: Elasticsearch', value: 7691.8, display: '7.691,8 ms' },
        { label: 'Travessia de coautores, 1 salto: Neo4j', value: 1.6, display: '1,6 ms', emphasis: true },
        { label: 'Busca por nome: Elasticsearch', value: 5.09, display: '5,09 ms' },
        { label: 'Busca por nome: Neo4j', value: 4.44, display: '4,44 ms' },
      ],
    }),
    callout(
      'caveat',
      'Vinte sujeitos, sete repetições cada, teste de Wilcoxon pareado com correção de Bonferroni, em um notebook sob pressão de memória. Com dois ou mais saltos, todas as execuções do Elasticsearch estouraram o timeout de 10 segundos, então não existe razão ali, e o experimento de controle falhou do lado do Elasticsearch. O número 4.800× é apenas o resultado de um salto.',
      'O que o número diz e o que não diz',
    ),
    p(
      b('Resultado. '),
      'O Neo4j atende apenas o grafo de colaboração, por meio de oito estratégias Cypher. Somente a profundidade da travessia é interpolada na consulta, a partir de uma lista permitida com 1, 2 e 3; todo o resto é parâmetro vinculado. As construções do grafo passaram a trabalhar em streaming em vez de materializar resultados, depois de um incidente de falta de memória.',
    ),

    h2('Cache e desempenho'),
    p(
      b('Problema. '),
      'As páginas de estatísticas agregam mais de um milhão de produções e o tráfego público é em rajadas. Requisições a frio eram lentas e, sob carga, o servidor ficava sem memória.',
    ),
    p(
      b('Decisão. '),
      'Três camadas de cache, cada uma com sua própria história de invalidação:',
    ),
    ul(
      ['Elasticsearch: o cache de requisições dos shards subiu do padrão de 1% para 10% do heap.'],
      ['Django: respostas em cache por 24 h (agregações puras), 1 h (dados editáveis por administradores) e 30 min (tendências). Um contador de geração armazenado no banco invalida as estatísticas, de modo que todos os workers as descartam em cerca de um minuto.'],
      ['Next.js: regeneração estática incremental com vida de uma hora em cache compartilhado, revalidação por tags a partir de um endpoint interno e um aquecimento na inicialização que espera a API responder antes de purgar.'],
    ),
    ul(
      [b('Memória. '), 'o heap da busca passou de 256 MB para 768 MB depois de erros de OutOfMemory; a construção do índice de produções abortava após 1.040 de 5.653 docentes e agora usa spool em disco e termina 1,34 mi de produções em cerca de três minutos; as construções de coautoria trabalham em streaming com um circuit breaker de memória residente em 1 GiB.'],
      [b('Reindexação. '), 'os lotes rodam no horário mais calmo previsto a partir de 14 dias de taxas de requisição do Prometheus, em vez de um botão manual.'],
    ),
    compare({
      title: 'Core Web Vitals e peso, antes e depois da rodada de desempenho de 09/10/2026',
      caption: 'Medições de laboratório (Lighthouse) em páginas públicas.',
      source: 'Relatório de base de SEO e desempenho',
      beforeLabel: 'Antes',
      afterLabel: 'Depois',
      rows: [
        { metric: 'JavaScript no primeiro carregamento, página inicial', before: '975 kB', after: '249 kB', note: 'entre 64% e 76% menor nas páginas medidas' },
        { metric: 'Peso das imagens nos assets públicos', before: '80 MB', after: '11 MB' },
        { metric: 'Desempenho no Lighthouse, perfil de docente', before: '45', after: '77' },
        { metric: 'Largest Contentful Paint, perfil de docente', before: '9,2 s', after: '4,0 s' },
        { metric: 'Time to first byte, perfil de docente', before: '232 ms', after: '10 ms' },
        { metric: 'Total Blocking Time, página da unidade IME', before: '1.225 ms', after: '426 ms' },
        { metric: 'Nota de SEO no Lighthouse', before: '92', after: '100', note: 'em três páginas auditadas' },
      ],
    }),

    h2('DevOps'),
    p(
      b('Decisão. '),
      'A produção é um único projeto Docker Compose. Os deploys são simples e reversíveis de propósito: cada release é uma tag de imagem imutável, a anterior é mantida como tag de rollback e as imagens são enviadas com uma transferência retomável e com checksum, de modo que um upload interrompido continua em vez de recomeçar.',
    ),
    ul(
      [b('Pipeline. '), 'o GitLab CI define estágios de build, teste (SAST, orçamentos de SEO, carga com k6, OWASP ZAP, caos de rede com netem), deploy e métricas. Os pushes passam por um hook de pre-push que roda as suítes.'],
      [b('Infraestrutura como código. '), 'Terraform e nove papéis Ansible (segredos no Vault) descrevem a configuração anterior na nuvem. Um caminho de migração para k3s e ArgoCD foi construído, avaliado e deliberadamente adiado em agosto de 2026, registrado como decisão e não deixado como deriva.'],
      [b('Autorrecuperação. '), 'timers e watchdogs do systemd reiniciam o que importa e protegem os daemons de acesso remoto do OOM killer; as tarefas agendadas são timers porque o servidor não tem cron.'],
    ),
    callout(
      'tradeoff',
      'Um post-mortem de agosto de 2026: o servidor não tinha swap, os contêineres de banco e de busca estavam fora do ar sem ninguém perceber havia cerca de 25 horas e um runner de CI no mesmo servidor da produção disputava memória. O swap foi adicionado, o runner foi desativado e os builds saíram da máquina de produção.',
      'Incidente que moldou o pipeline',
    ),

    h2('Observabilidade e SRE'),
    p(
      'Prometheus (retenção de 15 dias), Grafana, Alertmanager e sondas blackbox cobrem a pilha, organizados em torno de oito medidas no estilo DORA: MTTR, lead time, frequência de deploy, taxa de falha de mudanças, disponibilidade contra um SLO de 99,5%, duração do deploy, tempo de detecção e histogramas de tempo de resposta',
      cite('forsgren2018'),
      '.',
    ),
    ul(
      [b('Página de status Argos. '), 'um serviço em Go sonda 11 componentes a cada 60 segundos, só muda um estado depois de três verificações consecutivas (proteção contra oscilação), desenha barras de disponibilidade de 90 dias, abre e resolve incidentes automaticamente e envia e-mail nos dois eventos. É pública em /status.'],
      [b('Runbooks. '), 'quatro runbooks escritos (5xx no backend, Elasticsearch degradado, latência, incidente de busca); falhas de busca devolvem um corpo problem+json localizado com um id de requisição.'],
    ),
    callout(
      'caveat',
      'Os ganchos de autorremediação existem no código, mas de propósito não estão ligados à produção, e o caminho de alerta por e-mail do Argos é o que alcança uma pessoa hoje.',
      'Status honesto',
    ),

    h2('Segurança'),
    p(
      b('Decisão. '),
      'A identidade é um pequeno serviço em Go (auth-server): JSON Web Tokens RS256 com vida de 15 minutos, um endpoint JWKS com identificadores de chave conforme a RFC 7638',
      cite('rfc7638'),
      ', Google OAuth como único login, estado CSRF assinado e claims de papel negadas por padrão (usuário, administrador, super administrador). Ele também é o provedor de login único do Grafana e do Airflow.',
    ),
    ul(
      [b('O login por senha foi removido '), 'depois que bots tentaram força bruta nele. O proxy a montante não repassa o endereço IP do cliente, então a limitação por IP é ineficaz por construção; as defesas são baseadas em identidade e em rota: zonas de limite de taxa no nginx (alertas, grafo, autenticação, bots conhecidos) e throttles do DRF nas consultas de grafo.'],
      [b('Trilha de auditoria à prova de adulteração. '), 'um papel de banco somente de inserção, uma cadeia de hashes calculada por um trigger do banco sob um advisory lock, um comando que verifica a cadeia, partições mensais e retenção de dois anos.'],
      [b('Injeção. '), 'parâmetros vinculados em todo lugar; o único valor interpolado em Cypher vem de uma lista permitida.'],
      [b('Varreduras. '), 'bandit, pip-audit, pnpm audit, gitleaks, gosec, golangci-lint e uma baseline do OWASP ZAP rodam no CI.'],
    ),
    callout(
      'finding',
      'Uma revisão descobriu que o papel que grava a auditoria não tinha o privilégio SELECT de que o ORM precisa para INSERT … RETURNING, então as gravações de auditoria do Django falhavam em silêncio havia meses. Foi corrigido em setembro de 2026, junto com a configuração de testes que deixava os testes de auditoria fora da coleta.',
      'Post-mortem: falha silenciosa de auditoria',
    ),

    h2('Privacidade e conformidade'),
    p(
      'A plataforma publica dados acadêmicos de pessoas identificadas, então privacidade é uma entrada de projeto e não um checklist. Um registro das operações de tratamento conforme a LGPD',
      cite('lgpd'),
      ' informa a finalidade e a base legal de cada atividade (dados de docentes, auditoria, listas de e-mail, notícias, logs de busca).',
    ),
    ul(
      [b('Minimização. '), 'os dados pessoais são removidos duas vezes, na hora do ETL e de novo na hora da indexação; o campo de número USP interno foi apagado de todas as camadas em junho de 2026.'],
      [b('Retenção. '), 'logs de busca por 13 meses, logs de aplicação por 30 dias, registros de auditoria por dois anos.'],
      [b('Telemetria. '), 'respeita o Global Privacy Control e o Do Not Track, remove e-mails, CPFs e telefones das consultas e nunca guarda endereço IP nem user agent.'],
      [b('Listas de e-mail. '), 'double opt-in, endereços cifrados com AES-256-GCM mais um blind index HMAC para busca, descadastro em um clique',
        cite('rfc8058'),
        ', sem pixels de rastreamento, inscrições não confirmadas apagadas após 48 horas.'],
      [b('Licenciamento aberto e atribuição. '), 'o conteúdo do site é CC BY-NC-SA 4.0',
        cite('ccbyncsa'),
        ' e toda fonte externa carrega um selo de citação visível.'],
      [b('Acessibilidade. '), 'varreduras automáticas com axe-core contra a WCAG 2.1 A e AA quebram o build diante de problemas graves ou críticos.'],
    ),
    callout(
      'caveat',
      'O acordo formal de tratamento de dados com a área de TI da universidade ainda está pendente.',
      'Ainda em aberto',
    ),

    h2('SEO e descoberta por LLMs'),
    p(
      b('Problema. '),
      'Um site de interesse público que buscadores e assistentes de IA não encontram não serve ao público. O sitemap tinha três URLs.',
    ),
    ul(
      [b('Sitemap. '), 'agora um índice de sitemaps filhos (até 10.000 URLs de docentes cada) com datas de última modificação reais, tiradas dos currículos: mais de 6.200 URLs, incluindo 5.552 perfis de docentes.'],
      [b('Higiene de canônicas. '), 'duplicatas redirecionam com 308 para a URL canônica e soft 404 viraram 404 de verdade.'],
      [b('Dados estruturados. '), 'JSON-LD para WebSite com SearchAction, Organization, Person, CollegeOrUniversity, Museum, ResearchOrganization e BreadcrumbList.'],
      [b('Para modelos de linguagem. '), '/llms.txt e /llms-full.txt, uma versão compacta em Markdown de cada perfil de docente (alguns quilobytes contra 1,1–1,6 MB de HTML), um diretório de A a Z e um grupo explícito no robots.txt para 16 crawlers de IA.'],
      [b('Gates de regressão. '), 'orçamentos de renderização, bundle e Lighthouse mais uma spec de SEO no Playwright; na primeira execução contra o site antigo, 15 asserções do Lighthouse CI falharam.'],
    ),

    h2('Testes e qualidade'),
    p(
      'Testes orientados a comportamento descrevem o produto no vocabulário de quem o usa, e um hook de pre-push roda as suítes antes de o código sair da máquina.',
    ),
    metricGrid([
      { value: '36', label: 'arquivos de feature do pytest-bdd' },
      { value: '208', label: 'arquivos de teste do Vitest' },
      { value: '110', label: 'arquivos de teste em Go' },
      { value: '15', label: 'specs do Playwright', context: 'SEO, acessibilidade, visual' },
    ]),
    p(
      'O gate de cobertura do backend está em 90%; isso é um limite, não uma medição. As verificações não funcionais incluem testes de carga com k6, OWASP ZAP, caos de rede e profiling de memória. Uma análise comportamental de código no estilo de Tornhill',
      cite('tornhill2015'),
      ' sobre 656 commits orienta onde pagar primeiro a dívida técnica.',
    ),

    h2('Superfície do produto'),
    p(
      'O que a plataforma oferece hoje, tudo gerado a partir de dados vivos e não de texto escrito à mão:',
    ),
    ul(
      ['Perfis de docentes, unidades, departamentos e museus, com edição no local em estilo planilha para curadores (desfazer, refazer e um log de mudanças reversível).'],
      ['Estatísticas: produção ao longo do tempo, áreas do conhecimento, países de publicação, distribuição de gênero.'],
      ['Uma rede de colaboração com alternância entre grafo e tabela.'],
      ['Ágora: um calendário de eventos de toda a USP com exportação .ics e uma API REST, um subprojeto com página própria.'],
      ['Inovação: patentes, dados de transferência de tecnologia e um verificador de elegibilidade que roda inteiramente no navegador.'],
      ['Cursos e currículos, e um verificador de formatura (/formatura) que lê o PDF do histórico do aluno no próprio navegador.'],
      ['Um arquivo de imprensa, newsletters por e-mail e a página pública de status.'],
    ),

    h2('Próximos passos'),
    p(
      'O roadmap é tanto pesquisa quanto engenharia. Os embeddings de docentes e produções já estão calculados com um modelo aberto; a orquestração com LangChain e a camada de geração de um pipeline de geração aumentada por recuperação vêm a seguir, condicionadas à qualidade dos dados, e por isso o relatório de qualidade vem primeiro. Mais adiante: verificação formal dos pipelines de coleta com redes de Petri, uma comparação entre busca lexical e semântica sobre logs de uso reais e a ampliação do corpus para eventos artísticos e música brasileira.',
    ),
    p(i('Este estudo de caso é a base de um plano de pesquisa de mestrado; veja a página de Pesquisa.')),
  ),
}
