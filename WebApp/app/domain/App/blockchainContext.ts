import { Web3Provider } from "ethers/providers";
import { AbstractConnectorInterface } from '@web3-react/types'

export interface BlockchainContext {
  library?: Web3Provider,
  connector?: AbstractConnectorInterface,
}

export let blockchainContext: BlockchainContext = {
  library: undefined,
  connector: undefined,
}
