import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const Permissions = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Access Control & Permissions"
        description="Manage role-based permissions across your organization."
      />

      <Card className="p-6">
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">Permissions Management</h3>
          <p className="text-muted-foreground">
            This section will allow you to set role-based permissions per institute,
            define institute-level feature access, turn on/off modules, and restrict
            access to specific features.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Permissions;
