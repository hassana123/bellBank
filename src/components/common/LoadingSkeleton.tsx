import { Card } from "antd"

export const StatsCardSkeleton = () => (
  <Card className="border-0 shadow-sm bg-card">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
        <div className="h-8 bg-muted rounded animate-pulse w-24"></div>
      </div>
      <div className="w-12 h-12 bg-muted rounded-xl animate-pulse"></div>
    </div>
  </Card>
)

export const TransactionRowSkeleton = () => (
  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
      <div>
        <div className="h-4 bg-muted rounded animate-pulse w-48 mb-2"></div>
        <div className="h-3 bg-muted rounded animate-pulse w-32"></div>
      </div>
    </div>
    <div className="text-right">
      <div className="h-4 bg-muted rounded animate-pulse w-20 mb-2"></div>
      <div className="h-6 bg-muted rounded animate-pulse w-16"></div>
    </div>
  </div>
)

export const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-muted rounded w-24 mb-1"></div>
      <div className="h-3 bg-muted rounded w-32"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-muted rounded w-36 mb-1"></div>
      <div className="h-3 bg-muted rounded w-48"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-muted rounded w-20 mb-1"></div>
      <div className="h-3 bg-muted rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-muted rounded w-24"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-6 bg-muted rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-muted rounded w-20 mb-1"></div>
      <div className="h-3 bg-muted rounded w-12"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="flex items-center justify-end gap-2">
        <div className="w-8 h-8 bg-muted rounded-lg"></div>
        <div className="w-8 h-8 bg-muted rounded-lg"></div>
      </div>
    </td>
  </tr>
)

export const WalletBalanceSkeleton = () => (
  <Card className="border-0 shadow-sm bg-gradient-to-br from-muted to-muted/80">
    <div className="animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="h-4 bg-primary-foreground/30 rounded w-32 mb-2"></div>
          <div className="h-10 bg-primary-foreground/30 rounded w-48 mb-2"></div>
          <div className="h-4 bg-primary-foreground/30 rounded w-36"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-primary-foreground/30 rounded-lg w-24"></div>
          <div className="h-10 bg-primary-foreground/30 rounded-lg w-20"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary-foreground/20 rounded-lg p-4">
          <div className="h-3 bg-primary-foreground/30 rounded w-24 mb-2"></div>
          <div className="h-6 bg-primary-foreground/30 rounded w-32"></div>
        </div>
        <div className="bg-primary-foreground/20 rounded-lg p-4">
          <div className="h-3 bg-primary-foreground/30 rounded w-20 mb-2"></div>
          <div className="h-5 bg-primary-foreground/30 rounded w-24 mb-1"></div>
          <div className="h-3 bg-primary-foreground/30 rounded w-28"></div>
        </div>
      </div>
    </div>
  </Card>
)

export const BankTransferSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="h-8 w-36 bg-muted rounded-lg"></div>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-muted rounded-full"></div>
      <div className="flex-1">
        <div className="h-6 bg-muted rounded w-48 mb-1"></div>
        <div className="h-4 bg-muted rounded w-64"></div>
      </div>
      <div className="h-8 w-24 bg-green-200 rounded-full"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCardSkeleton />
      <StatsCardSkeleton />
      <StatsCardSkeleton />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-2 rounded-lg shadow-sm bg-card p-6">
        <div className="h-6 bg-muted rounded w-40 mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
        </div>
        <div className="h-12 w-32 bg-primary rounded-lg mt-6"></div>
      </Card>
      <Card className="rounded-lg shadow-sm bg-card p-6">
        <div className="h-6 bg-muted rounded w-48 mb-4"></div>
        <div className="space-y-4">
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-full"></div>
        </div>
      </Card>
    </div>
  </div>
)
