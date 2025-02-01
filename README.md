[![Release](https://github.com/Happyforce/hf-data-dumper-cli/actions/workflows/release.yml/badge.svg)](https://github.com/Happyforce/hf-data-dumper-cli/actions/workflows/release.yml)

# Happyforce Data Dumper CLI

Command-line tool for exporting data from Happyforce Public API in CSV format. Export your company's HI (Happiness Index), eNPS (Employee Net Promoter Score), and Score metrics with support for hierarchies, groups, and segments.

## Installation

Download the appropriate binary for your platform from the [releases page](https://github.com/happyforce/hf-data-dumper-cli/releases):

- Linux: `hf-data-dumper-linux`
- macOS: `hf-data-dumper-macos`
- Windows: `hf-data-dumper-win.exe`

For Linux/macOS users, make the binary executable:

bash
chmod +x hf-data-dumper-

## Usage

Basic command structure:

bash
hf-dumper -k YOUR_API_KEY [options]

### Export Options

Export HI stats:

bash
hf-dumper -k YOUR_API_KEY --hi --from 2023-01-01 --to 2023-12-31

Export eNPS stats:

bash
hf-dumper -k YOUR_API_KEY --enps --from 2023-01-01 --to 2023-12-31

Export all scores:

bash
hf-dumper -k YOUR_API_KEY --scores --from 2023-01-01 --to 2023-12-31

### Dimension Options

Include hierarchies:

bash
hf-dumper -k YOUR_API_KEY --scores --hierarchies --from 2023-01-01 --to 2023-12-31

Include groups:

bash
hf-dumper -k YOUR_API_KEY --scores --groups --from 2023-01-01 --to 2023-12-31

Include segments:

bash
hf-dumper -k YOUR_API_KEY --scores --segments --from 2023-01-01 --to 2023-12-31

## Output Files

All exports are saved in the `dumps` directory with the following formats:

- `*_hi.csv` - HI (Happiness Index) statistics
- `*_enps.csv` - eNPS statistics
- `*_scores.csv` - Main score statistics
- `*_scores_factors.csv` - Score factors breakdown
- `*_scores_questions.csv` - Individual question results

## Auto-Updates

The tool automatically checks for updates. To manually update to the latest version:

bash
hf-dumper update

## Development

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

1. Clone the repository:

bash
git clone https://github.com/happyforce/hf-data-dumper-cli.git
cd hf-data-dumper-cli

2. Install dependencies:

bash
npm install

### API Client Generation

The tool uses TypeScript clients generated from Happyforce's OpenAPI specification. To update the API client:

bash
npm run generate-api

This command generates TypeScript clients from the API spec at `https://api.myhappyforce.com/api/v3/api-docs`.

### Building

Build TypeScript files:

bash
npm run build

Package binaries:

bash
npm run package

### Creating Releases

1. Update version in package.json
2. Create and push a new tag:

bash
git tag v1.0.0
git push origin v1.0.0

This will trigger the GitHub Action to build and publish the binaries.

## License

ISC
