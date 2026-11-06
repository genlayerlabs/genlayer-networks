# pre_deployment_phantom_bradbury

Phantom rehearsal of the Clarke deployment on Bradbury (GenLayer Orbit testnet, chain id 4221),
deployed 2026-11-05 from `genlayerlabs/genlayer-consensus@4f50df1e309f1ab7ad32eb31a1933f6ae56e8c60`
(branch `con-1137-vesting-factory-eoa-deploy`, PR #2002) with the governance testnet timings patch
applied (`docs/deployment/patches/governance-testnet-timings.patch`: minute-scale proposal windows,
15 minutes of voting, never a production build).

- `testnet_deployments.json`: the deployment book, key `genlayerOrbitTestnet.pre_deployment_phantom_bradbury`.
- `abi/`: Hardhat artifacts of every deployed contract (same compiler settings as the deployment).
- `COMMIT`: the source commit.
- No OpenZeppelin manifest: the Orbit pipeline records upgrade state in the book (ProxyAdmin keys).

## Key addresses

| Contract | Address |
| --- | --- |
| AddressManager (sealed) | `0xD778BF21Ef3ef2cA203CCC06CB2B6402fFFbfE1B` |
| Staking | `0xA4322a9eA272431821ed38828A7a3b7Be2eE41da` |
| ConsensusMain / ConsensusMainWithFees | see book |
| Governance (executor) | `0x60223baefa3FD3343064b54895B76B93c24B142C` |
| GovernanceVoting | `0x77398300CC4A68fDe9e1Fd1108B08a887EA1B8BB` |
| GovernanceGESRegistry | `0x1D0739B591A23d10B36dd0E1Fb458e0FD5e2d051` |
| GovernanceVotingPower | `0x19eD12203787F4ae2f69517e2bCdf2Ba3D7B51bA` |
| VestingFactory (EOA-deployed, `pre-tge-2`) | `0x46064f8004a2E51F743B198a7fab244200915b67` |
| MockOrbitInflationEscrow (test only) | `0x10a83552683353023D445E1356Ad08a7D808cf07` |
| Custody Safe (3-of-5, rehearsal keys) | `0x69ea779629A206D0d978594528C407eb9fb85492` |
| Deployer | `0x913C8cA13923BFF9F6459e1f2630c39A1E15A2EE` |

## Parameters

| Parameter | Value |
| --- | --- |
| Validator minimum stake | 42,000 GEN |
| Delegator minimum stake | 42 GEN |
| Epoch duration | 1800 s (epoch 0 also 1800 s, threshold 300 s) |
| Timeouts (activate, propose, commit, reveal, decided, leaderReveal) | 60, 300, 300, 60, 1800, 60 s |
| genesisGES | 4,850,000 GEN (the vesting distribution total) |
| Vesting schedules | 41 grants, 4,850,000 GEN, revoker = custody Safe |
| Inflation | mock escrow, epochs 0 to 9 funded with 9,983,831 GEN (998,477 GEN per epoch) |
| Governance windows | preparation 5 min, voting 15 min, veto 5 min, review 30 min, execution 60 min |
| Epoch 0 start | 2026-11-05 22:09:46 UTC |

## Custody and governance

Custody moved to the Safe on 2026-11-05 22:38 UTC (Safe batch
`0xcdbf330e84790ea1cc84ab007bce7a8567b3460ca3a8173748db4768a50d0590`). The Governance handoff was
executed by the Safe at epoch 5 on 2026-11-06: ownership sweep and voting-to-executor handshake in
`0xc3a4ba2de021837ba3e4f2231393d1ad70ed74c62a8a496aa1721f1e9b7e2a3c` (block 220744), ProxyAdmins in
`0x6fdf3cb713c127391c61100a01ee448ab2091c2d900c069cc790354fc3378073` (block 220748). Every Ownable2Step
contract and every ProxyAdmin is owned by the Governance executor; the executor is owned by
GovernanceVoting. Parameter changes and upgrades are governance proposals from here on.
Validators join from the GenLayer nodes (42,000 GEN each); epochs 0 to 5 were advanced by the deployer.
