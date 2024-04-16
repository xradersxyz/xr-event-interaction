import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'

require(`dotenv`).config()

const { DEVNET_PRIVKEY, ETHERSCAN_API_KEY, ARBISCAN_API_KEY, BSCSCAN_API_KEY } =
  process.env

const config: HardhatUserConfig = {
  defaultNetwork: 'sepolia',
  etherscan: {
    apiKey: {
      bsc: BSCSCAN_API_KEY as string,
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    bnb: {
      url: process.env.L1RPC_BNB,
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
