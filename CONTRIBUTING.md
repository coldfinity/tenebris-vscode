# Contributing

## Setup

```sh
npm ci
```

Open the folder in VS Code and press `F5` to launch an Extension Development
Host with the theme loaded. Edit `themes/tenebris-color-theme.json` and reload
the host window (`Ctrl+R`) to see changes.

## Checks

```sh
npm run validate   # JSON, colour values, icon references, changelog entry
npm run package    # builds the .vsix
```

CI runs both on every push and pull request.

## Releasing

1. Update `version` in `package.json` and add a `## [x.y.z]` section to `CHANGELOG.md`.
2. Commit, then tag and push:
   ```sh
   git tag vX.Y.Z
   git push origin main --tags
   ```
3. The **Release** workflow validates the tag against `package.json`, builds the
   `.vsix`, publishes to the Visual Studio Marketplace (and Open VSX, if
   configured) and attaches the file to a GitHub release.

### Required repository secrets

| Secret     | Purpose                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| `VSCE_PAT` | Azure DevOps token, scope **Marketplace → Manage**, all organizations.  |
| `OVSX_PAT` | Optional. Open VSX token; the step is skipped when unset.               |
