export const ARTIFACTS = [
  { label: "STRAWBERRY GRAPHQL", value: "OSS CONTRIBUTOR" },
  { label: "HOSPITALJOBS.IN", value: "FOUNDER \u00B7 GTM, SALES & PRODUCT" },
  { label: "HACKATHONS", value: "2X FIRST PLACE" },
] as const;

export type InnovationVisual =
  | "auth"
  | "agents"
  | "benchmarks"
  | "architecture"
  | "scale"
  | "testing"
  | "integration"
  | "data"
  | "code";

export interface Innovation {
  readonly title: string;
  readonly description: string;
  readonly visual: InnovationVisual;
  readonly image?: string;
  readonly tags?: readonly string[];
}

export type ThumbnailAccent = "cyan" | "red" | "gold";

export interface Project {
  readonly title: string;
  readonly company: string;
  readonly date: string;
  readonly summary: string;
  readonly description: string;
  readonly github: string;
  readonly innovations: readonly Innovation[];
  readonly thumbnailAccent: ThumbnailAccent;
  readonly thumbnailLines: readonly string[];
  readonly thumbnailMetric?: string;
  readonly thumbnailImage?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    title: "Strawberry GraphQL",
    company: "Open Source",
    date: "2021",
    summary: "Query batching for production APIs",
    description:
      "Contributed to the Strawberry GraphQL library, implementing query batching for production APIs. Helped improve performance and developer experience for one of the most widely-used Python GraphQL frameworks.",
    github: "https://github.com/strawberry-graphql/strawberry",
    thumbnailAccent: "cyan",
    thumbnailLines: ["STRAWBERRY", "GRAPHQL"],
    innovations: [
      {
        title: "Query Batching",
        description:
          "Implemented query batching support, making Strawberry GraphQL compatible with Apollo and Relay clients via custom network layers. Production APIs could now batch multiple queries into single HTTP requests, cutting latency and server load.",
        visual: "integration",
        tags: ["APOLLO", "RELAY", "BATCH"],
      },
      {
        title: "Pagination Documentation & Bug Fixes",
        description:
          "Authored extensive pagination documentation covering relay-style connection implementation from scratch. Fixed edge cases in cursor-based pagination that affected production workflows. Improved DX for the entire community.",
        visual: "code",
        tags: ["RELAY", "DX"],
      },
    ],
  },
  {
    title: "hospitaljobs.in",
    company: "Founder",
    date: "Apr – Dec 2025",
    summary: "Healthcare hiring marketplace from zero",
    description:
      "Founded a healthcare hiring marketplace, owning product, GTM, and the chicken-and-egg problem from zero. Built the full stack — from architecture to market — and drove traction in a two-sided marketplace.",
    github: "https://github.com/hospitaljobsin/hospitaljobsin",
    thumbnailAccent: "red",
    thumbnailLines: ["HOSPITALJOBS.IN"],
    thumbnailMetric: "GTM, SALES, PRODUCT",
    thumbnailImage: "/project-thumbnails/hospitaljobsin/main.png",
    innovations: [
      {
        title: "Custom Authentication System",
        description:
          "Built an enterprise-grade authentication system from scratch — not a plug-in, not a wrapper. Passkey support, session management, CSRF protection, and security hardening engineered specifically for this domain.",
        visual: "auth",
        image: "/project-thumbnails/hospitaljobsin/auth.png",
        tags: ["PASSKEYS", "SESSIONS", "CSRF"],
      },
      {
        title: "CopilotKit Integration",
        description:
          "Pioneered agent-driven UIs using CopilotKit for interactive, AI-assisted user experiences. One of the earliest production implementations — agents that reason through actions, not just chat.",
        visual: "agents",
        image: "/project-thumbnails/hospitaljobsin/copilotkit.png",
        tags: ["COPILOTKIT", "AGENT UI"],
      },
      {
        title: "Agentic Candidate Matching",
        description:
          "Built an agentic system that matches candidates to job opportunities, combining LLM reasoning with structured healthcare data. Not keyword search — actual understanding of candidate profiles and job requirements.",
        visual: "agents",
        image: "/project-thumbnails/hospitaljobsin/ai-applicant-analysis.png",
        tags: ["LLM MATCHING", "HEALTHCARE"],
      },
      {
        title: "End-to-End Testing",
        description:
          "Full e2e test coverage ensuring reliability across auth flows, job applications, and matching algorithms. Every critical user path tested before every deploy.",
        visual: "testing",
        tags: ["E2E", "CI/CD"],
      },
    ],
  },
  {
    title: "LLM Lease Auditing",
    company: "Velocius AI Labs",
    date: "Jul – Aug 2024",
    summary: "Benchmarking LLMs for lease audit accuracy",
    description:
      "Analyzed multiple state-of-the-art LLMs to assess their effectiveness in automated lease auditing — including GPT-4o, Claude 3.5 Sonnet v1, Meta Llama 3.1 70B Instruct, and Meta Llama 3.1 405B Instruct. Findings informed fine-tuning and optimization of selected models, enhancing accuracy and efficiency, while identifying alternative models as backup solutions for robustness and flexibility.",
    github: "",
    thumbnailAccent: "cyan",
    thumbnailLines: ["LLM", "LEASE AUDITING"],
    thumbnailMetric: "4·LLM",
    innovations: [
      {
        title: "Multi-Model Benchmarking",
        description:
          "Evaluated GPT-4o, Claude 3.5 Sonnet v1, Llama 3.1 70B, and Llama 3.1 405B for automated lease auditing accuracy. Each model tested across real lease documents measuring extraction precision, reasoning quality, and hallucination rates.",
        visual: "benchmarks",
        tags: ["GPT-4O", "CLAUDE", "LLAMA"],
      },
      {
        title: "Optimization & Redundancy",
        description:
          "Findings informed fine-tuning of selected models and identified backup solutions for robustness in production workflows. Not just picking a winner — building a fault-tolerant model ensemble.",
        visual: "architecture",
        tags: ["FINE-TUNING", "REDUNDANCY"],
      },
    ],
  },
  {
    title: "GenAI Data Extraction",
    company: "Velocius AI Labs",
    date: "Aug – Nov 2024",
    summary: "PDF → structured data, end-to-end on AWS",
    description:
      "Developed a robust solution for transforming unstructured PDF documents into structured, actionable data, from idea to a working prototype. Leveraging Python, LangChain, FastAPI, and React, with a highly scalable architecture on AWS — Lambda, API Gateway, DynamoDB, VPC for secure processing, and S3 for storage. The React SPA is hosted on CloudFront via S3, with CI/CD powered by CodeBuild and CodePipeline.",
    github: "",
    thumbnailAccent: "gold",
    thumbnailLines: ["AI POWERED", "STRUCTURED DATA", "EXTRACTION"],
    innovations: [
      {
        title: "Structured JSON Before JSON Mode",
        description:
          "Built robust extraction pipelines when LLMs couldn't reliably output structured JSON — no native JSON mode existed in APIs yet. Engineered parsing, validation, and retry strategies that turned unreliable model outputs into deterministic data.",
        visual: "data",
        tags: ["JSON MODE", "RETRY LOGIC"],
      },
      {
        title: "End-to-End AWS Architecture",
        description:
          "Lambda, API Gateway, DynamoDB, VPC, S3, CloudFront. Serverless-first, horizontally scalable, VPC-isolated for secure document processing. Each piece purpose-built, not over-provisioned.",
        visual: "architecture",
        tags: ["LAMBDA", "VPC", "S3"],
      },
      {
        title: "Full-Stack Delivery",
        description:
          "Python + LangChain + FastAPI backend. React SPA frontend. CI/CD via CodeBuild and CodePipeline. From idea to working prototype — not a proof of concept, a production system.",
        visual: "code",
        tags: ["FASTAPI", "REACT", "CI/CD"],
      },
    ],
  },
  {
    title: "LLM Real Estate Extraction",
    company: "Velocius AI Labs",
    date: "Dec 2024 – Jan 2025",
    summary: "LLM comparison for real estate workflows",
    description:
      "Analyzed multiple state-of-the-art LLMs to assess their effectiveness in extracting structured data from real estate documents and performing downstream tasks — including GPT-4o, Claude 3.5 Sonnet v2, Mistral 7×8B Instruct, Meta Llama 3.3 70B Instruct, Microsoft Phi 4 14B, and Deepseek V3. Results provided valuable insights into the applicability of these models for real estate workflows, paving the way for fine-tuning and optimization.",
    github: "",
    thumbnailAccent: "cyan",
    thumbnailLines: ["LLM", "REAL ESTATE"],
    thumbnailMetric: "6·LLM",
    innovations: [
      {
        title: "Six-Model Evaluation",
        description:
          "Benchmarked GPT-4o, Claude 3.5 Sonnet v2, Mistral 7×8B, Llama 3.3 70B, Phi 4 14B, and Deepseek V3 on real estate document extraction. Measured structured output quality, reasoning depth, and cost-efficiency across document types.",
        visual: "benchmarks",
        tags: ["6 MODELS", "STRUCTURED OUTPUT"],
      },
      {
        title: "Fine-Tuning Pathways",
        description:
          "Results mapped clear pathways for fine-tuning and optimization — which models excel at which extraction tasks, where smaller models can replace larger ones, and how to build cost-efficient pipelines without sacrificing accuracy.",
        visual: "data",
        tags: ["COST EFFICIENCY", "PIPELINE"],
      },
    ],
  },
  {
    title: "Puthulir",
    company: "Anna University",
    date: "2024",
    summary: "125K views, 700+ students, zero downtime",
    description:
      "Developed and launched an interactive quiz hosting and event website for Puthulir 2024, aimed at promoting entrepreneurial knowledge among school students in Tamil Nadu. Attracted over 1,25,000 views within the quiz period, engaged 700+ students, and built a serverless infrastructure to handle high traffic with seamless performance throughout the event.",
    github: "https://github.com/Primer-Labs/puthulir",
    thumbnailAccent: "gold",
    thumbnailLines: ["PUTHULIR"],
    thumbnailMetric: "125K",
    innovations: [
      {
        title: "125K Views, Zero Downtime",
        description:
          "Served 1,25,000+ page views during the event window with zero outages. Traffic came in bursts — quiz rounds, social shares, deadline rushes — and the infrastructure never flinched.",
        visual: "scale",
        tags: ["125K VIEWS", "ZERO DOWNTIME"],
      },
      {
        title: "700+ Students Engaged",
        description:
          "Interactive quiz platform that made participation seamless for school students across Tamil Nadu. No app installs, no signups — just show up and play. The low-friction design was the feature.",
        visual: "integration",
        tags: ["700+", "ZERO FRICTION"],
      },
      {
        title: "Serverless Scale",
        description:
          "Built on serverless infrastructure to absorb traffic spikes without over-provisioning. Zero operational overhead during the event. When 125K people show up, you don't manage servers — you let the platform handle it.",
        visual: "architecture",
        tags: ["SERVERLESS", "BURST TRAFFIC"],
      },
    ],
  },
  {
    title: "AI Powered Moodle Proctor",
    company: "Anna University",
    date: "Mar 2026",
    summary: "AI proctoring platform integrated with Moodle",
    description:
      "Built a unified online exam proctoring platform integrated with Moodle — a Fastify TypeScript backend, Next.js teacher dashboard, FastAPI computer-vision AI proctoring service, and Electron desktop client. Real-time WebSocket-based violation detection covering face monitoring, gaze tracking, phone detection, identity verification, and more. Full Docker stack with Moodle LMS integration via LTI.",
    github: "https://github.com/cegit27/moodle-proctor",
    thumbnailAccent: "red",
    thumbnailLines: ["AI PROCTOR", "MOODLE"],
    innovations: [
      {
        title: "Real-Time AI Proctoring",
        description:
          "FastAPI + WebSocket service that analyzes browser-streamed video frames in real time. Configurable detectors for face monitoring, gaze tracking, phone detection, forbidden objects, identity verification, and more — with strict/moderate/lenient presets. Violations flagged live back to the teacher dashboard.",
        visual: "agents",
        tags: ["COMPUTER VISION", "WEBSOCKETS", "FASTAPI"],
      },
      {
        title: "Moodle + LTI Integration",
        description:
          "Deep integration with Moodle via LTI — not a bolt-on. Auth, course linking, quiz workflows, and student identity all flow through Moodle's LMS infrastructure. MariaDB for Moodle data, PostgreSQL for proctoring data, each purpose-built.",
        visual: "integration",
        tags: ["MOODLE", "LTI", "LMS"],
      },
      {
        title: "Full-Stack Multi-Service Architecture",
        description:
          "Five services orchestrated with Docker Compose — Fastify backend, Next.js dashboard, FastAPI AI service, Moodle LMS, and dual databases. Migration service, CSRF protection, JWT auth, WebSocket proxying, and answer-sheet upload flows all production-grade.",
        visual: "architecture",
        tags: ["DOCKER", "FASTIFY", "NEXT.JS"],
      },
      {
        title: "Teacher Dashboard & Live Monitoring",
        description:
          "Next.js dashboard for exam creation, live room monitoring, student tracking, alert review, and answer-sheet upload management. Real-time violation feed from AI service with configurable warning policies.",
        visual: "code",
        tags: ["LIVE MONITORING", "DASHBOARD"],
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  { href: "#about", label: "About", external: false },
  { href: "#work", label: "Work", external: false },
  { href: "/blog", label: "Blog", external: false },
  { href: "#contact", label: "Contact", external: false },
] as const;

export const SECTIONS = {
  hero: {
    eyebrow: "TECHNICAL FOUNDER \u00B7 BUILDER \u00B7 OPERATOR",
    heading: ["ARYAN", "IYAPPAN"],
    tagline: "Making sense of complexity, one system at a time",
  },
  about: {
    chapter: "I",
    heading: ["The", "Builder"],
    body1:
      "Nineteen. Self-taught across engineering and business. Shipped production systems, contributed to open source (Strawberry GraphQL), and took a healthcare marketplace from zero to traction \u2014 owning product, sales, and every hard decision in between.",
    body2: "AWS Developer Associate. Google Cloud Engineer. Two hackathon first places. Currently building in stealth. Not here to add features \u2014 here to build companies that last.",
  },
  philosophy: {
    topLeft: "Technical",
    topRight: "Pragmatic",
    midRight: "Curious",
    botLeft: "Ship",
    botRight: "\u221E",
    body: "Build from first principles. Own the full stack \u2014 from architecture to market. Ship, sell, iterate. Every enduring company starts with someone who refuses to accept \"that's how it's done.\"",
  },
  projects: {
    chapter: "III",
    heading: ["Projects"],
  },
  principles: {
    chapter: "IV",
    heading: ["Conviction", "Casseroles"],
    body1: "Work should be fun. Excellence in execution is non-negotiable. Rethink everything from first principles. Aggressively adapt to change. These aren't slogans \u2014 they're the filters every decision passes through.",
    body2: "Influenced by Built to Last, Good to Great, The Hard Thing About Hard Things, Zero to One. Training to think like a long-term CEO, not just a builder.",
  },
  blog: {
    chapter: "VI",
    heading: ["Latest", "Writing"],
  },
  contact: {
    chapter: "VII",
    heading: ["Let's", "Build"],
    body: "Looking to connect with founders, operators, and deeply technical builders who think in decades, not quarters. If you're building something ambitious, let's talk.",
  },
} as const;