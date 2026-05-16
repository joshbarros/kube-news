export interface PillarSection {
  heading: string;
  body: string;
  checklist: string[];
}

export interface PillarFaq {
  question: string;
  answer: string;
}

export interface PillarGuide {
  slug: string;
  title: string;
  excerpt: string;
  primaryKeyword: string;
  clusterKeywords: string[];
  readTime: string;
  updatedAt: string;
  businessOutcome: string;
  sections: PillarSection[];
  faq: PillarFaq[];
}

export const pillarGuides: PillarGuide[] = [
  {
    slug: 'platform-engineering-roadmap',
    title: 'Platform Engineering Roadmap for Product Teams',
    excerpt:
      'A practical blueprint to move from ad-hoc DevOps to a platform model that scales delivery speed and reliability.',
    primaryKeyword: 'platform engineering roadmap',
    clusterKeywords: [
      'internal developer platform',
      'golden paths',
      'platform team structure',
      'developer experience metrics',
    ],
    readTime: '12 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Faster release cycles with fewer deployment regressions.',
    sections: [
      {
        heading: 'Start with delivery bottlenecks, not tools',
        body: 'Map your lead time and failure patterns first. Platform initiatives fail when they begin as a tooling migration instead of a business-outcome program.',
        checklist: [
          'Baseline lead time for changes, deployment frequency, and change failure rate.',
          'Identify repetitive work developers do each sprint.',
          'Prioritize one workflow where a golden path can remove friction immediately.',
        ],
      },
      {
        heading: 'Design internal products with clear ownership',
        body: 'Treat platform capabilities as products with roadmaps, adoption goals, and SLAs. This aligns engineering enablement with measurable ROI.',
        checklist: [
          'Define one owner per platform capability (CI template, infra module, runtime base image).',
          'Set platform SLAs and support boundaries.',
          'Publish architecture decision records for reusable patterns.',
        ],
      },
      {
        heading: 'Measure adoption and business impact',
        body: 'The success metric is not “platform shipped.” It is developer time returned to feature work and incident reduction.',
        checklist: [
          'Track golden-path adoption by team and service.',
          'Measure incident trends before and after adoption.',
          'Review platform backlog monthly with engineering leadership.',
        ],
      },
    ],
    faq: [
      {
        question: 'How long does platform engineering take to show ROI?',
        answer:
          'Most teams can demonstrate early ROI within one quarter when they focus on one high-friction workflow and instrument adoption and incident metrics from day one.',
      },
      {
        question: 'Do small teams need a dedicated platform team?',
        answer:
          'Small teams can start with a virtual platform squad and product ownership model, then formalize a dedicated team once internal products gain adoption.',
      },
    ],
  },
  {
    slug: 'kubernetes-cost-optimization',
    title: 'Kubernetes Cost Optimization Without Performance Loss',
    excerpt:
      'How to reduce cloud spend in Kubernetes while preserving reliability, latency targets, and team velocity.',
    primaryKeyword: 'kubernetes cost optimization',
    clusterKeywords: [
      'right sizing kubernetes workloads',
      'cluster autoscaler strategy',
      'resource requests and limits',
      'finops for engineering teams',
    ],
    readTime: '10 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Lower monthly infrastructure cost with stable user experience.',
    sections: [
      {
        heading: 'Measure waste before changing architecture',
        body: 'Cost reductions are durable when based on workload behavior. Start from utilization patterns and overprovisioning signals.',
        checklist: [
          'Compare CPU/memory requests against real usage percentiles.',
          'Flag low-utilization workloads by namespace and team.',
          'Separate burst workloads from steady traffic services.',
        ],
      },
      {
        heading: 'Use policy guardrails to prevent cost regressions',
        body: 'One-time cleanup is not enough. Enforce resource and scaling standards in CI and cluster policy.',
        checklist: [
          'Require requests and limits for all production deployments.',
          'Set environment-specific defaults via Helm values or policy controller.',
          'Add budget alerts aligned to service ownership.',
        ],
      },
      {
        heading: 'Balance cost and latency by tier',
        body: 'Different services need different SLOs. Prioritize latency-critical paths and optimize background jobs more aggressively.',
        checklist: [
          'Define latency-critical, core, and background service tiers.',
          'Apply autoscaling thresholds per tier.',
          'Review cost-to-traffic ratio monthly with product and engineering.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is the first fast win for Kubernetes cost reduction?',
        answer:
          'Right-size requests based on observed usage and remove oversized defaults. This usually delivers the fastest cost reduction with low operational risk.',
      },
      {
        question: 'Can spot instances hurt reliability?',
        answer:
          'Spot capacity can be safe for tolerant workloads when mixed with on-demand pools and proper disruption handling policies.',
      },
    ],
  },
  {
    slug: 'event-driven-architecture-at-scale',
    title: 'Event-Driven Architecture at Scale: Reliability Patterns',
    excerpt:
      'A field guide for designing event pipelines with idempotency, replay safety, and production-grade observability.',
    primaryKeyword: 'event driven architecture patterns',
    clusterKeywords: [
      'kafka reliability patterns',
      'idempotent consumers',
      'dead letter queue strategy',
      'event contract governance',
    ],
    readTime: '13 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Higher throughput with fewer data integrity incidents.',
    sections: [
      {
        heading: 'Design for duplicate and out-of-order events',
        body: 'Distributed systems must assume retries, late arrivals, and duplicates. Reliability starts with explicit data contracts and idempotent write paths.',
        checklist: [
          'Use deterministic idempotency keys in event payloads.',
          'Persist consumer processing state where needed.',
          'Define event ordering guarantees per topic and partition strategy.',
        ],
      },
      {
        heading: 'Treat schema evolution as a product discipline',
        body: 'Schema changes can break downstream systems silently. Versioning and compatibility policies prevent expensive incident chains.',
        checklist: [
          'Version schemas and document backward compatibility rules.',
          'Validate contracts in CI for producers and consumers.',
          'Introduce deprecation windows before removing fields.',
        ],
      },
      {
        heading: 'Instrument the full event lifecycle',
        body: 'Without end-to-end telemetry, teams cannot diagnose lag spikes, replay issues, or silent drops quickly.',
        checklist: [
          'Track lag, retry rate, and DLQ volume per consumer group.',
          'Trace producer-to-consumer latency with correlation IDs.',
          'Run replay drills and validate recovery runbooks quarterly.',
        ],
      },
    ],
    faq: [
      {
        question: 'How do you avoid message loss in event pipelines?',
        answer:
          'Use durable brokers, acknowledgments, idempotent processing, DLQs, and replay-ready consumers, then validate these controls with failure simulations.',
      },
      {
        question: 'When should a team choose events over synchronous APIs?',
        answer:
          'Events are ideal for decoupled workflows, fan-out integrations, and resilient processing where eventual consistency is acceptable.',
      },
    ],
  },
  {
    slug: 'core-web-vitals-playbook',
    title: 'Core Web Vitals Playbook for Revenue-Critical Pages',
    excerpt:
      'A practical optimization playbook to improve LCP, INP, and CLS on real-world product and content experiences.',
    primaryKeyword: 'core web vitals optimization',
    clusterKeywords: [
      'lcp optimization',
      'next.js performance tuning',
      'frontend rendering strategy',
      'real user monitoring',
    ],
    readTime: '11 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Improved conversion and engagement through faster, smoother pages.',
    sections: [
      {
        heading: 'Fix render bottlenecks in user-critical paths',
        body: 'High-impact optimization starts on key landing and conversion flows. Focus on render-critical resources and avoid broad, low-impact tuning.',
        checklist: [
          'Optimize hero image delivery and preload only essential assets.',
          'Reduce client-side JavaScript on landing pages.',
          'Prioritize server-rendered content for first paint stability.',
        ],
      },
      {
        heading: 'Align engineering workflows with performance budgets',
        body: 'Performance should be a release gate, not a periodic project. Teams need budgets and visibility in the delivery pipeline.',
        checklist: [
          'Set bundle and route-level budgets in CI.',
          'Track Web Vitals by page template and device class.',
          'Flag regressions in pull request checks.',
        ],
      },
      {
        heading: 'Use RUM to connect speed with outcomes',
        body: 'Synthetic tests are useful, but real users reveal true bottlenecks and business impact.',
        checklist: [
          'Capture Web Vitals segmented by market and traffic source.',
          'Correlate performance with conversion and bounce rates.',
          'Prioritize fixes on high-traffic templates first.',
        ],
      },
    ],
    faq: [
      {
        question: 'Which Core Web Vital should teams fix first?',
        answer:
          'Prioritize the metric with the largest user and revenue impact on your most important templates, often LCP on acquisition pages.',
      },
      {
        question: 'Can performance work improve SEO and conversion together?',
        answer:
          'Yes. Better page experience can improve discoverability, engagement, and conversion when optimization targets user-critical flows.',
      },
    ],
  },
  {
    slug: 'observability-for-devops',
    title: 'Observability for DevOps: From Metrics to Faster Recovery',
    excerpt:
      'Build an observability stack that reduces MTTR and improves release confidence across distributed systems.',
    primaryKeyword: 'observability for devops',
    clusterKeywords: [
      'open telemetry strategy',
      'prometheus grafana alerts',
      'slo error budget',
      'incident response automation',
    ],
    readTime: '10 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Lower MTTR and stronger incident response capability.',
    sections: [
      {
        heading: 'Define service-level objectives before dashboards',
        body: 'Observability without clear SLOs becomes chart noise. Define what reliability means per service and user journey first.',
        checklist: [
          'Set one availability and one latency SLO per critical service.',
          'Document error budget policies for release decisions.',
          'Map telemetry to user journeys, not only infrastructure layers.',
        ],
      },
      {
        heading: 'Standardize telemetry collection early',
        body: 'Inconsistent instrumentation blocks cross-service diagnosis and slows incident response during high pressure events.',
        checklist: [
          'Adopt OpenTelemetry conventions for traces, metrics, and logs.',
          'Use shared tags for service, environment, and team ownership.',
          'Create baseline dashboards per service template.',
        ],
      },
      {
        heading: 'Turn alerts into actionable workflows',
        body: 'Good alerts route incidents to the right owner with context and runbook links. Noisy alerts reduce trust and delay response.',
        checklist: [
          'Tune alert thresholds using historical incident data.',
          'Attach runbook and dashboard links to every critical alert.',
          'Review false positives and missed detections after each incident.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is the most common observability mistake?',
        answer:
          'Collecting large volumes of telemetry without ownership, SLO alignment, or actionable alert design.',
      },
      {
        question: 'How quickly can observability reduce MTTR?',
        answer:
          'Teams often see MTTR improvements within weeks once alert routing, tracing context, and runbooks are standardized.',
      },
    ],
  },
  {
    slug: 'data-platform-modernization',
    title: 'Data Platform Modernization for Analytics and AI Readiness',
    excerpt:
      'How to evolve legacy data workflows into resilient, cost-efficient platforms for analytics and AI use cases.',
    primaryKeyword: 'data platform modernization',
    clusterKeywords: [
      'azure data factory best practices',
      'databricks pipeline architecture',
      'data quality operations',
      'lakehouse governance',
    ],
    readTime: '12 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Higher data reliability and lower processing cost per workload.',
    sections: [
      {
        heading: 'Stabilize ingestion before scaling transformation',
        body: 'Unreliable ingestion creates downstream chaos. Modernization should begin with source contracts, quality controls, and observability.',
        checklist: [
          'Define source SLAs and freshness expectations.',
          'Introduce quality checks at ingestion boundaries.',
          'Implement lineage and failure alerts for critical datasets.',
        ],
      },
      {
        heading: 'Separate storage, compute, and orchestration concerns',
        body: 'Clear architecture boundaries improve scalability and reduce lock-in risk when workload characteristics evolve.',
        checklist: [
          'Use environment-specific compute sizing policies.',
          'Schedule batch and streaming pipelines by business criticality.',
          'Automate environment provisioning through infrastructure as code.',
        ],
      },
      {
        heading: 'Treat data quality as a product metric',
        body: 'Stakeholders trust platforms when quality and freshness are visible and enforced with ownership.',
        checklist: [
          'Define quality scorecards per domain dataset.',
          'Assign data product owners for critical entities.',
          'Include data quality incidents in postmortem process.',
        ],
      },
    ],
    faq: [
      {
        question: 'How do you prioritize modernization work?',
        answer:
          'Start with datasets tied to revenue, compliance, or decision-critical reporting, then sequence platform capabilities around those priorities.',
      },
      {
        question: 'Can modernization reduce cloud spend?',
        answer:
          'Yes. Right-sized compute, workload scheduling, and architecture boundaries often reduce processing and storage waste significantly.',
      },
    ],
  },
  {
    slug: 'secure-cicd-pipelines',
    title: 'Secure CI/CD Pipelines for High-Trust Delivery',
    excerpt:
      'A practical model for shipping faster while reducing supply-chain and credential risks in modern delivery pipelines.',
    primaryKeyword: 'secure cicd pipeline',
    clusterKeywords: [
      'devsecops controls',
      'supply chain security ci',
      'secret management pipelines',
      'deployment policy enforcement',
    ],
    readTime: '9 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Faster releases with reduced security exposure.',
    sections: [
      {
        heading: 'Shift security controls into pull request flow',
        body: 'Security checks must run where decisions happen: pull requests and artifact promotion gates.',
        checklist: [
          'Run dependency and container scans in PR validation.',
          'Block merges on critical findings with ownership assignment.',
          'Version and review pipeline templates as application code.',
        ],
      },
      {
        heading: 'Use short-lived credentials and centralized secrets',
        body: 'Long-lived static credentials are one of the most avoidable pipeline risks. Replace them with dynamic identity flows.',
        checklist: [
          'Adopt OIDC-based workload identity for CI runners.',
          'Store secrets in managed vaults with audit logs.',
          'Rotate credentials and enforce least privilege policies.',
        ],
      },
      {
        heading: 'Enforce deployment policy by environment',
        body: 'Production should require explicit policy checks, artifact provenance, and rollback readiness.',
        checklist: [
          'Require signed artifacts for production promotion.',
          'Gate production deploys with policy-as-code checks.',
          'Validate rollback path in release runbooks.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does stronger CI/CD security slow delivery?',
        answer:
          'When implemented in automated pull request and promotion gates, security controls usually improve delivery confidence rather than slow it down.',
      },
      {
        question: 'What is the first CI/CD security upgrade to implement?',
        answer:
          'Introduce centralized secret management and remove static credentials from pipeline variables and repository settings.',
      },
    ],
  },
  {
    slug: 'engineering-kpis-for-roi',
    title: 'Engineering KPIs That Actually Prove ROI',
    excerpt:
      'A KPI framework that connects engineering execution quality with growth, retention, cost efficiency, and risk reduction.',
    primaryKeyword: 'engineering kpi for roi',
    clusterKeywords: [
      'dora metrics and business impact',
      'software delivery kpis',
      'engineering productivity measurement',
      'incident cost model',
    ],
    readTime: '8 min read',
    updatedAt: '2026-05-16',
    businessOutcome: 'Clear executive visibility into technical investment outcomes.',
    sections: [
      {
        heading: 'Measure flow, quality, reliability, and cost together',
        body: 'Single-metric dashboards can mislead. A balanced KPI model avoids local optimization and reveals real tradeoffs.',
        checklist: [
          'Track lead time, deploy frequency, and failure rate as a baseline.',
          'Add service reliability and customer-impact metrics.',
          'Include unit economics such as cost per transaction or workload.',
        ],
      },
      {
        heading: 'Translate technical metrics into executive language',
        body: 'Engineering updates gain support when tied to customer and financial outcomes, not only operational numbers.',
        checklist: [
          'Map latency improvements to conversion or retention impact.',
          'Map reliability gains to incident cost reduction.',
          'Map automation gains to engineering capacity recovery.',
        ],
      },
      {
        heading: 'Review KPIs as a decision system, not a report',
        body: 'KPI reviews should drive roadmap and staffing decisions. If they do not change decisions, the framework needs adjustment.',
        checklist: [
          'Run monthly KPI reviews with engineering and product leadership.',
          'Define actions for each KPI threshold range.',
          'Retire vanity metrics that do not influence decisions.',
        ],
      },
    ],
    faq: [
      {
        question: 'Which engineering KPI is most important for ROI?',
        answer:
          'There is no single KPI. ROI is best demonstrated through a balanced score across delivery speed, quality, reliability, and cost efficiency.',
      },
      {
        question: 'How often should KPI targets change?',
        answer:
          'Targets should evolve with product stage and business priorities, typically reviewed quarterly and adjusted when strategy shifts.',
      },
    ],
  },
];
