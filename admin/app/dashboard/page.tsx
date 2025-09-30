import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, DollarSign, Activity } from "lucide-react"

// Mock data for demonstration
const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    description: "Active registered users",
  },
  {
    title: "Total Tournaments",
    value: "156",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Trophy,
    description: "All-time tournaments hosted",
  },
  {
    title: "Active Tournaments",
    value: "23",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: Activity,
    description: "Currently running tournaments",
  },
  {
    title: "Total Revenue",
    value: "$89,247",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "Revenue from entry fees",
  },
]

const recentTournaments = [
  {
    id: 1,
    title: "Valorant Champions Cup",
    game: "Valorant",
    status: "Live",
    participants: 64,
    prizePool: "$5,000",
    startDate: "2024-01-15",
  },
  {
    id: 2,
    title: "CS2 Winter League",
    game: "Counter-Strike 2",
    status: "Registration",
    participants: 32,
    prizePool: "$3,500",
    startDate: "2024-01-20",
  },
  {
    id: 3,
    title: "League of Legends Clash",
    game: "League of Legends",
    status: "Completed",
    participants: 128,
    prizePool: "$8,000",
    startDate: "2024-01-10",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "user_registration",
    message: "New user registered: ProGamer2024",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    type: "tournament_registration",
    message: "Team 'Elite Squad' registered for Valorant Champions Cup",
    timestamp: "5 minutes ago",
  },
  {
    id: 3,
    type: "payment",
    message: "Payment received: $50 entry fee for CS2 Winter League",
    timestamp: "12 minutes ago",
  },
  {
    id: 4,
    type: "tournament_complete",
    message: "League of Legends Clash tournament completed",
    timestamp: "1 hour ago",
  },
]

 function Page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your eSports platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    stat.changeType === "positive"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Tournaments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tournaments</CardTitle>
            <CardDescription>Latest tournament activity and status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTournaments.map((tournament) => (
                <div key={tournament.id} className="flex items-center justify-between space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{tournament.title}</p>
                    <p className="text-xs text-muted-foreground">{tournament.game}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        tournament.status === "Live"
                          ? "default"
                          : tournament.status === "Registration"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {tournament.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-xs font-medium">{tournament.participants} players</p>
                      <p className="text-xs text-muted-foreground">{tournament.prizePool}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activity and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Create Tournament</p>
                <p className="text-xs text-muted-foreground">Set up a new tournament</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Manage Users</p>
                <p className="text-xs text-muted-foreground">View and edit user accounts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">View Payments</p>
                <p className="text-xs text-muted-foreground">Check payment status</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  ) 
}

export default Page
