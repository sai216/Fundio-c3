// hooks/useDynamicWormhole.ts - Fixed implementation with no duplicate imports
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

type SupportedChain = 'ethereum' | 'polygon' | 'bsc' | 'arbitrum' | 'avalanche' | 'optimism';

interface TransferParams {
  sourceChain: SupportedChain;
  targetChain: SupportedChain;
  token: string;
  amount: string;
  recipientAddress: string;
  senderAddress: string;
}

interface TransferQuote {
  fee: string;
  estimatedTime: string;
  route: string;
}

interface SupportedToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  verified: boolean;
}

interface WormholeState {
  isLoading: boolean;
  isTransferring: boolean;
  isApproving: boolean;
  currentStep: number;
  totalSteps: number;
  sourceHash: string | null;
  targetHash: string | null;
  error: string | null;
  quote: TransferQuote | null;
  sequence: string | null;
  vaa: string | null;
  tokensLoaded: boolean;
}

const toChecksumAddress = (address: string) => {
  try {
    return ethers.getAddress(address);
  } catch (error) {
    console.error('Invalid address:', address);
    return address;
  }
};

// Mock token registry - replace with real implementation
const MOCK_TOKENS: Record<SupportedChain, SupportedToken[]> = {
  ethereum: [
    { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86a33E6417c1eD8c8c40Ee5c79f3b11bB1Cc5', decimals: 6, verified: true },
    { symbol: 'USDT', name: 'Tether USD', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, verified: true },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18, verified: true },
  ],
  polygon: [
    { symbol: 'USDC', name: 'USD Coin', address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6, verified: true },
    { symbol: 'USDT', name: 'Tether USD', address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6, verified: true },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', decimals: 18, verified: true },
  ],
  bsc: [
    { symbol: 'USDC', name: 'USD Coin', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18, verified: true },
    { symbol: 'USDT', name: 'Tether USD', address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18, verified: true },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', decimals: 18, verified: true },
  ],
  arbitrum: [
    { symbol: 'USDC', name: 'USD Coin', address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6, verified: true },
    { symbol: 'USDT', name: 'Tether USD', address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6, verified: true },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', decimals: 18, verified: true },
  ],
  avalanche: [
    { symbol: 'USDC', name: 'USD Coin', address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', decimals: 6, verified: true },
    { symbol: 'USDT', name: 'Tether USD', address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', decimals: 6, verified: true },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', decimals: 18, verified: true },
  ],
  optimism: [
    { symbol: 'USDC', name: 'USD Coin', address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', decimals: 6, verified: true },
    { symbol: 'USDT', name: 'Tether USD', address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6, verified: true },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0x4200000000000000000000000000000000000006', decimals: 18, verified: true },
  ],
};

export function useDynamicWormhole() {
  const [state, setState] = useState<WormholeState>({
    isLoading: false,
    isTransferring: false,
    isApproving: false,
    currentStep: 0,
    totalSteps: 4,
    sourceHash: null,
    targetHash: null,
    error: null,
    quote: null,
    sequence: null,
    vaa: null,
    tokensLoaded: false,
  });

  const [tokenRegistry] = useState(MOCK_TOKENS);

  // Initialize tokens
  useEffect(() => {
    const initializeTokens = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate loading token registry
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        tokensLoaded: true 
      }));
    };

    initializeTokens();
  }, []);

  const getSupportedTokens = useCallback((chain: SupportedChain): SupportedToken[] => {
    return tokenRegistry[chain] || [];
  }, [tokenRegistry]);

  const checkTokenBalance = useCallback(async (
    chain: SupportedChain, 
    tokenSymbol: string, 
    userAddress: string
  ): Promise<string> => {
    try {
      // This would integrate with your LightweightWormholeService
      // For now, return mock balance
      return '1000.00';
    } catch (error) {
      console.error('Failed to check token balance:', error);
      return '0';
    }
  }, []);

  const checkTokenAllowance = useCallback(async (
    chain: SupportedChain, 
    tokenSymbol: string, 
    userAddress: string
  ): Promise<string> => {
    try {
      // This would integrate with your LightweightWormholeService
      // For now, return mock allowance
      return '0';
    } catch (error) {
      console.error('Failed to check token allowance:', error);
      return '0';
    }
  }, []);

  const getBridgeQuote = useCallback(async (params: TransferParams) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate quote generation
      await new Promise(resolve => setTimeout(resolve, 1500));

      const quote: TransferQuote = {
        fee: '0.025',
        estimatedTime: '15',
        route: `Wormhole: ${params.sourceChain} → ${params.targetChain}`
      };

      setState(prev => ({ 
        ...prev, 
        quote, 
        isLoading: false 
      }));
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error.message || 'Failed to get quote', 
        isLoading: false 
      }));
    }
  }, []);

  const approveToken = useCallback(async (
    chain: SupportedChain, 
    tokenSymbol: string, 
    amount: string
  ): Promise<string> => {
    setState(prev => ({ ...prev, isApproving: true, error: null }));

    try {
      // Simulate approval process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock transaction hash
      const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      setState(prev => ({ ...prev, isApproving: false }));
      return txHash;
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        isApproving: false, 
        error: error.message || 'Approval failed' 
      }));
      throw error;
    }
  }, []);

  const performFullTransfer = useCallback(async (params: TransferParams) => {
    setState(prev => ({ 
      ...prev, 
      isTransferring: true, 
      currentStep: 1, 
      error: null,
      sourceHash: null,
      targetHash: null
    }));

    try {
      // Step 1: Initiate transfer
      setState(prev => ({ ...prev, currentStep: 1 }));
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock source transaction hash
      const sourceHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setState(prev => ({ ...prev, sourceHash, currentStep: 2 }));

      // Step 2: Wait for confirmation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setState(prev => ({ ...prev, currentStep: 3 }));

      // Step 3: Generate VAA
      await new Promise(resolve => setTimeout(resolve, 2000));
      const sequence = Date.now().toString();
      setState(prev => ({ ...prev, sequence, currentStep: 4 }));

      // Step 4: Complete on target chain
      await new Promise(resolve => setTimeout(resolve, 3000));
      const targetHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      
      setState(prev => ({ 
        ...prev, 
        targetHash, 
        isTransferring: false, 
        currentStep: 4 
      }));

    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        isTransferring: false, 
        error: error.message || 'Transfer failed' 
      }));
      throw error;
    }
  }, []);

  const addCustomToken = useCallback(async (
    chain: SupportedChain, 
    address: string
  ): Promise<SupportedToken | null> => {
    try {
      // Simulate token validation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock custom token
      const customToken: SupportedToken = {
        symbol: 'CUSTOM',
        name: 'Custom Token',
        address: toChecksumAddress(address),
        decimals: 18,
        verified: false
      };

      return customToken;
    } catch (error) {
      console.error('Failed to add custom token:', error);
      return null;
    }
  }, []);

  const validateTokenContract = useCallback(async (
    chain: SupportedChain, 
    address: string
  ): Promise<SupportedToken | null> => {
    try {
      // Simulate token validation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock validation result
      return {
        symbol: 'TOKEN',
        name: 'Validated Token',
        address: toChecksumAddress(address),
        decimals: 18,
        verified: false
      };
    } catch (error) {
      console.error('Failed to validate token:', error);
      return null;
    }
  }, []);

  const getTransactionStatus = useCallback(async (
    txHash: string
  ): Promise<{ status: string; confirmations: number }> => {
    try {
      // Mock transaction status
      return {
        status: 'confirmed',
        confirmations: 12
      };
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return { status: 'unknown', confirmations: 0 };
    }
  }, []);

  const refreshTokens = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setState(prev => ({ ...prev, isLoading: false }));
  }, []);

  const resetState = useCallback(() => {
    setState(prev => ({
      ...prev,
      isTransferring: false,
      isApproving: false,
      currentStep: 0,
      sourceHash: null,
      targetHash: null,
      error: null,
      quote: null,
      sequence: null,
      vaa: null
    }));
  }, []);

  return {
    state,
    getSupportedTokens,
    checkTokenBalance,
    checkTokenAllowance,
    getBridgeQuote,
    approveToken,
    performFullTransfer,
    addCustomToken,
    validateTokenContract,
    getTransactionStatus,
    refreshTokens,
    resetState,
    tokenRegistry
  };
}