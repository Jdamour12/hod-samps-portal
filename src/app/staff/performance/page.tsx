"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
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

const performanceTrendsData = [
  { year: 2022, "Average Rating": 3.8 },
  { year: 2023, "Average Rating": 4.0 },
  { year: 2024, "Average Rating": 4.2 },
]

export default function StaffPerformancePage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Staff Performance</h1>
      <p className="text-gray-600 text-sm">Review and evaluate the performance of departmental staff.</p>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Performance Reviews</CardTitle>
          <Button size="sm" className="gap-1 bg-samps-blue-600 hover:bg-samps-blue-700 text-white">
            <FileText className="h-4 w-4" />
            Conduct Review
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Staff Name</TableHead>
                <TableHead className="text-gray-700">Last Review Date</TableHead>
                <TableHead className="text-gray-700">Overall Rating</TableHead>
                <TableHead className="text-right text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Dr. Alice Smith</TableCell>
                <TableCell className="text-gray-700">2024-06-15</TableCell>
                <TableCell className="text-samps-green-600">Excellent</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-blue-600 hover:bg-samps-blue-50">
                    <FileText className="h-4 w-4" /> View Report
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Prof. Bob Johnson</TableCell>
                <TableCell className="text-gray-700">2024-06-10</TableCell>
                <TableCell className="text-samps-orange-600">Good</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-blue-600 hover:bg-samps-blue-50">
                    <FileText className="h-4 w-4" /> View Report
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Ms. Carol White</TableCell>
                <TableCell className="text-gray-700">2024-05-20</TableCell>
                <TableCell className="text-samps-green-600">Excellent</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-blue-600 hover:bg-samps-blue-50">
                    <FileText className="h-4 w-4" /> View Report
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Performance Trends</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Visual insights into average staff performance over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              "Average Rating": {
                label: "Average Rating",
                color: "hsl(var(--samps-blue-500))",
              },
            }}
            className="h-64 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={performanceTrendsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[3.5, 4.5]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="Average Rating" stroke="var(--color-Average-Rating)" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
