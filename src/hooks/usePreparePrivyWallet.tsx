import { usePrivy } from "@privy-io/react-auth"
import { CHAIN_ID } from "@/lib/consts"
import useConnectedWallet from "./useConnectedWallet"

const usePreparePrivyWallet = () => {
  const { ready, user, login, authenticated } = usePrivy()
  const { wallet, connectedWallet } = useConnectedWallet() as any

  const prepare = async (chainId: any = CHAIN_ID) => {
    if (!user && ready && !authenticated && !connectedWallet) {
      login()
      return false
    }
    const privyChainId = wallet.chainId
    if (privyChainId !== `eip155:${chainId}`) {
      await wallet.switchChain(chainId)
      return false
    }
    return true
  }

  return { prepare }
}

export default usePreparePrivyWallet
