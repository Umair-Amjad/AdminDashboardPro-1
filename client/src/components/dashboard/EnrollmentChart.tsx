import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";

interface EnrollmentChartProps {
  className?: string;
  isLoading?: boolean;
}

// Sample data for the chart
const data = [
  { month: 'Jan', primary: 3200, secondary: 2400, higher: 1200 },
  { month: 'Feb', primary: 3300, secondary: 2500, higher: 1300 },
  { month: 'Mar', primary: 3400, secondary: 2600, higher: 1400 },
  { month: 'Apr', primary: 3600, secondary: 2700, higher: 1500 },
  { month: 'May', primary: 3700, secondary: 2800, higher: 1600 },
  { month: 'Jun', primary: 3900, secondary: 2900, higher: 1700 },
  { month: 'Jul', primary: 4000, secondary: 3000, higher: 1800 },
  { month: 'Aug', primary: 4200, secondary: 3100, higher: 1900 },
  { month: 'Sep', primary: 4400, secondary: 3200, higher: 2000 },
  { month: 'Oct', primary: 4600, secondary: 3300, higher: 2100 },
  { month: 'Nov', primary: 4800, secondary: 3400, higher: 2200 },
  { month: 'Dec', primary: 5000, secondary: 3500, higher: 2300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center text-xs mb-1">
            <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-600">{entry.name}: </span>
            <span className="font-medium ml-1">{entry.value.toLocaleString()}</span>
          </div>
        ))}
        <div className="flex items-center text-xs font-medium mt-1 pt-1 border-t border-gray-200">
          <span className="text-gray-600">Total: </span>
          <span className="ml-1">
            {payload.reduce((sum: number, entry: any) => sum + entry.value, 0).toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const EnrollmentChart = ({ className, isLoading = false }: EnrollmentChartProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="px-6 py-5 border-b border-gray-200">
        <CardTitle>Enrollment Trends</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="w-full h-72">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={35} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="primary" 
                  name="Primary Schools"
                  stackId="1"
                  stroke="#4F46E5" 
                  fill="#4F46E5"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="secondary" 
                  name="Secondary Schools"
                  stackId="1"
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="higher" 
                  name="Higher Education"
                  stackId="1"
                  stroke="#F59E0B" 
                  fill="#F59E0B"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnrollmentChart;
