type Localized<T> = { en: T; 'pt-BR': T }

type PublicationSeed = {
  slug: string
  type: 'thesis' | 'conferencePaper' | 'journalArticle' | 'protocol'
  status: 'published' | 'submitted' | 'inPreparation' | 'inactive'
  year: number
  featured: boolean
  order: number
  authors: { name: string; affiliation?: string; isSelf?: boolean }[]
  advisor?: string
  venueShort?: string
  relatedProjects?: string[]
  data: Localized<Record<string, unknown>>
}

const me = { name: 'Jonathas Castilho', affiliation: 'IME-USP', isSelf: true }

export const publications: PublicationSeed[] = [
  {
    slug: 'information-retrieval-lattes',
    type: 'conferencePaper',
    status: 'submitted',
    year: 2026,
    featured: true,
    order: 10,
    authors: [me],
    venueShort: 'SIICUSP 2026',
    relatedProjects: ['usp-aberta'],
    data: {
      en: {
        title: 'Information retrieval over academic curricula: the case of the Lattes platform',
        venue: 'SIICUSP 2026, University of São Paulo International Symposium of Undergraduate Research',
        abstract:
          'Search over academic curricula mixes names, research areas and free-text biographies, which behave differently under lexical ranking. We evaluate BM25 against language models with Dirichlet smoothing on the USP Aberta search subsystem, measuring nDCG@3 across classes of queries over real faculty data.',
        keywords: ['information retrieval', 'BM25', 'language models', 'nDCG', 'Lattes'],
        meta: { title: 'Information retrieval over academic curricula (SIICUSP 2026)', description: 'BM25 versus Dirichlet-smoothed language models on USP Aberta, evaluated with nDCG@3 across query classes.' },
      },
      'pt-BR': {
        title: 'Recuperação de informação em bases curriculares acadêmicas: o caso da plataforma Lattes',
        venue: 'SIICUSP 2026, Simpósio Internacional de Iniciação Científica e Tecnológica da USP',
        abstract:
          'A busca sobre currículos acadêmicos mistura nomes, áreas de pesquisa e biografias em texto livre, que se comportam de forma diferente sob ranqueamento lexical. Avaliamos o BM25 contra modelos de linguagem com suavização de Dirichlet no subsistema de busca do USP Aberta, medindo o nDCG@3 por classe de consulta sobre dados reais de docentes.',
        keywords: ['recuperação de informação', 'BM25', 'modelos de linguagem', 'nDCG', 'Lattes'],
        meta: { title: 'Recuperação de informação em bases curriculares (SIICUSP 2026)', description: 'BM25 versus modelos de linguagem com suavização de Dirichlet no USP Aberta, avaliados com nDCG@3 por classe de consulta.' },
      },
    },
  },
  {
    slug: 'usp-aberta-search-subsystem',
    type: 'conferencePaper',
    status: 'inPreparation',
    year: 2026,
    featured: true,
    order: 20,
    authors: [me],
    venueShort: 'SBC',
    relatedProjects: ['usp-aberta'],
    data: {
      en: {
        title: 'The USP Aberta search subsystem (working title)',
        venue: 'SBC-format paper',
        abstract:
          'An extended treatment of the same subsystem: field-specific similarity functions, the offline evaluation harness, and the lessons from running it on public traffic.',
        keywords: ['information retrieval', 'search engineering', 'evaluation'],
        meta: { title: 'The USP Aberta search subsystem (in preparation)', description: 'A paper in preparation on field-specific ranking and offline evaluation in USP Aberta.' },
      },
      'pt-BR': {
        title: 'O subsistema de busca do USP Aberta (título provisório)',
        venue: 'Artigo em formato SBC',
        abstract:
          'Um tratamento estendido do mesmo subsistema: funções de similaridade por campo, o harness de avaliação offline e as lições de operá-lo com tráfego público.',
        keywords: ['recuperação de informação', 'engenharia de busca', 'avaliação'],
        meta: { title: 'O subsistema de busca do USP Aberta (em preparação)', description: 'Um artigo em preparação sobre ranqueamento por campo e avaliação offline no USP Aberta.' },
      },
    },
  },
  {
    slug: 'agile-as-rule-governed-behavior',
    type: 'thesis',
    status: 'inPreparation',
    year: 2026,
    featured: true,
    order: 30,
    authors: [me],
    advisor: 'Prof. Dr. Eduardo Colli',
    venueShort: 'BCC, IME-USP',
    relatedProjects: ['matematecar'],
    data: {
      en: {
        title: 'Agile as Rule-Governed Behavior',
        venue: 'Bachelor’s thesis, Computer Science (BCC), IME-USP',
        abstract:
          'A behavior-analytic reading of agile practice as rule-governed behavior, with MatematecAR as the case study: weekly Scrum sprints, burndown and cumulative-flow data, and the resolution of a long-standing augmented-reality defect.',
        keywords: ['agile', 'radical behaviorism', 'rule-governed behavior', 'Scrum'],
        meta: { title: 'Agile as Rule-Governed Behavior (bachelor’s thesis)', description: 'A behavior-analytic study of agile practice, with MatematecAR as the case study.' },
      },
      'pt-BR': {
        title: 'Ágil como Comportamento Governado por Regras',
        venue: 'Trabalho de conclusão de curso, Ciência da Computação (BCC), IME-USP',
        abstract:
          'Uma leitura analítico-comportamental da prática ágil como comportamento governado por regras, com o MatematecAR como estudo de caso: sprints Scrum semanais, dados de burndown e fluxo acumulado e a resolução de um defeito antigo de realidade aumentada.',
        keywords: ['ágil', 'behaviorismo radical', 'comportamento governado por regras', 'Scrum'],
        meta: { title: 'Ágil como Comportamento Governado por Regras (TCC)', description: 'Um estudo analítico-comportamental da prática ágil, com o MatematecAR como estudo de caso.' },
      },
    },
  },
  {
    slug: 'aversive-control-agile-teams',
    type: 'protocol',
    status: 'inactive',
    year: 2025,
    featured: false,
    order: 40,
    authors: [me],
    venueShort: 'SLR pilot',
    data: {
      en: {
        title: 'Effects of Aversive Control in Agile Teams',
        venue: 'Systematic literature review protocol and pilot (Kitchenham guidelines)',
        abstract:
          'A pilot systematic literature review and research proposal on how aversive control shapes agile teams. The work produced a protocol following Kitchenham’s guidelines and a pilot search; it is inactive and documented as exploratory.',
        keywords: ['systematic literature review', 'aversive control', 'agile teams'],
        meta: { title: 'Effects of Aversive Control in Agile Teams (SLR pilot)', description: 'A Kitchenham-protocol literature review pilot on aversive control in agile teams. Inactive.' },
      },
      'pt-BR': {
        title: 'Efeitos do Controle Aversivo em Times Ágeis',
        venue: 'Protocolo e piloto de revisão sistemática da literatura (diretrizes de Kitchenham)',
        abstract:
          'Uma revisão sistemática da literatura piloto e uma proposta de pesquisa sobre como o controle aversivo molda times ágeis. O trabalho produziu um protocolo seguindo as diretrizes de Kitchenham e uma busca-piloto; está inativo e documentado como exploratório.',
        keywords: ['revisão sistemática da literatura', 'controle aversivo', 'times ágeis'],
        meta: { title: 'Efeitos do Controle Aversivo em Times Ágeis (piloto de RSL)', description: 'Um piloto de revisão da literatura com protocolo de Kitchenham sobre controle aversivo em times ágeis. Inativo.' },
      },
    },
  },
]
