# genlayer-networks

Deployed contract addresses and ABIs of every GenLayer consensus network, one folder per
deployment:

| Folder | Network | Deployment set |
| --- | --- | --- |
| `bradbury-phase-2/` | Bradbury rollup (Orbit, chain 4221) | `deployment_bradbury_phase_2` |
| `phantom-bradbury/` | Bradbury rollup (Orbit, chain 4221), private | `deployment_phantom_bradbury` |
| `pre-phantom-bradbury/` | Bradbury rollup (Orbit, chain 4221), rehearsal | `pre_deployment_phantom_bradbury` |
| `bradbury/` | zkSync OS testnet (Bradbury Phase 1) | `deployment_bradbury` |
| `asimov/` | zkSync OS testnet | `deployment_asimov_phase5` |

Each folder holds:

- `testnet_deployments.json`: the deployment book as written by genlayer-consensus
  (`{ "<network>": { "<deployment set>": { "<Contract>": "0x…" } } }`).
- `COMMIT`: the genlayer-consensus commit the deployment was built from.
- `abi/`: the Hardhat artifacts of the deployed contracts, when kept.
- `README.md`: key addresses, parameters and custody notes (newer folders).

## index.json

`index.json` lists every folder, newest first, with its network key, deployment set, AddressManager
and timestamps (see `index.schema.json`). It is rebuilt by the "Rebuild deployment index"
workflow on every push to `main`; to refresh it locally run `node scripts/build-index.mjs`.

The UIs read it from
`https://raw.githubusercontent.com/genlayerlabs/genlayer-networks/main/index.json`:

- [genlayer-consensus-monitor](https://github.com/genlayerlabs/genlayer-consensus-monitor)
- [genlayer-consensus-vesting](https://github.com/genlayerlabs/genlayer-consensus-vesting)
- [genlayer-consensus-governance](https://github.com/genlayerlabs/genlayer-consensus-governance)

Each lists the folders in its deployment selector, opens on the newest folder the first time, and
remembers the choice in the browser. "Newest" is the folder whose deployment book was committed
most recently, so a new deployment becomes the default as soon as its folder lands on `main`.

## Adding a deployment

1. Create `<name>/` with `testnet_deployments.json`, `COMMIT` and, when available, `abi/` and a
   `README.md`. Folder names are lowercase with dashes; the selector label is derived from them
   (`bradbury-phase-2` reads "Bradbury Phase 2").
2. Run `node scripts/build-index.mjs` and commit `index.json` with the folder (the workflow would
   otherwise add a second commit).
