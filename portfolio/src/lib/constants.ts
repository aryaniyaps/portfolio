export const SKILL_BARS = [
  { label: "SYSTEMS ARCHITECTURE", width: 150 },
  { label: "CLOUD & INFRA", width: 130 },
  { label: "GTM & GROWTH", width: 120 },
  { label: "PRODUCT STRATEGY", width: 140 },
  { label: "OPEN SOURCE", width: 160 },
] as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
] as const;

export const SECTIONS = {
  hero: {
    eyebrow: "TECHNICAL FOUNDER \u00B7 BUILDER \u00B7 OPERATOR",
    heading: ["ARYAN", "IYAPPAN"],
    tagline: "Building enduring companies from first principles",
  },
  about: {
    chapter: "I",
    heading: ["The", "Builder"],
    body1:
      "Nineteen. Self-taught across engineering and business. Shipped production systems, contributed to open source (Strawberry GraphQL), and took a healthcare marketplace from zero to traction — owning product, sales, and every hard decision in between.",
    body2: "AWS Developer Associate. Google Cloud Engineer. Two hackathon first places. Currently building in stealth. Not here to add features — here to build companies that last.",
  },
  philosophy: {
    topLeft: "Technical",
    topRight: "Visionary",
    midRight: "GTM",
    botLeft: "Ship",
    botRight: "\u221E",
    body: "Build from first principles. Own the full stack — from architecture to market. Ship, sell, iterate. Every enduring company starts with someone who refuses to accept \"that's how it's done.\"",
  },
  built: {
    chapter: "III",
    heading: ["What", "I've Built"],
    body: "Founded hospitaljobs.in — a healthcare hiring marketplace — owning product, GTM, and the chicken-and-egg problem from zero. Contributed to Strawberry GraphQL, implementing query batching for production APIs. Won two hackathons building applied ML pipelines. Currently building in stealth.",
  },
  principles: {
    chapter: "IV",
    heading: ["First", "Principles"],
    body1: "Work should be fun. Excellence in execution is non-negotiable. Rethink everything from first principles. Aggressively adapt to change. These aren't slogans — they're the filters every decision passes through.",
    body2: "Influenced by Built to Last, Good to Great, The Hard Thing About Hard Things, Zero to One. Training to think like a long-term CEO, not just a builder.",
  },
  contact: {
    chapter: "V",
    heading: ["Let's", "Build"],
    body: "Looking to connect with founders, operators, and deeply technical builders who think in decades, not quarters. If you're building something ambitious, let's talk.",
  },
} as const;