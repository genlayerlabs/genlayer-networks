# deployment_bradbury_phase_3

Bradbury Phase 3: the GenLayer testnet deployment on the Bradbury rollup (GenLayer Orbit testnet,
chain id 4221, native GEN) that replaces Bradbury Phase 2. It shares chain 4221 with Bradbury
Phase 2 and Phantom Bradbury, so the networks are told apart by contract address.

- Release: [`v0.6.0`](https://github.com/genlayerlabs/genlayer-consensus/releases/tag/v0.6.0)
  (`genlayerlabs/genlayer-consensus@8805afba138cb98ca9142cb94c01acca7e4b5d80`, the PR #2123 merge on `v0.6-dev`).
- Deployed 2026-11-24 from `9b510d46d` on the `deploy/bradbury-phase-3` branch. The release commit
  contains that commit; the only later changes add the deployment book and its manifests.
- No Governance stack. The vesting stack is deployed without schedules.

Files:

- `testnet_deployments.json`: the deployment book, key `genlayerOrbitTestnet.deployment_bradbury_phase_3`
  (also committed in genlayer-consensus at `deployments/bradbury-phase-3.json`).
- `abi/`: Hardhat artifacts of the deployed contracts, from the deployment build.
- `COMMIT`: the release commit.
- No OpenZeppelin manifest: the Orbit pipeline records upgrade state in the book (ProxyAdmin keys).

## Key addresses

| Contract | Address |
| --- | --- |
| AddressManager (sealed) | `0x0192C6C9482251790965B7136352B26234d81d79` |
| ConsensusMain / ConsensusMainWithFees | `0x0f4F0e05475723790E4a2ed0598370783C300926` |
| ConsensusData | `0x2247b85b7ca7fb1Fea990b4aFAB4328D9c597f28` |
| TransactionManager | `0x0D0bb0B33A0A781385E148286B0F12F6C085942e` |
| FeeManager | `0x8E8B6194020dB1CbEf9C6c9dcFeE8FfF1e5E33c3` |
| FeesProcessor | `0x0c74AC5e70E07C5E10EC8c8fC6D852F36F944Ea4` |
| Staking | `0xcE16862EAf10B97A0619BeBb662991fb4a52e346` |
| ValidatorWalletFactory | `0xfE7bA48e90FeA19C955c18bBDE8BdC0810C2e6ed` |
| GhostFactory | `0xFE1173e275F0f496B54a68CEA75be0DE94C18ec0` |
| Idleness | `0xB33dDcDF61bd941293e82e09e68bc91bF638CD02` |
| VestingFactory (no grants) | `0x753B5DC3841F640cD93d61F26E5EAa088Da6f1B6` |
| MockOrbitInflationEscrow (test only) | `0x5E1091D119de7335c44A8F3DEfee5024d03C8687` |
| Deployer and owner | `0x913C8cA13923BFF9F6459e1f2630c39A1E15A2EE` |

## Parameters

| Parameter | Value |
| --- | --- |
| Validator minimum stake | 42,000 GEN |
| Delegator minimum stake | 42 GEN |
| Validator weight alpha / beta | 0.6 / 0.5 |
| Epoch 0 | 2026-11-24 17:31:37 UTC to 2026-11-25 11:00 UTC (12:00 CET) |
| Epochs after 0 | 1 day |
| Timeouts (activate, propose, commit, reveal, decided, leaderReveal) | 60, 300, 300, 60, 1800, 60 s |
| Seat chunk gas floor / seat loop gas floor | 22,400,000 / 2,000,000 |
| Submitted messages cap / eq outputs cap | 30,600 / 32,768 bytes |
| Vesting schedules | none |
| Inflation | mock escrow, epochs 0 to 99 funded with 99,733,697.67 GEN native |
| Governance | not deployed |

## Verification

- Every parameter above was read back from the chain on 2026-11-24 after the deployment.
- Protocol manifest commitment `0xebfcdbf8479a0f6984eee7b8feb97bff1dd8e599f5983c54f76a9203dfb18478`.
- Sources are not yet verified on the explorer: on 2026-11-24 the Conduit Sourcify v2 verifier
  returned `internal_error` for every submission. All 140 addresses match their compiled artifacts
  locally.

## Custody

The deployer owns the protocol contracts, the vesting factory and its ProxyAdmin. No custody
transfer is planned for this deployment.
