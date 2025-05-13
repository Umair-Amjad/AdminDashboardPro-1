import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import UserTable from "@/components/users/UserTable";
import AddUserForm from "@/components/users/AddUserForm";
import EditUserForm from "@/components/users/EditUserForm";
import { User } from "@shared/schema";

const Users = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [instituteFilter, setInstituteFilter] = useState("all");
  
  // State for Add/Edit user
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Fetch users and institutes
  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/users", activeTab, roleFilter, instituteFilter, searchQuery],
  });
  
  // Toggle user active status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ userId, active }: { userId: number, active: boolean }) => {
      return await apiRequest("PATCH", `/api/users/${userId}`, { active });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      
      toast({
        title: "User Updated",
        description: "User status has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Handle adding a new user
  const handleAddUser = () => {
    setShowAddUserForm(true);
  };
  
  // Handle editing a user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };
  
  // Handle deleting a user
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };
  
  // Handle toggling user active status
  const handleToggleActive = (user: User, active: boolean) => {
    toggleActiveMutation.mutate({ userId: user.id, active });
  };

  return (
    <>
      {/* User list view (default) */}
      {!showAddUserForm && (
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
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="instituteAdmin">Institute Admin</SelectItem>
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
              <UserTable 
                users={users}
                isLoading={isLoading}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onToggleActive={handleToggleActive}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add User Form view */}
      {showAddUserForm && (
        <AddUserForm onBack={() => setShowAddUserForm(false)} />
      )}

      {/* Edit User Form */}
      {showEditDialog && selectedUser && (
        <EditUserForm 
          user={selectedUser} 
          onBack={() => setShowEditDialog(false)} 
        />
      )}

      {/* Delete User Dialog */}
      {selectedUser && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive">Delete User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Users;
