import { h2, p, root, b } from '../lexical'

export const siteSeed = {
  common: {
    name: 'Jonathas Castilho',
    alias: 'Xnths',
    organization: {
      brand: 'Xnths',
      legalName: 'J. Castilho Tecnologia Ltda',
      foundingYear: 2015,
      url: 'https://xnths.com',
    },
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Xnths' },
      { kind: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/xnths' },
      { kind: 'email', label: 'jonathas@xnths.com', url: 'mailto:jonathas@xnths.com' },
    ],
    contact: { email: 'jonathas@xnths.com' },
  },
  en: {
    positioning: 'Software engineering for open academic data',
    affiliationLine: 'Xnths · IME-USP · São Paulo',
    shortBio:
      'I am a software and data engineer and a Computer Science student at IME-USP. I love to study, and I am autistic: I think best in structure, formal notation and small, careful steps. I spend my time where information retrieval, data engineering and behavioral science meet, and what I build most today is USP Aberta, a platform that makes the research of the University of São Paulo searchable.',
    contact: { email: 'jonathas@xnths.com', note: 'Projects, research collaboration, or a conversation about open academic data.' },
    seoDefaults: {
      title: 'Jonathas Castilho — Xnths | Software engineering for open academic data',
      description:
        'Jonathas Castilho is a software and data engineer and Computer Science student at IME-USP, building USP Aberta, an open academic-data platform for the University of São Paulo.',
    },
    capabilities: [
      { key: 'data', title: 'Data engineering', summary: 'Sanitizing ETL, record linkage across 1.5 million author-works, polite collection bots and a measured data-quality model.', projectSlug: 'usp-aberta', anchor: 'data-engineering' },
      { key: 'search', title: 'Search and information retrieval', summary: 'Field-specific ranking in Elasticsearch, an offline nDCG harness over 1,200 queries and click telemetry for learning to rank.', projectSlug: 'usp-aberta', anchor: 'search-and-information-retrieval' },
      { key: 'performance', title: 'Performance and caching', summary: 'A three-layer cache, out-of-memory fixes, and first-load JavaScript cut by up to 76%.', projectSlug: 'usp-aberta', anchor: 'caching-and-performance' },
      { key: 'devops', title: 'DevOps and SRE', summary: 'Immutable images with one-command rollback, infrastructure as code, a public status page and DORA-style measures.', projectSlug: 'usp-aberta', anchor: 'devops' },
      { key: 'security', title: 'Security', summary: 'A Go identity service with RS256 JWTs, Google-only sign-in, a tamper-evident audit trail and layered scanning.', projectSlug: 'usp-aberta', anchor: 'security' },
      { key: 'privacy', title: 'Privacy and compliance', summary: 'LGPD records of processing, PII stripped twice, documented retention and consent-first mailing.', projectSlug: 'usp-aberta', anchor: 'privacy-and-compliance' },
      { key: 'seo', title: 'SEO and LLM discoverability', summary: 'A sitemap from 3 to 6,200+ URLs, structured data, llms.txt and compact Markdown profiles.', projectSlug: 'usp-aberta', anchor: 'seo-and-llm-discoverability' },
      { key: 'ai', title: 'AI engineering', summary: 'Embeddings are computed; a retrieval-augmented pipeline over USP Aberta data is the next research step.', projectSlug: 'usp-aberta', anchor: 'what-s-next' },
    ],
    community: [
      { title: 'Symcomp', detail: 'founded and led the group; built and trained a development team, organized the Semana da Computação and taught classes on refactoring, design patterns and requirements engineering', year: '2023–26' },
      { title: 'XP Conference 2026', detail: 'volunteer', year: '2026' },
      { title: 'CBSoft 2026', detail: 'volunteer', year: '2026' },
      { title: 'IEEE CS Global Student Challenge 2026', detail: 'two-person team; studied the AI security material', year: '2026' },
      { title: 'Fundamentos em Empreendedorismo (PRG0005)', detail: 'with team kyklos', year: '2026' },
    ],
    about: root(
      h2('Where I come from'),
      p('I grew up in a small countryside city in Brazil, with few resources. I got into the University of São Paulo through self-study, and I now study Computer Science at IME-USP.'),
      h2('How I think'),
      p('I am autistic, and I work best with explicit structure: formal notation, observable behavior, and decisions written down together with their trade-offs. You can see that in how this site is built: every number carries its method and its date, and every limit is stated next to the claim.'),
      p('I am a gay man. I say so because identity is part of the context in which I study and work, not because it is a feature of the software.'),
      p('I read software engineering through radical behaviorism (Skinner, Sidman): defect-detection cycles as contingencies to engineer, the four DORA measures and the Westrum typology as a way to see whether a team’s culture runs on chronic aversive control. Programmed instruction, the “teaching machine”, is how I design my own study.'),
      h2('How Xnths works'),
      p('Xnths is a consultancy I have run since 2015. I work AI-first: Claude Code plays the part of a junior developer, and I act as specification author, reviewer and architectural judge. I estimate a speed gain of 60% or more, with the review step staying entirely mine.'),
      h2('Where this is going'),
      p('USP Aberta continues as my research object: I am preparing a master’s research plan at the Graduate Program in Computer Science at IME-USP with Prof. Alfredo Goldman, followed by a doctorate. The goal is university teaching, because the classes I have taught are where I have seen the strongest effect of the work I do.'),
      p(b('Languages. '), 'Portuguese (native), English (C1, Michigan English Test).'),
    ),
  },
  'pt-BR': {
    positioning: 'Engenharia de software para dados acadêmicos abertos',
    affiliationLine: 'Xnths · IME-USP · São Paulo',
    shortBio:
      'Sou engenheiro de software e de dados e estudante de Ciência da Computação no IME-USP. Amo estudar e sou autista: penso melhor com estrutura, notação formal e passos pequenos e cuidadosos. Passo meu tempo onde recuperação de informação, engenharia de dados e ciência do comportamento se encontram, e o que mais construo hoje é o USP Aberta, uma plataforma que torna pesquisável a produção de pesquisa da Universidade de São Paulo.',
    contact: { email: 'jonathas@xnths.com', note: 'Projetos, colaboração em pesquisa ou uma conversa sobre dados acadêmicos abertos.' },
    seoDefaults: {
      title: 'Jonathas Castilho — Xnths | Engenharia de software para dados acadêmicos abertos',
      description:
        'Jonathas Castilho é engenheiro de software e de dados e estudante de Ciência da Computação no IME-USP, e constrói o USP Aberta, uma plataforma de dados acadêmicos abertos da Universidade de São Paulo.',
    },
    capabilities: [
      { key: 'data', title: 'Engenharia de dados', summary: 'ETL com sanitização, ligação de registros entre 1,5 milhão de autorias, bots de coleta educados e um modelo de qualidade de dados medido.', projectSlug: 'usp-aberta', anchor: 'engenharia-de-dados' },
      { key: 'search', title: 'Busca e recuperação de informação', summary: 'Ranqueamento por campo no Elasticsearch, um harness offline de nDCG com 1.200 consultas e telemetria de cliques para learning to rank.', projectSlug: 'usp-aberta', anchor: 'busca-e-recuperacao-de-informacao' },
      { key: 'performance', title: 'Desempenho e cache', summary: 'Cache em três camadas, correções de falta de memória e JavaScript do primeiro carregamento até 76% menor.', projectSlug: 'usp-aberta', anchor: 'cache-e-desempenho' },
      { key: 'devops', title: 'DevOps e SRE', summary: 'Imagens imutáveis com rollback em um comando, infraestrutura como código, página de status pública e medidas no estilo DORA.', projectSlug: 'usp-aberta', anchor: 'devops' },
      { key: 'security', title: 'Segurança', summary: 'Um serviço de identidade em Go com JWT RS256, login somente Google, trilha de auditoria à prova de adulteração e varreduras em camadas.', projectSlug: 'usp-aberta', anchor: 'seguranca' },
      { key: 'privacy', title: 'Privacidade e conformidade', summary: 'Registro de tratamento da LGPD, dados pessoais removidos duas vezes, retenção documentada e e-mail com consentimento primeiro.', projectSlug: 'usp-aberta', anchor: 'privacidade-e-conformidade' },
      { key: 'seo', title: 'SEO e descoberta por LLMs', summary: 'Um sitemap de 3 para mais de 6.200 URLs, dados estruturados, llms.txt e perfis compactos em Markdown.', projectSlug: 'usp-aberta', anchor: 'seo-e-descoberta-por-llms' },
      { key: 'ai', title: 'Engenharia de IA', summary: 'Os embeddings estão calculados; um pipeline de geração aumentada por recuperação sobre os dados do USP Aberta é o próximo passo de pesquisa.', projectSlug: 'usp-aberta', anchor: 'proximos-passos' },
    ],
    community: [
      { title: 'Symcomp', detail: 'fundei e liderei o grupo; montei e treinei um time de desenvolvimento, organizei a Semana da Computação e dei aulas sobre refatoração, padrões de projeto e engenharia de requisitos', year: '2023–26' },
      { title: 'XP Conference 2026', detail: 'voluntário', year: '2026' },
      { title: 'CBSoft 2026', detail: 'voluntário', year: '2026' },
      { title: 'IEEE CS Global Student Challenge 2026', detail: 'time de duas pessoas; estudei o material de segurança de IA', year: '2026' },
      { title: 'Fundamentos em Empreendedorismo (PRG0005)', detail: 'com o time kyklos', year: '2026' },
    ],
    about: root(
      h2('De onde eu venho'),
      p('Cresci em uma cidade pequena do interior do Brasil, com poucos recursos. Entrei na Universidade de São Paulo estudando por conta própria e hoje curso Ciência da Computação no IME-USP.'),
      h2('Como eu penso'),
      p('Sou autista e trabalho melhor com estrutura explícita: notação formal, comportamento observável e decisões escritas junto com seus trade-offs. Isso aparece no jeito que este site é construído: todo número traz o método e a data, e todo limite vem declarado ao lado da afirmação.'),
      p('Sou um homem gay. Digo isso porque identidade faz parte do contexto em que estudo e trabalho, e não porque seja uma característica do software.'),
      p('Leio a engenharia de software pelo behaviorismo radical (Skinner, Sidman): ciclos de detecção de defeitos como contingências a projetar, as quatro métricas DORA e a tipologia de Westrum como forma de ver se a cultura de um time funciona à base de controle aversivo crônico. A instrução programada, a “máquina de ensinar”, é como projeto o meu próprio estudo.'),
      h2('Como a Xnths trabalha'),
      p('A Xnths é uma consultoria que mantenho desde 2015. Trabalho com IA em primeiro lugar: o Claude Code faz o papel de desenvolvedor júnior e eu atuo como autor das especificações, revisor e juiz da arquitetura. Estimo um ganho de velocidade de 60% ou mais, com a etapa de revisão continuando inteiramente minha.'),
      h2('Para onde isto vai'),
      p('O USP Aberta continua como meu objeto de pesquisa: preparo um plano de pesquisa de mestrado no Programa de Pós-Graduação em Ciência da Computação do IME-USP com o Prof. Alfredo Goldman, seguido de doutorado. O objetivo é a docência universitária, porque as aulas que já dei são onde vi o maior efeito do trabalho que faço.'),
      p(b('Idiomas. '), 'Português (nativo), inglês (C1, Michigan English Test).'),
    ),
  },
}
