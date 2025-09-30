import { TournamentTable } from "@/components/tournament-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar, Users, DollarSign } from "lucide-react"

// Mock stats
const tournamentStats = [
  {
    title: "Total Tournaments",
    value: "156",
    icon: Trophy,
    description: "All-time tournaments hosted",
  },
  {
    title: "Active Tournaments",
    value: "23",
    icon: Calendar,
    description: "Currently running tournaments",
  },
  {
    title: "Total Participants",
    value: "8,432",
    icon: Users,
    description: "Players across all tournaments",
  },
  {
    title: "Prize Pool Distributed",
    value: "$127,500",
    icon: DollarSign,
    description: "Total prizes awarded",
  },
]

export default function TournamentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tournament Management</h1>
        <p className="text-muted-foreground">
          Create, manage, and monitor tournaments across different games and formats.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tournamentStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tournament Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tournaments</CardTitle>
          <CardDescription>
            Manage all tournaments including drafts, active competitions, and completed events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TournamentTable />
        </CardContent>
      </Card>
    </div>
  )
}
