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

export const uspAbertaEn = {
  title: 'USP Aberta',
  summary:
    'An open-data platform that makes the research output of the University of São Paulo searchable: faculty, units, publications, collaboration networks, innovation and events, built from Lattes curricula and open sources.',
  role: 'Sole engineer: architecture, data engineering, search, backend, frontend, DevOps and security',
  attribution:
    'Engineered by Jonathas Castilho / Xnths as sole developer, in partnership with IME-USP and LabXP, supervised by Prof. Alfredo Goldman. An initiative of PRPI-USP.',
  partners: [
    { name: 'PRPI-USP', url: 'https://prpi.usp.br', role: 'initiative' },
    { name: 'IME-USP', url: 'https://www.ime.usp.br', role: 'partner' },
    { name: 'LabXP', role: 'lab' },
    { name: 'Prof. Alfredo Goldman', role: 'supervisor' },
  ],
  links: [
    { label: 'uspaberta.ime.usp.br', url: 'https://uspaberta.ime.usp.br', kind: 'live' },
    { label: 'Public status page', url: 'https://uspaberta.ime.usp.br/status', kind: 'live' },
    { label: 'llms.txt', url: 'https://uspaberta.ime.usp.br/llms.txt', kind: 'docs' },
  ],
  keyMetrics: [
    { value: '5,697', label: 'faculty indexed', context: 'with a Lattes curriculum and a unit' },
    { value: '1.34M', label: 'unique scholarly works', context: 'linked from 1.51M author-works' },
    { value: '≈4,800×', label: 'faster 1-hop graph traversal', context: 'Neo4j vs Elasticsearch, median' },
    { value: '6,200+', label: 'URLs in the sitemap', context: 'up from 3' },
    { value: '53', label: 'units across 8 campi', context: '43 schools, 4 museums, 6 institutes' },
    { value: '41', label: 'open data providers', context: 'free and open sources only' },
    { value: '1,087', label: 'commits in 15 months', context: '≈125k lines of Python, TypeScript, Go and SQL' },
  ],
  meta: {
    title: 'USP Aberta — case study',
    description:
      'How Xnths engineered USP Aberta, an open academic-data platform for the University of São Paulo: architecture, data engineering, search, caching, DevOps, security, privacy and SEO.',
  },
  references: [
    { key: 'lattes', title: 'Plataforma Lattes', authors: 'CNPq', url: 'https://lattes.cnpq.br' },
    { key: 'iso25012', title: 'ISO/IEC 25012:2008 — Data quality model', authors: 'ISO/IEC', year: '2008' },
    { key: 'rfc9309', title: 'Robots Exclusion Protocol (RFC 9309)', authors: 'Koster, M., et al.', year: '2022', url: 'https://www.rfc-editor.org/rfc/rfc9309' },
    { key: 'fs1969', title: 'A theory for record linkage', authors: 'Fellegi, I. P., & Sunter, A. B.', venue: 'Journal of the American Statistical Association 64(328)', year: '1969' },
    { key: 'zl2004', title: 'A study of smoothing methods for language models applied to information retrieval', authors: 'Zhai, C., & Lafferty, J.', venue: 'ACM Transactions on Information Systems 22(2)', year: '2004' },
    { key: 'jk2002', title: 'Cumulated gain-based evaluation of IR techniques', authors: 'Järvelin, K., & Kekäläinen, J.', venue: 'ACM Transactions on Information Systems 20(4)', year: '2002' },
    { key: 'forsgren2018', title: 'Accelerate: The Science of Lean Software and DevOps', authors: 'Forsgren, N., Humble, J., & Kim, G.', venue: 'IT Revolution', year: '2018' },
    { key: 'rfc7638', title: 'JSON Web Key (JWK) Thumbprint (RFC 7638)', authors: 'Jones, M., & Sakimura, N.', year: '2015', url: 'https://www.rfc-editor.org/rfc/rfc7638' },
    { key: 'rfc8058', title: 'Signaling One-Click Functionality for List Email Headers (RFC 8058)', authors: 'Levine, J., & Herkula, T.', year: '2017', url: 'https://www.rfc-editor.org/rfc/rfc8058' },
    { key: 'lgpd', title: 'Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)', authors: 'República Federativa do Brasil', year: '2018' },
    { key: 'tornhill2015', title: 'Your Code as a Crime Scene', authors: 'Tornhill, A.', venue: 'Pragmatic Bookshelf', year: '2015' },
    { key: 'ccbyncsa', title: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0', authors: 'Creative Commons', url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' },
  ],
  stack: [
    'Next.js 15', 'TypeScript', 'Tailwind v4', 'Django 5.2', 'DRF', 'Go', 'PostgreSQL', 'Elasticsearch 8.12',
    'Neo4j', 'Apache Airflow', 'Docker Compose', 'nginx', 'Prometheus', 'Grafana', 'Terraform', 'Ansible',
    'GitLab CI', 'pytest-bdd', 'Playwright', 'Cypress',
  ],
  body: root(
    h2('Context and problem'),
    p(
      'Brazil’s research CVs live in the Lattes platform',
      cite('lattes'),
      ', a rich but closed-shaped source: every curriculum is a large XML document and the data on USP’s faculty sat inside a 9 GB database view. Anyone asking simple questions (who works on this topic, which units collaborate, how is production distributed) had to go around the platform instead of through it.',
    ),
    p(
      b('Problem. '),
      'Make the university’s research output searchable and explorable by the public, without paid search APIs, with personal data kept out, and on infrastructure small enough for one engineer to operate. Early versions crashed from running out of memory under crawler and analytics load.',
    ),
    p(
      b('Decision. '),
      'Treat it as a data product: a reproducible pipeline from the source view to purpose-built stores (Elasticsearch for search and statistics, Neo4j for graph queries), a thin Django API, and a Next.js front end that renders everything server-side and caches aggressively.',
    ),
    callout(
      'note',
      'All figures are as of October 2026 and come from the repository’s documentation, benchmark raw data and the live site. Where a result has limits, the limit is stated next to it.',
      'How to read the numbers',
    ),

    h2('Architecture'),
    p(
      'One public entry point, one server-side path to the data. The browser never talks to Django directly: Next.js calls the API server-side, so the API surface can stay private and cache policy lives in one place.',
    ),
    architecture({
      title: 'USP Aberta system architecture',
      caption:
        'Layers from the edge to the data stores. Go services are small, single-purpose processes; each Postgres schema has its own role.',
      source: 'Repository architecture documentation, October 2026',
      layers: [
        { label: 'Edge', nodes: ['TLS at the USP edge', 'nginx (routing, rate limits)'] },
        { label: 'Web', nodes: ['Next.js 15 (SSR + ISR)', 'TypeScript', 'Tailwind v4'] },
        { label: 'API', nodes: ['Django 5.2 + DRF', 'Gunicorn', 'pytest-bdd'] },
        { label: 'Go services', nodes: ['auth-server (JWT, OAuth)', 'Ágora (events)', 'Hermes (e-mail)', 'Argos (status)'] },
        { label: 'Pipelines', nodes: ['Airflow 3: Mnemosine bots', 'Ágora DAGs', 'ETL and reindex jobs'] },
        { label: 'Data', nodes: ['PostgreSQL (isolated schemas)', 'Elasticsearch 8.12', 'Neo4j 5', 'Apache Jena Fuseki (RDF)'] },
        { label: 'Operations', nodes: ['Prometheus', 'Grafana', 'Alertmanager', 'blackbox probes'] },
      ],
    }),
    techStack([
      { category: 'Application', items: ['Next.js 15', 'React 19', 'TypeScript 5', 'Tailwind v4', 'Django 5.2', 'DRF', 'Go'] },
      { category: 'Data', items: ['PostgreSQL', 'Elasticsearch 8.12', 'Neo4j 5', 'Apache Airflow', 'Apache Jena Fuseki'] },
      { category: 'Delivery', items: ['Docker Compose', 'GitLab CI', 'Terraform', 'Ansible', 'systemd'] },
      { category: 'Quality', items: ['pytest-bdd', 'Vitest', 'Playwright + axe', 'Cypress', 'k6', 'OWASP ZAP'] },
    ]),
    callout(
      'tradeoff',
      'Elasticsearch handles search and every statistics aggregation; Neo4j serves only the collaboration graph. Two engines cost operational attention, but each does the job the other does badly (see the graph benchmark below).',
      'Polyglot persistence',
    ),

    h2('Data engineering'),
    p(
      b('Problem. '),
      'The source is a database view of raw curricula that includes personal data, duplicates and uneven quality; the product needs clean, deduplicated, privacy-safe documents, refreshed repeatedly without downtime.',
    ),
    p(
      b('Decision. '),
      'A dedicated read-only role reads the view; the ETL strips 13 private tags (tax ID, address, phones, e-mail, birth data and others) before anything is stored, and the newest curriculum version wins. A single command chain refreshes everything downstream.',
    ),
    pipeline({
      title: 'Refresh pipeline',
      caption: 'Each step is idempotent and can be re-run on its own.',
      source: 'Search engine and reindex documentation',
      layers: [
        { label: 'Lattes ETL', nodes: ['sanitize', 'upsert'] },
        { label: 'Search reindex', nodes: ['faculty index'] },
        { label: 'Works index', nodes: ['deduplicate'] },
        { label: 'Co-author graph', nodes: ['build'] },
        { label: 'Neo4j sync', nodes: ['batches'] },
        { label: 'Quality report', nodes: ['7 dimensions'] },
      ],
    }),
    ul(
      [
        b('ETL run of 2026-10-05: '),
        '436,480 source rows read, 347,554 upserted, 168 unparseable, 0 errors; the rest had no Lattes ID and were skipped.',
      ],
      [
        b('Record linkage: '),
        'works are matched by normalized DOI, otherwise by title, year and category. That turns 1,514,901 author-works into 1,339,162 unique works (88.4%); 132,098 of them have more than one USP author. The same idea, applied to events with a Fellegi–Sunter',
        cite('fs1969'),
        ' style blocking rule, powers the Ágora calendar.',
      ],
      [
        b('Data quality: '),
        'measured on the seven dimensions of ISO/IEC 25012',
        cite('iso25012'),
        ', stored as snapshots, served by an API and exported to Prometheus as a ratio.',
      ],
      [
        b('Gender inference: '),
        'an IBGE first-name table first, then an SVM that abstains when unsure: 98.0% accuracy at 94% coverage on 3,000 names, with 4.7% of faculty reported as “undetermined” instead of guessed.',
      ],
    ),
    p(
      b('Mnemosine bots. '),
      'External sources (university news, innovation hub, patents, course catalogues, open-data providers) are collected by eight Airflow-based bots. Each bot owns its schema; raw responses are stored compressed in a bronze layer, deduplicated by SHA-256 and versioned append-only, so a parser fix can reprocess history without re-fetching. One example: the news archive holds 52,606 posts and 6,552 podcast episodes.',
    ),
    ul(
      [b('Polite by design. '), 'signed user agent with contact header, robots.txt honored',
        cite('rfc9309'),
        ', at least 3 s between requests to university hosts with jitter, one shared Airflow pool slot, backoff that honors Retry-After, a circuit breaker whose cooldown doubles up to 24 h, and heavy work only off-peak.'],
      [b('Free and open only. '), 'a standing rule: every source must be open-licensed, free and approval-free, and shows a citation badge on the site. 41 providers feed the events calendar’s enrichment.'],
    ),

    h2('Search and information retrieval'),
    p(
      b('Problem. '),
      'Names, research areas and biographies behave differently, and a single ranking function treats them all alike.',
    ),
    p(
      b('Decision. '),
      'Field-specific similarity: language-model smoothing with Dirichlet priors (μ = 2000)',
      cite('zl2004'),
      ' on names and biographies, divergence-from-independence on areas of expertise, BM25 on production titles, and an edge-n-gram analyzer for autocomplete. There is deliberately no stemmer, stop-word list or synonym table: the corpus is names and technical terms.',
    ),
    p(
      b('Evaluation. '),
      'An offline harness runs 1,200 queries (12 query classes × 100) and scores nDCG@k',
      cite('jk2002'),
      ' with k = 3. The gating rule is that no query class may get worse. The BM25 versus Dirichlet comparison is the subject of a conference submission; I am not quoting nDCG values here until that paper is public.',
    ),
    ul(
      [b('Telemetry for click models. '), 'queries and interactions (impressions, ranked clicks, dwell, returns) are logged against a pseudonymous 30-minute session id, exportable for unbiased learning-to-rank, and summarized in a Grafana dashboard that tracks mean reciprocal rank.'],
      [b('Input limits. '), 'queries up to 1,000 characters, validated in the browser with an inline counter so a user never triggers a backend error; queries over eight words skip fuzzy matching.'],
    ),

    h2('Graph benchmark'),
    p(
      'Co-author networks are the one workload where an inverted index is the wrong tool. Rather than argue, I benchmarked it.',
    ),
    bars({
      title: 'Median latency, Elasticsearch versus Neo4j',
      caption:
        'Co-author traversal at one hop is about 4,800× faster in Neo4j (median 1.6 ms against 7,691.8 ms). Plain name search is roughly on par.',
      source: 'Benchmark raw timings, 2026-07-12',
      scale: 'log',
      unit: 'ms',
      bars: [
        { label: 'Co-author traversal, 1 hop: Elasticsearch', value: 7691.8, display: '7,691.8 ms' },
        { label: 'Co-author traversal, 1 hop: Neo4j', value: 1.6, display: '1.6 ms', emphasis: true },
        { label: 'Name search: Elasticsearch', value: 5.09, display: '5.09 ms' },
        { label: 'Name search: Neo4j', value: 4.44, display: '4.44 ms' },
      ],
    }),
    callout(
      'caveat',
      'Twenty subjects, seven repetitions each, paired Wilcoxon test with Bonferroni correction, run on a laptop under memory pressure. At two or more hops every Elasticsearch run hit the 10-second timeout, so no ratio exists there, and the control experiment failed on the Elasticsearch side. The 4,800× figure is the one-hop result only.',
      'What the number does and does not say',
    ),
    p(
      b('Result. '),
      'Neo4j serves only the collaboration graph, through eight Cypher strategies. Only the traversal depth is interpolated into a query, from an allow-list of 1, 2 and 3; everything else is a bound parameter. Graph builds stream results instead of materializing them after an out-of-memory incident.',
    ),

    h2('Caching and performance'),
    p(
      b('Problem. '),
      'Statistics pages aggregate over a million works, and public traffic is bursty. Cold requests were slow, and under load the host ran out of memory.',
    ),
    p(
      b('Decision. '),
      'Three cache layers, each with its own invalidation story:',
    ),
    ul(
      ['Elasticsearch: the shard request cache raised from the 1% default to 10% of heap.'],
      ['Django: cached responses for 24 h (pure aggregations), 1 h (admin-editable data) and 30 min (trending). A database-backed generation counter invalidates statistics, so every worker drops them within about a minute.'],
      ['Next.js: incremental static regeneration with a one-hour shared-cache lifetime, tag-based revalidation from an internal endpoint, and a start-up warm-up that waits for the API to answer before it purges.'],
    ),
    ul(
      [b('Memory. '), 'the search heap went from 256 MB to 768 MB after OutOfMemory errors; the works-index build used to abort after 1,040 of 5,653 faculty and now spools to disk and finishes 1.34M works in about three minutes; co-author builds stream with a resident-memory circuit breaker at 1 GiB.'],
      [b('Reindexing. '), 'batches run at the quietest hour predicted from 14 days of Prometheus request rates, instead of on a manual button.'],
    ),
    compare({
      title: 'Core Web Vitals and weight, before and after the 2026-10-09 performance pass',
      caption: 'Lab measurements (Lighthouse) on public pages.',
      source: 'SEO and performance baseline report',
      beforeLabel: 'Before',
      afterLabel: 'After',
      rows: [
        { metric: 'First-load JavaScript, home page', before: '975 kB', after: '249 kB', note: 'between 64% and 76% smaller across pages' },
        { metric: 'Image weight in public assets', before: '80 MB', after: '11 MB' },
        { metric: 'Lighthouse performance, faculty profile', before: '45', after: '77' },
        { metric: 'Largest Contentful Paint, faculty profile', before: '9.2 s', after: '4.0 s' },
        { metric: 'Time to first byte, faculty profile', before: '232 ms', after: '10 ms' },
        { metric: 'Total Blocking Time, IME unit page', before: '1,225 ms', after: '426 ms' },
        { metric: 'Lighthouse SEO score', before: '92', after: '100', note: 'on three audited pages' },
      ],
    }),

    h2('DevOps'),
    p(
      b('Decision. '),
      'Production is a single Docker Compose project. Deploys are deliberately simple and reversible: every release is an immutable image tag, the previous one is kept as a rollback tag, and images are shipped with a resumable, checksummed transfer so an interrupted upload resumes instead of restarting.',
    ),
    ul(
      [b('Pipeline. '), 'GitLab CI defines build, test (SAST, SEO budgets, k6 load, OWASP ZAP, network-chaos with netem), deploy and metrics stages. Pushes are guarded by a pre-push hook that runs the suites.'],
      [b('Infrastructure as code. '), 'Terraform and nine Ansible roles (secrets in Vault) describe the earlier cloud setup. A k3s and ArgoCD migration path was built, evaluated and deliberately deferred in August 2026, recorded as a decision rather than left as drift.'],
      [b('Self-healing. '), 'systemd timers and watchdogs restart what matters and protect the remote-access daemons from the OOM killer; scheduled jobs are timers because the host has no cron.'],
    ),
    callout(
      'tradeoff',
      'A post-mortem from August 2026: the host had no swap, the database and search containers had been silently down for about 25 hours, and a CI runner co-located with production competed for memory. Swap was added, the runner was decommissioned, and builds moved off the production box.',
      'Incident that shaped the pipeline',
    ),

    h2('Observability and SRE'),
    p(
      'Prometheus (15-day retention), Grafana, Alertmanager and blackbox probes cover the stack, organized around the eight DORA-style measures: MTTR, lead time, deploy frequency, change-failure rate, availability against a 99.5% SLO, deploy duration, time to detect and response-time histograms',
      cite('forsgren2018'),
      '.',
    ),
    ul(
      [b('Argos status page. '), 'a Go service probes 11 components every 60 seconds, only flips a state after three consecutive checks (a flap guard), draws 90-day uptime bars, opens and resolves incidents automatically and e-mails on both events. It is public at /status.'],
      [b('Runbooks. '), 'four written runbooks (backend 5xx, Elasticsearch degraded, latency, search incident); search failures return a localized problem+json body with a request id.'],
    ),
    callout(
      'caveat',
      'Auto-remediation hooks exist in the codebase but are intentionally not wired to production, and the e-mail alert path from Argos is the one that reaches a person today.',
      'Honest status',
    ),

    h2('Security'),
    p(
      b('Decision. '),
      'Identity is a small Go service (auth-server): RS256 JSON Web Tokens with a 15-minute lifetime, a JWKS endpoint with RFC 7638',
      cite('rfc7638'),
      ' key identifiers, Google OAuth as the only sign-in, signed CSRF state, and deny-by-default role claims (user, admin, super admin). It also acts as the single-sign-on provider for Grafana and Airflow.',
    ),
    ul(
      [b('Password login was removed '), 'after bots brute-forced it. The upstream proxy does not forward client IP addresses, so IP-based throttling is ineffective by construction; defenses are identity-based and route-based instead: nginx rate-limit zones (alerts, graph, auth, known bots) and DRF throttles on graph queries.'],
      [b('Tamper-evident audit trail. '), 'an insert-only database role, a hash chain computed by a database trigger under an advisory lock, a command that verifies the chain, monthly partitions and two-year retention.'],
      [b('Injection. '), 'bound parameters everywhere; the single interpolated value in Cypher comes from an allow-list.'],
      [b('Scanning. '), 'bandit, pip-audit, pnpm audit, gitleaks, gosec, golangci-lint and an OWASP ZAP baseline run in CI.'],
    ),
    callout(
      'finding',
      'A review found that the audit writer role lacked the SELECT privilege the ORM needs for INSERT … RETURNING, so Django audit writes had silently failed for months. It was fixed in September 2026, and the test configuration that had excluded the audit tests from collection was fixed with it.',
      'Post-mortem: silent audit failure',
    ),

    h2('Privacy and compliance'),
    p(
      'The platform publishes academic data about named people, so privacy is a design input rather than a checklist. A record of processing activities under Brazil’s LGPD',
      cite('lgpd'),
      ' states a purpose and legal basis per activity (faculty data, audit, mailing lists, news, search logs).',
    ),
    ul(
      [b('Minimization. '), 'personal data is stripped twice, at ETL time and again at index time; the internal university-number field was deleted from every layer in June 2026.'],
      [b('Retention. '), 'search logs 13 months, application logs 30 days, audit records two years.'],
      [b('Telemetry. '), 'honors Global Privacy Control and Do Not Track, scrubs e-mails, tax IDs and phone numbers from queries, and never stores IP address or user agent.'],
      [b('Mailing lists. '), 'double opt-in, addresses encrypted with AES-256-GCM plus an HMAC blind index for lookup, one-click unsubscribe',
        cite('rfc8058'),
        ', no tracking pixels, unconfirmed sign-ups purged after 48 hours.'],
      [b('Open licensing and attribution. '), 'site content is CC BY-NC-SA 4.0',
        cite('ccbyncsa'),
        ' and every external source carries a visible citation badge.'],
      [b('Accessibility. '), 'automated axe-core scans against WCAG 2.1 A and AA fail the build on serious or critical issues.'],
    ),
    callout(
      'caveat',
      'The formal data-processing agreement with the university’s IT department is still pending.',
      'Still open',
    ),

    h2('SEO and LLM discoverability'),
    p(
      b('Problem. '),
      'A public-interest site that search engines and AI assistants cannot find does not serve the public. The sitemap held three URLs.',
    ),
    ul(
      [b('Sitemap. '), 'now an index of child sitemaps (up to 10,000 faculty URLs each) with real last-modified dates taken from the curricula: more than 6,200 URLs, including 5,552 faculty profiles.'],
      [b('Canonical hygiene. '), 'duplicates redirect with 308 to the canonical URL, and soft 404s became real 404s.'],
      [b('Structured data. '), 'JSON-LD for WebSite with SearchAction, Organization, Person, CollegeOrUniversity, Museum, ResearchOrganization and BreadcrumbList.'],
      [b('For language models. '), '/llms.txt and /llms-full.txt, a compact Markdown version of every faculty profile (a few kilobytes against 1.1–1.6 MB of HTML), an A–Z directory, and an explicit robots.txt group for 16 AI crawlers.'],
      [b('Regression gates. '), 'render, bundle and Lighthouse budgets plus a Playwright SEO spec; on the first run against the old site, 15 Lighthouse CI assertions failed.'],
    ),

    h2('Testing and quality'),
    p(
      'Behavior-driven tests describe the product in the vocabulary of the people who use it, and a pre-push hook runs the suites before code leaves the machine.',
    ),
    metricGrid([
      { value: '36', label: 'pytest-bdd feature files' },
      { value: '208', label: 'Vitest test files' },
      { value: '110', label: 'Go test files' },
      { value: '15', label: 'Playwright specs', context: 'SEO, accessibility, visual' },
    ]),
    p(
      'The backend coverage gate is set at 90%; that is a threshold, not a measured claim. Non-functional checks include k6 load tests, OWASP ZAP, network chaos and memory profiling. A behavioral code analysis in the style of Tornhill',
      cite('tornhill2015'),
      ' over 656 commits guides where to pay down technical debt first.',
    ),

    h2('Product surface'),
    p(
      'What the platform offers today, all generated from live data instead of hand-written copy:',
    ),
    ul(
      ['Faculty profiles, units, departments and museums, with spreadsheet-style in-place editing for curators (undo, redo and a revertible change log).'],
      ['Statistics: production over time, areas of knowledge, publication countries, gender distribution.'],
      ['A collaboration network with a graph-or-table toggle.'],
      ['Ágora: an all-USP events calendar with an .ics export and a REST API, a sub-project with its own page.'],
      ['Innovation: patents, technology-transfer data and an eligibility checker that runs entirely in the browser.'],
      ['Courses and curricula, and a graduation checker (/formatura) that parses a student’s transcript PDF client-side.'],
      ['A press archive, e-mail newsletters and the public status page.'],
    ),

    h2('What’s next'),
    p(
      'The roadmap is research as much as engineering. Embeddings for faculty and works are already computed with an open model; the LangChain orchestration and the generation layer of a retrieval-augmented pipeline are next, gated on data quality, which is why the quality report comes first. Further out: formal verification of the collection pipelines with Petri nets, a lexical-versus-semantic comparison on real usage logs, and widening the corpus to artistic events and Brazilian music.',
    ),
    p(i('This case study is the basis of a master’s research plan; see the Research page.')),
  ),
}
