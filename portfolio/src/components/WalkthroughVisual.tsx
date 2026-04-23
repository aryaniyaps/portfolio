"use client";

import type { InnovationVisual } from "@/lib/constants";

interface Props {
  visual: InnovationVisual;
  active: boolean;
}

function AuthVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <circle cx="160" cy="80" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
        <circle cx="160" cy="80" r="18" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.8" />
        <circle cx="160" cy="80" r="8" fill="currentColor" opacity="0.9" />
        <line x1="160" y1="108" x2="160" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="148" y1="140" x2="172" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="145" y1="148" x2="175" y2="148" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M160 50 L160 36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M185 80 L200 80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M135 80 L120 80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="160" cy="36" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="200" cy="80" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="120" cy="80" r="3" fill="currentColor" opacity="0.4" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">AUTH</text>
      </g>
    </svg>
  );
}

function AgentsVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <circle cx="160" cy="72" r="16" fill="currentColor" opacity="0.9" />
        <circle cx="90" cy="120" r="10" fill="currentColor" opacity="0.5" />
        <circle cx="230" cy="120" r="10" fill="currentColor" opacity="0.5" />
        <circle cx="125" cy="140" r="7" fill="currentColor" opacity="0.35" />
        <circle cx="195" cy="140" r="7" fill="currentColor" opacity="0.35" />
        <line x1="160" y1="72" x2="90" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="160" y1="72" x2="230" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="90" y1="120" x2="125" y2="140" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="230" y1="120" x2="195" y2="140" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="160" y1="72" x2="125" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
        <line x1="160" y1="72" x2="195" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">AGENTS</text>
      </g>
    </svg>
  );
}

function BenchmarksVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <rect x="50" y="100" width="30" height="50" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="90" y="70" width="30" height="80" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="130" y="50" width="30" height="100" rx="2" fill="currentColor" opacity="0.7" />
        <rect x="170" y="60" width="30" height="90" rx="2" fill="currentColor" opacity="0.6" />
        <rect x="210" y="40" width="30" height="110" rx="2" fill="currentColor" opacity="0.85" />
        <rect x="250" y="85" width="30" height="65" rx="2" fill="currentColor" opacity="0.4" />
        <line x1="40" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">BENCHMARK</text>
      </g>
    </svg>
  );
}

function ArchitectureVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <rect x="135" y="20" width="50" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8" />
        <rect x="50" y="70" width="50" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
        <rect x="135" y="70" width="50" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15" />
        <rect x="220" y="70" width="50" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
        <rect x="135" y="120" width="50" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
        <line x1="160" y1="44" x2="75" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="160" y1="44" x2="160" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="160" y1="44" x2="245" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="75" y1="94" x2="160" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="160" y1="94" x2="160" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="245" y1="94" x2="160" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">ARCH</text>
      </g>
    </svg>
  );
}

function ScaleVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <polyline points="40,140 80,130 120,110 160,80 200,55 240,35 280,30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
        <circle cx="280" cy="30" r="4" fill="currentColor" opacity="0.9" />
        <circle cx="240" cy="35" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="200" cy="55" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="160" cy="80" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="120" cy="110" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="80" cy="130" r="2.5" fill="currentColor" opacity="0.3" />
        <line x1="40" y1="148" x2="290" y2="148" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        <line x1="40" y1="108" x2="290" y2="108" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 6" />
        <line x1="40" y1="68" x2="290" y2="68" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 6" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">SCALE</text>
      </g>
    </svg>
  );
}

function TestingVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <rect x="55" y="30" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
        <path d="M68 50 L76 58 L92 42" stroke="currentColor" strokeWidth="2.5" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="135" y="30" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
        <path d="M148 50 L158 60 L172 44" stroke="currentColor" strokeWidth="2.5" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="215" y="30" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
        <path d="M228 50 L238 60 L252 44" stroke="currentColor" strokeWidth="2.5" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="55" y="90" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
        <path d="M68 110 L78 120 L92 104" stroke="currentColor" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="135" y="90" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
        <path d="M148 110 L158 120 L172 104" stroke="currentColor" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="215" y="90" width="50" height="40" rx="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">TESTS</text>
      </g>
    </svg>
  );
}

function IntegrationVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <rect x="60" y="68" width="60" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
        <rect x="200" y="68" width="60" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
        <line x1="120" y1="84" x2="200" y2="84" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="120" y1="96" x2="200" y2="96" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="120" y1="108" x2="200" y2="108" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="160" cy="84" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="160" cy="96" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="160" cy="108" r="3" fill="currentColor" opacity="0.5" />
        <text x="90" y="102" textAnchor="middle" className="walkthroughHudNodeLabel">A</text>
        <text x="230" y="102" textAnchor="middle" className="walkthroughHudNodeLabel">B</text>
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">INTEGRATE</text>
      </g>
    </svg>
  );
}

function DataVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <rect x="40" y="50" width="70" height="90" rx="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
        <line x1="52" y1="68" x2="98" y2="68" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
        <line x1="52" y1="80" x2="95" y2="80" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        <line x1="52" y1="92" x2="90" y2="92" stroke="currentColor" strokeWidth="0.75" opacity="0.15" />
        <line x1="52" y1="104" x2="88" y2="104" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
        <path d="M110 96 L135 96" stroke="currentColor" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 3" />
        <polygon points="130,90 140,96 130,102" fill="currentColor" opacity="0.6" />
        <rect x="150" y="55" width="130" height="80" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
        <line x1="162" y1="72" x2="268" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="162" y1="88" x2="260" y2="88" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="162" y1="104" x2="270" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="162" y1="120" x2="250" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="258" cy="72" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="250" cy="88" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="260" cy="104" r="2" fill="currentColor" opacity="0.7" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">DATA</text>
      </g>
    </svg>
  );
}

function CodeVisual({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 320 192" fill="none" className="walkthroughHudSvg">
      <rect x="0" y="0" width="320" height="192" rx="4" className="walkthroughHudBg" />
      <g className={active ? "walkthroughHudActive" : "walkthroughHudIdle"}>
        <path d="M110 76 L90 96 L110 116" stroke="currentColor" strokeWidth="2" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M210 76 L230 96 L210 116" stroke="currentColor" strokeWidth="2" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="135" y1="72" x2="180" y2="120" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="133" cy="70" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="182" cy="122" r="2" fill="currentColor" opacity="0.5" />
        <text x="160" y="175" textAnchor="middle" className="walkthroughHudLabel">CODE</text>
      </g>
    </svg>
  );
}

const VISUAL_MAP: Record<InnovationVisual, React.FC<{ active: boolean }>> = {
  auth: AuthVisual,
  agents: AgentsVisual,
  benchmarks: BenchmarksVisual,
  architecture: ArchitectureVisual,
  scale: ScaleVisual,
  testing: TestingVisual,
  integration: IntegrationVisual,
  data: DataVisual,
  code: CodeVisual,
};

export default function WalkthroughVisual({ visual, active }: Props) {
  const Component = VISUAL_MAP[visual];
  return <Component active={active} />;
}