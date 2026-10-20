import { callout, cite, h2, p, pipeline, root, ul, b } from '../../lexical'

type Localized<T> = { en: T; 'pt-BR': T }

type ProjectSeed = {
  slug: string
  kind: 'caseStudy' | 'project' | 'subproject'
  status: 'live' | 'inProgress' | 'completed' | 'archived'
  featured: boolean
  order: number
  parent?: string
  period?: { start: string; end?: string; ongoing?: boolean }
  stack: string[]
  data: Localized<Record<string, unknown>>
}

const agoraRefs = [
  { key: 'fs1969', title: 'A theory for record linkage', authors: 'Fellegi, I. P., & Sunter, A. B.', venue: 'Journal of the American Statistical Association 64(328)', year: '1969' },
  { key: 'rfc5861', title: 'HTTP Cache-Control Extensions for Stale Content (RFC 5861)', authors: 'Nottingham, M.', year: '2010', url: 'https://www.rfc-editor.org/rfc/rfc5861' },
]

export const otherProjects: ProjectSeed[] = [
  {
    slug: 'agora',
    kind: 'subproject',
    status: 'live',
    featured: false,
    order: 20,
    parent: 'usp-aberta',
    stack: ['Go', 'Apache Airflow', 'PostgreSQL', 'REST', 'iCalendar'],
    data: {
      en: {
        title: 'Ágora: the all-USP events calendar',
        summary:
          'A calendar of lectures, symposia, concerts and exhibitions across the University of São Paulo, assembled from announcements and enriched from open sources.',
        role: 'Sole engineer',
        attribution: 'Engineered by Xnths as part of USP Aberta. Formerly called Orfeu.',
        partners: [],
        links: [{ label: 'uspaberta.ime.usp.br/agenda', url: 'https://uspaberta.ime.usp.br/agenda', kind: 'live' }],
        keyMetrics: [
          { value: '41', label: 'open enrichment providers' },
          { value: '83', label: 'events recovered from a replay of 233 sheet rows', context: 'after fixing the load step; 49 rows quarantined' },
        ],
        references: agoraRefs,
        meta: { title: 'Ágora — all-USP events calendar', description: 'How Xnths built Ágora: an idempotent events pipeline with quarantine, Fellegi–Sunter style deduplication and 41 open enrichment providers.' },
        body: root(
          h2('Problem'),
          p('Events at a university of this size are announced everywhere and collected nowhere. The proof of concept started from announcement e-mails and a spreadsheet.'),
          h2('Pipeline'),
          pipeline({
            title: 'Events pipeline',
            caption: 'Rows that fail validation go to quarantine instead of being dropped or loaded.',
            layers: [
              { label: 'Extract', nodes: ['published sheet', 'adapters'] },
              { label: 'Normalize', nodes: ['dates', 'units'] },
              { label: 'Validate', nodes: ['quarantine'] },
              { label: 'Deduplicate', nodes: ['blocking + similarity'] },
              { label: 'Load', nodes: ['idempotent'] },
            ],
          }),
          p(
            b('Deduplication. '),
            'Duplicates are merged by blocking on title and date, then comparing start times (within 30 minutes) and venue similarity (at least 0.8), in the spirit of Fellegi and Sunter',
            cite('fs1969'),
            '.',
          ),
          ul(
            ['Source adapters follow the adapter pattern, so a new source is a new file and not a change to the core.'],
            ['Enrichment crosswalks identifiers with union-find over equivalences (at most three rounds) and caches for seven days, serving stale data on upstream errors',
              cite('rfc5861'), '.'],
          ),
          callout(
            'finding',
            'A fix to the load step changed the result of replaying the same 233 spreadsheet rows from zero new events to 83, with 49 rows correctly quarantined. The replay is now a regression test.',
            'Idempotency, tested',
          ),
        ),
      },
      'pt-BR': {
        title: 'Ágora: o calendário de eventos de toda a USP',
        summary:
          'Um calendário de palestras, simpósios, concertos e exposições da Universidade de São Paulo, montado a partir de divulgações e enriquecido com fontes abertas.',
        role: 'Engenheiro único',
        attribution: 'Engenharia da Xnths como parte do USP Aberta. Antes chamado Orfeu.',
        partners: [],
        links: [{ label: 'uspaberta.ime.usp.br/agenda', url: 'https://uspaberta.ime.usp.br/agenda', kind: 'live' }],
        keyMetrics: [
          { value: '41', label: 'provedores abertos de enriquecimento' },
          { value: '83', label: 'eventos recuperados num replay de 233 linhas da planilha', context: 'após corrigir a etapa de carga; 49 linhas em quarentena' },
        ],
        references: agoraRefs,
        meta: { title: 'Ágora — calendário de eventos da USP', description: 'Como a Xnths construiu a Ágora: um pipeline idempotente de eventos com quarentena, deduplicação no estilo Fellegi–Sunter e 41 provedores abertos de enriquecimento.' },
        body: root(
          h2('Problema'),
          p('Em uma universidade deste tamanho, os eventos são divulgados em todo lugar e reunidos em nenhum. A prova de conceito partiu de e-mails de divulgação e de uma planilha.'),
          h2('Pipeline'),
          pipeline({
            title: 'Pipeline de eventos',
            caption: 'Linhas que falham na validação vão para quarentena, em vez de serem descartadas ou carregadas.',
            layers: [
              { label: 'Extrair', nodes: ['planilha publicada', 'adaptadores'] },
              { label: 'Normalizar', nodes: ['datas', 'unidades'] },
              { label: 'Validar', nodes: ['quarentena'] },
              { label: 'Deduplicar', nodes: ['blocagem + similaridade'] },
              { label: 'Carregar', nodes: ['idempotente'] },
            ],
          }),
          p(
            b('Deduplicação. '),
            'Duplicatas são unidas por blocagem em título e data, comparando depois o horário de início (dentro de 30 minutos) e a similaridade do local (no mínimo 0,8), no espírito de Fellegi e Sunter',
            cite('fs1969'),
            '.',
          ),
          ul(
            ['Os adaptadores de fonte seguem o padrão adapter: uma fonte nova é um arquivo novo, não uma mudança no núcleo.'],
            ['O enriquecimento cruza identificadores com union-find sobre equivalências (no máximo três rodadas) e guarda cache por sete dias, servindo dados defasados quando a origem falha',
              cite('rfc5861'), '.'],
          ),
          callout(
            'finding',
            'Uma correção na etapa de carga mudou o resultado do replay das mesmas 233 linhas da planilha de zero evento novo para 83, com 49 linhas corretamente em quarentena. O replay agora é um teste de regressão.',
            'Idempotência, testada',
          ),
        ),
      },
    },
  },
  {
    slug: 'matematecar',
    kind: 'project',
    status: 'completed',
    featured: true,
    order: 30,
    stack: ['Unity 6000.1', 'React Native', 'Viro React', 'ARCore', 'Kotlin'],
    data: {
      en: {
        title: 'MatematecAR',
        summary:
          'An augmented-reality mobile app for mathematics education, and the case study of the bachelor’s thesis “Agile as Rule-Governed Behavior”.',
        role: 'Engineer and researcher',
        attribution: 'Engineered by Xnths. Thesis advisor: Prof. Eduardo Colli, IME-USP.',
        partners: [],
        links: [],
        keyMetrics: [
          { value: '2 years', label: 'AR registration defect resolved', context: 'fiducial markers + plane detection' },
          { value: 'Weekly', label: 'Scrum sprints with burndown and cumulative-flow data' },
        ],
        references: [],
        meta: { title: 'MatematecAR — AR app and thesis case study', description: 'A hybrid of fiducial markers and plane detection that resolved a two-year augmented-reality registration defect, studied through agile process data.' },
        body: root(
          h2('Problem'),
          p('Virtual objects drifted away from the surfaces they were anchored to. The registration defect had survived two years of attempts with a single tracking approach.'),
          h2('Decision'),
          p('A hybrid: fiducial markers establish a reliable origin and scale, and plane detection keeps the content anchored as the camera moves. The app combines Unity 6000.1, a React Native shell with Viro React, and ARCore on Kotlin.'),
          h2('Process as data'),
          p('The project doubles as the case study of the thesis. Work ran in weekly Scrum sprints and burndown and cumulative-flow data were recorded, so the agile practices could be analyzed as behavior governed by rules.'),
        ),
      },
      'pt-BR': {
        title: 'MatematecAR',
        summary:
          'Um aplicativo móvel de realidade aumentada para o ensino de matemática e o estudo de caso do TCC “Ágil como Comportamento Governado por Regras”.',
        role: 'Engenheiro e pesquisador',
        attribution: 'Engenharia da Xnths. Orientador do TCC: Prof. Eduardo Colli, IME-USP.',
        partners: [],
        links: [],
        keyMetrics: [
          { value: '2 anos', label: 'defeito de registro de RA resolvido', context: 'marcadores fiduciais + detecção de planos' },
          { value: 'Semanais', label: 'sprints Scrum com dados de burndown e fluxo acumulado' },
        ],
        references: [],
        meta: { title: 'MatematecAR — app de RA e estudo de caso do TCC', description: 'Um híbrido de marcadores fiduciais e detecção de planos que resolveu um defeito de registro de realidade aumentada de dois anos, estudado por meio de dados do processo ágil.' },
        body: root(
          h2('Problema'),
          p('Objetos virtuais se afastavam das superfícies em que estavam ancorados. O defeito de registro sobreviveu a dois anos de tentativas com uma única abordagem de rastreamento.'),
          h2('Decisão'),
          p('Um híbrido: marcadores fiduciais estabelecem uma origem e uma escala confiáveis, e a detecção de planos mantém o conteúdo ancorado enquanto a câmera se move. O app combina Unity 6000.1, uma casca em React Native com Viro React e ARCore em Kotlin.'),
          h2('Processo como dado'),
          p('O projeto também é o estudo de caso do TCC. O trabalho seguiu sprints Scrum semanais, com dados de burndown e de fluxo acumulado registrados, para que as práticas ágeis pudessem ser analisadas como comportamento governado por regras.'),
        ),
      },
    },
  },
  {
    slug: 'formatura',
    kind: 'subproject',
    status: 'live',
    featured: false,
    order: 40,
    parent: 'usp-aberta',
    stack: ['TypeScript', 'Next.js', 'PDF parsing'],
    data: {
      en: {
        title: 'Graduation checker',
        summary:
          'A tool for BCC students at IME-USP: upload your transcript and see whether you are on track to graduate, with the transcript parsed entirely in your browser.',
        role: 'Sole engineer',
        attribution: 'Engineered by Xnths as part of USP Aberta.',
        partners: [],
        links: [{ label: 'uspaberta.ime.usp.br/formatura', url: 'https://uspaberta.ime.usp.br/formatura', kind: 'live' }],
        keyMetrics: [{ value: '0', label: 'bytes of the transcript sent to a server', context: 'client-only PDF parsing' }],
        references: [],
        meta: { title: 'Graduation checker', description: 'A client-side transcript parser that checks graduation progress against curriculum versions recovered from the Wayback Machine.' },
        body: root(
          h2('Design'),
          ul(
            [b('Privacy by architecture. '), 'the PDF is parsed in the browser, so there is nothing to protect on a server.'],
            [b('Curriculum versions. '), 'versions of the program’s curriculum are recovered from web archives, because the rules that apply depend on when a student entered, including the window before academic expiry.'],
            [b('Optimal allocation. '), 'credits are allocated to requirement groups so that the best possible outcome is found, not the first one.'],
          ),
        ),
      },
      'pt-BR': {
        title: 'Verificador de formatura',
        summary:
          'Uma ferramenta para estudantes de BCC do IME-USP: envie seu histórico e veja se você está no caminho para se formar, com o histórico lido inteiramente no seu navegador.',
        role: 'Engenheiro único',
        attribution: 'Engenharia da Xnths como parte do USP Aberta.',
        partners: [],
        links: [{ label: 'uspaberta.ime.usp.br/formatura', url: 'https://uspaberta.ime.usp.br/formatura', kind: 'live' }],
        keyMetrics: [{ value: '0', label: 'bytes do histórico enviados a um servidor', context: 'leitura do PDF somente no cliente' }],
        references: [],
        meta: { title: 'Verificador de formatura', description: 'Um leitor de histórico no cliente que verifica o progresso para a formatura contra versões do currículo recuperadas do Wayback Machine.' },
        body: root(
          h2('Projeto'),
          ul(
            [b('Privacidade por arquitetura. '), 'o PDF é lido no navegador, então não há nada a proteger em um servidor.'],
            [b('Versões do currículo. '), 'versões do currículo do curso são recuperadas de arquivos da web, porque as regras aplicáveis dependem de quando o aluno ingressou, incluindo a janela antes do jubilamento.'],
            [b('Alocação ótima. '), 'os créditos são alocados aos grupos de requisitos de forma a encontrar o melhor resultado possível, e não o primeiro.'],
          ),
        ),
      },
    },
  },
  {
    slug: 'clinic-website',
    kind: 'project',
    status: 'live',
    featured: false,
    order: 50,
    stack: [],
    data: {
      en: {
        title: 'Psychology clinic website',
        summary: 'A website for a psychology practice, built and maintained by Xnths for a client.',
        attribution: 'Built and maintained by Xnths for a client.',
        partners: [],
        links: [{ label: 'psicologojoaofernandes.com', url: 'https://psicologojoaofernandes.com', kind: 'live' }],
        keyMetrics: [],
        references: [],
        meta: { title: 'Psychology clinic website', description: 'Client work by Xnths: a website for a psychology practice.' },
        body: root(p('Client work, built by Xnths. Details are kept short out of respect for the client’s privacy.')),
      },
      'pt-BR': {
        title: 'Site de clínica de psicologia',
        summary: 'Um site para um consultório de psicologia, construído e mantido pela Xnths para um cliente.',
        attribution: 'Construído e mantido pela Xnths para um cliente.',
        partners: [],
        links: [{ label: 'psicologojoaofernandes.com', url: 'https://psicologojoaofernandes.com', kind: 'live' }],
        keyMetrics: [],
        references: [],
        meta: { title: 'Site de clínica de psicologia', description: 'Trabalho para cliente da Xnths: um site para um consultório de psicologia.' },
        body: root(p('Trabalho para cliente, construído pela Xnths. Os detalhes são mantidos curtos por respeito à privacidade do cliente.')),
      },
    },
  },
]
