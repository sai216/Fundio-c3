// services/wormhole-lightweight.service.ts - Lightweight implementation without SDK dependencies
import { ethers } from 'ethers';

export type SupportedChain = 'ethereum' | 'polygon' | 'bsc' | 'arbitrum' | 'avalanche' | 'optimism';

export interface TransferParams {
  sourceChain: SupportedChain;
  targetChain: SupportedChain;
  token: string;
  amount: string;
  recipientAddress: string;
  senderAddress: string;
}

export interface TransferQuote {
  fee: string;
  estimatedTime: string;
  route: string;
  exchangeRate?: string;
}

export interface NetworkInfo {
  chainId: number;
  wormholeChainId: number;
  rpcUrl: string;
  tokenBridge: string;
  coreBridge: string;
  blockExplorer: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
}

export interface SupportedToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
}

export class LightweightWormholeService {
  // Wormhole chain IDs
  private readonly WORMHOLE_CHAIN_IDS = {
    ethereum: 2,
    polygon: 5,
    bsc: 4,
    arbitrum: 23,
    avalanche: 6,
    optimism: 24,
  };

  // Network configuration
  private readonly networks: Record<SupportedChain, NetworkInfo> = {
    ethereum: {
      chainId: 1,
      wormholeChainId: this.WORMHOLE_CHAIN_IDS.ethereum,
      rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC || 'https://eth.llamarpc.com',
      tokenBridge: '0x3ee18B2214AFF97000D974cf647E7C347E8fa585',
      coreBridge: '0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B',
      blockExplorer: 'https://etherscan.io',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    },
    polygon: {
      chainId: 137,
      wormholeChainId: this.WORMHOLE_CHAIN_IDS.polygon,
      rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon.llamarpc.com',
      tokenBridge: '0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE',
      coreBridge: '0x7A4B5a56256163F07b2C80A7cA55aBE66c4ec4d7',
      blockExplorer: 'https://polygonscan.com',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    },
    bsc: {
      chainId: 56,
      wormholeChainId: this.WORMHOLE_CHAIN_IDS.bsc,
      rpcUrl: process.env.NEXT_PUBLIC_BSC_RPC || 'https://bsc.llamarpc.com',
      tokenBridge: '0xB6F6D86a8f9879A9c87f643768d9efc38c1Da6E7',
      coreBridge: '0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B',
      blockExplorer: 'https://bscscan.com',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    },
    arbitrum: {
      chainId: 42161,
      wormholeChainId: this.WORMHOLE_CHAIN_IDS.arbitrum,
      rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
      tokenBridge: '0x0b2402144Bb366A632D14B83F244D2e0e21bD39c',
      coreBridge: '0xa5f208e072434bC67592E4C49C1B991BA79BCA46',
      blockExplorer: 'https://arbiscan.io',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    },
    avalanche: {
      chainId: 43114,
      wormholeChainId: this.WORMHOLE_CHAIN_IDS.avalanche,
      rpcUrl: process.env.NEXT_PUBLIC_AVALANCHE_RPC || 'https://api.avax.network/ext/bc/C/rpc',
      tokenBridge: '0x0e082F06FF657D94310cB8cE8B0D9a04541d8052',
      coreBridge: '0x54a8e5f9c4CbA08F9943965859F6c34eAF03E26c',
      blockExplorer: 'https://snowtrace.io',
      nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    },
    optimism: {
      chainId: 10,
      wormholeChainId: this.WORMHOLE_CHAIN_IDS.optimism,
      rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC || 'https://mainnet.optimism.io',
      tokenBridge: '0x1D68124e65faFC907325e3EDbF8c4d84499DAa8b',
      coreBridge: '0xEe91C335eab126dF5fDB3797EA9d6aD93aeC9722',
      blockExplorer: 'https://optimistic.etherscan.io',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    },
  };

  // Supported tokens
  private readonly supportedTokens: Record<SupportedChain, SupportedToken[]> = {
    ethereum: [
      { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86a33E6417c1eD8c8c40Ee5c79f3b11bB1Cc5', decimals: 6 },
      { symbol: 'WETH', name: 'Wrapped Ether', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18 },
    ],
    polygon: [
      { symbol: 'USDC', name: 'USD Coin', address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6 },
      { symbol: 'WETH', name: 'Wrapped Ether', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', decimals: 18 },
    ],
    bsc: [
      { symbol: 'USDC', name: 'USD Coin', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18 },
      { symbol: 'WETH', name: 'Wrapped Ether', address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', decimals: 18 },
    ],
    arbitrum: [
      { symbol: 'USDC', name: 'USD Coin', address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6 },
      { symbol: 'WETH', name: 'Wrapped Ether', address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', decimals: 18 },
    ],
    avalanche: [
      { symbol: 'USDC', name: 'USD Coin', address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', decimals: 6 },
      { symbol: 'WETH', name: 'Wrapped Ether', address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', decimals: 18 },
    ],
    optimism: [
      { symbol: 'USDC', name: 'USD Coin', address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', decimals: 6 },
      { symbol: 'WETH', name: 'Wrapped Ether', address: '0x4200000000000000000000000000000000000006', decimals: 18 },
    ],
  };

  // Contract ABIs
  private readonly erc20Abi = [
    'function balanceOf(address owner) view returns (uint256)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function decimals() view returns (uint8)',
  ];

  private readonly tokenBridgeAbi = [
    'function transferTokens(address token, uint256 amount, uint16 recipientChain, bytes32 recipient, uint256 arbiterFee, uint32 nonce) payable returns (uint64)',
    'function completeTransfer(bytes memory encodedVm)',
    'function isTransferCompleted(bytes32 hash) view returns (bool)',
    'function chainId() view returns (uint16)',
  ];

  getNetworkInfo(chain: SupportedChain): NetworkInfo {
    return this.networks[chain];
  }

  getSupportedTokens(chain: SupportedChain): SupportedToken[] {
    return this.supportedTokens[chain] || [];
  }

  private getProvider(chain: SupportedChain): ethers.JsonRpcProvider {
    const network = this.networks[chain];
    return new ethers.JsonRpcProvider(network.rpcUrl);
  }

  private getTokenInfo(chain: SupportedChain, tokenSymbol: string): SupportedToken | null {
    const tokens = this.supportedTokens[chain];
    return tokens.find(t => t.symbol === tokenSymbol) || null;
  }

  async getBridgeQuote(params: TransferParams): Promise<TransferQuote> {
    try {
      const sourceNetwork = this.networks[params.sourceChain];
      const targetNetwork = this.networks[params.targetChain];
      
      // Get current gas prices from source chain
      const sourceProvider = this.getProvider(params.sourceChain);
      const gasPrice = await sourceProvider.getFeeData();
      
      // Estimate bridge fee based on gas cost
      const estimatedGasUnits = 200000; // Typical for Wormhole transfers
      const gasCostWei = gasPrice.gasPrice ? gasPrice.gasPrice * BigInt(estimatedGasUnits) : BigInt('50000000000000000');
      const gasCostEth = ethers.formatEther(gasCostWei);
      
      // Estimate transfer time based on networks
      let estimatedMinutes = 15; // Base Wormhole time
      if (params.sourceChain === 'ethereum') estimatedMinutes += 10;
      if (params.targetChain === 'ethereum') estimatedMinutes += 10;
      
      return {
        fee: gasCostEth,
        estimatedTime: estimatedMinutes.toString(),
        route: `Wormhole: ${sourceNetwork.wormholeChainId} → ${targetNetwork.wormholeChainId}`,
        exchangeRate: '1.00',
      };
    } catch (error) {
      console.error('Failed to get bridge quote:', error);
      return {
        fee: '0.05',
        estimatedTime: '20',
        route: 'Wormhole Bridge',
      };
    }
  }

  async getTokenBalance(chain: SupportedChain, tokenSymbol: string, userAddress: string): Promise<string> {
    try {
      const provider = this.getProvider(chain);
      const tokenInfo = this.getTokenInfo(chain, tokenSymbol);
      
      if (!tokenInfo) {
        console.warn(`Token ${tokenSymbol} not supported on ${chain}`);
        return '0';
      }

      const normalizedUserAddress = ethers.getAddress(userAddress);
      const normalizedTokenAddress = ethers.getAddress(tokenInfo.address);

      const tokenContract = new ethers.Contract(normalizedTokenAddress, this.erc20Abi, provider);
      const balance = await tokenContract.balanceOf(normalizedUserAddress);
      
      return ethers.formatUnits(balance, tokenInfo.decimals);
    } catch (error) {
      console.error(`Failed to get ${tokenSymbol} balance on ${chain}:`, error);
      return '0';
    }
  }

  async checkTokenAllowance(chain: SupportedChain, tokenSymbol: string, userAddress: string): Promise<string> {
    try {
      const tokenInfo = this.getTokenInfo(chain, tokenSymbol);
      const network = this.networks[chain];
      
      if (!tokenInfo) {
        console.warn(`Token ${tokenSymbol} not supported on ${chain}`);
        return '0';
      }

      const provider = this.getProvider(chain);
      const normalizedUserAddress = ethers.getAddress(userAddress);
      const normalizedTokenAddress = ethers.getAddress(tokenInfo.address);

      const tokenContract = new ethers.Contract(normalizedTokenAddress, this.erc20Abi, provider);
      const allowance = await tokenContract.allowance(normalizedUserAddress, network.tokenBridge);
      
      return ethers.formatUnits(allowance, tokenInfo.decimals);
    } catch (error) {
      console.error(`Failed to check ${tokenSymbol} allowance on ${chain}:`, error);
      return '0';
    }
  }

  async approveToken(signer: ethers.Signer, chain: SupportedChain, tokenSymbol: string, amount: string): Promise<string> {
    const tokenInfo = this.getTokenInfo(chain, tokenSymbol);
    const network = this.networks[chain];
    
    if (!tokenInfo) {
      throw new Error(`Token ${tokenSymbol} not supported on ${chain}`);
    }

    try {
      const tokenContract = new ethers.Contract(tokenInfo.address, this.erc20Abi, signer);
      const amountParsed = ethers.parseUnits(amount, tokenInfo.decimals);
      
      const tx = await tokenContract.approve(network.tokenBridge, amountParsed);
      const receipt = await tx.wait();
      
      return receipt.hash;
    } catch (error) {
      console.error('Approval failed:', error);
      throw error;
    }
  }

  async initiateWormholeTransfer(
    signer: ethers.Signer,
    params: TransferParams,
    progressCallback?: (step: number, message: string) => void
  ): Promise<{ txHash: string; sequence: string }> {
    const tokenInfo = this.getTokenInfo(params.sourceChain, params.token);
    const sourceNetwork = this.networks[params.sourceChain];
    const targetNetwork = this.networks[params.targetChain];
    
    if (!tokenInfo) {
      throw new Error(`Token ${params.token} not supported on ${params.sourceChain}`);
    }

    try {
      progressCallback?.(1, 'Preparing Wormhole transfer...');
      
      const amountParsed = ethers.parseUnits(params.amount, tokenInfo.decimals);
      
      // Convert recipient address to bytes32
      const recipientBytes32 = ethers.zeroPadValue(
        ethers.getAddress(params.recipientAddress),
        32
      );
      
      progressCallback?.(2, 'Initiating transfer...');
      
      const tokenBridgeContract = new ethers.Contract(
        sourceNetwork.tokenBridge, 
        this.tokenBridgeAbi, 
        signer
      );
      
      // Call transferTokens function
      const tx = await tokenBridgeContract.transferTokens(
        tokenInfo.address,
        amountParsed,
        targetNetwork.wormholeChainId,
        recipientBytes32,
        0, // arbiter fee
        0  // nonce
      );
      
      progressCallback?.(3, 'Waiting for confirmation...');
      
      const receipt = await tx.wait();
      
      progressCallback?.(4, 'Transfer initiated successfully!');
      
      // Extract sequence from logs (simplified)
      const sequence = receipt.logs[0]?.topics[1] || '0';
      
      return {
        txHash: receipt.hash,
        sequence: sequence.toString(),
      };
    } catch (error) {
      console.error('Wormhole transfer failed:', error);
      throw error;
    }
  }

  async getTransactionStatus(chain: SupportedChain, txHash: string): Promise<{ status: string; confirmations: number }> {
    try {
      const provider = this.getProvider(chain);
      const receipt = await provider.getTransactionReceipt(txHash);
      
      if (!receipt) {
        return { status: 'pending', confirmations: 0 };
      }
      
      const currentBlock = await provider.getBlockNumber();
      const confirmations = currentBlock - receipt.blockNumber;
      
      return {
        status: receipt.status === 1 ? 'confirmed' : 'failed',
        confirmations,
      };
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return { status: 'unknown', confirmations: 0 };
    }
  }

  // Simplified VAA handling for demo purposes
  async waitForVAA(sourceChain: SupportedChain, emitterAddress: string, sequence: string): Promise<string> {
    // In production, you'd integrate with Wormhole's Guardian API
    // For now, simulate the process
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('VAA timeout - please check Wormhole Guardian network'));
      }, 60000);
      
      setTimeout(() => {
        clearTimeout(timeout);
        resolve(`0x${'0'.repeat(128)}`); // Mock VAA
      }, 20000);
    });
  }

  async isTransferCompleted(chain: SupportedChain, vaaHash: string): Promise<boolean> {
    try {
      const network = this.networks[chain];
      const provider = this.getProvider(chain);
      
      const tokenBridgeContract = new ethers.Contract(
        network.tokenBridge,
        this.tokenBridgeAbi,
        provider
      );
      
      const isCompleted = await tokenBridgeContract.isTransferCompleted(vaaHash);
      return isCompleted;
    } catch (error) {
      console.error('Failed to check transfer completion:', error);
      return false;
    }
  }

  async redeemTransfer(signer: ethers.Signer, chain: SupportedChain, vaa: string): Promise<string> {
    try {
      const network = this.networks[chain];
      
      const tokenBridgeContract = new ethers.Contract(
        network.tokenBridge,
        this.tokenBridgeAbi,
        signer
      );
      
      const tx = await tokenBridgeContract.completeTransfer(vaa);
      const receipt = await tx.wait();
      
      return receipt.hash;
    } catch (error) {
      console.error('Failed to redeem transfer:', error);
      throw error;
    }
  }
}