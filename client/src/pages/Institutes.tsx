import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import InstituteTable from "@/components/institutes/InstituteTable";
import InstituteFilters from "@/components/institutes/InstituteFilters";
import AddInstituteDialog from "@/components/institutes/AddInstituteDialog";

const Institutes = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    search: "",
  });

  const { data: institutes, isLoading } = useQuery({
    queryKey: ["/api/institutes", filters],
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Institute Management"
          description="Manage all institutes under your organization."
        />
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Institute
        </Button>
      </div>

      <InstituteFilters filters={filters} setFilters={setFilters} />

      <InstituteTable institutes={institutes} isLoading={isLoading} />

      <AddInstituteDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
};

export default Institutes;
