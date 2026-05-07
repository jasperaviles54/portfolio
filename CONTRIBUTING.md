# Contributing

Thank you for your interest in contributing to this portfolio project!

## Branch Naming

Use the following format for branch names:

```
<type>/<short-description>
```

**Examples:**
- `feat/add-dark-mode`
- `fix/contact-form-validation`
- `docs/update-readme`
- `style/improve-mobile-nav`

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary>
```

| Type | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | CSS/formatting changes (no logic change) |
| `refactor` | Code restructuring (no feature/fix) |
| `perf` | Performance improvements |
| `chore` | Build process, dependencies, tooling |

**Examples:**
- `feat: add toast notifications to contact form`
- `fix: resolve profile image stretch on about page`
- `docs: add architecture diagram`
- `perf: add lazy loading to certification images`

## Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Make your changes and test locally (`vercel dev`).
3. Ensure your changes don't break existing functionality.
4. Write a clear PR description explaining what and why.
5. Request a review.

## Local Development

```bash
cd portfolio
npm install
vercel dev
```

See the [README](README.md) for full setup instructions.
