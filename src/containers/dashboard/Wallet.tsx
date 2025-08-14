"use client"

import { useState, useEffect } from "react"
import { Card, Col, Row, Statistic } from "antd"
import {ArrowRight, Banknote, WalletIcon } from "lucide-react"
import { format } from "date-fns"
import BannerHeader from "~/components/ui/BannerHeader"
import Button from "~/components/controls/button"
import Table from "~/components/controls/table"
import Tag from "~/components/controls/tag"
import { formatPrice } from "~/utils"
import { classNames as cn } from "~/utils"
import { WalletBalanceSkeleton, TableRowSkeleton } from "~/components/common/LoadingSkeleton"

interface TransactionHistoryType {
  id: string
  date: Date
  description: string
  type: "Credit" | "Debit"
  amount: number
  status: "Successful" | "Pending" | "Failed"
}

const transactionHistory: TransactionHistoryType[] = [
  {
    id: "1",
    date: new Date("2025-07-28T10:30:00Z"),
    description: "Payment from John Doe",
    type: "Credit",
    amount: 50000.0,
    status: "Successful",
  },
  {
    id: "2",
    date: new Date("2025-07-27T14:15:00Z"),
    description: "Withdrawal to Bank Account",
    type: "Debit",
    amount: 20000.0,
    status: "Successful",
  },
  {
    id: "3",
    date: new Date("2025-07-26T09:00:00Z"),
    description: "Refund for TXN11223",
    type: "Credit",
    amount: 1500.0,
    status: "Pending",
  },
  {
    id: "4",
    date: new Date("2025-07-25T16:45:00Z"),
    description: "Payment from Alice Johnson",
    type: "Credit",
    amount: 12000.0,
    status: "Successful",
  },
  {
    id: "5",
    date: new Date("2025-07-24T11:00:00Z"),
    description: "Failed Payout Attempt",
    type: "Debit",
    amount: 5000.0,
    status: "Failed",
  },
]

export default function WalletContainer() {
  const [currency] = useState("NGN")
  const walletBalance = 250000.0
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const columns: any[] = [
    {
      id: "date",
      header: "DATE",
      accessorKey: "date",
      cell: ({ row }: { row: { original: TransactionHistoryType } }) => (
        <span className="text-muted-foreground">{format(row.original.date, "MMM dd, yyyy HH:mm")}</span>
      ),
    },
    {
      id: "description",
      header: "DESCRIPTION",
      accessorKey: "description",
      cell: ({ row }: { row: { original: TransactionHistoryType } }) => (
        <span className="font-medium text-foreground">{row.original.description}</span>
      ),
    },
    {
      id: "type",
      header: "TYPE",
      accessorKey: "type",
      cell: ({ row }: { row: { original: TransactionHistoryType } }) => (
        <Tag
         title={`${row.original.type}`} className={`px-2 py-1 rounded-md text-xs font-medium ${row.original.type === "Credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
         
        </Tag>
      ),
    },
    {
      id: "amount",
      header: "AMOUNT",
      accessorKey: "amount",
      cell: ({ row }: { row: { original: TransactionHistoryType } }) => (
        <span className={`font-semibold ${row.original.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
          {row.original.type === "Credit" ? "+" : "-"}
          {formatPrice(row.original.amount, { currency }).value}
        </span>
      ),
    },
    {
      id: "status",
      header: "STATUS",
      accessorKey: "status",
      cell: ({ row }: { row: { original: TransactionHistoryType } }) => {
        let color = "bg-gray-200 text-gray-700"
        if (row.original.status === "Successful") color = "bg-green-100 text-green-700"
        if (row.original.status === "Failed") color = "bg-red-100 text-red-700"
        if (row.original.status === "Pending") color = "bg-yellow-100 text-yellow-700"
        return <Tag className={`px-2 py-1 rounded-md text-xs font-medium ${color}`} title={`${row.original.status}`}></Tag>
      },
    },
  ]

  return (
    <div className="space-y-6">
      <BannerHeader
        title="Wallet Account"
        breadcrumbs={[{ label: "Overview" }, { label: "Wallet Account" }]}
        description="Manage your funds, view balance, and track all wallet activities."
    
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          {isLoading ? (
            <WalletBalanceSkeleton />
          ) : (
            <Card className="rounded-lg shadow-sm bg-card text-card-foreground">
              <Statistic
                title={<span className="text-muted-foreground text-sm">Current Balance</span>}
                value={walletBalance}
                formatter={(value) => (
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(value as number, { currency }).value}
                  </span>
                )}
                prefix={<WalletIcon className="w-6 h-6 text-primary" />}
                valueStyle={{ color: "inherit" }}
              />
              <div className="mt-4 flex gap-2">
                <Button
                  type="default"
                  icon={({ className }) => <Banknote className={cn("w-4 h-4", className ?? "")} />}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-input text-foreground hover:bg-muted"
                >
                  Withdraw
                </Button>
              </div>
            </Card>
          )}
        </Col>
        <Col xs={24} md={12} lg={16}>
          <Card
            title={<span className="text-foreground font-semibold">Quick Actions</span>}
            className="rounded-lg shadow-sm bg-card text-card-foreground"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                type="default"
                className="flex items-center justify-between px-4 py-3 rounded-lg text-base border-input text-foreground hover:bg-muted"
              >
                <span>View Payout History</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                type="default"
                className="flex items-center justify-between px-4 py-3 rounded-lg text-base border-input text-foreground hover:bg-muted"
              >
                <span>Generate Statement</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                type="default"
                className="flex items-center justify-between px-4 py-3 rounded-lg text-base border-input text-foreground hover:bg-muted"
              >
                <span>Manage Bank Accounts</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                type="default"
                className="flex items-center justify-between px-4 py-3 rounded-lg text-base border-input text-foreground hover:bg-muted"
              >
                <span>Set Auto-Withdrawal</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title={<span className="text-foreground font-semibold">Transaction History</span>}
        className="rounded-lg shadow-sm bg-card text-card-foreground"
      >
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Table columns={columns} data={transactionHistory} paginate pagination={{ pageIndex: 0, pageSize: 10 }} />
        )}
      </Card>
    </div>
  )
}
