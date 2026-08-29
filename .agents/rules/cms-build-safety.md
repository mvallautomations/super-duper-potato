# Mid-Voyage CMS build safety

Applies to every CMS integration task.

1. Read AGENTS.md and CLAUDE.md before acting.
2. Preserve every pre-existing and uncommitted user change.
3. Work only in the assigned Git worktree and branch.
4. Obey the task's file allowlist. Stop if a required change falls outside it.
5. Never read, print, create, request, transmit, or commit credentials or secrets.
6. Never install a GitHub App, create an OAuth/API key, change permissions, or configure billing.
7. Never deploy to preview or production without Mishael's explicit approval for that deployment.
8. Never weaken TypeScript, link, content, accessibility, or security checks to make a task pass.
9. Do not edit the same files concurrently with another worker.
10. Finish with a handoff containing files changed, decisions, tests, results, limitations, and merge order.
