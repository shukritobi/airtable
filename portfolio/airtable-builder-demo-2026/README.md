# Airtable Builder Demo: Operations CRM + Production Workflow

A compact demo showing how I would design, document, and automate a real Airtable operating system for a service business or media/production team.

This is not connected to a live Airtable base. It is a portfolio sample that demonstrates system thinking, Airtable schema design, automation logic, API integration patterns, and handover documentation.

## What this demo covers

- Airtable base architecture for clients, projects, tasks, assets, approvals, and invoices
- Status-driven workflow design for operations teams
- Automation patterns for notifications, CRM updates, and task follow-ups
- API-safe TypeScript examples for Airtable scripting and external sync jobs
- Documentation style that a non-technical team can use after handover

## Example use case

A creative, media, entertainment, or CPG team needs one Airtable system to manage:

1. Incoming clients or brands
2. Project briefs and scopes
3. Production tasks and deadlines
4. Asset review and approval
5. Team notifications
6. Simple reporting dashboards

## Suggested Airtable base tables

| Table | Purpose | Key fields |
| --- | --- | --- |
| Clients | Company or brand records | Name, industry, owner, status, HubSpot ID |
| Projects | Main work items | Project name, client, stage, budget, deadline |
| Tasks | Execution checklist | Task, project, assignee, due date, status |
| Assets | Creative/media files | Project, asset type, Frame.io URL, approval status |
| Approvals | Client/internal review | Asset, reviewer, decision, comments |
| Invoices | Billing tracker | Project, amount, due date, paid status |
| Automation Logs | Audit trail | Trigger, record ID, result, timestamp |

## Automation examples

- When a project stage changes to `Ready for Production`, generate a task checklist.
- When an asset is marked `Needs Review`, notify the project owner.
- When an approval is `Rejected`, create a revision task.
- When a project is marked `Complete`, generate an invoice tracking record.
- Nightly sync pushes selected project/client fields into a reporting layer.

## Files in this demo

- `docs/base-architecture.md` explains the Airtable base structure.
- `docs/automation-map.md` explains automation triggers and logic.
- `docs/handover-checklist.md` provides client handover notes.
- `src/airtableClient.ts` contains a typed Airtable API client.
- `src/syncProjects.ts` shows a safe external sync job.
- `src/webhookRouter.ts` shows webhook-style routing logic.
- `airtable-scripts/01-create-project-checklist.js` shows an Airtable automation script.
- `sample-data/projects.csv` includes example data.

## Why this matters

Good Airtable work is not just creating tables. It is making the system understandable, scalable, and safe for the team using it every day.

My approach is to build the base, document the logic, add lightweight automation, and leave the client with a system they can maintain.
