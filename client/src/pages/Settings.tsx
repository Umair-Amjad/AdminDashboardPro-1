import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Save } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("general");
  
  // Fetch organization settings from the API
  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/settings"],
  });
  
  // Sample org settings to use before API data loads
  const defaultOrgSettings = {
    orgName: "Orbit Group of Education",
    logo: "/logos/orbit-logo.png",
    primaryColor: "#4F46E5",
    language: "en",
    timezone: "UTC",
    contactEmail: "admin@orbitgroup.edu",
    supportPhone: "+1 (123) 456-7890",
    address: "123 Education Street, Knowledge City",
    website: "https://orbitgroup.edu",
    features: {
      exams: true,
      library: true,
      transport: true,
      events: true,
      accounting: true,
      attendance: true,
      reports: true,
      communication: true,
    },
    security: {
      twoFactorAuth: true,
      passwordExpiry: 90,
      loginAttempts: 5,
      sessionTimeout: 30,
      ipRestriction: false,
    },
    apiKeys: {
      sendgrid: "",
      twilioSid: "",
      twilioToken: "",
      twilioPhone: "",
      attendanceBiometric: "",
      googleMaps: "",
      paymentGateway: "",
    }
  };
  
  // Form state for organization details
  const [formData, setFormData] = useState(defaultOrgSettings);
  
  // Update form data when API data loads
  /*
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);
  */
  
  // Simulate form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send updated settings to the API
    
    toast({
      title: "Settings saved",
      description: "Your organization settings have been updated successfully.",
    });
  };
  
  // Handle input changes
  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle feature toggle changes
  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: enabled
      }
    }));
  };
  
  // Handle security setting changes
  const handleSecurityChange = (setting: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [setting]: value
      }
    }));
  };

  // Handle API key changes
  const handleApiKeyChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Configure your organization settings."
      />

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="apikeys">API Keys</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Configure the basic information about your organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={formData.orgName}
                      onChange={(e) => handleInputChange('orgName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      type="tel"
                      value={formData.supportPhone}
                      onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primaryColor"
                        type="text"
                        value={formData.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      />
                      <div 
                        className="h-10 w-10 rounded-md border" 
                        style={{ backgroundColor: formData.primaryColor }} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => handleInputChange('language', value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={formData.timezone}
                      onValueChange={(value) => handleInputChange('timezone', value)}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Features Tab */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Management</CardTitle>
              <CardDescription>
                Enable or disable features across all institutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Academics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Examination Module</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage exams, grades, and result publishing
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.exams}
                        onCheckedChange={(checked) => handleFeatureToggle('exams', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Attendance Tracking</Label>
                        <p className="text-sm text-muted-foreground">
                          Track student and staff attendance
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.attendance}
                        onCheckedChange={(checked) => handleFeatureToggle('attendance', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Library Management</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage books, issuing, and returns
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.library}
                        onCheckedChange={(checked) => handleFeatureToggle('library', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Administration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Transportation</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage routes, vehicles and schedules
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.transport}
                        onCheckedChange={(checked) => handleFeatureToggle('transport', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Events Management</Label>
                        <p className="text-sm text-muted-foreground">
                          Organize and schedule events and activities
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.events}
                        onCheckedChange={(checked) => handleFeatureToggle('events', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Accounting</Label>
                        <p className="text-sm text-muted-foreground">
                          Manage fees, payments, and financial reports
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.accounting}
                        onCheckedChange={(checked) => handleFeatureToggle('accounting', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Communication</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Reports Generation</Label>
                        <p className="text-sm text-muted-foreground">
                          Generate custom reports across modules
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.reports}
                        onCheckedChange={(checked) => handleFeatureToggle('reports', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Communication Center</Label>
                        <p className="text-sm text-muted-foreground">
                          Send emails, SMS and notifications
                        </p>
                      </div>
                      <Switch
                        checked={formData.features.communication}
                        onCheckedChange={(checked) => handleFeatureToggle('communication', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save Features
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* API Keys Tab */}
        <TabsContent value="apikeys">
          <Card>
            <CardHeader>
              <CardTitle>API Integrations</CardTitle>
              <CardDescription>
                Configure API keys for external services that will be used across all institutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Configuration</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sendgrid">SendGrid API Key</Label>
                    <Input
                      id="sendgrid"
                      type="password"
                      value={formData.apiKeys.sendgrid}
                      onChange={(e) => handleApiKeyChange('sendgrid', e.target.value)}
                      className="font-mono"
                      placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                    <p className="text-sm text-muted-foreground">
                      Used for sending emails to users, parents, and staff
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* SMS Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SMS Configuration</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="twilioSid">Twilio Account SID</Label>
                    <Input
                      id="twilioSid"
                      type="password"
                      value={formData.apiKeys.twilioSid}
                      onChange={(e) => handleApiKeyChange('twilioSid', e.target.value)}
                      className="font-mono"
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilioToken">Twilio Auth Token</Label>
                    <Input
                      id="twilioToken"
                      type="password"
                      value={formData.apiKeys.twilioToken}
                      onChange={(e) => handleApiKeyChange('twilioToken', e.target.value)}
                      className="font-mono"
                      placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilioPhone">Twilio Phone Number</Label>
                    <Input
                      id="twilioPhone"
                      value={formData.apiKeys.twilioPhone}
                      onChange={(e) => handleApiKeyChange('twilioPhone', e.target.value)}
                      placeholder="+1234567890"
                    />
                    <p className="text-sm text-muted-foreground">
                      Used for sending SMS alerts and notifications
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Attendance Biometric API */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Attendance System Integration</h3>
                <div className="space-y-2">
                  <Label htmlFor="attendanceBiometric">Biometric API Key</Label>
                  <Input
                    id="attendanceBiometric"
                    type="password"
                    value={formData.apiKeys.attendanceBiometric}
                    onChange={(e) => handleApiKeyChange('attendanceBiometric', e.target.value)}
                    className="font-mono"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="text-sm text-muted-foreground">
                    Used to connect with biometric attendance devices and sync with the system
                  </p>
                </div>
              </div>

              <Separator />

              {/* Maps Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Maps Integration</h3>
                <div className="space-y-2">
                  <Label htmlFor="googleMaps">Google Maps API Key</Label>
                  <Input
                    id="googleMaps"
                    type="password"
                    value={formData.apiKeys.googleMaps}
                    onChange={(e) => handleApiKeyChange('googleMaps', e.target.value)}
                    className="font-mono"
                    placeholder="AIza..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for transportation routes, campus maps, and location features
                  </p>
                </div>
              </div>

              <Separator />

              {/* Payment Gateway */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Processing</h3>
                <div className="space-y-2">
                  <Label htmlFor="paymentGateway">Payment Gateway API Key</Label>
                  <Input
                    id="paymentGateway"
                    type="password"
                    value={formData.apiKeys.paymentGateway}
                    onChange={(e) => handleApiKeyChange('paymentGateway', e.target.value)}
                    className="font-mono"
                    placeholder="sk_test_..."
                  />
                  <p className="text-sm text-muted-foreground">
                    Used for processing fee payments and financial transactions
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save API Keys
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies for your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <Switch
                        id="twoFactorAuth"
                        checked={formData.security.twoFactorAuth}
                        onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for all admin users.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="ipRestriction">IP Restriction</Label>
                      <Switch
                        id="ipRestriction"
                        checked={formData.security.ipRestriction}
                        onCheckedChange={(checked) => handleSecurityChange('ipRestriction', checked)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses or ranges.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      min={0}
                      value={formData.security.passwordExpiry}
                      onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 for no expiration.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Failed Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      min={1}
                      value={formData.security.loginAttempts}
                      onChange={(e) => handleSecurityChange('loginAttempts', parseInt(e.target.value) || 5)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of failed attempts before account lockout.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min={5}
                      value={formData.security.sessionTimeout}
                      onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value) || 30)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Time before automatically logging out inactive users.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Password Policy</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <p className="text-sm">Minimum 8 characters long</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <p className="text-sm">At least one uppercase letter</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <p className="text-sm">At least one lowercase letter</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <p className="text-sm">At least one number</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <p className="text-sm">At least one special character</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
