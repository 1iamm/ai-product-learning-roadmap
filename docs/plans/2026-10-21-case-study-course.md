# Product design and operations case course

The user has read the previous course and wants deeper, preferably real cases, common product methods, diagrams, strategy and product judgment. The latest request expands the scope to selling and operating a SaaS product. The advanced course therefore has six weeks, while the completed four-week foundation course stays accessible.

## Curriculum

1. Customer and need selection: Superhuman PMF segmentation; Linear Customer Requests.
2. Priority and scope: Linear continuous planning; Basecamp Dot Grid Calendar and selected Shape Up chapters.
3. Interaction decisions: Linear UI redesign; Figma UI3 revisions.
4. Feature value and commercial viability: Intercom CX Score evaluation; Fin pricing research.
5. Positioning, acquisition and sales: PostHog first users and founder-led sales.
6. Activation, retention and expansion: Appfire activation; ChartMogul onboarding practices.

Use two reading units per week, scoped reading, a diagram, a decision and counterevidence. Estimated study time is about three hours per week and can be split. The order is pedagogical; market and sales validation should start alongside discovery in real work. Published practices are not all controlled case experiments, so the page names their evidence type and limitations.

## Source verification, 2026-10-21

All primary reading links were read via web tools. Dates refer to publication, not the date checked. Sources include:

- First Round / Rahul Vohra, 2018-11-12: Superhuman PMF engine. Founder narrative; survey segment changes are not treatment effects. Professional productivity software, not a universal enterprise procurement model.
- Linear / Sagan Schultz, 2025-03-04: Customer Requests. Approximate 40% refers to users interviewed, not the customer population; no independent business-impact result.
- Linear / Nan Yu, 2025-10-30: Continuous planning. A team practice, not a measured launch study. RICE is a separate optional Intercom method, not attributed to Linear.
- Basecamp / Ryan Singer: Shape Up chapters 2–4, first edition 2019. First-publication year also confirmed in Brian Bailey's 37signals account at https://world.hey.com/bb/5-years-of-shape-up-904bdee3. Calendar is real; Breadboard chapter's invoice example is hypothetical. Our calendar Breadboard is explicitly reconstructed.
- Linear / Karri Saarinen and team, 2024-03-28: UI redesign part II. Design stress tests are not representative user usability trials.
- Figma / Jenny Xie, 2024-10-01: UI3 retrospective. Docked-panel, blend-mode and clip-content changes documented; no full quantitative experiment dataset. Site's clip-content UI is a simplified reconstruction.
- Intercom / Mark O'Donovan, 2026-02-09: CX Score. Human-alignment validation is not proof of customer business improvement.
- Intercom / Sophie Woods, 2026-05-20: Fin pricing and packaging. The willingness-to-pay graph explicitly uses illustrative data. No claims of verified optimal pricing or current prices.
- PostHog / James Hawkins, 2024-06-20: first 1,000 users, recollecting the 2020 early stage. Founder self-report; acquisition, pricing and launch effects not separately identified.
- PostHog / James Hawkins, 2024-10-31: founder-led sales. Detailed practices and examples; no universal contract thresholds or response-time rules adopted.
- Appfire / Anastasia Kusmartseva on Amplitude, 2024-01-29: activation methodology. Attributed customer narrative on vendor site. Funnel results distinguished from activation and paid conversion; correlations not promoted to causal proof.
- ChartMogul / Stephanie Gantous, 2025-06-05: onboarding with template. Real team practice, no quantified retention lift. The stale query URL `?p=22460` now resolves to the blog index; use the verified article path `/blog/how-we-run-customer-onboarding/`.

Optional method refreshers: Intercom RICE (2018-01-05); ChartMogul GRR/NRR (2023-03-23). Historical retention benchmarks are not current targets. RICE sensitivity numbers, merchant SaaS acquisition plan and GRR/NRR arithmetic on the site are explicitly synthetic teaching exercises.

## Website implementation

Keep GitHub Pages main/root as the host. Archive the prior homepage as `product-design-foundations.html` with only a new banner. Preserve its scripts, CSS, IDs and storage keys. Preserve `foundations.html` and all original assets byte-for-byte.

New files `case-study.css` and `case-study.js` extend the design and note behavior. New keys `productCaseStudies20261021V1-week1` through `week6` use named fields. Reading, drafting and self-checks remain separate. Malformed storage must not be overwritten. Notes stay browser-local, with individual/all-week export and discussion copy. No automatic user completion or generated answers.

New anchors are `case-week1` through `case-week6`, and `case-work1` through `case-work6`. Known foundation anchors redirect to the appropriate archived page. Existing current-page IDs take precedence.

Fourteen SVG diagrams and a fourteen-page editable Draw.io file are original educational reconstructions, not copied screenshots or internal team artifacts. The Figma case supports toggling wireframe, flowchart and wireflow; without scripts all three remain visible. Full-width diagrams fit desktop; narrow screens can scroll the illustration within its own region. Downloadable source is included.

## Validation and publication

Validate JavaScript syntax, unique HTML IDs, internal links, reading/answer counts, XML diagrams, legacy file equality, note persistence and week isolation, copy/export, legacy-fragment routing, mobile overflow, and desktop rendering. Verify publication by matching the GitHub Pages build commit and comparing deployed asset bytes with the local repository. No live learner notes are used as test data.
