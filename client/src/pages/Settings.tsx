import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Configure your organization settings."
      />

      <Card className="p-6">
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">Organization Settings</h3>
          <p className="text-muted-foreground">
            This section will allow you to configure organization name, logo, colors,
            default language, timezone, contact and support details, and other
            organization-wide settings.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
