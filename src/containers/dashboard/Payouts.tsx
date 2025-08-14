"use client"

import { useState, useEffect } from "react"
import { Card, Col, Row, Statistic } from "antd"
import { WalletIcon, Users, Gauge, Zap, History, Plus, Info } from "lucide-react"
import BannerHeader from "~/components/ui/BannerHeader"
import Button from "~/components/controls/button"
import Table from "~/components/controls/table"
import Tag from "~/components/controls/tag"
import { formatPrice } from "~/utils"
import { classNames as cn } from "~/utils"
import { BankTransferSkeleton } from "~/components/common/LoadingSkeleton"
import { DASHBOARD_BANK_TRANSFERS_PAGE } from "~/config/routes"
import { format } from "date-fns"

interface PayoutHistoryType {
  id: string
  date: Date
  recipient: string
  bank: string
  accountNumber: string
  amount: number
  status: "Successful" | "Pending" | "Failed" | "Reversed"
}

const payoutHistory: PayoutHistoryType[] = [
  {
    id: "POUT001",
    date: new Date("2025-07-29T11:00:00Z"),
    recipient: "Adebayo Tech Ltd",
    bank: "First Bank",
    accountNumber: "0123456789",
    amount: 150000.0,
    status: "Successful",
  },
  {
    id: "POUT002",
    date: new Date("2025-07-28T15:30:00Z"),
    recipient: "Lagos Stores",
    bank: "Zenith Bank",
    accountNumber: "9876543210",
    amount: 75000.0,
    status: "Pending",
  },
  {
    id: "POUT003",
    date: new Date("2025-07-27T09:00:00Z"),
    recipient: "Kemi Fashion",
    bank: "GTBank",
    accountNumber: "1122334455",
    amount: 250000.0,
    status: "Failed",
  },
  {
    id: "POUT004",
    date: new Date("2025-07-26T14:00:00Z"),
    recipient: "Tech Solutions",
    bank: "UBA",
    accountNumber: "6789012345",
    amount: 50000.0,
    status: "Successful",
  },
  {
    id: "POUT005",
    date: new Date("2025-07-25T10:00:00Z"),
    recipient: "Global Ventures",
    bank: "Access Bank",
    accountNumber: "5432109876",
    amount: 10000.0,
    status: "Reversed",
  },
]

export default function PayoutsContainer() {
  const [currency] = useState("NGN")
  const walletBalance = 881975.5
  const dailyLimitRemaining = 50000
  const linkedAccounts = 6
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Simulate 1.5 seconds loading
    return () => clearTimeout(timer)
  }, [])

  const columns: any[] = [
    {
      id: "date",
      header: "DATE",
      accessorKey: "date",
      cell: ({ row }: { row: { original: PayoutHistoryType } }) => (
        <span className="text-muted-foreground">{format(row.original.date, "MMM dd, yyyy HH:mm")}</span>
      ),
    },
    {
      id: "recipient",
      header: "RECIPIENT",
      accessorKey: "recipient",
      cell: ({ row }: { row: { original: PayoutHistoryType } }) => (
        <span className="font-medium text-foreground">{row.original.recipient}</span>
      ),
    },
    {
      id: "bank",
      header: "BANK",
      accessorKey: "bank",
      cell: ({ row }: { row: { original: PayoutHistoryType } }) => (
        <span className="text-muted-foreground">{row.original.bank}</span>
      ),
    },
    {
      id: "accountNumber",
      header: "ACCOUNT NUMBER",
      accessorKey: "accountNumber",
      cell: ({ row }: { row: { original: PayoutHistoryType } }) => (
        <span className="text-muted-foreground">{row.original.accountNumber}</span>
      ),
    },
    {
      id: "amount",
      header: "AMOUNT",
      accessorKey: "amount",
      cell: ({ row }: { row: { original: PayoutHistoryType } }) => (
        <span className="font-semibold text-foreground">{formatPrice(row.original.amount, { currency }).value}</span>
      ),
    },
    {
      id: "status",
      header: "STATUS",
      accessorKey: "status",
      cell: ({ row }: { row: { original: PayoutHistoryType } }) => {
        let color = "bg-gray-200 text-gray-700"
        if (row.original.status === "Successful") color = "bg-green-100 text-green-700"
        if (row.original.status === "Failed") color = "bg-red-100 text-red-700"
        if (row.original.status === "Pending") color = "bg-yellow-100 text-yellow-700"
        if (row.original.status === "Reversed") color = "bg-blue-100 text-blue-700"
        return <Tag className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>{row.original.status}</Tag>
      },
    },
  ]

  return (
    <div className="space-y-6">
      <BannerHeader
        title="Payouts"
        breadcrumbs={[{ label: "Payments" }, { label: "Payouts" }]}
        description="Manage all your payouts, withdrawals, and bank transfers."
      />

      {isLoading ? (
        
        <BankTransferSkeleton / >
       
      ) : (
        <>
          {/* Payout Overview Section (Moved from BankTransfer) */}
         
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="rounded-lg shadow-sm bg-card text-card-foreground border border-primary/50">
                <Statistic
                  title={<span className="text-muted-foreground text-sm">Available Balance</span>}
                  value={walletBalance}
                  formatter={(value) => (
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(value as number, { currency }).value}
                    </span>
                  )}
                  prefix={<WalletIcon className="w-5 h-5 text-primary" />}
                  valueStyle={{ color: "inherit" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="rounded-lg shadow-sm bg-card text-card-foreground border border-border">
                <Statistic
                  title={<span className="text-muted-foreground text-sm">Accounts Linked</span>}
                  value={linkedAccounts}
                  formatter={(value) => <span className="text-lg font-bold text-foreground">{value}</span>}
                  prefix={<Users className="w-5 h-5 text-muted-foreground" />}
                  valueStyle={{ color: "inherit" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="rounded-lg shadow-sm bg-card text-card-foreground border border-border">
                <Statistic
                  title={<span className="text-muted-foreground text-sm">Daily Limit</span>}
                  value={dailyLimitRemaining}
                  formatter={(value) => (
                    <span className="text-lg font-bold text-foreground">
                      {formatPrice(value as number, { currency }).value}
                    </span>
                  )}
                  prefix={<Gauge className="w-5 h-5 text-muted-foreground" />}
                  valueStyle={{ color: "inherit" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="rounded-lg shadow-sm bg-card text-card-foreground border border-orange-300">
                <Statistic
                  title={<span className="text-muted-foreground text-sm">Processing Time</span>}
                  valueRender={() => (
                    <Tag title="Instant" icon={() => <Zap className="w-4 h-4"/>} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-base font-medium flex items-center gap-1"/>
                   
                  )}
                  prefix={<Info className="w-5 h-5 text-orange-500" />}
                  valueStyle={{ color: "inherit" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Quick Actions for Payouts */}
          <Card
            title={<span className="text-foreground font-semibold">Quick Payout Actions</span>}
            className="rounded-lg shadow-sm bg-card text-card-foreground border border-border"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                type="primary"
                icon={({ className }) => <Plus className={cn("w-4 h-4", className ?? "")} />}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-medium shadow-sm"
                href={DASHBOARD_BANK_TRANSFERS_PAGE}
              >
                Initiate Bank Transfer
              </Button>
              {/* <Button
                type="default"
                icon={({ className }) => <Download className={cn("w-4 h-4", className ?? "")} />}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base border-input text-foreground hover:bg-muted shadow-sm"
              >
                Bulk Payout (CSV)
              </Button> */}
              <Button
                type="default"
                icon={({ className }) => <History className={cn("w-4 h-4", className ?? "")} />}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base border-input text-foreground hover:bg-muted shadow-sm"
              >
                View Transaction History
              </Button>
            </div>
          </Card>

          {/* Payout History Table */}
          <Card
            title={<span className="text-foreground font-semibold">Recent Payout History</span>}
            className="rounded-lg shadow-sm bg-card text-card-foreground border border-border"
          >
            <Table columns={columns} data={payoutHistory} paginate pagination={{ pageIndex: 0, pageSize: 10 }} />
          </Card>
        </>
      )}
    </div>
  )
}
