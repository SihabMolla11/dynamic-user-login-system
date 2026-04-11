// app/dashboard/page.tsx
import {
  BarChart2,
  Bell,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Total revenue",
    value: "$48,295",
    change: "+12.4%",
    up: true,
    icon: "💰",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Active customers",
    value: "3,842",
    change: "+8.1%",
    up: true,
    icon: "👥",
    bg: "bg-teal-50",
    iconColor: "text-teal-700",
  },
  {
    label: "Total orders",
    value: "1,290",
    change: "-2.3%",
    up: false,
    icon: "📦",
    bg: "bg-blue-50",
    iconColor: "text-blue-700",
  },
  {
    label: "Conversion rate",
    value: "4.6%",
    change: "+0.8%",
    up: true,
    icon: "📈",
    bg: "bg-purple-50",
    iconColor: "text-purple-700",
  },
];

const orders = [
  { id: "#ORD-001", customer: "Karim Ahmed", amount: "$240", status: "Completed" },
  { id: "#ORD-002", customer: "Rafi Islam", amount: "$89", status: "Pending" },
  { id: "#ORD-003", customer: "Nadia Hossain", amount: "$550", status: "Completed" },
  { id: "#ORD-004", customer: "Tanvir Alam", amount: "$120", status: "Cancelled" },
  { id: "#ORD-005", customer: "Fatema Begum", amount: "$375", status: "Pending" },
];

const activity = [
  { text: "New order placed by Karim Ahmed", time: "2 min ago", color: "bg-amber-500" },
  { text: "Payment received — $550", time: "18 min ago", color: "bg-teal-600" },
  { text: "New customer registered", time: "1 hr ago", color: "bg-purple-500" },
  { text: "Order #ORD-004 cancelled", time: "3 hr ago", color: "bg-red-500" },
  { text: "Monthly report generated", time: "Yesterday", color: "bg-amber-500" },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-green-50 text-green-800",
  Pending: "bg-amber-50 text-amber-800",
  Cancelled: "bg-red-50 text-red-800",
};

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: BarChart2, label: "Analytics", url: "analytics" },
  { icon: Users, label: "Customers", badge: 3 },
  { icon: ShoppingBag, label: "Orders" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-sm">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={14} className="text-white" />
            </div>
            <span className="font-medium text-gray-900">Dashify</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-xs text-gray-400 px-2 mb-2 tracking-wide">Main</p>
          {navItems.map(({ icon: Icon, label, active, badge, url = "#" }) => (
            <Link
              href={`/dashboard/${url}`}
              key={label}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${active ? "bg-amber-50 text-amber-800 font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
            >
              <Icon size={15} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="bg-amber-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </Link>
          ))}

          <p className="text-xs text-gray-400 px-2 pt-4 mb-2 tracking-wide">Settings</p>
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors">
            <Settings size={15} />
            <span>Settings</span>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </Link>
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-xs font-medium text-amber-800">
              SM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">Sihab Molla</p>
              <p className="text-xs text-gray-400 truncate">sihab@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="font-medium text-gray-900">Good morning, Sihab</h1>
            <p className="text-xs text-gray-500 mt-0.5">Here's what's happening today</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full border border-white" />
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg transition-colors">
              <Plus size={13} /> New report
            </button>
          </div>
        </header>

        <main className="p-6 flex flex-col gap-5">
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map(({ label, value, change, up, icon, bg, iconColor }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-xl p-4">
                <div
                  className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-3 text-base`}
                >
                  {icon}
                </div>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-xl font-medium text-gray-900">{value}</p>
                <p
                  className={`text-xs mt-1 flex items-center gap-1 ${up ? "text-green-700" : "text-red-600"}`}
                >
                  {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {change} vs last month
                </p>
              </div>
            ))}
          </div>

          {/* Recent orders + activity */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-medium text-gray-900">Recent orders</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Latest 5 transactions</p>
                </div>
                <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50">
                  View all
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wide">
                    <th className="text-left pb-3 font-medium">Order</th>
                    <th className="text-left pb-3 font-medium">Customer</th>
                    <th className="text-left pb-3 font-medium">Amount</th>
                    <th className="text-left pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2.5 text-gray-600">{o.id}</td>
                      <td className="py-2.5 text-gray-900">{o.customer}</td>
                      <td className="py-2.5 text-gray-900 font-medium">{o.amount}</td>
                      <td className="py-2.5">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[o.status]}`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-5">
              <h2 className="font-medium text-gray-900 mb-1">Recent activity</h2>
              <p className="text-xs text-gray-500 mb-4">Live updates</p>
              <div className="flex flex-col">
                {activity.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0"
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.color}`} />
                    <div>
                      <p className="text-gray-800 leading-snug">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
