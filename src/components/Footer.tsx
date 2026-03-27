/* ============================================================
   mid·voyage — Footer Component
   Minimal editorial. Mono text. Terracotta dot mark.
   ============================================================ */

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
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
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
