# uipro-cli

CLI to install UI/UX Pro Max skill for AI coding assistants.

## Installation

```bash
npm install -g uipro-cli
```

## Usage

```bash
# Install for specific AI assistant
uipro init --ai claude      # Claude Code
uipro init --ai cursor      # Cursor
uipro init --ai windsurf    # Windsurf
uipro init --ai antigravity # Antigravity
uipro init --ai copilot     # GitHub Copilot
uipro init --ai kiro        # Kiro
uipro init --ai codex       # Codex (Skills)
uipro init --ai roocode     # Roo Code
uipro init --ai qoder       # Qoder
uipro init --ai gemini      # Gemini CLI
uipro init --ai trae        # Trae
uipro init --ai opencode    # OpenCode
uipro init --ai continue    # Continue (Skills)
uipro init --ai all         # All assistants

# Options
uipro init --offline                    # Skip GitHub download, use bundled assets only
uipro init --force                      # Overwrite existing files
uipro init --token <token>       # Optional GitHub token to avoid API rate limits

# Other commands
uipro versions --token <token>   # List available versions (optional token)
uipro update --token <token>     # Update to latest version (optional token)

# Env var
export UI_PRO_MAX_GITHUB_TOKEN=github_xxx
```

## Where to get a token

Create a Personal Access Token in GitHub:

- GitHub → **Settings** → **Developer settings** → **Personal access tokens**
- Recommended: create a token with the minimum scopes you need (for public repo release reads, no extra scopes are typically required).

## How It Works

By default, `uipro init` uses template generation locally. In ZIP download mode (`--legacy`), it tries to download the latest release from GitHub, and if that fails (network error, rate limit), it automatically falls back to the bundled assets included in the CLI package. If you hit GitHub rate limits, pass optional `--token` or set `UI_PRO_MAX_GITHUB_TOKEN`.

Use `--offline` to skip the GitHub download and use bundled assets directly.

## Development

```bash
# Install dependencies
bun install

# Run locally
bun run src/index.ts --help

# Build
bun run build

# Link for local testing
bun link
```

## License

CC-BY-NC-4.0
