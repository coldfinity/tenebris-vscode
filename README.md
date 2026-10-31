# Tenebris for VS Code

A comprehensive dark colour theme with muted lavender accents, based on [Tenebris.nvim](https://github.com/coldfinity/tenebris.nvim), plus a matching file icon theme.

## Features

- **Full workbench colours:** editor, tabs, explorer, panels, terminal, menus, notifications, search, Git, diffs, and diagnostics.
- **Syntax and semantic token colours** adapted from the original Neovim theme.
- **Muted purple accent** (`#ae98b8`) on a near-black background (`#0c0c0c`).
- **Bracket pair colours:** six distinct but restrained colours (lavender, sand, sage, blue, rose, silver) cycling by nesting depth, with guides highlighting the active pair.
- **Tenebris Icons:** a file icon theme with dedicated icons for Python, C, C++, TypeScript, JavaScript, R, R Markdown, Java, Go, Lua, Swift, Kotlin, Ruby, PHP, Scala, Dart, Haskell, Julia, Zig, shell, Objective-C, and more.

## Install

1. Install **Tenebris** from the Extensions view (`Ctrl+Shift+X`).
2. Press `Ctrl+K Ctrl+T` and choose **Tenebris**.
3. Optional: run **Preferences: File Icon Theme** and choose **Tenebris Icons**.

The extension does not change your colour theme or icon theme on its own, so any icon pack you already use stays in place.

## Recommended settings

`presets/recommended-settings.json` contains optional UI settings (top activity bar, no minimap, smooth scrolling, and so on). They are not applied automatically; merge the ones you want into your user settings.

## Bracket colours

The extension enables bracket pair colourization by default. If all brackets look the same:

- Check that `editor.bracketPairColorization.enabled` is `true`.
- Remove old `editorBracketHighlight.foreground*` entries from `workbench.colorCustomizations`.
- To turn off the guides, set `editor.guides.bracketPairs` to `false`.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Development

Edit `themes/tenebris-color-theme.json` and press `F5` with this folder open to launch an Extension Development Host.

## Credits

Based on [Tenebris.nvim](https://github.com/coldfinity/tenebris.nvim). MIT licensed.
