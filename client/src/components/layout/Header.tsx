import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  User, 
  Search, 
  Settings, 
  LogOut,
  Check,
  AlertTriangle,
  X
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "success" | "warning" | "info";
};

const demoNotifications: Notification[] = [
  {
    id: "1",
    title: "New admin account requested",
    message: "Orbit Academy • 10 min ago",
    time: "10 min ago",
    read: false,
    type: "info"
  },
  {
    id: "2",
    title: "Billing issue for Stellar High School",
    message: "Finance Dept • 1 hour ago",
    time: "1 hour ago",
    read: false,
    type: "warning"
  },
  {
    id: "3",
    title: "Academic year settings updated",
    message: "System • 3 hours ago",
    time: "3 hours ago",
    read: true,
    type: "success"
  }
];

const Header = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read."
    });
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-white text-[10px]">
                    {unreadCount}
                  </Badge>
                )}
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-72 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex items-start p-3 cursor-default">
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          notification.type === 'success' 
                            ? 'bg-green-100 text-green-600' 
                            : notification.type === 'warning'
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-primary-100 text-primary-600'
                        }`}>
                          {notification.type === 'success' && <Check className="h-4 w-4" />}
                          {notification.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                          {notification.type === 'info' && <User className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">{notification.message}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-sm text-gray-500">No notifications</p>
                  </div>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-xs text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start p-2 space-x-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                  <p className="text-xs leading-none text-muted-foreground">Super Admin</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
