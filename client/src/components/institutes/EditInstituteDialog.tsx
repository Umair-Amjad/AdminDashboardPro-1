import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { Institute } from "@shared/schema";

interface EditInstituteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  institute: Institute | null;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  type: z.string().min(1, { message: "Please select an institute type." }),
  typeDetail: z.string().optional(),
  logoInitials: z
    .string()
    .min(1, { message: "Logo initials are required." })
    .max(3, { message: "Maximum 3 characters allowed." }),
  logoColor: z.string().min(1, { message: "Please select a logo color." }),
  status: z.string().min(1, { message: "Please select a status." }),
});

type FormValues = z.infer<typeof formSchema>;

const EditInstituteDialog = ({ open, onOpenChange, institute }: EditInstituteDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "",
      typeDetail: "",
      logoInitials: "",
      logoColor: "blue",
      status: "active",
    },
  });
  
  // Update form when institute changes
  useEffect(() => {
    if (institute) {
      form.reset({
        name: institute.name,
        email: institute.email,
        type: institute.type,
        typeDetail: institute.typeDetail || "",
        logoInitials: institute.logoInitials,
        logoColor: institute.logoColor,
        status: institute.status,
      });
    }
  }, [institute, form]);

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!institute) return null;
      return await apiRequest("PUT", `/api/institutes/${institute.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/institutes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      
      toast({
        title: "Institute Updated",
        description: "The institute has been successfully updated.",
      });
      
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error updating institute:", error);
      toast({
        title: "Error",
        description: "Failed to update the institute. Please try again.",
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

  // Update logoInitials when name changes
  const watchName = form.watch("name");
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Institute</DialogTitle>
          <DialogDescription>
            Update the institute details. Fill in the required fields below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Stellar Academy" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        form.setValue("logoInitials", getInitials(e.target.value));
                      }}
                    />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. contact@stellar.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="School">School</SelectItem>
                        <SelectItem value="College">College</SelectItem>
                        <SelectItem value="University">University</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="typeDetail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type Detail (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. K-12, Higher Education" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="logoInitials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo Initials</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. SA" 
                        maxLength={3} 
                        {...field} 
                        value={field.value.toUpperCase()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo Color</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="amber">Amber</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="gray">Gray</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Institute"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInstituteDialog;