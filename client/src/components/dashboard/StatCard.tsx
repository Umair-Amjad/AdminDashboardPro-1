import { ReactNode } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  link?: {
    href: string;
    label: string;
  };
  change?: {
    type: "increase" | "decrease" | "neutral";
    value: string;
  };
  info?: string;
  color?: "primary" | "secondary" | "amber" | "green" | "red";
  isLoading?: boolean;
}

const colorMap = {
  primary: {
    bgLight: "bg-primary-100",
    text: "text-primary-600",
    link: "text-primary-600 hover:text-primary-700",
  },
  secondary: {
    bgLight: "bg-secondary-100",
    text: "text-secondary-500",
    link: "text-primary-600 hover:text-primary-700",
  },
  amber: {
    bgLight: "bg-amber-100",
    text: "text-amber-600",
    link: "text-primary-600 hover:text-primary-700",
  },
  green: {
    bgLight: "bg-green-100",
    text: "text-green-600",
    link: "text-primary-600 hover:text-primary-700",
  },
  red: {
    bgLight: "bg-red-100",
    text: "text-red-600",
    link: "text-primary-600 hover:text-primary-700",
  },
};

const StatCard = ({
  title,
  value,
  icon,
  link,
  change,
  info,
  color = "primary",
  isLoading = false,
}: StatCardProps) => {
  const colors = colorMap[color];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${colors.bgLight} rounded-md p-3`}>
              <div className={colors.text}>{icon}</div>
            </div>
            <div className="ml-5 w-0 flex-1">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-7 w-16" />
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
                  <p className="text-lg font-semibold text-gray-900">{value}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm flex justify-between w-full">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
            </>
          ) : (
            <>
              {link && (
                <div className={`font-medium ${colors.link}`}>
                  <Link href={link.href}>{link.label}</Link>
                </div>
              )}
              {change && (
                <span
                  className={cn(
                    "font-medium flex items-center",
                    change.type === "increase" && "text-green-600",
                    change.type === "decrease" && "text-red-600"
                  )}
                >
                  {change.type === "increase" && <ArrowUp className="mr-1 h-3 w-3" />}
                  {change.type === "decrease" && <ArrowDown className="mr-1 h-3 w-3" />}
                  {change.value}
                </span>
              )}
              {info && <span className="text-gray-600 font-medium flex items-center">{info}</span>}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default StatCard;
