# deployment_bradbury_phase_2

Bradbury Phase 2: the public GenLayer testnet deployment on the Bradbury rollup (GenLayer Orbit
testnet, chain id 4221, native GEN), the first deployment with real L1 inflation and the Governance
stack. It shares chain 4221 with Phantom Bradbury, so the two networks are told apart by contract
address.

- Deployed 2026-10-15 from the `bradbury-phase-2` branch (based on `v0.6-dev`), recorded in
  `genlayerlabs/genlayer-consensus@7a4631494d55fc52c481544bd44ea24ae968cfe7` (the PR #1908 merge).
  The runbook is `docs/deployment/bradbury-phase-2-runbook.md` in genlayer-consensus.
- Epoch 0 ran until 2026-10-22 14:00 UTC (`setEpochZeroMinDuration`); epochs are 1 day long.
- wGEN was deployed on 2026-10-23 and recorded in the book as `WGEN`.

Files:

- `testnet_deployments.json`: the deployment book, key `genlayerOrbitTestnet.deployment_bradbury_phase_2`
  (also committed in genlayer-consensus at `deployments/bradbury-phase-2.json`).
- `COMMIT`: the genlayer-consensus commit that recorded the deployment.
- `abi/`: Hardhat artifacts of the deployed contracts, rebuilt from that commit (`npx hardhat compile` at `7a4631494`).
- No OpenZeppelin manifest: the Orbit pipeline records upgrade state in the book (ProxyAdmin keys).

## Key addresses

| Contract | Address |
| --- | --- |
| AddressManager (sealed) | `0x3F71AE080BD6270A91dBcc7960d88797828538E0` |
| ConsensusMain / ConsensusMainWithFees | `0x2E2766cbc3E5e61Ce93bBcdCBb3eAcB82082A019` |
| ConsensusData | `0xc5FA6f82BEe53598825d6edf7E3e24613082c75B` |
| TransactionManager | `0xaCe5e4191Bf408957538Caa9493aBB64F63D92c4` |
| FeeManager | `0x7678587A847712f2A96082AC07883A88D0fc7245` |
| Staking | `0xD8fBa96C0dBB0257028dBc0107060b958e5c7113` |
| ValidatorWalletFactory | `0x399FCBe6b442903cbA4d3B647B4b30EddF729314` |
| GhostFactory | `0x901ECAeFc35aed5Dd9967feF4E161d42199aAd9d` |
| NFTMinter | `0xEe307BCE38733cD16c15A13FE7e928BBE40e96E1` |
| Governance (executor) | `0x14b647BE7358aE0678DB5B60eC8B8fd90e895917` |
| GovernanceVoting | `0xF4Fbb5C9FEe31cF45ECb37a3578699F8E88A52C3` |
| GovernanceGESRegistry | `0x9a59348e756f9dD54C58B31ac764fB0130B51e06` |
| GovernanceVotingPower | `0xc42590416fF93dD12a038b601088Ff2629559aBf` |
| SecurityCouncil | `0x48713683CdB19ece4f6f9601Ffe64c8862827cFC` |
| VestingFactory | `0x82cA5e0e7A9345CF3ED5ee68A7fba41EF2202316` |
| WGEN | `0xB5Ed95Bb64c745fD15b0D30619cFe7C55b6191c3` |

## Network

| | |
| --- | --- |
| RPC | `https://rpc-genlayer-chain-testnet-cfn8m3xc6l.t.conduit.xyz` |
| Explorer | `https://explorer-genlayer-chain-testnet-cfn8m3xc6l.t.conduit.xyz` |
| AddressManager deployment block | 47930 |
