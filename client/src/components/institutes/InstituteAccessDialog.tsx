import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchoolIcon, CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Institute } from "@shared/schema";

interface InstituteAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInstituteSelect: (institute: Institute) => void;
}

// Sample institutes (in real app, this would come from the API)
const sampleInstitutes = [
  {
    id: 1,
    name: "Stellar Academy",
    email: "stellar@orbitgroup.edu",
    type: "School",
    status: "active",
    logoInitials: "SA",
    logoColor: "blue",
  },
  {
    id: 2,
    name: "Heritage School",
    email: "heritage@orbitgroup.edu",
    type: "School",
    status: "active",
    logoInitials: "HS",
    logoColor: "purple",
  },
  {
    id: 3,
    name: "Meridian School",
    email: "meridian@orbitgroup.edu",
    type: "School",
    status: "active",
    logoInitials: "MS",
    logoColor: "amber",
  },
  {
    id: 4,
    name: "Phoenix University",
    email: "phoenix@orbitgroup.edu",
    type: "University",
    status: "maintenance",
    logoInitials: "PU",
    logoColor: "red",
  },
  {
    id: 5,
    name: "Global College",
    email: "global@orbitgroup.edu",
    type: "College",
    status: "inactive",
    logoInitials: "GC",
    logoColor: "gray",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  gray: "bg-gray-100 text-gray-800",
  green: "bg-green-100 text-green-800",
};

const statusMap: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  active: { 
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, 
    label: "Active",
    color: "text-green-500"
  },
  inactive: { 
    icon: <XCircle className="h-4 w-4 text-red-500" />, 
    label: "Inactive",
    color: "text-red-500"
  },
  maintenance: { 
    icon: <Clock className="h-4 w-4 text-yellow-500" />, 
    label: "Maintenance",
    color: "text-yellow-500" 
  },
};

const InstituteAccessDialog = ({ open, onOpenChange, onInstituteSelect }: InstituteAccessDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Fetch institutes
  const { data: institutes, isLoading } = useQuery({
    queryKey: ["/api/institutes"],
  });
  
  const handleInstituteSelect = (institute: Institute) => {
    toast({
      title: "Institute Access",
      description: `Switched to ${institute.name}`,
    });
    onInstituteSelect(institute);
    onOpenChange(false);
  };
  
  const displayInstitutes = institutes || sampleInstitutes;
  
  // Filter institutes by search query
  const filteredInstitutes = displayInstitutes.filter((institute) => 
    institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institute.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institute.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <SchoolIcon className="mr-2 h-5 w-5" />
            Access Institute
          </DialogTitle>
          <DialogDescription>
            Switch to a different institute under your organization
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Command>
            <CommandInput 
              placeholder="Search institutes..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No institutes found.</CommandEmpty>
              <CommandGroup heading="Institutes">
                {filteredInstitutes.map((institute) => (
                  <CommandItem
                    key={institute.id}
                    value={institute.name}
                    onSelect={() => handleInstituteSelect(institute as Institute)}
                    className="py-2"
                  >
                    <div className="flex items-center flex-1">
                      <div className={cn("flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3", colorMap[institute.logoColor])}>
                        <span className="text-sm font-medium">{institute.logoInitials}</span>
                      </div>
                      <div>
                        <div className="font-medium">{institute.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          {statusMap[institute.status].icon}
                          <span className={cn("ml-1", statusMap[institute.status].color)}>
                            {statusMap[institute.status].label}
                          </span>
                          <span className="mx-1">•</span>
                          {institute.type}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstituteAccessDialog;