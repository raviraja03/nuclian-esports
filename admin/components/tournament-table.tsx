"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Plus } from "lucide-react"
import Link from "next/link"

interface Tournament {
  id: number
  title: string
  game: string
  type: "solo" | "duo" | "squad"
  status: "draft" | "registration" | "live" | "completed"
  startDate: string
  endDate: string
  totalTeams: number
  registeredTeams: number
  prizePool: string
}

// Mock data
const initialTournaments: Tournament[] = [
  {
    id: 1,
    title: "Valorant Champions Cup",
    game: "Valorant",
    type: "squad",
    status: "live",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    totalTeams: 64,
    registeredTeams: 64,
    prizePool: "$5,000",
  },
  {
    id: 2,
    title: "CS2 Winter League",
    game: "Counter-Strike 2",
    type: "squad",
    status: "registration",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    totalTeams: 32,
    registeredTeams: 18,
    prizePool: "$3,500",
  },
  {
    id: 3,
    title: "League of Legends Clash",
    game: "League of Legends",
    type: "squad",
    status: "completed",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    totalTeams: 128,
    registeredTeams: 128,
    prizePool: "$8,000",
  },
  {
    id: 4,
    title: "Apex Legends Solo Championship",
    game: "Apex Legends",
    type: "solo",
    status: "draft",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    totalTeams: 100,
    registeredTeams: 0,
    prizePool: "$2,500",
  },
]

export function TournamentTable() {
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "registration" | "live" | "completed">("all")
  const [gameFilter, setGameFilter] = useState<string>("all")

  // Get unique games for filter
  const games = Array.from(new Set(tournaments.map((t) => t.game)))

  // Filter tournaments
  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tournament.status === statusFilter
    const matchesGame = gameFilter === "all" || tournament.game === gameFilter
    return matchesSearch && matchesStatus && matchesGame
  })

  const handleDeleteTournament = (tournamentId: number) => {
    if (confirm("Are you sure you want to delete this tournament?")) {
      setTournaments(tournaments.filter((t) => t.id !== tournamentId))
    }
  }

  const getStatusColor = (status: Tournament["status"]) => {
    switch (status) {
      case "draft":
        return "secondary"
      case "registration":
        return "default"
      case "live":
        return "destructive"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status: {statusFilter === "all" ? "All" : statusFilter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("draft")}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("registration")}>Registration</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("live")}>Live</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Game: {gameFilter === "all" ? "All" : gameFilter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setGameFilter("all")}>All</DropdownMenuItem>
              {games.map((game) => (
                <DropdownMenuItem key={game} onClick={() => setGameFilter(game)}>
                  {game}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {filteredTournaments.length} of {tournaments.length} tournaments
          </div>
          <Link href="/dashboard/tournaments/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Tournament
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Prize Pool</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTournaments.map((tournament) => (
              <TableRow key={tournament.id}>
                <TableCell className="font-medium">{tournament.title}</TableCell>
                <TableCell>{tournament.game}</TableCell>
                <TableCell className="capitalize">{tournament.type}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(tournament.status)}>{tournament.status}</Badge>
                </TableCell>
                <TableCell>
                  {tournament.registeredTeams}/{tournament.totalTeams}
                </TableCell>
                <TableCell>{tournament.startDate}</TableCell>
                <TableCell>{tournament.prizePool}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/tournaments/${tournament.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteTournament(tournament.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
