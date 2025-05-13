import { useState } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  Building,
  Users,
  BarChart2,
  MessageSquare,
  Lock,
  GraduationCap,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
  { name: "Institutes", href: "/institutes", icon: <Building className="h-5 w-5" /> },
  { name: "Users", href: "/users", icon: <Users className="h-5 w-5" /> },
  { name: "Reports", href: "/reports", icon: <BarChart2 className="h-5 w-5" /> },
  { name: "Communication", href: "/communication", icon: <MessageSquare className="h-5 w-5" /> },
  { name: "Permissions", href: "/permissions", icon: <Lock className="h-5 w-5" /> },
  { name: "Academic Config", href: "/academic", icon: <GraduationCap className="h-5 w-5" /> },
  { name: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
];

const Sidebar = () => {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
      data-collapsed={collapsed}
    >
      {/* Organization Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "space-x-3")}>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            OG
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold">Orbit Group</h1>
              <p className="text-xs text-gray-400">Organization Admin</p>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("text-gray-400 hover:text-white", collapsed && "absolute right-0 mr-2")}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Navigation */}
      <nav className="mt-5 px-2 space-y-1 flex-1">
        {navigation.map((item) => {
          const isActive = location === item.href || 
                          (item.href === "/dashboard" && location === "/");
          
          return collapsed ? (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-md text-sm font-medium",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Help & Support */}
      <div className="border-t border-gray-800 p-4">
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10 justify-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
              >
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help & Support</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Help & Support</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-3"
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            <span>Help & Support</span>
          </Button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
