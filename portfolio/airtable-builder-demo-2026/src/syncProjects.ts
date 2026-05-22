import "dotenv/config";
import { AirtableClient } from "./airtableClient.js";
import type { AutomationLogFields, ProjectFields } from "./types.js";

function calculateHealth(project: ProjectFields): "Green" | "Amber" | "Red" {
  if (!project.Deadline) return "Amber";

  const deadline = new Date(project.Deadline);
  const now = new Date();
  const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / 86_400_000);

  if (project.Stage === "Complete") return "Green";
  if (daysRemaining < 0) return "Red";
  if (daysRemaining <= 7) return "Amber";
  return "Green";
}

async function main() {
  const airtable = new AirtableClient();
  const projects = await airtable.listRecords<ProjectFields>("Projects", 50);

  const updates = projects.records.map((record) => ({
    id: record.id,
    fields: {
      Health: calculateHealth(record.fields),
    },
  }));

  await airtable.updateRecords<ProjectFields>("Projects", updates);

  const log: AutomationLogFields = {
    "Trigger Name": "Nightly Project Health Sync",
    "Source Table": "Projects",
    "Source Record ID": "scheduled-job",
    "Result": "Success",
    "Message": `Processed ${updates.length} project records.`,
  };

  await airtable.createRecords<AutomationLogFields>("Automation Logs", [{ fields: log }]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
