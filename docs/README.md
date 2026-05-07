# /docs

Internal documentation for working on this site. Nothing in here is built or shipped. Astro only ships files that are imported, so this folder lives only in the repo.

## Folders

- **`migration/`**: Porting case studies from the legacy Framer site (`lobato.framer.website`) into this Astro portfolio.
  - `playbook.md`: The reusable step-by-step. Run this once per article. Update it whenever you find a step that's missing or wrong.
  - `prds/`: One short PRD per article being ported. Captures scope, success criteria, and section-by-section content mapping.

## Conventions

- Plain English. This site is a learning project, so clarity beats jargon.
- Date entries when relevant, ISO format (`YYYY-MM-DD`).
- When a doc is obsolete, delete it. Git history is the archive.
- New top-level subfolders get a one-line entry above. If `/docs` ever has more than ~5 subfolders, that's a sign it should be reorganized.

## Naming

- Files and folders: `kebab-case.md`, lowercase, no spaces.
- PRDs are named after the project slug: `prds/voice-access.md`, `prds/lookout.md`.
