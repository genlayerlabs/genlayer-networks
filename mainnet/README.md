# deployment_main

GenLayer mainnet: the GenLayer chain (Arbitrum Orbit, chain id 42424242) with GEN as its native gas
token, settling to Ethereum mainnet. The consensus contracts are not deployed yet, so the book holds
only the two token addresses and the folder is left out of `index.json` until an AddressManager exists.

| Item | Value |
| --- | --- |
| Chain id | `42424242` |
| RPC | `https://rpc.chain.genlayer.com` |
| Explorer | [scan.chain.genlayer.com](https://scan.chain.genlayer.com) |
| Parent chain | Ethereum mainnet (chain id 1) |

Files:

- `testnet_deployments.json`: the deployment book, key `genlayerMainnet.deployment_main`
  (also committed in genlayer-consensus at `deployments/mainnet.json`).
- No `COMMIT` or `abi/` yet: they arrive with the consensus deployment.

## Tokens

| Token | Chain | Book key | Address |
| --- | --- | --- | --- |
| GEN (`GenLayer`, 18 decimals) | Ethereum mainnet | `Gen` | [`0x4242424228C275C5b44E24C53f081E9246025a2f`](https://etherscan.io/token/0x4242424228C275C5b44E24C53f081E9246025a2f) |
| wGEN (`Wrapped GEN`, 18 decimals) | GenLayer chain (42424242) | `WGEN` | `0xB5Ed95Bb64c745fD15b0D30619cFe7C55b6191c3` |

GEN is the native gas token on the GenLayer chain; the `Gen` entry is its ERC-20 on Ethereum.

wGEN wraps native GEN 1:1 with WETH9 semantics (no owner, not upgradeable). It is deployed through
the CREATE2 proxy at `0x4e59b44847b379578588920ca78fbf26c0b4956c`, so it has the same address on
every GenLayer chain, including the Bradbury rollup (chain 4221).

- Deployment: tx `0xa96984303f37e363e774244f4a5c6aeda1d4e05d23ed38449a01e5d8b4fb5c9d`, block 458,
  sender `0xd605B36837625b35dfc974F96d39E3Bc792060aa`.
- Source: `wrapped-native/wgen/WGEN.sol` in genlayer-consensus, verified on the explorer's
  verifier (`exact_match`).
