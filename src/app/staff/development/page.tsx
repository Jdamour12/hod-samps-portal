"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit } from "lucide-react"
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const idpTrackingData = [
  { quarter: "Q1", "Completed Goals": 70, "InProgress Goals": 20 },
  { quarter: "Q2", "Completed Goals": 75, "InProgress Goals": 15 },
  { quarter: "Q3", "Completed Goals": 80, "InProgress Goals": 10 },
]

export default function DevelopmentPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Staff Development</h1>
      <p className="text-gray-600 text-sm">Manage and track professional development activities for staff.</p>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Development Programs</CardTitle>
          <Button size="sm" className="gap-1 bg-samps-blue-600 hover:bg-samps-blue-700 text-white">
            <PlusCircle className="h-4 w-4" />
            Add Program
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Program Name</TableHead>
                <TableHead className="text-gray-700">Participants</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-gray-700">Start Date</TableHead>
                <TableHead className="text-right text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Advanced Research Methods</TableCell>
                <TableCell className="text-gray-700">5 Staff</TableCell>
                <TableCell className="text-samps-green-600">Ongoing</TableCell>
                <TableCell className="text-gray-700">2024-07-01</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-blue-600 hover:bg-samps-blue-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Teaching Excellence Workshop</TableCell>
                <TableCell className="text-gray-700">10 Staff</TableCell>
                <TableCell className="text-samps-orange-600">Upcoming</TableCell>
                <TableCell className="text-gray-700">2024-09-15</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-blue-600 hover:bg-samps-blue-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Leadership Training</TableCell>
                <TableCell className="text-gray-700">3 Staff</TableCell>
                <TableCell className="text-samps-green-600">Completed</TableCell>
                <TableCell className="text-gray-700">2024-06-01</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-blue-600 hover:bg-samps-blue-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Individual Development Plans Progress</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Track progress on individual staff development plans.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              "Completed Goals": {
                label: "Completed Goals",
                color: "hsl(var(--samps-green-500))",
              },
              "InProgress Goals": {
                label: "In Progress Goals",
                color: "hsl(var(--samps-orange-500))",
              },
            }}
            className="h-64 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={idpTrackingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="Completed Goals" stroke="var(--color-Completed-Goals)" />
                <Line type="monotone" dataKey="InProgress Goals" stroke="var(--color-InProgress-Goals)" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
