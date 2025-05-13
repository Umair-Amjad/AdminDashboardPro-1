import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Plus, Search, Save, X } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Sample roles data
const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all features across the organization",
    count: 2,
    editable: false,
  },
  {
    id: 2,
    name: "Institute Admin",
    description: "Manage institute-specific settings and users",
    count: 5,
    editable: true,
  },
  {
    id: 3,
    name: "Teacher",
    description: "Create and grade assignments, manage classrooms",
    count: 120,
    editable: true,
  },
  {
    id: 4,
    name: "Accountant",
    description: "Manage finances, fees, and payments",
    count: 8,
    editable: true,
  },
  {
    id: 5,
    name: "Librarian",
    description: "Manage books, issue and return, library reports",
    count: 4,
    editable: true,
  },
];

// Sample permissions data
const permissions = {
  "dashboard": {
    "View Dashboard": { superAdmin: true, instituteAdmin: true, teacher: true, accountant: true, librarian: true },
    "View Analytics": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: true, librarian: false },
  },
  "institutes": {
    "View Institutes": { superAdmin: true, instituteAdmin: false, teacher: false, accountant: false, librarian: false },
    "Add Institute": { superAdmin: true, instituteAdmin: false, teacher: false, accountant: false, librarian: false },
    "Edit Institute": { superAdmin: true, instituteAdmin: false, teacher: false, accountant: false, librarian: false },
    "Delete Institute": { superAdmin: true, instituteAdmin: false, teacher: false, accountant: false, librarian: false },
  },
  "users": {
    "View Users": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: false },
    "Add User": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: false },
    "Edit User": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: false },
    "Delete User": { superAdmin: true, instituteAdmin: false, teacher: false, accountant: false, librarian: false },
  },
  "academics": {
    "View Classes": { superAdmin: true, instituteAdmin: true, teacher: true, accountant: false, librarian: false },
    "Manage Classes": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: false },
    "View Subjects": { superAdmin: true, instituteAdmin: true, teacher: true, accountant: false, librarian: false },
    "Manage Subjects": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: false },
    "View Exams": { superAdmin: true, instituteAdmin: true, teacher: true, accountant: false, librarian: false },
    "Create Exams": { superAdmin: true, instituteAdmin: true, teacher: true, accountant: false, librarian: false },
    "Grade Exams": { superAdmin: true, instituteAdmin: true, teacher: true, accountant: false, librarian: false },
  },
  "finance": {
    "View Fees": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: true, librarian: false },
    "Collect Fees": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: true, librarian: false },
    "View Financial Reports": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: true, librarian: false },
    "Manage Expenses": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: true, librarian: false },
  },
  "library": {
    "View Books": { superAdmin: true, instituteAdmin: true, teacher: true, accountant: false, librarian: true },
    "Add Books": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: true },
    "Issue Books": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: true },
    "Return Books": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: true },
  },
  "settings": {
    "View Settings": { superAdmin: true, instituteAdmin: true, teacher: false, accountant: false, librarian: false },
    "Manage Settings": { superAdmin: true, instituteAdmin: false, teacher: false, accountant: false, librarian: false },
    "Manage Permissions": { superAdmin: true, instituteAdmin: false, teacher: false, accountant: false, librarian: false },
  },
};

// Sample institute permissions
const institutePermissions = [
  {
    id: 1,
    name: "Stellar Academy",
    modules: {
      academics: true,
      finance: true,
      attendance: true,
      library: true,
      events: true,
      reports: true,
      communication: true,
    },
    restrictions: {
      canManageAdmins: false,
      canDeleteUsers: false,
      canModifyFees: false,
      canExportData: true,
    }
  },
  {
    id: 2,
    name: "Heritage School",
    modules: {
      academics: true,
      finance: true,
      attendance: true,
      library: true,
      events: true,
      reports: true,
      communication: false,
    },
    restrictions: {
      canManageAdmins: false,
      canDeleteUsers: false,
      canModifyFees: true,
      canExportData: true,
    }
  },
  {
    id: 3,
    name: "Meridian School",
    modules: {
      academics: true,
      finance: true,
      attendance: true,
      library: false,
      events: false,
      reports: true,
      communication: false,
    },
    restrictions: {
      canManageAdmins: false,
      canDeleteUsers: false,
      canModifyFees: false,
      canExportData: false,
    }
  },
];

const Permissions = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedInstitute, setSelectedInstitute] = useState<number | null>(null);
  const [permissionData, setPermissionData] = useState(permissions);
  const [instituteData, setInstituteData] = useState(institutePermissions);
  
  const handlePermissionChange = (category: string, permission: string, role: string, value: boolean) => {
    setPermissionData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: {
          ...prev[category][permission],
          [role]: value
        }
      }
    }));
  };
  
  const handleInstituteModuleToggle = (instituteId: number, module: string, value: boolean) => {
    setInstituteData(prev => 
      prev.map(institute => 
        institute.id === instituteId 
          ? { ...institute, modules: { ...institute.modules, [module]: value } } 
          : institute
      )
    );
  };
  
  const handleInstituteRestrictionToggle = (instituteId: number, restriction: string, value: boolean) => {
    setInstituteData(prev => 
      prev.map(institute => 
        institute.id === instituteId 
          ? { ...institute, restrictions: { ...institute.restrictions, [restriction]: value } } 
          : institute
      )
    );
  };
  
  const handleSavePermissions = () => {
    toast({
      title: "Permissions saved",
      description: "Role permissions have been updated successfully.",
    });
  };
  
  const handleSaveInstitutes = () => {
    toast({
      title: "Institute permissions saved",
      description: "Institute access controls have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Access Control & Permissions"
        description="Manage role-based permissions across your organization."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="roles">Role Permissions</TabsTrigger>
          <TabsTrigger value="institutes">Institute Access</TabsTrigger>
        </TabsList>
        
        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Roles</CardTitle>
                <CardDescription>Select a role to manage its permissions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {roles.map(role => (
                    <div 
                      key={role.id}
                      className={`flex justify-between p-3 cursor-pointer hover:bg-gray-50 ${selectedRole === role.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div>
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-xs text-gray-500">{role.description}</p>
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 flex items-center">
                        {role.count} users
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Role
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedRole ? roles.find(r => r.id === selectedRole)?.name : 'Select a Role'} Permissions
                </CardTitle>
                <CardDescription>
                  {selectedRole 
                    ? `Configure permissions for ${roles.find(r => r.id === selectedRole)?.name} role` 
                    : 'Please select a role from the left panel'}
                </CardDescription>
                
                {selectedRole && (
                  <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search permissions..."
                      className="pl-8 h-9"
                    />
                  </div>
                )}
              </CardHeader>
              
              {selectedRole ? (
                <>
                  <CardContent className="p-0">
                    <div className="border-t">
                      {Object.entries(permissionData).map(([category, categoryPermissions]) => (
                        <div key={category} className="border-b">
                          <div className="bg-gray-50 p-3 font-medium text-sm capitalize">
                            {category}
                          </div>
                          <div>
                            {Object.entries(categoryPermissions).map(([permission, roles]) => {
                              const roleKey = selectedRole === 1 ? 'superAdmin' :
                                             selectedRole === 2 ? 'instituteAdmin' :
                                             selectedRole === 3 ? 'teacher' :
                                             selectedRole === 4 ? 'accountant' : 'librarian';
                              
                              return (
                                <div key={permission} className="flex items-center justify-between p-3 border-t">
                                  <span className="text-sm">{permission}</span>
                                  <div className="flex items-center">
                                    {selectedRole === 1 ? (
                                      <div className="flex items-center text-sm text-gray-500">
                                        <Check className="h-4 w-4 mr-1 text-green-500" />
                                        Always allowed
                                      </div>
                                    ) : (
                                      <Switch 
                                        checked={roles[roleKey]} 
                                        onCheckedChange={(checked) => handlePermissionChange(category, permission, roleKey, checked)}
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end py-4">
                    <Button onClick={handleSavePermissions}>
                      <Save className="h-4 w-4 mr-1" /> Save Changes
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <CardContent>
                  <div className="py-12 text-center text-muted-foreground">
                    Select a role from the left panel to configure permissions
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>
        
        {/* Institute Access Tab */}
        <TabsContent value="institutes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Institutes</CardTitle>
                <CardDescription>Select an institute to manage its access</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {instituteData.map(institute => (
                    <div 
                      key={institute.id}
                      className={`flex justify-between p-3 cursor-pointer hover:bg-gray-50 ${selectedInstitute === institute.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setSelectedInstitute(institute.id)}
                    >
                      <div>
                        <h3 className="font-medium">{institute.name}</h3>
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 flex items-center">
                        {Object.values(institute.modules).filter(Boolean).length} modules
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedInstitute ? instituteData.find(i => i.id === selectedInstitute)?.name : 'Select an Institute'} Access
                </CardTitle>
                <CardDescription>
                  {selectedInstitute 
                    ? `Configure feature access for ${instituteData.find(i => i.id === selectedInstitute)?.name}` 
                    : 'Please select an institute from the left panel'}
                </CardDescription>
              </CardHeader>
              
              {selectedInstitute ? (
                <>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Modules Access</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedInstitute && instituteData.find(i => i.id === selectedInstitute)?.modules && 
                          Object.entries(instituteData.find(i => i.id === selectedInstitute)!.modules).map(([module, enabled]) => (
                            <div key={module} className="flex items-center justify-between border p-3 rounded-md">
                              <div>
                                <p className="text-sm font-medium capitalize">{module}</p>
                                <p className="text-xs text-gray-500">
                                  {enabled ? 'Enabled for this institute' : 'Disabled for this institute'}
                                </p>
                              </div>
                              <Switch 
                                checked={enabled} 
                                onCheckedChange={(checked) => handleInstituteModuleToggle(selectedInstitute, module, checked)}
                              />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Access Restrictions</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Restriction</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Allowed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedInstitute && (
                            <>
                              <TableRow>
                                <TableCell className="font-medium">Admin Management</TableCell>
                                <TableCell>Can create and manage admin accounts</TableCell>
                                <TableCell className="text-right">
                                  <Switch 
                                    checked={instituteData.find(i => i.id === selectedInstitute)?.restrictions.canManageAdmins} 
                                    onCheckedChange={(checked) => handleInstituteRestrictionToggle(selectedInstitute, 'canManageAdmins', checked)}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Delete Users</TableCell>
                                <TableCell>Can permanently delete user accounts</TableCell>
                                <TableCell className="text-right">
                                  <Switch 
                                    checked={instituteData.find(i => i.id === selectedInstitute)?.restrictions.canDeleteUsers} 
                                    onCheckedChange={(checked) => handleInstituteRestrictionToggle(selectedInstitute, 'canDeleteUsers', checked)}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Modify Fee Structure</TableCell>
                                <TableCell>Can modify fee structure and payment options</TableCell>
                                <TableCell className="text-right">
                                  <Switch 
                                    checked={instituteData.find(i => i.id === selectedInstitute)?.restrictions.canModifyFees} 
                                    onCheckedChange={(checked) => handleInstituteRestrictionToggle(selectedInstitute, 'canModifyFees', checked)}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Export Data</TableCell>
                                <TableCell>Can export reports and data to external formats</TableCell>
                                <TableCell className="text-right">
                                  <Switch 
                                    checked={instituteData.find(i => i.id === selectedInstitute)?.restrictions.canExportData} 
                                    onCheckedChange={(checked) => handleInstituteRestrictionToggle(selectedInstitute, 'canExportData', checked)}
                                  />
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end py-4">
                    <Button onClick={handleSaveInstitutes}>
                      <Save className="h-4 w-4 mr-1" /> Save Changes
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <CardContent>
                  <div className="py-12 text-center text-muted-foreground">
                    Select an institute from the left panel to configure access
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Permissions;
