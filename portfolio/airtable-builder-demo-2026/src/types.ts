export type AirtableRecord<TFields> = {
  id: string;
  createdTime?: string;
  fields: TFields;
};

export type ProjectStage =
  | "Intake"
  | "Scoped"
  | "Ready for Production"
  | "In Production"
  | "Review"
  | "Complete"
  | "Archived";

export type ProjectFields = {
  "Project Name": string;
  "Client"?: string[];
  "Stage": ProjectStage;
  "Budget"?: number;
  "Deadline"?: string;
  "Project Owner"?: string;
  "Health"?: "Green" | "Amber" | "Red";
  "Scope Summary"?: string;
};

export type TaskFields = {
  "Task Name": string;
  "Project": string[];
  "Assignee"?: string;
  "Due Date"?: string;
  "Status": "Not Started" | "In Progress" | "Blocked" | "Done";
  "Priority": "Low" | "Normal" | "High" | "Urgent";
  "Task Type"?: "Admin" | "Design" | "Production" | "Review" | "Delivery";
};

export type AutomationLogFields = {
  "Trigger Name": string;
  "Source Table": string;
  "Source Record ID": string;
  "Result": "Success" | "Warning" | "Error";
  "Message": string;
};
