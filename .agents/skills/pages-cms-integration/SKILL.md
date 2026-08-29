---
name: pages-cms-integration
description: Implements or reviews the Mid-Voyage Pages CMS integration, Git-backed content schema, scheduled publishing, preview flow, and Cloudflare deployment.
---
# Pages CMS integration

Read AGENTS.md and .agents/rules/cms-build-safety.md before using this skill.

## Required sequence

1. Prove compatibility with the current nested Markdoc content.
2. Define .pages.yml without duplicating the public post schema.
3. Test round-trip editing with a non-public fixture.
4. Add preview automation with no production authority.
5. Add scheduled rebuilds for future-dated static content.
6. Run the full repository release gate.
7. Complete security and responsive QA.
8. Request human approval before any external account change or deployment.

## Invariants

- GitHub remains the content database and recovery history.
- Existing article URLs and Mid-Voyage design must remain stable.
- Draft and archived content must never enter production output.
- Scheduled content remains hidden until publishedAt.
- Secrets never enter files, prompts, logs, artifacts, or agent handoffs.
- No worker may weaken tests or deploy.
