"use client"

import { WalletCard } from "./wallet-card"

const walletData = [
  {
    name: "CB Smart Wallet",
    address: "1FfmbH...55paH",
    balance: "$450.00",
    withdrawableAssets: "$150.00",
    depositAsset: "$2000.00",
  },
  {
    name: "Privy Wallet",
    address: "1FfmbH...55paH",
    balance: "$450.00",
    withdrawableAssets: "$150.00",
    depositAsset: "$2000.00",
  },
  {
    name: "Palmera Safe",
    address: "1FfmbH...55paH",
    balance: "$450.00",
    withdrawableAssets: "$150.00",
    depositAsset: "$2000.00",
  },
  {
    name: "Privy Wallet",
    address: "1FfmbH...55paH",
    balance: "$450.00",
    withdrawableAssets: "$150.00",
    depositAsset: "$2000.00",
  },
]

export function WalletGrid() {
  return (
    <div className="col-span-2 grid grid-cols-2 gap-4">
      {walletData.map((wallet, index) => (
        <WalletCard
          key={`${wallet.name}-${index}`}
          name={wallet.name}
          address={wallet.address}
          balance={wallet.balance}
          withdrawableAssets={wallet.withdrawableAssets}
          depositAsset={wallet.depositAsset}
        />
      ))}
    </div>
  )
}
