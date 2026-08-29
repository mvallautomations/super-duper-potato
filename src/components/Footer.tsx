/* ============================================================
   mid·voyage — Footer Component
   Minimal editorial. Mono text. Terracotta dot mark.
   ============================================================ */

import Link from "next/link";
import SocialLinks from "./SocialLinks";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "6rem",
        paddingBlock: "2.5rem",
        backgroundColor: "var(--bg-base)",
      }}
    >
      <div className="mv-container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem 2rem",
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {/* Terracotta dot */}
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-terra)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
              }}
            >
              mid·voyage by Mishael Vallar
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem 1.25rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />

          {/* Right side: copyright + location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.65rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.05em",
              }}
            >
              Philippines · {year}
            </span>
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.65rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.05em",
              }}
            >
              © Mishael Vallar. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
