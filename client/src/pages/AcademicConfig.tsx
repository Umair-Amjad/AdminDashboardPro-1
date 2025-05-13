import PageHeader from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";

const AcademicConfig = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Configuration"
        description="Manage academic settings across all institutes."
      />

      <Card className="p-6">
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">Academic Configuration</h3>
          <p className="text-muted-foreground">
            This section will allow you to define academic year templates, define
            class-grade structure, create subject templates reusable across institutes,
            and set common grading rules.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AcademicConfig;
