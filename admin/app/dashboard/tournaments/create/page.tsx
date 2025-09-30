"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TournamentForm {
  title: string
  description: string
  game: string
  type: "solo" | "duo" | "squad" | ""
  totalTeams: string
  entryFee: string
  prizePool: string
  startDate: string
  endDate: string
  checkInTime: string
  platform: string
  streamLink: string
  discordLink: string
  rules: string
}

const games = [
  "Valorant",
  "Counter-Strike 2",
  "League of Legends",
  "Apex Legends",
  "Fortnite",
  "Rocket League",
  "Overwatch 2",
]

export default function CreateTournamentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<TournamentForm>({
    title: "",
    description: "",
    game: "",
    type: "",
    totalTeams: "",
    entryFee: "",
    prizePool: "",
    startDate: "",
    endDate: "",
    checkInTime: "",
    platform: "",
    streamLink: "",
    discordLink: "",
    rules: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Tournament created successfully!")
    router.push("/dashboard/tournaments")
    setIsLoading(false)
  }

  const handleInputChange = (field: keyof TournamentForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/tournaments">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tournaments
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Tournament</h1>
          <p className="text-muted-foreground">Set up a new tournament for your eSports platform.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential tournament details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tournament Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Valorant Champions Cup"
                  value={form.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tournament description and overview"
                  value={form.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="game">Game</Label>
                <Select value={form.game} onValueChange={(value) => handleInputChange("game", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((game) => (
                      <SelectItem key={game} value={game}>
                        {game}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tournament Type</Label>
                <Select value={form.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tournament type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="duo">Duo</SelectItem>
                    <SelectItem value="squad">Squad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tournament Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Tournament Settings</CardTitle>
              <CardDescription>Capacity and financial details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="totalTeams">Total Teams/Players</Label>
                <Input
                  id="totalTeams"
                  type="number"
                  placeholder="64"
                  value={form.totalTeams}
                  onChange={(e) => handleInputChange("totalTeams", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entryFee">Entry Fee ($)</Label>
                <Input
                  id="entryFee"
                  type="number"
                  placeholder="25"
                  value={form.entryFee}
                  onChange={(e) => handleInputChange("entryFee", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prizePool">Prize Pool ($)</Label>
                <Input
                  id="prizePool"
                  type="number"
                  placeholder="5000"
                  value={form.prizePool}
                  onChange={(e) => handleInputChange("prizePool", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Input
                  id="platform"
                  placeholder="e.g., PC, PlayStation, Xbox"
                  value={form.platform}
                  onChange={(e) => handleInputChange("platform", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Tournament dates and timing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={form.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkInTime">Check-in Time</Label>
                <Input
                  id="checkInTime"
                  type="datetime-local"
                  value={form.checkInTime}
                  onChange={(e) => handleInputChange("checkInTime", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Links and rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streamLink">Stream Link</Label>
                <Input
                  id="streamLink"
                  placeholder="https://twitch.tv/tournament"
                  value={form.streamLink}
                  onChange={(e) => handleInputChange("streamLink", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordLink">Discord Link</Label>
                <Input
                  id="discordLink"
                  placeholder="https://discord.gg/tournament"
                  value={form.discordLink}
                  onChange={(e) => handleInputChange("discordLink", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rules">Tournament Rules</Label>
                <Textarea
                  id="rules"
                  placeholder="Tournament rules and regulations"
                  value={form.rules}
                  onChange={(e) => handleInputChange("rules", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href="/dashboard/tournaments">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Tournament"}
          </Button>
        </div>
      </form>
    </div>
  )
}
