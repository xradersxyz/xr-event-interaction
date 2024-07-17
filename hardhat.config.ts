import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'

require(`dotenv`).config()

const { DEVNET_PRIVKEY, ETHERSCAN_API_KEY, ARBISCAN_API_KEY, BSCSCAN_API_KEY } =
  process.env

const config: HardhatUserConfig = {
  defaultNetwork: 'bnbt',
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY as string,
      sepolia: ETHERSCAN_API_KEY as string,
      arbitrumOne: ARBISCAN_API_KEY as string,
      arbitrumGoerli: ARBISCAN_API_KEY as string,
      arbitrumSepolia: ARBISCAN_API_KEY as string,
      bsc: BSCSCAN_API_KEY as string,
      bnbt: BSCSCAN_API_KEY as string,
      opbnbt: BSCSCAN_API_KEY as string,
    },
    customChains: [
      {
        network: 'arbitrumSepolia',
        chainId: 421614,
        urls: {
          apiURL: process.env.ARBISCAN_API_URL as any,
          browserURL: process.env.ARBISCAN_BROWSER_URL as any,
        },
      },
      {
        network: 'bnbt',
        chainId: 97,
        urls: {
          apiURL: process.env.BSCSCAN_API_URL as any,
          browserURL: process.env.BSCSCAN_BROWSER_URL as any,
        },
      },
      {
        network: 'opbnbt',
        chainId: 5611,
        urls: {
          apiURL: process.env.OPBNBSCAN_API_URL as any,
          browserURL: process.env.OPBNBSCAN_BROWSER_URL as any,
        },
      },
    ],
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [`0x${DEVNET_PRIVKEY}`],
      gasPrice: 20000000000000, // 20 Gwei
    },
    goerli: {
      url: process.env.L1RPC_GOERLI,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    sepolia: {
      url: process.env.L1RPC_SEPOLIA,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    arbitrumGoerli: {
      url: process.env.L2RPC_GOERLI,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    arbitrumSepolia: {
      url: process.env.L2RPC_SEPOLIA,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    bnb: {
      url: process.env.L1RPC_BNB,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    bnbt: {
      url: process.env.L1RPC_BNBTEST,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    opbnb: {
      url: process.env.L2RPC_OPBNB,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
    opbnbt: {
      url: process.env.L2RPC_OPBNBTEST,
      accounts: [`0x${DEVNET_PRIVKEY}`],
    },
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          metadata: {
            bytecodeHash: 'none',
          },
          // Disable the optimizer when debugging
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          // Disable the optimizer when debugging
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
}

export default config
