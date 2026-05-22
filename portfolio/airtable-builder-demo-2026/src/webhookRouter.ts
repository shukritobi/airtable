import type { AutomationLogFields, ProjectFields, TaskFields } from "./types.js";
import { AirtableClient } from "./airtableClient.js";

const productionChecklist = [
  "Confirm brief and deliverables",
  "Create production schedule",
  "Prepare working files/assets",
  "Internal review",
  "Client review",
  "Final delivery",
];

export async function handleProjectStageChanged(projectId: string, project: ProjectFields) {
  const airtable = new AirtableClient();

  if (project.Stage !== "Ready for Production") {
    return { skipped: true, reason: "Project is not ready for production." };
  }

  const taskRecords = productionChecklist.map((taskName): { fields: TaskFields } => ({
    fields: {
      "Task Name": taskName,
      "Project": [projectId],
      "Status": "Not Started",
      "Priority": taskName.includes("Client") ? "High" : "Normal",
      "Task Type": taskName.includes("review") ? "Review" : "Production",
    },
  }));

  await airtable.createRecords<TaskFields>("Tasks", taskRecords);

  const log: AutomationLogFields = {
    "Trigger Name": "Project Stage Changed",
    "Source Table": "Projects",
    "Source Record ID": projectId,
    "Result": "Success",
    "Message": `Created ${taskRecords.length} production checklist tasks.`,
  };

  await airtable.createRecords<AutomationLogFields>("Automation Logs", [{ fields: log }]);

  return { skipped: false, tasksCreated: taskRecords.length };
}
