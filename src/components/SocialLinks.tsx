import styles from "./SocialLinks.module.css";

type SocialName = "GitHub" | "LinkedIn" | "Instagram" | "Threads" | "X";

const profiles: Array<{ name: SocialName; href: string }> = [
  { name: "GitHub", href: "https://github.com/mvallautomations" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mishaelvallar" },
  { name: "Instagram", href: "https://www.instagram.com/mishaelvallar/" },
  { name: "Threads", href: "https://www.threads.net/@mishaelvallar" },
  { name: "X", href: "https://x.com/mishaelvallar" },
];

function SocialIcon({ name }: { name: SocialName }) {
  if (name === "GitHub") {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.95 10.95 0 0 1 12 6.1c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.78 1.07.78 2.16v3.26c0 .31.21.67.79.56A11.5 11.5 0 0 0 12 .7Z" />
      </svg>
    );
  }

  if (name === "LinkedIn") {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M5.3 7.9H1.6V22h3.7V7.9ZM3.45 2A2.16 2.16 0 1 0 3.5 6.3 2.16 2.16 0 0 0 3.45 2ZM22.4 13.9c0-4.25-2.27-6.23-5.3-6.23a4.58 4.58 0 0 0-4.14 2.28V7.9H9.25V22h3.71v-7c0-1.85.35-3.64 2.64-3.64 2.25 0 2.28 2.1 2.28 3.76V22h3.71l.01-8.1Z" />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "Threads") {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M17.5 8.4C16.7 5.6 14.8 4 12 4c-4.2 0-7 3.2-7 8s2.8 8 7 8c3.7 0 6.2-2.2 6.2-5.3 0-2.8-2-4.5-5.2-4.5-2.5 0-4.3 1.3-4.3 3.2 0 1.7 1.4 2.8 3.2 2.8 2.7 0 4.7-2.2 4.7-5.4 0-2.1-.6-4.1-1.7-5.4" />
      </svg>
    );
  }

  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4 20 20M20 4 4 20" />
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <nav className={styles.socials} aria-label="Social profiles">
      <span className={styles.label}>Connect</span>
      {profiles.map((profile) => (
        <a
          key={profile.name}
          className={styles.link}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit Mishael Vallar on ${profile.name}`}
        >
          <SocialIcon name={profile.name} />
        </a>
      ))}
    </nav>
  );
}
