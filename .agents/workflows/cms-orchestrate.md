# CMS orchestration workflow

Use this workflow to coordinate the Pages CMS build.

## Model routing

- Gemini paid subscription: cms-architect, cms-config-worker, deployment-worker, and final integration.
- Claude Haiku: docs-worker and a narrow second-pass diff review.
- Local open model, when available: mechanical fixtures, YAML linting, and documentation drafts.
- Never use a small model as the sole security or production-release approver.

## Execution

1. Invoke cms-architect in read-only mode and approve its compatibility decision.
2. Create separate Git worktrees for cms-config-worker and deployment-worker.
3. Run those workers in parallel only when their file allowlists do not overlap.
4. After config stabilizes, add scheduling and preview tasks to the deployment worktree.
5. Invoke security-reviewer and qa-reviewer read-only against the combined diff.
6. Send verified facts only to docs-worker.
7. Use one Gemini integration conversation to review and merge approved diffs.
8. Run the complete release gate and create a preview only after explicit approval.
9. Ask Mishael to perform account login, GitHub App installation, permissions, and secret creation.
10. Promote the exact verified artifact to production only after a second explicit approval.

## Required handoff

Every worker must report:

- branch and worktree
- allowed files
- files changed
- decisions
- commands and test results
- unresolved risks
- recommended merge order
