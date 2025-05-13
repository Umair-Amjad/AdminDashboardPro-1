import { useState } from "react";
import { 
  Download, 
  Filter, 
  Calendar, 
  ChevronDown, 
  BarChart3, 
  PieChart,
  LineChart, 
  Table as TableIcon,
  FileText,
  Plus
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Sample institute comparison data
const instituteComparisonData = [
  { 
    id: 1,
    name: "Stellar Academy", 
    students: 1245, 
    teachers: 68, 
    attendance: "92%", 
    performance: "B+",
    fees: "$980,000" 
  },
  { 
    id: 2,
    name: "Heritage School", 
    students: 980, 
    teachers: 52, 
    attendance: "88%", 
    performance: "B",
    fees: "$750,000" 
  },
  { 
    id: 3,
    name: "Meridian School", 
    students: 876, 
    teachers: 45, 
    attendance: "85%", 
    performance: "B-",
    fees: "$680,000" 
  },
  { 
    id: 4,
    name: "Phoenix University", 
    students: 2352, 
    teachers: 120, 
    attendance: "78%", 
    performance: "C+",
    fees: "$2,800,000" 
  },
  { 
    id: 5,
    name: "Global College", 
    students: 1654, 
    teachers: 95, 
    attendance: "82%", 
    performance: "B",
    fees: "$1,950,000" 
  },
];

// Sample saved reports
const savedReports = [
  {
    id: 1,
    name: "Monthly Enrollment Summary",
    type: "enrollment",
    format: "chart",
    createdBy: "Sarah Johnson",
    createdAt: "2023-12-15",
    schedule: "Monthly",
  },
  {
    id: 2,
    name: "Quarterly Performance Report",
    type: "performance",
    format: "table",
    createdBy: "John Carter",
    createdAt: "2023-11-20",
    schedule: "Quarterly",
  },
  {
    id: 3,
    name: "Annual Revenue Analysis",
    type: "financial",
    format: "chart",
    createdBy: "Sarah Johnson",
    createdAt: "2023-10-05",
    schedule: "Annually",
  },
  {
    id: 4,
    name: "Daily Attendance Tracker",
    type: "attendance",
    format: "table",
    createdBy: "Emily Wilson",
    createdAt: "2024-01-10",
    schedule: "Daily",
  },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("institute-comparison");
  const [instituteFilter, setInstituteFilter] = useState("all");
  const [timeRangeFilter, setTimeRangeFilter] = useState("year");
  const [reportTypeFilter, setReportTypeFilter] = useState("all");
  const [showNewReportDialog, setShowNewReportDialog] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Reports & Analytics"
          description="Access and generate reports across your organization."
        />
        <Button onClick={() => setShowNewReportDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:w-auto">
          <TabsTrigger value="institute-comparison">Institute Comparison</TabsTrigger>
          <TabsTrigger value="saved-reports">Saved Reports</TabsTrigger>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
        </TabsList>
        
        {/* Institute Comparison Tab */}
        <TabsContent value="institute-comparison" className="space-y-4">
          <div className="flex items-center justify-end mb-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Institute Performance Comparison</CardTitle>
              <CardDescription>
                Compare key metrics across all institutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institute</TableHead>
                      <TableHead className="text-right">Students</TableHead>
                      <TableHead className="text-right">Teachers</TableHead>
                      <TableHead className="text-right">Attendance</TableHead>
                      <TableHead className="text-right">Performance</TableHead>
                      <TableHead className="text-right">Fee Collection</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instituteComparisonData.map((institute) => (
                      <TableRow key={institute.id}>
                        <TableCell className="font-medium">{institute.name}</TableCell>
                        <TableCell className="text-right">{institute.students.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{institute.teachers}</TableCell>
                        <TableCell className="text-right">{institute.attendance}</TableCell>
                        <TableCell className="text-right">{institute.performance}</TableCell>
                        <TableCell className="text-right">{institute.fees}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student-Teacher Ratio</CardTitle>
                <CardDescription>Comparison of student-teacher ratio across institutes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institute</TableHead>
                      <TableHead className="text-right">Students</TableHead>
                      <TableHead className="text-right">Teachers</TableHead>
                      <TableHead className="text-right">Ratio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instituteComparisonData.map((institute) => (
                      <TableRow key={institute.id}>
                        <TableCell>{institute.name}</TableCell>
                        <TableCell className="text-right">{institute.students}</TableCell>
                        <TableCell className="text-right">{institute.teachers}</TableCell>
                        <TableCell className="text-right">
                          {Math.round(institute.students / institute.teachers)}:1
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Financial Efficiency</CardTitle>
                <CardDescription>Fee collection per student across institutes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institute</TableHead>
                      <TableHead className="text-right">Total Fees</TableHead>
                      <TableHead className="text-right">Students</TableHead>
                      <TableHead className="text-right">Fee/Student</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instituteComparisonData.map((institute) => {
                      const fees = parseInt(institute.fees.replace(/\$|,/g, ''));
                      const feePerStudent = Math.round(fees / institute.students);
                      return (
                        <TableRow key={institute.id}>
                          <TableCell>{institute.name}</TableCell>
                          <TableCell className="text-right">{institute.fees}</TableCell>
                          <TableCell className="text-right">{institute.students}</TableCell>
                          <TableCell className="text-right">${feePerStudent.toLocaleString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Saved Reports Tab */}
        <TabsContent value="saved-reports" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Select
              value={reportTypeFilter}
              onValueChange={setReportTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="enrollment">Enrollment</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="attendance">Attendance</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedReports
              .filter(report => reportTypeFilter === "all" || report.type === reportTypeFilter)
              .map(report => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {report.type}
                      </Badge>
                    </div>
                    <CardDescription>
                      Created by {report.createdBy} on {report.createdAt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      {report.format === "chart" ? (
                        <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                      ) : (
                        <TableIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm capitalize">{report.format} Format</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {report.schedule === "Once" ? "One-time report" : `Runs ${report.schedule}`}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Report</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Actions</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Report</DropdownMenuItem>
                        <DropdownMenuItem>Clone Report</DropdownMenuItem>
                        <DropdownMenuItem>Schedule</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        {/* Generate Report Tab */}
        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
              <CardDescription>
                Select parameters to generate a custom report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select defaultValue="enrollment">
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enrollment">Enrollment</SelectItem>
                      <SelectItem value="performance">Academic Performance</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select defaultValue="table">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">Table</SelectItem>
                      <SelectItem value="chart">Chart</SelectItem>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Institute</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select institute" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Institutes</SelectItem>
                      <SelectItem value="1">Stellar Academy</SelectItem>
                      <SelectItem value="2">Heritage School</SelectItem>
                      <SelectItem value="3">Meridian School</SelectItem>
                      <SelectItem value="4">Phoenix University</SelectItem>
                      <SelectItem value="5">Global College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Time Period</Label>
                  <Select defaultValue="year">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Additional Metrics</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="grades" />
                    <label htmlFor="grades" className="text-sm">
                      Grades & Results
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="teachers" />
                    <label htmlFor="teachers" className="text-sm">
                      Teacher Statistics
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fees" />
                    <label htmlFor="fees" className="text-sm">
                      Fee Collection
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gender" />
                    <label htmlFor="gender" className="text-sm">
                      Gender Distribution
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="schedule">Schedule Report</Label>
                  <Checkbox id="schedule" />
                </div>
                <Select disabled defaultValue="once">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">One-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">
                Preview
              </Button>
              <Button>
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Report Dialog */}
      <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Create a new report by filling out the information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name</Label>
              <Input id="report-name" placeholder="Enter report name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="enrollment">
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enrollment">Enrollment</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="attendance">Attendance</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-format">Format</Label>
                <Select defaultValue="table">
                  <SelectTrigger id="report-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table">Table</SelectItem>
                    <SelectItem value="chart">Chart</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-description">Description (Optional)</Label>
              <Textarea id="report-description" placeholder="Enter a brief description of the report" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewReportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewReportDialog(false)}>
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
