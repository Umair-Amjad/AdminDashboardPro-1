import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import TopInstitutes from "@/components/dashboard/TopInstitutes";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { School, Users, GraduationCap, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: topInstitutes, isLoading: institutesLoading } = useQuery({
    queryKey: ["/api/dashboard/top-institutes"],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/dashboard/recent-activities"],
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back, Sarah. Here's what's happening across your organization."
      />

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Institutes"
          value={stats?.institutes || "12"}
          icon={<School className="h-5 w-5" />}
          change={{ type: "increase", value: "2 new this month" }}
          link={{ href: "/institutes", label: "View all institutes" }}
          color="primary"
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Users"
          value={stats?.users || "8,294"}
          icon={<Users className="h-5 w-5" />}
          info="146 admins"
          link={{ href: "/users", label: "View all users" }}
          color="secondary"
          isLoading={statsLoading}
        />
        <StatCard
          title="Enrollment Rate"
          value={stats?.enrollmentRate || "92.7%"}
          icon={<GraduationCap className="h-5 w-5" />}
          change={{ type: "increase", value: "4.2% increase" }}
          link={{ href: "/enrollment", label: "View details" }}
          color="amber"
          isLoading={statsLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <EnrollmentChart className="lg:col-span-2" isLoading={statsLoading} />
        <TopInstitutes institutes={topInstitutes} isLoading={institutesLoading} />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RecentActivity activities={activities} isLoading={activitiesLoading} className="lg:col-span-2" />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
