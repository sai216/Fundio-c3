import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  X,
  Shield,
  Info,
  Sparkles,
  Wallet as WalletIcon,
  DollarSign,
  ArrowRight
} from 'lucide-react';

// OnchainKit imports
import { 
  ConnectWallet, 
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { 
  Address, 
  Avatar, 
  Name, 
  Identity 
} from '@coinbase/onchainkit/identity';
import { FundButton } from '@coinbase/onchainkit/fund';

interface OnchainKitOnRampModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function OnchainKitOnRampModal({ isOpen, onClose }: OnchainKitOnRampModalProps) {
  // Working fund functions with popup windows
  const openCoinbaseOnramp = () => {
    const width = 500;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    window.open(
      'https://pay.coinbase.com/buy/select-asset',
      'coinbase_onramp',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const openCoinbaseWallet = () => {
    const width = 500;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    window.open(
      'https://wallet.coinbase.com/',
      'coinbase_wallet',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const openCoinbaseApp = () => {
    const width = 500;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    window.open(
      'https://www.coinbase.com/buy',
      'coinbase_buy',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const openMoonPay = () => {
    const width = 500;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    window.open(
      'https://buy.moonpay.com/?currencyCode=eth&baseCurrencyCode=usd',
      'moonpay',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  const openRamp = () => {
    const width = 500;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    window.open(
      'https://ramp.network/buy/',
      'ramp_network',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] bg-white overflow-hidden flex flex-col">
        {/* Fixed Header - No Custom X Button */}
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Fund Wallet</span>
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* OnchainKit Wallet Connection - Highlight the Fund Options */}
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-gray-800 mb-2">🔗 OnchainKit Smart Funding</h3>
            
            <Wallet className="w-full">
              <ConnectWallet className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Avatar className="h-4 w-4" />
                  <Name />
                </div>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                </Identity>
                <WalletDropdownLink 
                  icon="wallet" 
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Manage Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>

            {/* OnchainKit FundButton - Shows Smart Options When Connected */}
            <div className="mt-2 p-2 bg-white rounded border border-gray-200 min-h-[100px] flex items-center justify-center">
              <FundButton />
            </div>
            
            <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-800">
              <div className="font-medium mb-1">✨ After connecting, you'll see:</div>
              <div className="space-y-1">
                <div>• <strong>Buy crypto</strong> - Use Coinbase to buy crypto</div>
                <div>• <strong>Receive crypto</strong> - Your wallet address</div>
                <div>• <strong>Link Coinbase account</strong> - Use ETH for Base payments</div>
              </div>
            </div>
          </div>

          {/* Instant Funding Options - Compact */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">💳 Instant Funding</h3>
              <span className="text-xs text-gray-500">Always Available</span>
            </div>
            
            {/* Coinbase Options - Compact */}
            <div className="space-y-2">
              <Button 
                onClick={openCoinbaseOnramp}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-left justify-start"
              >
                <div className="flex items-center w-full">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Coinbase Pay</div>
                    <div className="text-xs opacity-90">Official onramp - Best rates</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
              
              <Button 
                onClick={openCoinbaseWallet}
                variant="outline" 
                className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 h-10 text-left justify-start"
              >
                <div className="flex items-center w-full">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <WalletIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Coinbase Wallet</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>

              <Button 
                onClick={openCoinbaseApp}
                variant="outline" 
                className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 h-10 text-left justify-start"
              >
                <div className="flex items-center w-full">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-xs">CB</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Coinbase.com</div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>
            </div>

            {/* Alternative Options - Compact */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span>🌐</span> Alternative Options
              </h4>
              
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={openMoonPay}
                  variant="outline" 
                  className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 h-10 text-left justify-start"
                >
                  <div className="flex items-center w-full">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold text-xs">M</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">MoonPay</div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>

                <Button 
                  onClick={openRamp}
                  variant="outline" 
                  className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 h-10 text-left justify-start"
                >
                  <div className="flex items-center w-full">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-xs">R</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Ramp Network</div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Features - Compact */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <h4 className="text-xs font-medium text-gray-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-green-600" />
              What You Get
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="space-y-1">
                <div>✅ Credit/Debit Cards</div>
                <div>✅ Bank Transfers</div>
                <div>✅ Apple/Google Pay</div>
              </div>
              <div className="space-y-1">
                <div>✅ Direct to Wallet</div>
                <div>✅ Low Fees</div>
                <div>✅ Fast Processing</div>
              </div>
            </div>
          </div>

          {/* Base Network - Compact */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-gray-800">Base Network Optimized</span>
            </div>
            <p className="text-xs text-gray-600">
              Fast transactions (~2s) • Low fees (~$0.01) • Perfect for DeFi
            </p>
          </div>

          {/* Instructions - Compact */}
          <Alert className="border-orange-200 bg-orange-50">
            <Info className="w-3 h-3 text-orange-600" />
            <AlertDescription className="text-xs text-orange-700">
              <strong>How it works:</strong> Click any button → Complete purchase → Crypto delivered to wallet
            </AlertDescription>
          </Alert>
        </div>

        {/* Fixed Footer - Just Close Button, No X */}
        <div className="border-t p-4 bg-gray-50">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OnchainKitOnRampModal;