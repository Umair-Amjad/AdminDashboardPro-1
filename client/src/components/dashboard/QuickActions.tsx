import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Plus, UserCog, Megaphone, FileText } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      id: "add-institute",
      icon: <Plus className="h-5 w-5" />,
      title: "Add New Institute",
      description: "Onboard a new school or college",
      href: "/institutes/new",
      bgColor: "bg-primary-100",
      textColor: "text-primary-600",
    },
    {
      id: "add-admin",
      icon: <UserCog className="h-5 w-5" />,
      title: "Create Admin Account",
      description: "Add institute admin or other roles",
      href: "/users/new",
      bgColor: "bg-secondary-100",
      textColor: "text-secondary-500",
    },
    {
      id: "announcements",
      icon: <Megaphone className="h-5 w-5" />,
      title: "Send Announcement",
      description: "Broadcast message to all institutes",
      href: "/communication/new",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
    {
      id: "generate-report",
      icon: <FileText className="h-5 w-5" />,
      title: "Generate Report",
      description: "Create custom organization reports",
      href: "/reports/new",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-3">
          {actions.map((action) => (
            <li key={action.id}>
              <div className="flex items-center p-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-150 cursor-pointer" onClick={() => window.location.href = action.href}>
                <div className={`flex-shrink-0 h-10 w-10 rounded-full ${action.bgColor} flex items-center justify-center`}>
                  <div className={action.textColor}>{action.icon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
