import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const Users = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage user accounts across all institutes."
      />

      <Card className="p-6">
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">User Management</h3>
          <p className="text-muted-foreground">
            This section will allow you to create and manage Institute Admin accounts,
            view all staff and student accounts across institutes, assign roles, and
            suspend or reactivate users.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Users;
