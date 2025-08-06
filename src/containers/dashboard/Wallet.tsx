import React, { useState, useEffect } from 'react';
//import { Button } from '~/components/controls/table/components';
import { Input } from '~/components/controls';
import { usePageFilters } from '~/hooks';
import { Card, Tag } from 'antd';
import { ArrowUpRight, ArrowDownLeft, Copy, Download, Filter, TrendingUp, WalletIcon, CreditCard, Clock } from 'lucide-react';
import { StatsCardSkeleton, TransactionRowSkeleton, WalletBalanceSkeleton } from '~/components/common/LoadingSkeleton';

type TransactionType = {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
};

const MOCK_TRANSACTIONS: TransactionType[] = [
  { 
    id: 1, 
    date: '2025-08-06', 
    description: 'Payment from Adebayo Tech Ltd', 
    amount: 45000, 
    type: 'credit',
    status: 'completed',
    reference: 'REF001'
  },
  { 
    id: 2, 
    date: '2025-08-06', 
    description: 'Wallet Top-up via Bank Transfer', 
    amount: 100000, 
    type: 'credit',
    status: 'completed',
    reference: 'REF002'
  },
  { 
    id: 3, 
    date: '2025-08-05', 
    description: 'Payout to Kemi Fashion Store', 
    amount: -25000, 
    type: 'debit',
    status: 'completed',
    reference: 'REF003'
  },
  { 
    id: 4, 
    date: '2025-08-05', 
    description: 'Transaction Fee', 
    amount: -750, 
    type: 'debit',
    status: 'completed',
    reference: 'REF004'
  },
  { 
    id: 5, 
    date: '2025-08-04', 
    description: 'Pending Settlement', 
    amount: 67500, 
    type: 'credit',
    status: 'pending',
    reference: 'REF005'
  },
];

export default function Wallet() {
  const { search, searchInput } = usePageFilters({ prefix: 'wallet' });
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  // Simulate API calls
  useEffect(() => {
    // Simulate wallet balance loading
    const balanceTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate transactions loading
    const transactionsTimer = setTimeout(() => {
      setTransactionsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(balanceTimer);
      clearTimeout(transactionsTimer);
    };
  }, []);

  const filteredTransactions = React.useMemo(() => {
    if (!search) return MOCK_TRANSACTIONS;
    return MOCK_TRANSACTIONS.filter((txn) =>
      txn.description.toLowerCase().includes(search.toLowerCase()) ||
      txn.reference.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalBalance = 186750;
  const availableBalance = 119250;
  const pendingBalance = 67500;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance Card */}
        <div className="md:col-span-2">
          {isLoading ? (
            <WalletBalanceSkeleton />
          ) : (
            <Card className="border-0 shadow-sm bg-gradient-to-br from-primary to-primary/90 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-primary-100 text-sm mb-2">Total Wallet Balance</p>
                  <h2 className="text-3xl font-bold">₦{totalBalance.toLocaleString()}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12.5% from last month</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Fund Wallet
                  </button>
                  <button className="bg-white text-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-100 text-xs mb-1">Account Number</p>
                      <p className="font-mono text-lg font-semibold">1234567890</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('1234567890')}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-primary-100 text-xs mb-1">Bank Name</p>
                  <p className="font-semibold">BellBank</p>
                  <p className="text-primary-100 text-xs">Virtual Account</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Balance Breakdown */}
        <div className="space-y-4">
          {isLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            <>
              <Card className="border-0 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <WalletIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Balance</p>
                    <p className="text-xl font-bold text-gray-900">₦{availableBalance.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Settlement</p>
                    <p className="text-xl font-bold text-gray-900">₦{pendingBalance.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Info Banner */}
      {!isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-full">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-900 font-medium text-sm">Fund your wallet instantly</p>
              <p className="text-blue-700 text-sm mt-1">
                Transfer to your virtual account number above or use your saved cards. Funds reflect immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Section */}
      <Card title="Transaction History" className="border-0 shadow-sm">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <Input
              type="text"
              placeholder="Search transactions or references..."
              className="max-w-sm"
              {...searchInput}
            />
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactionsLoading ? (
            // Show loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <TransactionRowSkeleton key={index} />
            ))
          ) : (
            // Show actual transactions
            filteredTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    txn.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {txn.type === 'credit' ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{txn.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-500">{txn.reference}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-sm text-gray-500">{txn.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {txn.type === 'credit' ? '+' : ''}₦{Math.abs(txn.amount).toLocaleString()}
                  </p>
                  <Tag color={
                    txn.status === 'completed' ? 'green' :
                    txn.status === 'pending' ? 'orange' : 'red'
                  } className="mt-1">
                    {txn.status}
                  </Tag>
                </div>
              </div>
            ))
          )}
          
          {!transactionsLoading && filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <WalletIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
