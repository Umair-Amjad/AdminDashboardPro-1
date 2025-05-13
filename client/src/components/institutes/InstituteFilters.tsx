import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface FiltersState {
  status: string;
  type: string;
  search: string;
}

interface InstituteFiltersProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
}

const InstituteFilters = ({ filters, setFilters }: InstituteFiltersProps) => {
  const handleStatusChange = (value: string) => {
    setFilters({ ...filters, status: value });
  };

  const handleTypeChange = (value: string) => {
    setFilters({ ...filters, type: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-end space-y-3 md:space-y-0 md:space-x-4">
            <div>
              <Label htmlFor="filter-status" className="text-sm font-medium mb-1 block">
                Status
              </Label>
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger id="filter-status" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Institutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Institutes</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-type" className="text-sm font-medium mb-1 block">
                Type
              </Label>
              <Select value={filters.type} onValueChange={handleTypeChange}>
                <SelectTrigger id="filter-type" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search institutes..."
              className="pl-10 pr-4 w-full md:w-[300px]"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstituteFilters;
