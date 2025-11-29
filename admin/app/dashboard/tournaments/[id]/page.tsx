import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, Trophy, Calendar, DollarSign, ExternalLink } from "lucide-react"

// Mock tournament data
const tournament = {
  id: 1,
  title: "Valorant Champions Cup",
  description:
    "The ultimate Valorant tournament featuring the best teams from around the world competing for glory and prizes.",
  game: "Valorant",
  type: "squad",
  status: "live",
  startDate: "2024-01-15T18:00:00",
  endDate: "2024-01-17T22:00:00",
  checkInTime: "2024-01-15T17:00:00",
  totalTeams: 64,
  registeredTeams: 64,
  checkedInTeams: 58,
  eliminatedTeams: 32,
  prizePool: "$5,000",
  entryFee: "$25",
  platform: "PC",
  streamLink: "https://twitch.tv/valorantchampions",
  discordLink: "https://discord.gg/valorantcup",
  rules:
    "Standard Valorant competitive rules apply. Best of 3 format for all matches except finals which is best of 5.",
}

// Provide static params for static export builds (output: "export")
export async function generateStaticParams() {
  // Return at least one id for the static export; expand or fetch dynamically as needed
  return [{ id: "1" }]
}

// Mock registered teams data
const registeredTeams = [
  {
    id: 1,
    name: "Team Alpha",
    captain: "ProPlayer1",
    members: [
      { name: "ProPlayer1", gameId: "Alpha#1234", role: "captain" },
      { name: "ProPlayer2", gameId: "Beta#5678", role: "member" },
      { name: "ProPlayer3", gameId: "Gamma#9012", role: "member" },
      { name: "ProPlayer4", gameId: "Delta#3456", role: "member" },
      { name: "ProPlayer5", gameId: "Epsilon#7890", role: "member" },
    ],
    status: "checked-in",
    registrationDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Elite Squad",
    captain: "GamerX",
    members: [
      { name: "GamerX", gameId: "Elite#1111", role: "captain" },
      { name: "GamerY", gameId: "Squad#2222", role: "member" },
      { name: "GamerZ", gameId: "Pro#3333", role: "member" },
      { name: "GamerA", gameId: "Ace#4444", role: "member" },
      { name: "GamerB", gameId: "Beast#5555", role: "member" },
    ],
    status: "eliminated",
    registrationDate: "2024-01-08",
  },
  {
    id: 3,
    name: "Victory Legends",
    captain: "ChampionOne",
    members: [
      { name: "ChampionOne", gameId: "Victory#0001", role: "captain" },
      { name: "ChampionTwo", gameId: "Legend#0002", role: "member" },
      { name: "ChampionThree", gameId: "Winner#0003", role: "member" },
      { name: "ChampionFour", gameId: "Master#0004", role: "member" },
      { name: "ChampionFive", gameId: "Hero#0005", role: "member" },
    ],
    status: "active",
    registrationDate: "2024-01-12",
  },
]
//{ params }: { params: { id: string } }
export default function TournamentDetailsPage() {
  // const [selectedTeam, setSelectedTeam] = useState<(typeof registeredTeams)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checked-in":
        return "default"
      case "active":
        return "destructive"
      case "eliminated":
        return "secondary"
      default:
        return "outline"
    }
  }

  const stats = [
    {
      title: "Total Participants",
      value: tournament.registeredTeams * 5,
      icon: Users,
      description: "Players registered",
    },
    {
      title: "Checked In",
      value: tournament.checkedInTeams,
      icon: Trophy,
      description: "Teams ready to play",
    },
    {
      title: "Still Active",
      value: tournament.registeredTeams - tournament.eliminatedTeams,
      icon: Calendar,
      description: "Teams remaining",
    },
    {
      title: "Prize Pool",
      value: tournament.prizePool,
      icon: DollarSign,
      description: "Total prizes",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/tournaments">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tournaments
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold tracking-tight">{tournament.title}</h1>
              <Badge variant={getStatusColor(tournament.status)}>{tournament.status}</Badge>
            </div>
            <p className="text-muted-foreground">
              {tournament.game} • {tournament.type} tournament
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {tournament.streamLink && (
            <Button variant="outline" asChild>
              <a href={tournament.streamLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Watch Stream
              </a>
            </Button>
          )}
          {tournament.discordLink && (
            <Button variant="outline" asChild>
              <a href={tournament.discordLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Discord
              </a>
            </Button>
          )}
        </div>
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
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teams">Teams & Players</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{tournament.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Platform</h4>
                    <p className="text-sm text-muted-foreground">{tournament.platform}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Entry Fee</h4>
                    <p className="text-sm text-muted-foreground">{tournament.entryFee}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">Rules</h4>
                  <p className="text-sm text-muted-foreground">{tournament.rules}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tournament Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Registration</span>
                    <span>
                      {tournament.registeredTeams}/{tournament.totalTeams} teams
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(tournament.registeredTeams / tournament.totalTeams) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Check-in</span>
                    <span>
                      {tournament.checkedInTeams}/{tournament.registeredTeams} teams
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(tournament.checkedInTeams / tournament.registeredTeams) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Elimination</span>
                    <span>
                      {tournament.eliminatedTeams}/{tournament.registeredTeams} teams
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(tournament.eliminatedTeams / tournament.registeredTeams) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registered Teams</CardTitle>
              <CardDescription>All teams registered for this tournament with their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Captain</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registeredTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.captain}</TableCell>
                      <TableCell>{team.members.length} players</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(team.status)}>{team.status}</Badge>
                      </TableCell>
                      <TableCell>{team.registrationDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Schedule</CardTitle>
              <CardDescription>Important dates and times for this tournament</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Start Date</h4>
                  <p className="text-sm text-muted-foreground">{new Date(tournament.startDate).toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">End Date</h4>
                  <p className="text-sm text-muted-foreground">{new Date(tournament.endDate).toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Check-in Time</h4>
                  <p className="text-sm text-muted-foreground">{new Date(tournament.checkInTime).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
