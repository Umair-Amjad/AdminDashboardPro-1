import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const Communication = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Communication"
        description="Manage communication across your organization."
      />

      <Card className="p-6">
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">Communication Center</h3>
          <p className="text-muted-foreground">
            This section will allow you to send platform-wide announcements to multiple
            institutes, manage templates for SMS/Email/Push communications, and view
            communication logs.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Communication;
