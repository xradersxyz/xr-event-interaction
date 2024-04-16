import { expect } from 'chai'
import { ethers } from 'hardhat'
import { getEthers, getWallets } from '../../helpers/wallets'

const feeData = {
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'),
  maxPriorityFeePerGas: ethers.utils.parseUnits('1', 'gwei'),
}

async function exec_Attendance(eventInteraction: any, bscWallet: any) {
  const tx = await eventInteraction.attendance()
  // const tx = await eventInteraction.attendance({
  //   type: 0,
  //   // gasLimit: 100000, // 예시 가스 한도
  //   gasPrice: ethers.utils.parseUnits('5', 'gwei'), // 예시 가스 가격
  // })
  const receipt = await tx.wait()
  console.log('tx :', tx, '\nreceipt : ', receipt)

  const event = receipt.events?.find(
    (event: { event: string }) => event.event === 'Attendance'
  )
  expect(event?.args?.user).to.equal(bscWallet.address)
}

async function exec_Owner(eventInteraction: any, bscWallet: any) {
  const nonce = await eventInteraction.nonces(bscWallet.address)
  expect(nonce).to.be.a('number')
}

async function exec_getVote(eventInteraction: any, bscWallet: any) {
  const vote = await eventInteraction.getVote(bscWallet.address)
  console.log('Vote status for', bscWallet.address, ':', vote)
  // expect(vote).to.equal(true)
}

async function exec_Vote(eventInteraction: any, bscWallet: any) {
  const tx = await eventInteraction.vote(true)
  const receipt = await tx.wait()
  console.log('tx :', tx, '\nreceipt : ', receipt)

  const event = receipt.events?.find(
    (event: { event: string }) => event.event === 'Vote'
  )
  expect(event?.args?.user).to.equal(bscWallet.address)
}

async function main() {
  try {
    const { bnbWallet, bnbProvider } = getWallets()
    const existingContractAddress = process.env.BSC_CONTRACT_ADDRESS
    bnbProvider.getFeeData = async () => feeData as any

    const balance = await bnbProvider.getBalance(bnbWallet.address)
    console.log('Balance : ', await getEthers().utils.formatEther(balance))

    const eventInteractionFactory =
      await ethers.getContractFactory('EventInteraction')
    const eventInteraction = await eventInteractionFactory.attach(
      existingContractAddress as string
    )

    await exec_Attendance(eventInteraction, bnbWallet)
    // await exec_Vote(eventInteraction, bscWallet)
    // await exec_getVote(eventInteraction, bscWallet)
    // await exec_Owner(eventInteraction, bscWallet);

    console.log('Tests completed successfully')
  } catch (error) {
    console.error('Error during tests:', error)
    process.exit(1)
  }
}

main()
