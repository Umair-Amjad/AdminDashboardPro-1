import { useState } from "react";
import { Plus, Copy, Trash2, Pencil } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AcademicConfig = () => {
  const [activeTab, setActiveTab] = useState("academic-years");
  
  // Sample academic year templates
  const academicYearTemplates = [
    {
      id: 1,
      name: "Standard Academic Year",
      isDefault: true,
      terms: [
        { id: 1, name: "Term 1", start: "August", end: "December", weeks: 16 },
        { id: 2, name: "Term 2", start: "January", end: "May", weeks: 16 },
        { id: 3, name: "Summer Term", start: "June", end: "July", weeks: 8, optional: true },
      ],
      breaks: [
        { id: 1, name: "Winter Break", start: "December 15", end: "January 5" },
        { id: 2, name: "Spring Break", start: "March 10", end: "March 20" },
        { id: 3, name: "Summer Break", start: "May 25", end: "August 15" },
      ]
    },
    {
      id: 2,
      name: "Semester System",
      isDefault: false,
      terms: [
        { id: 1, name: "Fall Semester", start: "September", end: "December", weeks: 15 },
        { id: 2, name: "Spring Semester", start: "January", end: "May", weeks: 15 },
      ],
      breaks: [
        { id: 1, name: "Winter Break", start: "December 20", end: "January 10" },
        { id: 2, name: "Spring Break", start: "March 15", end: "March 25" },
      ]
    },
    {
      id: 3,
      name: "Quarterly System",
      isDefault: false,
      terms: [
        { id: 1, name: "Quarter 1", start: "August", end: "October", weeks: 10 },
        { id: 2, name: "Quarter 2", start: "November", end: "January", weeks: 10 },
        { id: 3, name: "Quarter 3", start: "February", end: "April", weeks: 10 },
        { id: 4, name: "Quarter 4", start: "May", end: "July", weeks: 10 },
      ],
      breaks: [
        { id: 1, name: "Winter Break", start: "December 21", end: "January 3" },
        { id: 2, name: "Spring Break", start: "April 1", end: "April 7" },
        { id: 3, name: "Summer Break", start: "July 20", end: "August 10" },
      ]
    }
  ];
  
  // Sample grade structures
  const gradeStructures = [
    {
      id: 1,
      name: "K-12 Structure",
      isDefault: true,
      grades: [
        { id: 1, name: "Kindergarten", code: "K", ageRange: "5-6" },
        { id: 2, name: "1st Grade", code: "1", ageRange: "6-7" },
        { id: 3, name: "2nd Grade", code: "2", ageRange: "7-8" },
        // ... other grades
        { id: 13, name: "12th Grade", code: "12", ageRange: "17-18" },
      ]
    },
    {
      id: 2,
      name: "Higher Education Structure",
      isDefault: false,
      grades: [
        { id: 1, name: "Freshman Year", code: "F", ageRange: "18-19" },
        { id: 2, name: "Sophomore Year", code: "S", ageRange: "19-20" },
        { id: 3, name: "Junior Year", code: "J", ageRange: "20-21" },
        { id: 4, name: "Senior Year", code: "Sr", ageRange: "21-22" },
      ]
    }
  ];
  
  // Sample subject templates
  const subjectTemplates = [
    {
      id: 1,
      name: "Standard Core Subjects",
      isDefault: true,
      subjects: [
        { id: 1, name: "Mathematics", code: "MATH", isCore: true },
        { id: 2, name: "English Literature", code: "ENG", isCore: true },
        { id: 3, name: "Science", code: "SCI", isCore: true },
        { id: 4, name: "Social Studies", code: "SOC", isCore: true },
        { id: 5, name: "Physical Education", code: "PE", isCore: false },
        { id: 6, name: "Arts", code: "ART", isCore: false },
        { id: 7, name: "Music", code: "MUS", isCore: false },
      ]
    },
    {
      id: 2,
      name: "STEM Focus",
      isDefault: false,
      subjects: [
        { id: 1, name: "Advanced Mathematics", code: "AMATH", isCore: true },
        { id: 2, name: "Physics", code: "PHYS", isCore: true },
        { id: 3, name: "Chemistry", code: "CHEM", isCore: true },
        { id: 4, name: "Biology", code: "BIO", isCore: true },
        { id: 5, name: "Computer Science", code: "CS", isCore: true },
        { id: 6, name: "Engineering", code: "ENG", isCore: true },
        { id: 7, name: "English", code: "ENGL", isCore: false },
        { id: 8, name: "Social Studies", code: "SOC", isCore: false },
      ]
    }
  ];
  
  // Sample examination types
  const examTypes = [
    {
      id: 1,
      name: "Standard Assessment",
      isDefault: true,
      types: [
        { id: 1, name: "Quizzes", weight: 10, frequency: "Weekly" },
        { id: 2, name: "Mid-Term Exams", weight: 30, frequency: "Once per term" },
        { id: 3, name: "Final Exams", weight: 40, frequency: "End of term" },
        { id: 4, name: "Assignments", weight: 15, frequency: "Bi-weekly" },
        { id: 5, name: "Class Participation", weight: 5, frequency: "Daily" },
      ]
    },
    {
      id: 2,
      name: "Continuous Assessment",
      isDefault: false,
      types: [
        { id: 1, name: "Projects", weight: 40, frequency: "Monthly" },
        { id: 2, name: "Presentations", weight: 25, frequency: "Bi-monthly" },
        { id: 3, name: "Written Assignments", weight: 25, frequency: "Weekly" },
        { id: 4, name: "Participation", weight: 10, frequency: "Daily" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Academic Configuration"
          description="Manage academic settings across all institutes."
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Template
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="academic-years">Academic Years</TabsTrigger>
          <TabsTrigger value="grades">Grade Structure</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="exams">Examination Types</TabsTrigger>
        </TabsList>
        
        {/* Academic Years Tab */}
        <TabsContent value="academic-years" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {academicYearTemplates.map(template => (
              <Card key={template.id} className={template.isDefault ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>Academic Year Structure</CardDescription>
                    </div>
                    {template.isDefault && <Badge className="bg-primary ml-2">Default</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Terms</h4>
                      <ul className="space-y-1">
                        {template.terms.map(term => (
                          <li key={term.id} className="text-sm flex items-center justify-between">
                            <span className="text-gray-700">{term.name}</span>
                            <span className="text-gray-500 text-xs">{term.start} - {term.end}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Breaks</h4>
                      <ul className="space-y-1">
                        {template.breaks.map(break_ => (
                          <li key={break_.id} className="text-sm flex items-center justify-between">
                            <span className="text-gray-700">{break_.name}</span>
                            <span className="text-gray-500 text-xs">{break_.start} - {break_.end}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`default-${template.id}`} className="text-xs text-gray-500">Make Default</Label>
                    <Switch id={`default-${template.id}`} checked={template.isDefault} disabled={template.isDefault} />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" disabled={template.isDefault}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Grade Structure Tab */}
        <TabsContent value="grades" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {gradeStructures.map(structure => (
              <Card key={structure.id} className={structure.isDefault ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{structure.name}</CardTitle>
                      <CardDescription>Grade/Year Structure</CardDescription>
                    </div>
                    {structure.isDefault && <Badge className="bg-primary ml-2">Default</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium mb-2">Grades</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {structure.grades.slice(0, 6).map(grade => (
                        <div key={grade.id} className="flex justify-between items-center border rounded-md p-2">
                          <div>
                            <p className="text-sm font-medium">{grade.name}</p>
                            <p className="text-xs text-gray-500">Age: {grade.ageRange}</p>
                          </div>
                          <Badge variant="outline">{grade.code}</Badge>
                        </div>
                      ))}
                    </div>
                    {structure.grades.length > 6 && (
                      <p className="text-xs text-center text-gray-500 mt-2">
                        +{structure.grades.length - 6} more grades
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`default-grade-${structure.id}`} className="text-xs text-gray-500">Make Default</Label>
                    <Switch id={`default-grade-${structure.id}`} checked={structure.isDefault} disabled={structure.isDefault} />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" disabled={structure.isDefault}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {subjectTemplates.map(template => (
              <Card key={template.id} className={template.isDefault ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>Subject Template</CardDescription>
                    </div>
                    {template.isDefault && <Badge className="bg-primary ml-2">Default</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Core Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.subjects.filter(s => s.isCore).map(subject => (
                          <Badge key={subject.id} variant="secondary">
                            {subject.name} ({subject.code})
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Optional Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.subjects.filter(s => !s.isCore).map(subject => (
                          <Badge key={subject.id} variant="outline">
                            {subject.name} ({subject.code})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`default-subject-${template.id}`} className="text-xs text-gray-500">Make Default</Label>
                    <Switch id={`default-subject-${template.id}`} checked={template.isDefault} disabled={template.isDefault} />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" disabled={template.isDefault}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Examination Types Tab */}
        <TabsContent value="exams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {examTypes.map(type => (
              <Card key={type.id} className={type.isDefault ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{type.name}</CardTitle>
                      <CardDescription>Exam Structure</CardDescription>
                    </div>
                    {type.isDefault && <Badge className="bg-primary ml-2">Default</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium mb-2">Assessment Types</h4>
                    <table className="w-full text-sm">
                      <thead className="text-xs text-gray-500">
                        <tr>
                          <th className="text-left pb-2">Assessment</th>
                          <th className="text-right pb-2">Weight</th>
                          <th className="text-right pb-2">Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.types.map(assessment => (
                          <tr key={assessment.id}>
                            <td className="py-1">{assessment.name}</td>
                            <td className="text-right py-1">{assessment.weight}%</td>
                            <td className="text-right py-1 text-gray-500 text-xs">{assessment.frequency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`default-exam-${type.id}`} className="text-xs text-gray-500">Make Default</Label>
                    <Switch id={`default-exam-${type.id}`} checked={type.isDefault} disabled={type.isDefault} />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" disabled={type.isDefault}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicConfig;
