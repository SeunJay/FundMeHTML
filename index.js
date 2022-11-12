import { ethers } from "./ethers.5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connect-button")
const fundButton = document.getElementById("fund-button")

async function connectToMetamask() {
  if (typeof window.ethereum !== undefined) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }
  }

  connectButton.innerHTML = "Connected"
  const accounts = await ethereum.request({ method: "eth_accounts" })
  console.log(accounts)
}

async function fund() {
  const ether = "0.1"
  console.log(`Funding with ${ether}`)

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)

  if (typeof window.ethereum !== undefined) {
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ether),
      })
      await listenForTransactionMine(transactionResponse, provider)
    } catch (error) {
      console.log(error.message)
    }
  }
}

connectButton.addEventListener("click", connectToMetamask)
fundButton.addEventListener("click", fund)

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations. `
      )
      resolve()
    })
  })
}
