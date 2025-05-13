import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { UserPlus, Settings, Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "user" | "settings" | "institute";
  title: string;
  description: string;
  time: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  isLoading?: boolean;
  className?: string;
}

// Sample data for the recent activities
const sampleActivities: Activity[] = [
  {
    id: "1",
    type: "user",
    title: "New admin added",
    description: "John Carter was added as an Institute Admin for Stellar Academy",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "settings",
    title: "Settings updated",
    description: "Academic year template was modified for all institutes",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "institute",
    title: "New institute onboarded",
    description: "Pathways International School was successfully added to the organization",
    time: "Yesterday",
  },
];

const RecentActivity = ({ activities = sampleActivities, isLoading = false, className }: RecentActivityProps) => {
  const [instituteFilter, setInstituteFilter] = useState("all");

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return (
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
            <UserPlus className="h-5 w-5" />
          </div>
        );
      case "settings":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <Settings className="h-5 w-5" />
          </div>
        );
      case "institute":
        return (
          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <Building className="h-5 w-5" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="px-6 py-5 border-b border-gray-200 flex-row justify-between items-center">
        <CardTitle>Recent Activity</CardTitle>
        <Select value={instituteFilter} onValueChange={setInstituteFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All institutes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All institutes</SelectItem>
            <SelectItem value="stellar">Stellar Academy</SelectItem>
            <SelectItem value="heritage">Heritage School</SelectItem>
            <SelectItem value="meridian">Meridian School</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{activity.title}</h3>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-200">
        <Link href="/activity" className="text-sm font-medium text-primary hover:text-primary-dark w-full text-center">
          View all activity
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentActivity;
