import React, { useState, useEffect } from 'react';
import { Card, Tag, Badge } from 'antd';
import { usePageFilters } from '~/hooks';
import { Input } from '~/components/controls';
import { Search, Filter, Download, Eye, MoreHorizontal, CreditCard, Smartphone, Building, TrendingUp, TrendingDown } from 'lucide-react';
import { StatsCardSkeleton, TableRowSkeleton } from '~/components/common/LoadingSkeleton';

type TransactionType = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  fee: number;
  status: 'success' | 'pending' | 'failed';
  method: 'card' | 'bank_transfer' | 'ussd';
  reference: string;
  date: string;
  time: string;
};

const MOCK_TRANSACTIONS: TransactionType[] = [
  {
    id: 'TXN001',
    customer: 'Adebayo Tech Ltd',
    email: 'payment@adebayotech.com',
    amount: 45000,
    fee: 675,
    status: 'success',
    method: 'card',
    reference: 'REF_45K_001',
    date: '2025-08-06',
    time: '14:32'
  },
  {
    id: 'TXN002',
    customer: 'Lagos Fashion Store',
    email: 'orders@lagosfashion.ng',
    amount: 12500,
    fee: 187.5,
    status: 'pending',
    method: 'bank_transfer',
    reference: 'REF_12K_002',
    date: '2025-08-06',
    time: '13:45'
  },
  {
    id: 'TXN003',
    customer: 'Kemi Beauty Palace',
    email: 'kemi@beautypalace.com',
    amount: 78900,
    fee: 1183.5,
    status: 'success',
    method: 'ussd',
    reference: 'REF_78K_003',
    date: '2025-08-06',
    time: '12:18'
  },
  {
    id: 'TXN004',
    customer: 'Tech Solutions Hub',
    email: 'billing@techsolutions.ng',
    amount: 156000,
    fee: 2340,
    status: 'failed',
    method: 'card',
    reference: 'REF_156K_004',
    date: '2025-08-05',
    time: '16:22'
  },
];

export default function TransactionsContainer() {
  const { search, searchInput } = usePageFilters({ prefix: 'transactions' });
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  // Simulate API calls
  useEffect(() => {
    // Simulate stats loading
    const statsTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    // Simulate transactions loading
    const transactionsTimer = setTimeout(() => {
      setTransactionsLoading(false);
    }, 1800);

    return () => {
      clearTimeout(statsTimer);
      clearTimeout(transactionsTimer);
    };
  }, []);

  const filteredTransactions = React.useMemo(() => {
    if (!search) return MOCK_TRANSACTIONS;
    return MOCK_TRANSACTIONS.filter((txn) =>
      txn.customer.toLowerCase().includes(search.toLowerCase()) ||
      txn.reference.toLowerCase().includes(search.toLowerCase()) ||
      txn.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const stats = {
    total: MOCK_TRANSACTIONS.length,
    successful: MOCK_TRANSACTIONS.filter(t => t.status === 'success').length,
    pending: MOCK_TRANSACTIONS.filter(t => t.status === 'pending').length,
    failed: MOCK_TRANSACTIONS.filter(t => t.status === 'failed').length,
    totalAmount: MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0),
    totalFees: MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.fee, 0),
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="w-4 h-4" />;
      case 'bank_transfer': return <Building className="w-4 h-4" />;
      case 'ussd': return <Smartphone className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'green';
      case 'pending': return 'orange';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all your payment transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatsCardSkeleton key={index} />
          ))
        ) : (
          <>
            <Card className="border-0 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">Total Transactions</p>
                  <p className="text-xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {((stats.successful / stats.total) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Volume</p>
                  <p className="text-2xl font-bold text-gray-900">₦{stats.totalAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Fees</p>
                  <p className="text-2xl font-bold text-gray-900">₦{stats.totalFees.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Transactions Table */}
      <Card className="border-0 shadow-sm">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions, customers, or references..."
                className="pl-10"
                {...searchInput}
              />
            </div>
            <Badge count={filteredTransactions.length} showZero>
              <span className="text-sm text-gray-600">Results</span>
            </Badge>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {transactionsLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRowSkeleton key={index} />
                ))
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                        <p className="text-sm text-gray-500">{transaction.reference}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.customer}</p>
                        <p className="text-sm text-gray-500">{transaction.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">₦{transaction.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Fee: ₦{transaction.fee}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getMethodIcon(transaction.method)}
                        <span className="text-sm text-gray-900 capitalize">
                          {transaction.method.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Tag color={getStatusColor(transaction.status)} className="capitalize">
                        {transaction.status}
                      </Tag>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">{transaction.date}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!transactionsLoading && filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
