# deployment_phantom_bradbury

Phantom Bradbury: a private network on the Bradbury rollup (GenLayer Orbit testnet, chain id 4221),
running the Clarke code. Not announced publicly; it shares chain 4221 with Bradbury, so the two
networks are told apart by contract address.

- Release: [`v0.6-rc-2`](https://github.com/genlayerlabs/genlayer-consensus/releases/tag/v0.6-rc-2)
  (`genlayerlabs/genlayer-consensus@2ed47bfad8652dac1535fe1a2aca62b0a9701b1d`, the PR #1965 merge on `v0.6-dev`).
- Deployed 2026-11-09 from `e1b49ecf9`, whose contract sources are identical to the release commit,
  with the governance testnet timings patch applied (`docs/deployment/patches/governance-testnet-timings.patch`:
  minute-scale proposal windows, never a production build) and `genesisGES` set to 4,850,000 GEN.

Files:

- `testnet_deployments.json`: the deployment book, key `genlayerOrbitTestnet.deployment_phantom_bradbury`
  (also committed in genlayer-consensus at `deployments/phantom-bradbury.json`).
- `abi/`: Hardhat artifacts of the deployed contracts, from the deployment build.
- `COMMIT`: the release commit.
- No OpenZeppelin manifest: the Orbit pipeline records upgrade state in the book (ProxyAdmin keys).

## Key addresses

| Contract | Address |
| --- | --- |
| AddressManager (sealed) | `0xFE071d57fE19faFD5E66A65819fc2385F684e38B` |
| ConsensusMain / ConsensusMainWithFees | `0xf9116C02f764d7e912B56967369fe3EeDBE9468E` |
| ConsensusData | `0x5EF677f3d32319a540b4E074D60DeEa2Ac7f9492` |
| TransactionManager | `0x47f3D70fBB6fE4411081468E4FB7c72F53f11Da0` |
| FeeManager | `0xDce84c96a727bd872240038d1eA128801292589C` |
| Staking | `0x46c7eaB0705691f3ed54D8541a6D0cEB00be03Fd` |
| ValidatorWalletFactory | `0x5AD10DeF7b4A5dC255494370d128989c0A1C9c04` |
| GhostFactory | `0x5e0BB5dA659AFe97Fd64bd0Ac22F1287aeD6a0f9` |
| Governance (executor) | `0x72573aD141A5E9f2e3D135858f1537eB5Ef25191` |
| GovernanceVoting | `0x69fEAC9862409EbedFDb7f3Dbe8C5861E015CbAB` |
| GovernanceGESRegistry | `0x333eeeaE2BCC0b06C3CF9401F0084AeD9Be97A74` |
| GovernanceVotingPower | `0xF0223D74958cbAA9FF1C227fccA79cDABe0ea8dB` |
| SecurityCouncil | `0x07AadEaB259171C08C39C3D30F90BE8D5Ce7aBF3` |
| VestingFactory (EOA-deployed, owned by the custody Safe) | `0xE26d21e86dFA8504481c324eDdB307b921EE946A` |
| MockOrbitInflationEscrow (test only) | `0x49B730A0625D6048fe2a95304d42796236B1835a` |
| Custody Safe (1-of-3) | `0x6F97874AcaB11a5B1B8785F0E556cb2a6e22733c` |
| Deployer | `0x913C8cA13923BFF9F6459e1f2630c39A1E15A2EE` |

## Parameters

| Parameter | Value |
| --- | --- |
| Validator minimum stake | 42,000 GEN |
| Delegator minimum stake | 42 GEN |
| Epoch 0 | 2026-11-09 13:21:03 UTC to 2026-11-11 10:00 UTC (11:00 CET), extended on 2026-11-10 from 12:00 CET |
| Epochs after 0 | 1800 s, threshold 300 s |
| Timeouts (activate, propose, commit, reveal, decided, leaderReveal) | 60, 300, 300, 60, 1800, 60 s |
| genesisGES | 4,850,000 GEN (the vesting distribution total) |
| Vesting schedules | 41 grants, 4,850,000 GEN, revoker = custody Safe |
| Inflation | mock escrow, epochs 0 to 499 funded with 494,772,256.76 GEN native |
| Governance windows | testnet timings build: about 25 minutes from proposal to execution |

## Verification

- `Verify_ProtocolSeal`: pass, manifest commitment `0x0bb9b258ff70a22894f2ff79a2240e7b197af96619a78617a139464021fed9d5`.
- `verifyDeployment.ts`: 42/42 contracts verified.
- Sources: all 207 contracts with code verified on the explorer (Conduit Sourcify v2).

## Custody and governance

The deployer still owns the protocol contracts; custody moves to the Safe in phase 12 of the plan.
The vesting factory and its ProxyAdmin are owned by the Safe since phase 1. Governance is deployed
but owns nothing: the handoff happens only by decision, not before epoch 5.
