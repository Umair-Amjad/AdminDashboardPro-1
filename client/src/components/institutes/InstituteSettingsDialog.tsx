import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Settings,
  Users,
  Book,
  School,
  Bell,
  Mail,
  Calendar,
  CreditCard,
  Shield,
  FileText,
  BarChart
} from "lucide-react";
import { Institute } from "@shared/schema";

interface InstituteSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  institute: Institute | null;
}

const InstituteSettingsDialog = ({ open, onOpenChange, institute }: InstituteSettingsDialogProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  if (!institute) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <School className="mr-2 h-5 w-5" />
            {institute.name} Settings
          </DialogTitle>
          <DialogDescription>
            Configure settings specific to {institute.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-5 gap-6 mt-4">
          {/* Sidebar navigation */}
          <div className="col-span-5 md:col-span-1">
            <div className="flex flex-col space-y-1">
              <Button 
                variant={activeTab === "general" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("general")}
              >
                <Settings className="mr-2 h-4 w-4" />
                General
              </Button>
              <Button 
                variant={activeTab === "users" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("users")}
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button 
                variant={activeTab === "academic" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("academic")}
              >
                <Book className="mr-2 h-4 w-4" />
                Academic
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button 
                variant={activeTab === "communication" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("communication")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Communication
              </Button>
              <Button 
                variant={activeTab === "calendar" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("calendar")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button 
                variant={activeTab === "billing" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("billing")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
              <Button 
                variant={activeTab === "security" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("security")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button 
                variant={activeTab === "reports" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("reports")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Reports
              </Button>
              <Button 
                variant={activeTab === "documents" ? "default" : "ghost"} 
                className="justify-start" 
                onClick={() => setActiveTab("documents")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Button>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="col-span-5 md:col-span-4">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Institute Details</CardTitle>
                    <CardDescription>
                      Basic information about this institution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="institute-name">Institute Name</Label>
                      <Input 
                        id="institute-name" 
                        defaultValue={institute.name} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="institute-email">Email Address</Label>
                      <Input 
                        id="institute-email" 
                        type="email" 
                        defaultValue={institute.email} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="institute-type">Type</Label>
                      <Input 
                        id="institute-type" 
                        defaultValue={institute.type} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="institute-detail">Type Detail</Label>
                      <Input 
                        id="institute-detail" 
                        defaultValue={institute.typeDetail || ''} 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="institute-status">Status</Label>
                      <div className="flex items-center space-x-2 py-2">
                        <Switch id="institute-status" defaultChecked={institute.status === 'active'} />
                        <Label htmlFor="institute-status">Active</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Contact details for this institution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter address" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="Enter website URL" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Users Settings */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage user accounts associated with this institution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Admin User</Label>
                      <div className="p-4 border rounded-md bg-slate-50">
                        {institute.adminId ? (
                          <p>Admin ID: {institute.adminId}</p>
                        ) : (
                          <p className="text-muted-foreground">No admin assigned</p>
                        )}
                        <Button className="mt-2" variant="outline" size="sm">
                          Change Admin
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="allow-self-registration">Allow Self-Registration</Label>
                        <Switch id="allow-self-registration" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Allow users to register accounts without admin approval
                      </p>
                    </div>
                    
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-verification">Require Email Verification</Label>
                        <Switch id="email-verification" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Require users to verify their email address before accessing the system
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Roles</CardTitle>
                    <CardDescription>
                      Configure role permissions for this institution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Enabled Roles</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="role-admin" defaultChecked />
                          <Label htmlFor="role-admin">Administrator</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="role-teacher" defaultChecked />
                          <Label htmlFor="role-teacher">Teacher</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="role-student" defaultChecked />
                          <Label htmlFor="role-student">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="role-parent" defaultChecked />
                          <Label htmlFor="role-parent">Parent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="role-accountant" defaultChecked />
                          <Label htmlFor="role-accountant">Accountant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="role-librarian" />
                          <Label htmlFor="role-librarian">Librarian</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Academic Settings */}
            {activeTab === "academic" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Configuration</CardTitle>
                    <CardDescription>
                      Configure academic settings for this institution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="academic-year">Current Academic Year</Label>
                      <Input id="academic-year" placeholder="e.g., 2023-2024" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Grading System</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="grading-system-letters" defaultChecked />
                        <Label htmlFor="grading-system-letters">Letter Grades (A, B, C, D, F)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="grading-system-percentage" />
                        <Label htmlFor="grading-system-percentage">Percentage</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="grading-system-gpa" />
                        <Label htmlFor="grading-system-gpa">GPA (0-4.0)</Label>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Academic Terms</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="term-semesters" defaultChecked />
                        <Label htmlFor="term-semesters">Semesters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="term-quarters" />
                        <Label htmlFor="term-quarters">Quarters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="term-trimesters" />
                        <Label htmlFor="term-trimesters">Trimesters</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Class and Course Settings</CardTitle>
                    <CardDescription>
                      Configure classes and courses for this institution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="course-approval">Require Course Approval</Label>
                        <Switch id="course-approval" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Require administrator approval for new courses
                      </p>
                    </div>
                    
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="student-enrollment">Allow Self-Enrollment</Label>
                        <Switch id="student-enrollment" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Allow students to enroll in courses without approval
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Other tabs would have similar structures with relevant settings */}
            {activeTab !== "general" && activeTab !== "users" && activeTab !== "academic" && (
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{activeTab} Settings</CardTitle>
                  <CardDescription>
                    Configure {activeTab} settings for {institute.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings will be available here.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstituteSettingsDialog;