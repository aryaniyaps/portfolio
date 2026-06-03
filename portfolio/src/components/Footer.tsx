import styles from "@/components/components.module.css";

type SocialLink = {
  name: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/aryaniyaps",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/aryaniyaps",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6.94 8.98H3.75V20h3.19V8.98ZM5.35 4a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7ZM20.25 13.95c0-3.3-1.76-4.84-4.12-4.84-1.9 0-2.75 1.04-3.22 1.77v-1.9H9.72V20h3.19v-5.45c0-1.46.28-2.87 2.08-2.87 1.78 0 1.8 1.66 1.8 2.97V20h3.46v-6.05Z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    href: "https://x.com/aryaniyaps",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M13.8 10.62 20.88 3h-1.68l-6.15 6.62L8.14 3H2.5l7.42 10-7.42 8h1.68l6.48-6.98L15.83 21h5.64l-7.67-10.38Zm-2.3 2.47-.75-1.04-5.98-7.78h2.56l4.83 6.29.75 1.04 6.28 8.17h-2.56l-5.13-6.68Z" />
      </svg>
    ),
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/aryaniyappan.com",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5.42 4.1C8.08 6.08 10.93 10.1 12 12.25c1.07-2.15 3.92-6.17 6.58-8.15 1.92-1.43 5.03-2.54 5.03.99 0 .7-.4 5.9-.64 6.75-.82 2.91-3.8 3.65-6.46 3.2 4.64.79 5.82 3.4 3.27 6.02-4.84 4.99-6.96-1.25-7.5-2.85-.1-.29-.15-.43-.28-.43s-.18.14-.28.43c-.54 1.6-2.66 7.84-7.5 2.85-2.55-2.63-1.37-5.23 3.27-6.02-2.66.45-5.64-.29-6.46-3.2C.8 10.99.39 5.79.39 5.09c0-3.53 3.11-2.42 5.03-.99Z" />
      </svg>
    ),
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@aryaniyaps",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M21.35 5.57c-.33-2.44-2.46-4.36-5-4.73A32.7 32.7 0 0 0 12 0c-1.4.02-2.86.3-4.35.84-2.54.37-4.67 2.29-5 4.73-.53 3.94-.1 7.23.4 9.23.86 3.44 3.96 4.33 7.12 4.52v1.33c-1.32.22-2.58.2-3.82-.05-.7-.14-1.35.31-1.5 1.01-.14.7.32 1.39 1.02 1.53 3.84.8 7.37.37 10.55-1.31.63-.33.88-1.12.55-1.75a1.3 1.3 0 0 0-1.76-.55c-1.03.54-2.07.9-3.16 1.1v-1.24c4.96-.41 7.7-2.44 8.32-6.1.43-2.57.55-5.13.98-7.72ZM17.2 13.8h-2.53V7.6c0-1.3-.55-1.96-1.64-1.96-1.2 0-1.8.78-1.8 2.32v3.39H8.7V7.96c0-1.54-.6-2.32-1.8-2.32-1.1 0-1.64.66-1.64 1.96v6.2H2.73V7.42c0-1.31.33-2.35 1-3.12.7-.77 1.6-1.17 2.73-1.17 1.3 0 2.28.5 2.94 1.49L10.03 5l.63-.38c.66-.99 1.64-1.49 2.94-1.49 1.13 0 2.04.4 2.73 1.17.67.77 1 1.81 1 3.12v6.38Z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:aryaniyaps@gmail.com",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3.75 5h16.5C21.22 5 22 5.78 22 6.75v10.5c0 .97-.78 1.75-1.75 1.75H3.75C2.78 19 2 18.22 2 17.25V6.75C2 5.78 2.78 5 3.75 5Zm.68 2 7.12 5.35c.27.2.63.2.9 0L19.57 7H4.43Zm15.82 1.44-6.6 4.95a2.75 2.75 0 0 1-3.3 0l-6.6-4.95v8.81c0 .14.11.25.25.25h16c.14 0 .25-.11.25-.25V8.44Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>&#9670; ARYAN IYAPPAN</span>
          <span className={styles.footerCopy}>
            &copy; 2026 &middot; All rights reserved
          </span>
        </div>
        <nav className={styles.footerLinks} aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              aria-label={link.name}
              href={link.href}
              rel={link.external ? "me noopener noreferrer" : "me"}
              target={link.external ? "_blank" : undefined}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
