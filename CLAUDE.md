# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This repository holds deployment configurations for GenLayer networks across different phases:

- **Mainnet** - GenLayer chain 42424242 (`mainnet/`): GEN on Ethereum and wGEN so far, no consensus contracts yet
- **Asimov** - Early testnet phases on the zkSync OS testnet (`asimov/`)
- **Bradbury** - Phase 1 on the zkSync OS testnet (`bradbury/`); Phase 2 on the Orbit rollup, chain 4221 (`bradbury-phase-2/`)
- **Phantom Bradbury** - Private Clarke-code network on the Orbit rollup (`phantom-bradbury/`, rehearsal in `pre-phantom-bradbury/`)

The repository manages:
- Network deployment configurations and scripts
- Contract upgrade mechanisms
- Deployed contract addresses and ABIs
- Upgradeable proxy tracking files for subsequent upgrades

## Layout

One folder per deployment: `testnet_deployments.json` (the book), `COMMIT` (genlayer-consensus
commit), optional `abi/` and `README.md`. `index.json` lists the folders newest first and is
rebuilt by `.github/workflows/index.yml` on every push to `main` (`node scripts/build-index.mjs`
locally). The monitor, vesting and governance UIs read `index.json` and the books from
raw.githubusercontent.com, so keep the folder layout and the index schema (`index.schema.json`)
stable.
