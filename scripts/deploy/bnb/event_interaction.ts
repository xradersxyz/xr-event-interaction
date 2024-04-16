import { getEthers, getUpgrades, getWallets } from '../../helpers/wallets'

const initialOwner = process.env.BSC_OWNER
const feeData = {
  maxFeePerGas: getEthers().utils.parseUnits('20', 'gwei'),
  maxPriorityFeePerGas: getEthers().utils.parseUnits('10', 'gwei'),
}

const main = async () => {
  const { bnbWallet, bnbProvider } = getWallets()
  bnbProvider.getFeeData = async () => feeData as any

  const [deployer] = await getEthers().getSigners()
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  /**
   * @dev .env setup
   *
   * BSC_CONTRACT_UPGRADE
   * true : execute contract upgrade
   * false : execute contract deploy
   *
   * BSC_CONTRACT_ADDRESS
   * destination contract address
   */
  const upgradeContract = process.env.BSC_CONTRACT_UPGRADE === 'true'
  const existingContractAddress = process.env.BSC_CONTRACT_ADDRESS

  console.log('arg BSC_CONTRACT_UPGRADE : ', upgradeContract)
  console.log('arg BSC_CONTRACT_ADDRESS : ', existingContractAddress)

  if (upgradeContract && existingContractAddress) {
    const eventInteractionFactory =
      await getEthers().getContractFactory('EventInteraction')
    console.log('Upgrading...')

    const eventInteraction = await getUpgrades().upgradeProxy(
      existingContractAddress,
      eventInteractionFactory
    )

    console.log(
      `${(await bnbProvider.getNetwork()).name} has been upgraded to ${
        eventInteraction.address
      }`
    )

    console.log(
      `npx hardhat verify --network ${(await bnbProvider.getNetwork()).name} ${
        eventInteraction.address
      }`
    )
  } else {
    const eventInteractionFactory = await (
      await getEthers().getContractFactory('EventInteraction')
    ).connect(bnbWallet)
    console.log('Deploying EventInteraction...')

    const eventInteraction = await getUpgrades().deployProxy(
      eventInteractionFactory,
      [initialOwner],
      {
        initializer: 'initialize',
      }
    )
    await eventInteraction.deployed()

    console.log(
      `${(await bnbProvider.getNetwork()).name} has been deployed to ${
        eventInteraction.address
      }`
    )

    console.log(
      `npx hardhat verify --network ${(await bnbProvider.getNetwork()).name} ${
        eventInteraction.address
      }`
    )
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
