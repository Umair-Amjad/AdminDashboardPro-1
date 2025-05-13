import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Institute {
  id: string;
  name: string;
  email: string;
  type: string;
  typeDetail: string;
  admin: string;
  students: number;
  status: "active" | "inactive" | "maintenance";
  logoInitials: string;
  logoColor: string;
}

interface InstituteTableProps {
  institutes?: Institute[];
  isLoading?: boolean;
  onEdit?: (institute: Institute) => void;
  onDelete?: (institute: Institute) => void;
  onSettings?: (institute: Institute) => void;
}

// Sample data for the institutes
const sampleInstitutes: Institute[] = [
  {
    id: "1",
    name: "Stellar Academy",
    email: "stellar@orbitgroup.edu",
    type: "School",
    typeDetail: "K-12",
    admin: "John Carter",
    students: 1245,
    status: "active",
    logoInitials: "SA",
    logoColor: "blue",
  },
  {
    id: "2",
    name: "Heritage School",
    email: "heritage@orbitgroup.edu",
    type: "School",
    typeDetail: "K-12",
    admin: "Emily Wilson",
    students: 980,
    status: "active",
    logoInitials: "HS",
    logoColor: "purple",
  },
  {
    id: "3",
    name: "Meridian School",
    email: "meridian@orbitgroup.edu",
    type: "School",
    typeDetail: "K-12",
    admin: "Robert Lee",
    students: 876,
    status: "active",
    logoInitials: "MS",
    logoColor: "amber",
  },
  {
    id: "4",
    name: "Phoenix University",
    email: "phoenix@orbitgroup.edu",
    type: "University",
    typeDetail: "Higher Education",
    admin: "David Chang",
    students: 2352,
    status: "maintenance",
    logoInitials: "PU",
    logoColor: "red",
  },
  {
    id: "5",
    name: "Global College",
    email: "global@orbitgroup.edu",
    type: "College",
    typeDetail: "Higher Education",
    admin: "Sarah Mitchell",
    students: 1654,
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

const statusMap: Record<string, { color: string; label: string }> = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  inactive: { color: "bg-red-100 text-red-800", label: "Inactive" },
  maintenance: { color: "bg-yellow-100 text-yellow-800", label: "Maintenance" },
};

const InstituteTable = ({ 
  institutes = sampleInstitutes, 
  isLoading = false,
  onEdit = () => {},
  onDelete = () => {},
  onSettings = () => {}
}: InstituteTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = institutes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return institutes.slice(startIndex, endIndex);
  };

  return (
    <Card className="shadow overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[300px]">Institute</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="ml-4">
                          <Skeleton className="h-4 w-40 mb-1" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-3 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              getCurrentItems().map((institute) => (
                <TableRow key={institute.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={cn("flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center", colorMap[institute.logoColor])}>
                        <span className="text-sm font-medium">{institute.logoInitials}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{institute.name}</div>
                        <div className="text-xs text-gray-500">{institute.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{institute.type}</div>
                    <div className="text-xs text-gray-500">{institute.typeDetail}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{institute.admin}</div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {institute.students ? institute.students.toLocaleString() : '0'}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", statusMap[institute.status].color)}>
                      {statusMap[institute.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary-dark"
                        onClick={() => onEdit(institute)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => onSettings(institute)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onDelete(institute)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> institutes
              </p>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink 
                      isActive={currentPage === i + 1} 
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstituteTable;
