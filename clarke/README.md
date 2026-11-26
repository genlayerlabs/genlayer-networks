# deployment_clarke

Clarke: the public GenLayer testnet deployment on the Bradbury rollup (GenLayer Orbit testnet,
chain id 4221, native GEN). It shares chain 4221 with Bradbury Phase 2, Bradbury Phase 3 and
Phantom Bradbury, so the networks are told apart by contract address.

- Release: [`v0.6.1`](https://github.com/genlayerlabs/genlayer-consensus/releases/tag/v0.6.1)
  (`genlayerlabs/genlayer-consensus@02d00d1d0f1524d5622d93d6759968ee42460d18`, the PR #2125 merge on `v0.6-dev`).
- Deployed 2026-11-26 from `897f5e5eb` on the `deploy/clarke` branch. The release commit contains
  that commit; the later changes add the deployment book, its manifests and generated inventories,
  and do not touch the contracts.
- The same release also carries the Bradbury Phase 3 book. Its ABIs only add to `v0.6.0`, so they
  serve Bradbury Phase 3 too; Bradbury Phase 3 itself still runs the contracts deployed from `v0.6.0`.
- Governance stack deployed with the production windows. The vesting stack is deployed by the
  pipeline, without schedules.

Files:

- `testnet_deployments.json`: the deployment book, key `genlayerOrbitTestnet.deployment_clarke`
  (also committed in genlayer-consensus at `deployments/clarke.json`).
- `abi/`: Hardhat artifacts of the deployed contracts, from the deployment build, plus
  `DeepthoughtReserve`, which the reserve address is upgraded to later.
- `COMMIT`: the release commit.
- The OpenZeppelin upgrade manifest is in genlayer-consensus at `.openzeppelin-evm-clarke/`.

## Key addresses

| Contract | Address |
| --- | --- |
| AddressManager (sealed) | `0xA79dA7c238905fD0F10298cD579B0733ad1B1d0E` |
| ConsensusMain / ConsensusMainWithFees | `0xa44222E0beDaB12329557499ae6E555b1c9D02ee` |
| ConsensusData | `0x16Ef1E1EF400A7fE0e572445974b95DA17370de9` |
| TransactionManager | `0xd0FC10616646899D7a469D8de0fffaD336D307BC` |
| FeeManager | `0xd072dce2439d46C1F972810C6593D744c919b48a` |
| FeesProcessor | `0x7e226Fe81eF152b7eF249404a7877Be8f83FBdcF` |
| Staking | `0x711d111510Af2Bb35c3929b709677a1E9f8ffce2` |
| ValidatorWalletFactory | `0xB169708a4a1C14503906C4eCfA07A61E5968209E` |
| GhostFactory | `0x118c424346Ee0452Af1fbE0D51443dDF03756586` |
| Idleness | `0x86e53f1775BdC173468D4fA2d87154dbbB0889F2` |
| VestingFactory (no grants) | `0x9Cd92364FaBD6821A0550d1D738c997CF216167C` |
| DeepthoughtReserve (placeholder, see below) | `0x567D914C21E6Ea98C4F59A0D4a6F984Ff0595Dea` |
| Governance | `0x8Efb09b75847e705B29C61B4c09C6bcC664311c7` |
| GovernanceVoting | `0xD8B0483908119A2b53BAceA772804E4c7B9B34F1` |
| GovernanceGESRegistry | `0x67db9aC56304948AF905e93fECc5cfCE18009fE1` |
| SecurityCouncil | `0xE3F1678c3E3d259ffbC130c6863d7Dfc09c1f08B` |
| GovernancePause | `0xd483020ECd75C6B9Ec91F7e7FC9c0DC545f59D43` |
| ArbitrumInflationEscrow | `0xfb1e38C9323AE4d870e3bAD0B29c4E9c18424731` |
| InflationFeeVault | `0xBAC0B055eC7a6B46401116B5FE76d0A494D36854` |
| Deployer and owner | `0x913C8cA13923BFF9F6459e1f2630c39A1E15A2EE` |

The reserve address holds `DeepthoughtReservePlaceholder`: it accepts the fee share and has no
lock and no Foundation. Its owner upgrades the same address to `DeepthoughtReserve` later; use the
`DeepthoughtReservePlaceholder` ABI until then.

## Parameters

| Parameter | Value |
| --- | --- |
| Validator minimum stake | 42,000 GEN |
| Delegator minimum stake | 42 GEN |
| Validator weight alpha / beta | 0.6 / 0.5 |
| Epoch 0 | started 2026-11-26 13:05:24 UTC; cannot end before 2026-12-10 13:05:24 UTC (14 days) |
| Epochs after 0 | 1 day |
| Timeouts (activate, propose, commit, reveal, decided, leaderReveal) | 60, 300, 300, 60, 1800, 60 s |
| Phase timeout bounds (min and max propose, min and max commit) | 30, 600, 30, 600 s |
| Seat chunk gas floor / seat loop gas floor | 22,400,000 / 2,000,000 |
| Submitted messages cap / eq outputs cap | 30,600 / 32,768 bytes |
| Minimum validators for admission | 5 |
| Vesting schedules | none |
| Airdrops | 39 of 42,000 GEN sent to validators; 3 listed recipients already held the amount and were skipped |
| Inflation | Sepolia GEN (`0x424242424b68330CcFb022881d25a6acC29852ea`) over the real bridge, escrow above; epochs 0 to 14 delivered |
| Governance | deployed, production windows; `genesisGES` 1,764,000 GEN; handoff not before epoch 5 |

## Verification

- Every parameter above was read back from the chain on 2026-11-26 after the deployment.
- Protocol manifest commitment `0x15635882835f7f64d6f33d865910c36ec2c79f51a23d951c19556e0e3108f185`.
- Sources: 103 of 206 addresses are verified on the explorer. The Conduit Sourcify v2 verifier
  refused the other uploads with 403 on two sweeps; all 206 addresses match their compiled
  artifacts locally.
- Read on 2026-11-26: the L1 acknowledgement of the first inflation delivery was not yet executed
  (`confirmedInflationEpoch` 0, `lastInflationEpoch` 15).

## Custody

The deployer owns the protocol contracts, the Governance stack, the vesting factory, the reserve
placeholder and every ProxyAdmin. A transfer to a Safe and the Governance handoff are planned and
not done.
