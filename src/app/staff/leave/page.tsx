import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckSquare, XSquare } from "lucide-react"

export default function LeavePage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Staff Leave Management</h1>
      <p className="text-gray-600 text-sm">Approve and track leave requests for departmental staff.</p>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Pending Leave Requests</CardTitle>
          <Button size="sm" className="gap-1 bg-samps-blue-600 hover:bg-samps-blue-700 text-white">
            <CheckSquare className="h-4 w-4" />
            Bulk Approve
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Staff Name</TableHead>
                <TableHead className="text-gray-700">Leave Type</TableHead>
                <TableHead className="text-gray-700">Dates</TableHead>
                <TableHead className="text-gray-700">Reason</TableHead>
                <TableHead className="text-right text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">John Doe</TableCell>
                <TableCell className="text-gray-700">Annual Leave</TableCell>
                <TableCell className="text-gray-700">2024-08-01 to 2024-08-05</TableCell>
                <TableCell className="text-gray-700">Family vacation</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-green-600 hover:bg-samps-green-50">
                    <CheckSquare className="h-4 w-4" /> Approve
                  </Button>
                  <Button variant="ghost" size="sm" className="text-samps-red-600 hover:bg-samps-red-50">
                    <XSquare className="h-4 w-4" /> Reject
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Jane Smith</TableCell>
                <TableCell className="text-gray-700">Sick Leave</TableCell>
                <TableCell className="text-gray-700">2024-07-25 to 2024-07-26</TableCell>
                <TableCell className="text-gray-700">Flu symptoms</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-green-600 hover:bg-samps-green-50">
                    <CheckSquare className="h-4 w-4" /> Approve
                  </Button>
                  <Button variant="ghost" size="sm" className="text-samps-red-600 hover:bg-samps-red-50">
                    <XSquare className="h-4 w-4" /> Reject
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">Dr. Peter Jones</TableCell>
                <TableCell className="text-gray-700">Conference Leave</TableCell>
                <TableCell className="text-gray-700">2024-09-10 to 2024-09-12</TableCell>
                <TableCell className="text-gray-700">Attending AI Summit</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-samps-green-600 hover:bg-samps-green-50">
                    <CheckSquare className="h-4 w-4" /> Approve
                  </Button>
                  <Button variant="ghost" size="sm" className="text-samps-red-600 hover:bg-samps-red-50">
                    <XSquare className="h-4 w-4" /> Reject
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Approved Leave Calendar</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Overview of approved staff leave for the current month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full rounded-md bg-gray-100 flex items-center justify-center text-base text-gray-500">
            {/* This could be a simplified calendar view showing leave days */}
            <p>Leave Calendar Placeholder (e.g., a monthly calendar with highlighted leave days)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
