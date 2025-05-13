import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const Reports = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="View and generate reports across all institutes."
      />

      <Card className="p-6">
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">Reports & Analytics</h3>
          <p className="text-muted-foreground">
            This section will allow you to view summary reports across institutes,
            including student enrollment, attendance rates, fee collection overview,
            and exam performance breakdown.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
