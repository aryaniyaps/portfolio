export const SKILL_BARS = [
  { label: "GRAPHQL", width: 180 },
  { label: "WEB DEVELOPMENT", width: 170 },
  { label: "AI ENGINEERING", width: 155 },
  { label: "AGENTIC DEVELOPMENT", width: 145 },
  { label: "CONTEXT ENGINEERING", width: 140 },
] as const;

export const SKILL_BARS_GROUP_1 = SKILL_BARS.filter((_, i) => i < 2);
export const SKILL_BARS_GROUP_2 = SKILL_BARS.filter((_, i) => i >= 2 && i < 4);
export const SKILL_BARS_GROUP_3 = SKILL_BARS.filter((_, i) => i >= 4);

export const PROJECTS = [
  {
    title: "Strawberry GraphQL",
    company: "Open Source",
    date: "2021",
    summary: "Query batching for production APIs",
    description:
      "Contributed to the Strawberry GraphQL library, implementing query batching for production APIs. Helped improve performance and developer experience for one of the most widely-used Python GraphQL frameworks.",
    github: "",
  },
  {
    title: "hospitaljobs.in",
    company: "Founder",
    date: "Apr – Dec 2025",
    summary: "Healthcare hiring marketplace from zero",
    description:
      "Founded a healthcare hiring marketplace, owning product, GTM, and the chicken-and-egg problem from zero. Built the full stack — from architecture to market — and drove traction in a two-sided marketplace.",
    github: "https://github.com/hospitaljobsin/hospitaljobsin",
  },
  {
    title: "LLM Lease Auditing",
    company: "Velocius AI Labs",
    date: "Jul – Aug 2024",
    summary: "Benchmarking LLMs for lease audit accuracy",
    description:
      "Analyzed multiple state-of-the-art LLMs to assess their effectiveness in automated lease auditing — including GPT-4o, Claude 3.5 Sonnet v1, Meta Llama 3.1 70B Instruct, and Meta Llama 3.1 405B Instruct. Findings informed fine-tuning and optimization of selected models, enhancing accuracy and efficiency, while identifying alternative models as backup solutions for robustness and flexibility.",
    github: "",
  },
  {
    title: "GenAI Data Extraction",
    company: "Velocius AI Labs",
    date: "Aug – Nov 2024",
    summary: "PDF → structured data, end-to-end on AWS",
    description:
      "Developed a robust solution for transforming unstructured PDF documents into structured, actionable data, from idea to a working prototype. Leveraging Python, LangChain, FastAPI, and React, with a highly scalable architecture on AWS — Lambda, API Gateway, DynamoDB, VPC for secure processing, and S3 for storage. The React SPA is hosted on CloudFront via S3, with CI/CD powered by CodeBuild and CodePipeline.",
    github: "",
  },
  {
    title: "LLM Real Estate Extraction",
    company: "Velocius AI Labs",
    date: "Dec 2024 – Jan 2025",
    summary: "LLM comparison for real estate workflows",
    description:
      "Analyzed multiple state-of-the-art LLMs to assess their effectiveness in extracting structured data from real estate documents and performing downstream tasks — including GPT-4o, Claude 3.5 Sonnet v2, Mistral 7×8B Instruct, Meta Llama 3.3 70B Instruct, Microsoft Phi 4 14B, and Deepseek V3. Results provided valuable insights into the applicability of these models for real estate workflows, paving the way for fine-tuning and optimization.",
    github: "",
  },
  {
    title: "Puthulir",
    company: "CED",
    date: "2024",
    summary: "125K views, 700+ students, zero downtime",
    description:
      "Developed and launched an interactive quiz hosting and event website for Puthulir 2024, aimed at promoting entrepreneurial knowledge among school students in Tamil Nadu. Attracted over 1,25,000 views within the quiz period, engaged 700+ students, and built a serverless infrastructure to handle high traffic with seamless performance throughout the event.",
    github: "",
  },
] as const;

export const NAV_LINKS = [
  { href: "#about", label: "About", external: false },
  { href: "#work", label: "Work", external: false },
  { href: "#contact", label: "Contact", external: false },
  { href: "https://aryaniyapsblog.vercel.app", label: "Blog", external: true },
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
  contact: {
    chapter: "V",
    heading: ["Let's", "Build"],
    body: "Looking to connect with founders, operators, and deeply technical builders who think in decades, not quarters. If you're building something ambitious, let's talk.",
  },
} as const;