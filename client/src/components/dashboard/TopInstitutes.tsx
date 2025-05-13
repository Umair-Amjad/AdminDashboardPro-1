import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface Institute {
  id: string;
  name: string;
  initial: string;
  attendance: string;
  rank: number;
  color: string;
}

interface TopInstitutesProps {
  institutes?: Institute[];
  isLoading?: boolean;
}

// Sample data for the top institutes
const sampleInstitutes: Institute[] = [
  {
    id: "1",
    name: "Stellar Academy",
    initial: "SA",
    attendance: "98.2% attendance",
    rank: 1,
    color: "purple",
  },
  {
    id: "2",
    name: "Heritage School",
    initial: "HS",
    attendance: "96.7% attendance",
    rank: 2,
    color: "blue",
  },
  {
    id: "3",
    name: "Meridian School",
    initial: "MS",
    attendance: "95.3% attendance",
    rank: 3,
    color: "amber",
  },
];

const colorMap: Record<string, string> = {
  purple: "bg-purple-100 text-purple-800",
  blue: "bg-blue-100 text-blue-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  green: "bg-green-100 text-green-800",
};

const TopInstitutes = ({ institutes = sampleInstitutes, isLoading = false }: TopInstitutesProps) => {
  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200">
        <CardTitle>Top Performing Institutes</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="ml-3">
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-8 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {institutes.map((institute) => (
              <li key={institute.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn("flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center", colorMap[institute.color])}>
                      <span className="text-sm font-medium">{institute.initial}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{institute.name}</p>
                      <p className="text-xs text-gray-500">{institute.attendance}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    #{institute.rank}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-200">
        <Link href="/performance" className="text-sm font-medium text-primary hover:text-primary-dark w-full text-center">
          View full ranking
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TopInstitutes;
