import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Filter, Search } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Users = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [instituteFilter, setInstituteFilter] = useState("all");

  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  // Function to handle adding a new user
  const handleAddUser = () => {
    // This would open a dialog to add a new user
    console.log("Add user clicked");
  };

  // Function to get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "institute_admin":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "teacher":
        return "bg-green-100 text-green-800 border-green-200";
      case "accountant":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Function to format role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "institute_admin":
        return "Institute Admin";
      case "teacher":
        return "Teacher";
      case "accountant":
        return "Accountant";
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="User Management"
          description="Manage user accounts across all institutes."
        />
        <Button onClick={handleAddUser}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-2">
            <CardTitle>Users</CardTitle>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full sm:w-auto grid grid-cols-3 h-9">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Users</TabsTrigger>
                <TabsTrigger value="active" className="text-xs sm:text-sm">Active</TabsTrigger>
                <TabsTrigger value="inactive" className="text-xs sm:text-sm">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
            <div className="flex items-center space-x-2">
              <div className="grid gap-1">
                <Select
                  value={roleFilter}
                  onValueChange={setRoleFilter}
                >
                  <SelectTrigger className="h-9 w-full sm:w-[140px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="institute_admin">Institute Admin</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1">
                <Select
                  value={instituteFilter}
                  onValueChange={setInstituteFilter}
                >
                  <SelectTrigger className="h-9 w-full sm:w-[180px]">
                    <SelectValue placeholder="Institute" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Institutes</SelectItem>
                    <SelectItem value="1">Stellar Academy</SelectItem>
                    <SelectItem value="2">Heritage School</SelectItem>
                    <SelectItem value="3">Meridian School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 h-9 w-full sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[300px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Institute</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="ml-4">
                              <Skeleton className="h-4 w-40 mb-1" />
                              <Skeleton className="h-3 w-28" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-24 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  // Demo data - would be replaced with actual users from the API
                  [
                    {
                      id: 1,
                      name: "Sarah Johnson",
                      email: "sarah.johnson@orbitgroup.edu",
                      role: "super_admin",
                      institute: null,
                      active: true,
                    },
                    {
                      id: 2,
                      name: "John Carter",
                      email: "john.carter@orbitgroup.edu",
                      role: "institute_admin",
                      institute: { id: 1, name: "Stellar Academy" },
                      active: true,
                    },
                    {
                      id: 3,
                      name: "Emily Wilson",
                      email: "emily.wilson@orbitgroup.edu",
                      role: "institute_admin",
                      institute: { id: 2, name: "Heritage School" },
                      active: true,
                    },
                    {
                      id: 4,
                      name: "Robert Lee",
                      email: "robert.lee@orbitgroup.edu",
                      role: "institute_admin",
                      institute: { id: 3, name: "Meridian School" },
                      active: true,
                    },
                    {
                      id: 5,
                      name: "Jennifer Parker",
                      email: "jennifer.parker@orbitgroup.edu",
                      role: "teacher",
                      institute: { id: 1, name: "Stellar Academy" },
                      active: false,
                    },
                  ].map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar>
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                          {getRoleDisplayName(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.institute ? user.institute.name : "Organization Level"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={user.active ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                          {user.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className={user.active ? "text-red-600" : "text-green-600"}>
                            {user.active ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(2)}>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
