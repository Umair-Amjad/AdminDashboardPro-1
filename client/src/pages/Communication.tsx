import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock, 
  Plus, 
  Users, 
  Building, 
  Calendar, 
  File, 
  Copy, 
  Trash2, 
  Send, 
  ListFilter,
  ChevronDown,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/shared/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Sample data for communication templates
const templates = [
  {
    id: 1,
    title: "Welcome Message",
    type: "email",
    subject: "Welcome to [Institute Name]",
    content: "Dear [Name],\n\nWelcome to [Institute Name]! We're excited to have you join our community.\n\nYour account has been successfully created. You can now login using your credentials.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\n[Institute Name] Team",
    variables: ["Name", "Institute Name"],
    lastUsed: "2023-12-15",
  },
  {
    id: 2,
    title: "Fee Payment Reminder",
    type: "sms",
    content: "Dear [Parent Name], this is a reminder that [Student Name]'s fee payment of [Amount] is due on [Due Date]. Please make the payment to avoid late fees. - [Institute Name]",
    variables: ["Parent Name", "Student Name", "Amount", "Due Date", "Institute Name"],
    lastUsed: "2023-12-20",
  },
  {
    id: 3,
    title: "Exam Schedule Announcement",
    type: "notification",
    subject: "Upcoming Examination Schedule",
    content: "Dear Students,\n\nThe [Exam Name] examinations will begin from [Start Date]. The detailed schedule has been published on the portal.\n\nPlease ensure you are well prepared.\n\nBest of luck!\n[Institute Name]",
    variables: ["Exam Name", "Start Date", "Institute Name"],
    lastUsed: "2024-01-05",
  },
  {
    id: 4,
    title: "Holiday Announcement",
    type: "email",
    subject: "Holiday Announcement - [Holiday Name]",
    content: "Dear Parents and Students,\n\nThis is to inform you that the institute will remain closed on [Holiday Date] on account of [Holiday Name].\n\nRegular classes will resume on [Resume Date].\n\nRegards,\n[Institute Name]",
    variables: ["Holiday Name", "Holiday Date", "Resume Date", "Institute Name"],
    lastUsed: "2024-01-10",
  },
];

// Sample data for communication logs
const communicationLogs = [
  {
    id: 1,
    title: "Fee Payment Reminder",
    type: "sms",
    sentTo: "All Parents - Stellar Academy",
    sentBy: "Sarah Johnson",
    sentAt: "2024-01-15 10:30 AM",
    status: "delivered",
    deliveredCount: 450,
    failedCount: 3,
  },
  {
    id: 2,
    title: "Exam Schedule Announcement",
    type: "email",
    sentTo: "All Students - Multiple Institutes",
    sentBy: "Sarah Johnson",
    sentAt: "2024-01-10 02:15 PM",
    status: "delivered",
    deliveredCount: 1250,
    failedCount: 25,
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    type: "notification",
    sentTo: "Class 10 Parents - Heritage School",
    sentBy: "Emily Wilson",
    sentAt: "2024-01-08 09:45 AM",
    status: "delivered",
    deliveredCount: 68,
    failedCount: 0,
  },
  {
    id: 4,
    title: "Holiday Announcement",
    type: "email",
    sentTo: "All Users - All Institutes",
    sentBy: "Sarah Johnson",
    sentAt: "2024-01-05 11:20 AM",
    status: "delivered",
    deliveredCount: 2145,
    failedCount: 32,
  },
  {
    id: 5,
    title: "Sports Day Invitation",
    type: "sms",
    sentTo: "All Parents - Meridian School",
    sentBy: "Robert Lee",
    sentAt: "2024-01-03 04:10 PM",
    status: "delivered",
    deliveredCount: 342,
    failedCount: 5,
  },
];

// Sample institute data for selection
const institutes = [
  { id: 1, name: "Stellar Academy" },
  { id: 2, name: "Heritage School" },
  { id: 3, name: "Meridian School" },
  { id: 4, name: "Phoenix University" },
  { id: 5, name: "Global College" },
];

const Communication = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("compose");
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [messageType, setMessageType] = useState("email");
  const [selectedInstitutes, setSelectedInstitutes] = useState<number[]>([]);
  const [recipientType, setRecipientType] = useState("all");
  
  // Form state
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    schedule: false,
    scheduleDate: "",
    scheduleTime: "",
  });
  
  // Handle form changes
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle institute selection toggle
  const handleInstituteToggle = (id: number) => {
    setSelectedInstitutes(prev => 
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };
  
  // Handle template selection
  const handleTemplateSelect = (id: number) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      setSelectedTemplate(id);
      setMessageType(template.type);
      setFormData(prev => ({
        ...prev,
        subject: template.subject || "",
        message: template.content || "",
      }));
    }
  };
  
  // Handle send message
  const handleSendMessage = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
    
    // Reset form
    setFormData({
      subject: "",
      message: "",
      schedule: false,
      scheduleDate: "",
      scheduleTime: "",
    });
    setSelectedTemplate(null);
    setSelectedInstitutes([]);
  };
  
  // Get recipient count
  const getRecipientCount = () => {
    if (selectedInstitutes.length === 0) return 0;
    
    // This would normally calculate based on actual data
    return selectedInstitutes.length * (recipientType === "all" ? 500 : recipientType === "students" ? 400 : recipientType === "parents" ? 350 : 20);
  };
  
  // Get communication type icon
  const getCommunicationTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "notification":
        return <Bell className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };
  
  // Get status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Communication"
        description="Manage communication across your organization."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="logs">Communication Logs</TabsTrigger>
        </TabsList>
        
        {/* Compose Message Tab */}
        <TabsContent value="compose" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Message</CardTitle>
                  <CardDescription>
                    Create and send messages to selected recipients
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message-type">Message Type</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer ${
                          messageType === "email" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setMessageType("email")}
                      >
                        <Mail className={`h-8 w-8 mb-2 ${messageType === "email" ? "text-primary" : "text-gray-500"}`} />
                        <span className={messageType === "email" ? "font-medium text-primary" : ""}>Email</span>
                      </div>
                      <div
                        className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer ${
                          messageType === "sms" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setMessageType("sms")}
                      >
                        <MessageSquare className={`h-8 w-8 mb-2 ${messageType === "sms" ? "text-primary" : "text-gray-500"}`} />
                        <span className={messageType === "sms" ? "font-medium text-primary" : ""}>SMS</span>
                      </div>
                      <div
                        className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer ${
                          messageType === "notification" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setMessageType("notification")}
                      >
                        <Bell className={`h-8 w-8 mb-2 ${messageType === "notification" ? "text-primary" : "text-gray-500"}`} />
                        <span className={messageType === "notification" ? "font-medium text-primary" : ""}>Notification</span>
                      </div>
                    </div>
                  </div>
                  
                  {(messageType === "email" || messageType === "notification") && (
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={(e) => handleFormChange("subject", e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleFormChange("message", e.target.value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Schedule Message</Label>
                      <Switch
                        checked={formData.schedule}
                        onCheckedChange={(checked) => handleFormChange("schedule", checked)}
                      />
                    </div>
                    
                    {formData.schedule && (
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor="schedule-date">Date</Label>
                          <Input
                            id="schedule-date"
                            type="date"
                            value={formData.scheduleDate}
                            onChange={(e) => handleFormChange("scheduleDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="schedule-time">Time</Label>
                          <Input
                            id="schedule-time"
                            type="time"
                            value={formData.scheduleTime}
                            onChange={(e) => handleFormChange("scheduleTime", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Templates</CardTitle>
                  <CardDescription>
                    Use a pre-defined template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={(value) => handleTemplateSelect(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem 
                          key={template.id} 
                          value={template.id.toString()}
                        >
                          <div className="flex items-center">
                            {getCommunicationTypeIcon(template.type)}
                            <span className="ml-2">{template.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                  <CardDescription>
                    Select who should receive this message
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Recipient Type</Label>
                    <Select 
                      value={recipientType} 
                      onValueChange={setRecipientType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="students">Students Only</SelectItem>
                        <SelectItem value="parents">Parents Only</SelectItem>
                        <SelectItem value="staff">Staff Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Institutes</Label>
                    <div className="border rounded-md max-h-48 overflow-y-auto">
                      <div className="p-2 border-b bg-gray-50">
                        <div className="flex items-center">
                          <Checkbox 
                            id="select-all"
                            checked={selectedInstitutes.length === institutes.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedInstitutes(institutes.map(i => i.id));
                              } else {
                                setSelectedInstitutes([]);
                              }
                            }}
                          />
                          <Label htmlFor="select-all" className="ml-2 text-sm">
                            Select All Institutes
                          </Label>
                        </div>
                      </div>
                      {institutes.map(institute => (
                        <div key={institute.id} className="flex items-center p-2 border-b last:border-0">
                          <Checkbox 
                            id={`institute-${institute.id}`}
                            checked={selectedInstitutes.includes(institute.id)}
                            onCheckedChange={() => handleInstituteToggle(institute.id)}
                          />
                          <Label htmlFor={`institute-${institute.id}`} className="ml-2 text-sm">
                            {institute.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-md bg-gray-50 p-3">
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Recipient Count:</span> {getRecipientCount()}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This is an estimated count of recipients who will receive this message
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleSendMessage}
                    disabled={
                      !formData.message || 
                      ((messageType === "email" || messageType === "notification") && !formData.subject) ||
                      selectedInstitutes.length === 0 ||
                      (formData.schedule && (!formData.scheduleDate || !formData.scheduleTime))
                    }
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {formData.schedule ? "Schedule Message" : "Send Message"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowNewTemplateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <Card key={template.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <Badge variant="outline" className="capitalize">
                      {getCommunicationTypeIcon(template.type)}
                      <span className="ml-1">{template.type}</span>
                    </Badge>
                  </div>
                  <CardDescription>
                    Last used: {template.lastUsed}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {template.subject && (
                    <div className="mb-2">
                      <p className="text-sm font-medium">Subject:</p>
                      <p className="text-sm">{template.subject}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">Content:</p>
                    <p className="text-sm whitespace-pre-line line-clamp-3">
                      {template.content}
                    </p>
                  </div>
                  
                  {template.variables?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-500">Variables:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map(variable => (
                          <Badge variant="secondary" key={variable} className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleTemplateSelect(template.id)}>
                    <Copy className="h-4 w-4 mr-1" />
                    Use
                  </Button>
                  <div>
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Communication Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Communication History</CardTitle>
                  <CardDescription>
                    View all communication sent through the platform
                  </CardDescription>
                </div>
                
                <div className="flex mt-4 sm:mt-0 space-x-2">
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sent To</TableHead>
                      <TableHead>Sent By</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {communicationLogs.map(log => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getCommunicationTypeIcon(log.type)}
                            <span className="ml-1 capitalize">{log.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{log.sentTo}</TableCell>
                        <TableCell>{log.sentBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span>{log.sentAt}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusBadge(log.status)}>
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <span className="text-green-600">{log.deliveredCount} delivered</span>
                            {log.failedCount > 0 && (
                              <span className="text-red-600 ml-2">{log.failedCount} failed</span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Template Dialog */}
      <Dialog open={showNewTemplateDialog} onOpenChange={setShowNewTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a new communication template that can be reused
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-title">Template Title</Label>
              <Input id="template-title" placeholder="Enter a descriptive title" />
            </div>
            
            <div className="space-y-2">
              <Label>Template Type</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer border-primary bg-primary/5">
                  <Mail className="h-8 w-8 mb-2 text-primary" />
                  <span className="font-medium text-primary">Email</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer">
                  <MessageSquare className="h-8 w-8 mb-2 text-gray-500" />
                  <span>SMS</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer">
                  <Bell className="h-8 w-8 mb-2 text-gray-500" />
                  <span>Notification</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-subject">Subject</Label>
              <Input id="template-subject" placeholder="Enter subject line" />
              <p className="text-xs text-gray-500">
                Use [Variable Name] for dynamic content, e.g., [Student Name]
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-content">Content</Label>
              <Textarea 
                id="template-content" 
                placeholder="Enter template content"
                rows={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Variables</Label>
              <div className="border rounded-md p-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                    Name
                    <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                    Institute Name
                    <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                    Date
                    <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </Badge>
                  <div className="flex items-center">
                    <Input placeholder="Add variable" className="h-6 text-xs ml-2" />
                    <Button variant="ghost" size="sm" className="h-6 p-1">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTemplateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowNewTemplateDialog(false);
              toast({
                title: "Template created",
                description: "Your template has been created successfully.",
              });
            }}>
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Communication;
