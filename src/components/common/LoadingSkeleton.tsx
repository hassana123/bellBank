import { Card } from 'antd';

export const StatsCardSkeleton = () => (
  <Card className="border-0 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
    </div>
  </Card>
);

export const TransactionRowSkeleton = () => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
      </div>
    </div>
    <div className="text-right">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-32"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-36 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-48"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-6 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-12"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="flex items-center justify-end gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </td>
  </tr>
);

export const WalletBalanceSkeleton = () => (
  <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-200 to-gray-300">
    <div className="animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="h-4 bg-white/30 rounded w-32 mb-2"></div>
          <div className="h-10 bg-white/30 rounded w-48 mb-2"></div>
          <div className="h-4 bg-white/30 rounded w-36"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-white/30 rounded-lg w-24"></div>
          <div className="h-10 bg-white/30 rounded-lg w-20"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 rounded-lg p-4">
          <div className="h-3 bg-white/30 rounded w-24 mb-2"></div>
          <div className="h-6 bg-white/30 rounded w-32"></div>
        </div>
        <div className="bg-white/20 rounded-lg p-4">
          <div className="h-3 bg-white/30 rounded w-20 mb-2"></div>
          <div className="h-5 bg-white/30 rounded w-24 mb-1"></div>
          <div className="h-3 bg-white/30 rounded w-28"></div>
        </div>
      </div>
    </div>
  </Card>
);
