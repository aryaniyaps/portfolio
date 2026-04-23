import styles from "./Callout.module.css";

type CalloutType = "note" | "important" | "warning" | "tip";

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const TYPE_CONFIG: Record<
  CalloutType,
  { label: string; containerClass: string; headerClass: string; icon: string }
> = {
  note: {
    label: "Note",
    containerClass: styles.calloutNote,
    headerClass: styles.headerNote,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  },
  important: {
    label: "Important",
    containerClass: styles.calloutImportant,
    headerClass: styles.headerImportant,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  },
  warning: {
    label: "Warning",
    containerClass: styles.calloutWarning,
    headerClass: styles.headerWarning,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  tip: {
    label: "Tip",
    containerClass: styles.calloutTip,
    headerClass: styles.headerTip,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/></svg>`,
  },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const config = TYPE_CONFIG[type];

  return (
    <aside className={`${styles.callout} ${config.containerClass}`}>
      <div className={`${styles.header} ${config.headerClass}`}>
        <span
          className={styles.icon}
          dangerouslySetInnerHTML={{ __html: config.icon }}
        />
        {title ?? config.label}
      </div>
      <div className={styles.content}>{children}</div>
    </aside>
  );
}