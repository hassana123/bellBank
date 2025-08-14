import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, CreditCard, DollarSign} from 'lucide-react';
import { Card, Progress } from "antd";

export default function DashboardContainer() {
const stats = [
  {
    title: "Total Revenue",
    value: "₦2,847,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Transactions",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Customers",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Success Rate",
    value: "98.5%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

const recentTransactions = [
  { id: "TXN001", customer: "Adebayo Tech Ltd", amount: "₦45,000", status: "success", time: "2 mins ago" },
  { id: "TXN002", customer: "Lagos Stores", amount: "₦12,500", status: "pending", time: "5 mins ago" },
  { id: "TXN003", customer: "Kemi Fashion", amount: "₦78,900", status: "success", time: "12 mins ago" },
  { id: "TXN004", customer: "Tech Solutions", amount: "₦156,000", status: "failed", time: "18 mins ago" },
];

return (
  <div className="space-y-6">
    {/* Welcome Section */}
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome back, Hassana! 👋</h1>
          <p className="text-primary-100 text-lg">Here's what's happening with your business today.</p>
        </div>
        <div className="hidden md:block">
          <div className="bg-primary/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-right">
              <p className="text-primary-100 text-sm">Today's Revenue</p>
              <p className="text-2xl font-bold">₦127,500</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-3">{stat.title}</p>
              <p className="text-xl font-bold text-foreground mb-3">{stat.value}</p>
              <div className="flex items-center gap-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                {/* <span className="text-gray-500 text-sm">vs last month</span> */}
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Transactions */}
      <div className="lg:col-span-2">
        <Card title="Recent Transactions" className="border-0 shadow-sm bg-card">
          <div className="space-y-4">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{txn.customer}</p>
                    <p className="text-sm text-muted-foreground">{txn.id} • {txn.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{txn.amount}</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    txn.status === 'success' ? 'bg-green-100 text-green-800' :
                    txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <button className="w-full text-primary hover:text-primary/80 font-medium text-sm">
              View All Transactions →
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Actions & Stats */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card title="Quick Actions" className="border-0 shadow-sm bg-card">
          <div className="space-y-3">
            <button className="w-full p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Create Payment Link
            </button>
            <button className="w-full p-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
              Send Invoice
            </button>
            <button className="w-full p-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
              Bulk Payout
            </button>
          </div>
        </Card>

        {/* Performance */}
        <Card title="This Month" className="border-0 shadow-sm bg-card">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-medium text-foreground">98.5%</span>
              </div>
              <Progress percent={98.5} strokeColor="#218838" size="small" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Volume Target</span>
                <span className="font-medium text-foreground">₦2.8M / ₦5M</span>
              </div>
              <Progress percent={56} strokeColor="#218838" size="small" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Customer Growth</span>
                <span className="font-medium text-foreground">+15.3%</span>
              </div>
              <Progress percent={76} strokeColor="#218838" size="small" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);
}
