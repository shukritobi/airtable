// Airtable Automation Script
// Trigger: When a Projects record changes stage to "Ready for Production"
// Input variable expected: projectRecordId

const config = input.config();
const projectRecordId = config.projectRecordId;

const projectsTable = base.getTable("Projects");
const tasksTable = base.getTable("Tasks");
const logsTable = base.getTable("Automation Logs");

const project = await projectsTable.selectRecordAsync(projectRecordId);

if (!project) {
  throw new Error(`Project record not found: ${projectRecordId}`);
}

const stage = project.getCellValueAsString("Stage");

if (stage !== "Ready for Production") {
  output.set("status", "skipped");
  output.set("reason", `Stage is ${stage}`);
  return;
}

const checklist = [
  "Confirm brief and deliverables",
  "Create production schedule",
  "Prepare working files/assets",
  "Internal review",
  "Client review",
  "Final delivery",
];

const taskRecords = checklist.map((taskName) => ({
  fields: {
    "Task Name": taskName,
    "Project": [{ id: projectRecordId }],
    "Status": { name: "Not Started" },
    "Priority": { name: taskName.includes("Client") ? "High" : "Normal" },
    "Task Type": { name: taskName.includes("review") ? "Review" : "Production" },
  },
}));

await tasksTable.createRecordsAsync(taskRecords);

await logsTable.createRecordAsync({
  "Trigger Name": "Project Stage Changed",
  "Source Table": "Projects",
  "Source Record ID": projectRecordId,
  "Result": { name: "Success" },
  "Message": `Created ${taskRecords.length} checklist tasks.`,
});

output.set("status", "success");
output.set("tasksCreated", taskRecords.length);
