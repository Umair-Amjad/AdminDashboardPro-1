import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import InstituteTable from "@/components/institutes/InstituteTable";
import InstituteFilters from "@/components/institutes/InstituteFilters";
import AddInstituteDialog from "@/components/institutes/AddInstituteDialog";
import EditInstituteDialog from "@/components/institutes/EditInstituteDialog";
import DeleteInstituteDialog from "@/components/institutes/DeleteInstituteDialog";
import InstituteSettingsDialog from "@/components/institutes/InstituteSettingsDialog";
import InstituteAccessDialog from "@/components/institutes/InstituteAccessDialog";
import { useToast } from "@/hooks/use-toast";
import { Institute } from "@shared/schema";

const Institutes = () => {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    search: "",
  });

  const { data: institutes, isLoading } = useQuery({
    queryKey: ["/api/institutes", filters],
  });

  // Handle edit button click
  const handleEdit = (institute: Institute) => {
    setSelectedInstitute(institute);
    setShowEditDialog(true);
  };

  // Handle delete button click
  const handleDelete = (institute: Institute) => {
    setSelectedInstitute(institute);
    setShowDeleteDialog(true);
  };

  // For institute settings
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  // Handle settings button click
  const handleSettings = (institute: Institute) => {
    setSelectedInstitute(institute);
    setShowSettingsDialog(true);
  };

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

      <InstituteTable 
        institutes={institutes} 
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSettings={handleSettings}
      />

      {/* Add Institute Dialog */}
      <AddInstituteDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
      />

      {/* Edit Institute Dialog */}
      {selectedInstitute && (
        <EditInstituteDialog 
          open={showEditDialog} 
          onOpenChange={setShowEditDialog} 
          institute={selectedInstitute} 
        />
      )}

      {/* Delete Institute Dialog */}
      {selectedInstitute && (
        <DeleteInstituteDialog 
          open={showDeleteDialog} 
          onOpenChange={setShowDeleteDialog} 
          institute={selectedInstitute} 
        />
      )}
    </div>
  );
};

export default Institutes;
