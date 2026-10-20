import type { Locale } from '@/i18n/config'

type Localized = Record<Locale, string>

export type ColophonRow = {
  id: string
  finding: Localized
  decision: Localized
}

export const colophonRows: ColophonRow[] = [
  {
    id: 'lindgaard2006',
    finding: {
      en: 'Visual-appeal judgments formed in 50 ms agree with judgments made after much longer viewing.',
      'pt-BR': 'Julgamentos de apelo visual formados em 50 ms concordam com os feitos após uma observação bem mais longa.',
    },
    decision: {
      en: 'The first viewport carries only a name, a positioning line and the USP Aberta headline numbers. No carousel or animation is needed to understand the page.',
      'pt-BR': 'A primeira tela traz apenas o nome, uma linha de posicionamento e os números centrais do USP Aberta. Nenhum carrossel ou animação é necessário para entender a página.',
    },
  },
  {
    id: 'tuch2012',
    finding: {
      en: 'Websites with low visual complexity and high prototypicality were rated most appealing, with effects visible from 17 ms.',
      'pt-BR': 'Sites com baixa complexidade visual e alta prototipicidade foram os mais bem avaliados, com efeitos visíveis a partir de 17 ms.',
    },
    decision: {
      en: 'A conventional portfolio skeleton (top navigation, name, featured work, index, contact), a single reading column and generous whitespace. No terminal, desktop or 3D gimmicks.',
      'pt-BR': 'Um esqueleto convencional de portfólio (navegação superior, nome, trabalho em destaque, índice, contato), uma única coluna de leitura e bastante espaço em branco. Sem truques de terminal, desktop ou 3D.',
    },
  },
  {
    id: 'reinecke2014',
    finding: {
      en: 'Preferred colorfulness and visual complexity differ across audiences; higher education generally lowers the preference for colorfulness.',
      'pt-BR': 'A colorfulness e a complexidade visual preferidas variam entre públicos; maior escolaridade geralmente reduz a preferência por colorfulness.',
    },
    decision: {
      en: 'The audience is academic and technical, so the palette is muted neutrals with a single accent, reserved for links and figure highlights.',
      'pt-BR': 'O público é acadêmico e técnico, então a paleta é de neutros suaves com um único acento, reservado a links e destaques de figuras.',
    },
  },
  {
    id: 'tractinsky2000',
    finding: {
      en: 'Perceived aesthetics correlate strongly with perceived usability, before and after use.',
      'pt-BR': 'A estética percebida correlaciona-se fortemente com a usabilidade percebida, antes e depois do uso.',
    },
    decision: {
      en: 'Effort goes into typography (type scale, rhythm, tabular numerals) instead of decoration.',
      'pt-BR': 'O esforço vai para a tipografia (escala, ritmo, numerais tabulares) em vez de decoração.',
    },
  },
  {
    id: 'fogg2002',
    finding: {
      en: 'In a study with 2,684 participants, the “design look” of a site was the most cited credibility cue (46.1% of comments), followed by information structure.',
      'pt-BR': 'Em um estudo com 2.684 participantes, o “visual do design” foi o sinal de credibilidade mais citado (46,1% dos comentários), seguido da estrutura da informação.',
    },
    decision: {
      en: 'One consistent design system across every route and a clear information architecture.',
      'pt-BR': 'Um único sistema de design consistente em todas as rotas e uma arquitetura de informação clara.',
    },
  },
  {
    id: 'fogg2003',
    finding: {
      en: 'Credibility depends on what users notice (prominence) and how they interpret it.',
      'pt-BR': 'A credibilidade depende do que o usuário percebe (proeminência) e de como interpreta isso.',
    },
    decision: {
      en: 'Credentials are prominent and easy to interpret: institutional credits, a link to the live system, dates, and the method next to every number.',
      'pt-BR': 'As credenciais são proeminentes e fáceis de interpretar: créditos institucionais, link para o sistema no ar, datas e o método junto de cada número.',
    },
  },
  {
    id: 'marlow2013',
    finding: {
      en: 'Evaluators of developers rely on visible activity traces as signals of skill and commitment.',
      'pt-BR': 'Quem avalia desenvolvedores usa rastros visíveis de atividade como sinais de habilidade e comprometimento.',
    },
    decision: {
      en: 'Real artifacts instead of self-description: the live system, architecture figures, test inventory, commit history span, changelog cadence and benchmarks. No skill progress bars.',
      'pt-BR': 'Artefatos reais em vez de autodescrição: o sistema no ar, figuras de arquitetura, inventário de testes, período do histórico de commits, cadência do changelog e benchmarks. Sem barras de progresso de habilidades.',
    },
  },
  {
    id: 'singer2013',
    finding: {
      en: 'Recruiters struggle to interpret and trust aggregated signals about developers.',
      'pt-BR': 'Recrutadores têm dificuldade de interpretar e confiar em sinais agregados sobre desenvolvedores.',
    },
    decision: {
      en: 'Every metric states baseline, result, date and method, and caveats are written down (for example, the graph benchmark result holds only for one-hop traversals).',
      'pt-BR': 'Toda métrica traz linha de base, resultado, data e método, e as ressalvas são escritas (por exemplo, o resultado do benchmark de grafos vale apenas para travessias de um salto).',
    },
  },
  {
    id: 'dabbish2012',
    finding: {
      en: 'People make inferences about skills and commitment from visible, networked activity.',
      'pt-BR': 'As pessoas fazem inferências sobre habilidades e comprometimento a partir de atividade visível e em rede.',
    },
    decision: {
      en: 'The project timeline and the public changelog are linked, so the cadence of work can be checked.',
      'pt-BR': 'A linha do tempo do projeto e o changelog público são linkados, para que o ritmo do trabalho possa ser conferido.',
    },
  },
  {
    id: 'behroozi2019',
    finding: {
      en: 'Developers criticize technical hiring for its lack of real-world relevance.',
      'pt-BR': 'Desenvolvedores criticam as seleções técnicas pela falta de relevância no mundo real.',
    },
    decision: {
      en: 'The case study has real-world depth: decisions, trade-offs, incidents and post-mortems rather than puzzles.',
      'pt-BR': 'O estudo de caso tem profundidade do mundo real: decisões, trade-offs, incidentes e post-mortems, em vez de quebra-cabeças.',
    },
  },
  {
    id: 'li2015',
    finding: {
      en: 'Interviews with 59 experienced engineers identified attributes of great engineers that go well beyond writing code.',
      'pt-BR': 'Entrevistas com 59 engenheiros experientes identificaram atributos de grandes engenheiros que vão muito além de escrever código.',
    },
    decision: {
      en: 'Each case-study section follows Problem → Decision → Trade-off → Result, showing judgment and not only output.',
      'pt-BR': 'Cada seção do estudo de caso segue Problema → Decisão → Trade-off → Resultado, mostrando julgamento e não só entrega.',
    },
  },
  {
    id: 'segel2010',
    finding: {
      en: 'The “martini glass” structure: an author-driven narrative first, then reader-driven exploration.',
      'pt-BR': 'A estrutura “taça de martíni”: primeiro uma narrativa conduzida pelo autor, depois exploração conduzida pelo leitor.',
    },
    decision: {
      en: 'The case study opens with a guided narrative; a sticky table of contents and deep links to the live system then let readers explore.',
      'pt-BR': 'O estudo de caso abre com uma narrativa guiada; um sumário fixo e links diretos para o sistema no ar deixam o leitor explorar depois.',
    },
  },
  {
    id: 'pirolli1999',
    finding: {
      en: 'People forage for information by following “information scent”.',
      'pt-BR': 'As pessoas procuram informação seguindo o “cheiro da informação”.',
    },
    decision: {
      en: 'Descriptive link labels (“Read the case study”, not “More”), a capability index that names each topic, and anchored section headings.',
      'pt-BR': 'Rótulos de link descritivos (“Ler o estudo de caso”, não “Mais”), um índice de capacidades que nomeia cada tema e títulos de seção com âncoras.',
    },
  },
  {
    id: 'spence1973',
    finding: {
      en: 'Signals are credible when they are costly to fake.',
      'pt-BR': 'Sinais são críveis quando são custosos de falsificar.',
    },
    decision: {
      en: 'Verifiable specifics (numbers, public URLs, papers) are preferred over adjectives.',
      'pt-BR': 'Específicos verificáveis (números, URLs públicas, artigos) são preferidos a adjetivos.',
    },
  },
  {
    id: 'wcag22',
    finding: {
      en: 'WCAG 2.2 defines testable accessibility criteria.',
      'pt-BR': 'As WCAG 2.2 definem critérios de acessibilidade testáveis.',
    },
    decision: {
      en: 'AA contrast in both themes, visible focus, reduced-motion support, a skip link and semantic landmarks, checked automatically with axe.',
      'pt-BR': 'Contraste AA nos dois temas, foco visível, suporte a redução de movimento, link de salto e marcos semânticos, verificados automaticamente com axe.',
    },
  },
]

export type ColophonReference = { id: string; citation: string; url?: string }

export const colophonReferences: ColophonReference[] = [
  {
    id: 'lindgaard2006',
    citation:
      'Lindgaard, G., Fernandes, G., Dudek, C., & Brown, J. (2006). Attention web designers: You have 50 milliseconds to make a good first impression! Behaviour & Information Technology, 25(2), 115–126.',
  },
  {
    id: 'tuch2012',
    citation:
      'Tuch, A. N., Presslaber, E. E., Stöcklin, M., Opwis, K., & Bargas-Avila, J. A. (2012). The role of visual complexity and prototypicality regarding first impression of websites. International Journal of Human-Computer Studies, 70(11), 794–811.',
  },
  {
    id: 'reinecke2014',
    citation:
      'Reinecke, K., & Gajos, K. Z. (2014). Quantifying visual preferences around the world. Proceedings of CHI ’14, 11–20.',
  },
  {
    id: 'tractinsky2000',
    citation:
      'Tractinsky, N., Katz, A. S., & Ikar, D. (2000). What is beautiful is usable. Interacting with Computers, 13(2), 127–145.',
    url: 'https://doi.org/10.1016/S0953-5438(00)00031-X',
  },
  {
    id: 'fogg2002',
    citation:
      'Fogg, B. J., et al. (2002). How do people evaluate a Web site’s credibility? Results from a large study. Stanford Persuasive Technology Lab and Consumer WebWatch.',
  },
  {
    id: 'fogg2003',
    citation:
      'Fogg, B. J. (2003). Prominence-interpretation theory: Explaining how people assess credibility online. CHI ’03 Extended Abstracts, 722–723.',
  },
  {
    id: 'marlow2013',
    citation:
      'Marlow, J., & Dabbish, L. (2013). Activity traces and signals in software developer recruitment and hiring. Proceedings of CSCW ’13.',
  },
  {
    id: 'singer2013',
    citation:
      'Singer, L., Figueira Filho, F., Cleary, B., Treude, C., Storey, M.-A., & Schneider, K. (2013). Mutual assessment in the social programmer ecosystem: An empirical investigation of developer profile aggregators. Proceedings of CSCW ’13, 103–116.',
    url: 'https://doi.org/10.1145/2441776.2441791',
  },
  {
    id: 'dabbish2012',
    citation:
      'Dabbish, L., Stuart, C., Tsay, J., & Herbsleb, J. (2012). Social coding in GitHub: Transparency and collaboration in an open software repository. Proceedings of CSCW ’12.',
  },
  {
    id: 'behroozi2019',
    citation:
      'Behroozi, M., Parnin, C., & Barik, T. (2019). Hiring is broken: What do developers say about technical interviews? Proceedings of IEEE VL/HCC 2019.',
  },
  {
    id: 'li2015',
    citation:
      'Li, P. L., Ko, A. J., & Zhu, J. (2015). What makes a great software engineer? Proceedings of ICSE 2015, 700–710.',
  },
  {
    id: 'segel2010',
    citation:
      'Segel, E., & Heer, J. (2010). Narrative visualization: Telling stories with data. IEEE Transactions on Visualization and Computer Graphics, 16(6).',
    url: 'https://doi.org/10.1109/TVCG.2010.179',
  },
  {
    id: 'pirolli1999',
    citation: 'Pirolli, P., & Card, S. (1999). Information foraging. Psychological Review, 106(4), 643–675.',
  },
  {
    id: 'spence1973',
    citation: 'Spence, M. (1973). Job market signaling. The Quarterly Journal of Economics, 87(3), 355–374.',
  },
  {
    id: 'wcag22',
    citation: 'W3C (2023). Web Content Accessibility Guidelines (WCAG) 2.2.',
    url: 'https://www.w3.org/TR/WCAG22/',
  },
]
