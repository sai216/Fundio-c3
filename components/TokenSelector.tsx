// components/TokenSelector.tsx - Fixed token selector with custom token support
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Search, 
  Check, 
  AlertTriangle, 
  RefreshCw,
  ExternalLink,
  Shield,
  AlertCircle 
} from 'lucide-react';

type SupportedChain = 'ethereum' | 'polygon' | 'bsc' | 'arbitrum' | 'avalanche' | 'optimism';

interface SupportedToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  verified: boolean;
}

interface TokenSelectorProps {
  chain: SupportedChain;
  selectedToken: string;
  onTokenSelect: (tokenSymbol: string) => void;
  supportedTokens: SupportedToken[];
  onAddCustomToken: (address: string) => Promise<SupportedToken | null>;
  onValidateToken: (address: string) => Promise<SupportedToken | null>;
  onRefreshTokens: () => void;
  isLoading?: boolean;
}

export function TokenSelector({
  chain,
  selectedToken,
  onTokenSelect,
  supportedTokens,
  onAddCustomToken,
  onValidateToken,
  onRefreshTokens,
  isLoading = false,
}: TokenSelectorProps) {
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customAddress, setCustomAddress] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    token: SupportedToken | null;
    error: string | null;
  }>({ token: null, error: null });
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tokens based on search query
  const filteredTokens = supportedTokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Validate custom token address
  const handleValidateCustomToken = async () => {
    if (!customAddress.trim()) return;

    setIsValidating(true);
    setValidationResult({ token: null, error: null });

    try {
      const validatedToken = await onValidateToken(customAddress.trim());
      
      if (validatedToken) {
        setValidationResult({ token: validatedToken, error: null });
      } else {
        setValidationResult({ 
          token: null, 
          error: 'Invalid token address or contract not found' 
        });
      }
    } catch (error: any) {
      setValidationResult({ 
        token: null, 
        error: error.message || 'Failed to validate token' 
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Add validated custom token
  const handleAddCustomToken = async () => {
    if (!validationResult.token) return;

    try {
      const addedToken = await onAddCustomToken(customAddress.trim());
      
      if (addedToken) {
        onTokenSelect(addedToken.symbol);
        setShowCustomDialog(false);
        setCustomAddress('');
        setValidationResult({ token: null, error: null });
      }
    } catch (error: any) {
      setValidationResult({ 
        token: null, 
        error: error.message || 'Failed to add token' 
      });
    }
  };

  // Reset custom token dialog
  const resetCustomDialog = () => {
    setCustomAddress('');
    setValidationResult({ token: null, error: null });
    setShowCustomDialog(false);
  };

  // Get block explorer URL for the chain
  const getBlockExplorerUrl = (chain: SupportedChain, address: string) => {
    const explorers = {
      ethereum: 'https://etherscan.io',
      polygon: 'https://polygonscan.com',
      bsc: 'https://bscscan.com',
      arbitrum: 'https://arbiscan.io',
      avalanche: 'https://snowtrace.io',
      optimism: 'https://optimistic.etherscan.io',
    };
    return `${explorers[chain]}/address/${address}`;
  };

  return (
    <div className="space-y-2">
      {/* Main Token Selector */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Select value={selectedToken} onValueChange={onTokenSelect}>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {/* Search Input */}
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search tokens..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8"
                  />
                </div>
              </div>

              {/* Token List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredTokens.length > 0 ? (
                  filteredTokens.map((token) => (
                    <SelectItem key={token.address} value={token.symbol}>
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{token.symbol}</span>
                            {token.verified && (
                              <Shield className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {token.name}
                          </div>
                        </div>
                        <Badge 
                          variant={token.verified ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {token.verified ? 'Verified' : 'Custom'}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No tokens found
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-2 border-t bg-gray-50">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefreshTokens}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <RefreshCw className={`w-3 h-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  
                  <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Plus className="w-3 h-3 mr-1" />
                        Custom
                      </Button>
                    </DialogTrigger>
                    
                    {/* Custom Token Dialog */}
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-blue-600" />
                          Add Custom Token
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        {/* Warning */}
                        <Alert className="border-orange-200 bg-orange-50">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <AlertDescription className="text-sm text-orange-700">
                            Only add tokens you trust. Verify the contract address before proceeding.
                          </AlertDescription>
                        </Alert>

                        {/* Address Input */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Token Contract Address
                          </label>
                          <div className="flex gap-2">
                            <Input
                              placeholder="0x..."
                              value={customAddress}
                              onChange={(e) => setCustomAddress(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              onClick={handleValidateCustomToken}
                              disabled={!customAddress.trim() || isValidating}
                              variant="outline"
                            >
                              {isValidating ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <Search className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Validation Result */}
                        {validationResult.token && (
                          <div className="p-3 bg-green-50 rounded border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">Valid Token Found</span>
                            </div>
                            <div className="space-y-1 text-sm text-green-700">
                              <div><strong>Symbol:</strong> {validationResult.token.symbol}</div>
                              <div><strong>Name:</strong> {validationResult.token.name}</div>
                              <div><strong>Decimals:</strong> {validationResult.token.decimals}</div>
                              <div className="text-xs text-green-600 break-all">
                                <strong>Address:</strong> {validationResult.token.address}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Validation Error */}
                        {validationResult.error && (
                          <Alert variant="destructive" className="border-red-200 bg-red-50">
                            <AlertCircle className="w-4 h-4" />
                            <AlertDescription className="text-sm">
                              {validationResult.error}
                            </AlertDescription>
                          </Alert>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={resetCustomDialog} className="flex-1">
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddCustomToken}
                            disabled={!validationResult.token}
                            className="flex-1"
                          >
                            Add Token
                          </Button>
                        </div>

                        {/* Help Text */}
                        <div className="text-xs text-gray-500 space-y-1">
                          <div>• Enter a valid ERC-20 token contract address</div>
                          <div>• The token will be validated before adding</div>
                          <div>• Only add tokens from trusted sources</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selected Token Info */}
      {selectedToken && (
        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border">
          {(() => {
            const token = supportedTokens.find(t => t.symbol === selectedToken);
            return token ? (
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{token.name}</span>
                  <span className="ml-2 text-gray-500">• {token.decimals} decimals</span>
                  {token.verified && (
                    <span className="ml-1">
                      <Shield className="w-3 h-3 inline text-green-500" />
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(getBlockExplorerUrl(chain, token.address), '_blank')}
                  className="h-6 px-2"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <span>Token not found</span>
            );
          })()}
        </div>
      )}
    </div>
  );
}