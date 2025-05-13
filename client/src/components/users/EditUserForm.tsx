import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface EditUserFormProps {
  user: User;
  onBack: () => void;
}

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  instituteId: z.number().optional(),
  active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const EditUserForm = ({ user, onBack }: EditUserFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get institutes list for dropdown
  const { data: institutes } = useQuery({
    queryKey: ["/api/institutes"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      instituteId: user.instituteId || undefined,
      active: user.active,
    },
  });

  // Update form when user prop changes
  useEffect(() => {
    form.reset({
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      instituteId: user.instituteId || undefined,
      active: user.active,
    });
  }, [form, user]);

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("PATCH", `/api/users/${user.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      
      toast({
        title: "Success",
        description: "User has been updated successfully",
      });
      
      onBack(); // Go back to the list view
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Users
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>Update user information for {user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="instituteAdmin">Institute Admin</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="accountant">Accountant</SelectItem>
                          <SelectItem value="user">Regular User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="instituteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign to Institute (Optional)</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)} 
                        value={field.value?.toString() || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select institute" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {institutes?.map((institute: any) => (
                            <SelectItem key={institute.id} value={institute.id.toString()}>
                              {institute.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>User Status</FormLabel>
                        <FormDescription>
                          {field.value ? "User is active" : "User is inactive"}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <CardFooter className="px-0 pb-0 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserForm;