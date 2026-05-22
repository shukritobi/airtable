# Base architecture notes

These are the first-pass notes I would use before building the Airtable base.

The main thing I want to avoid is turning Airtable into a messy spreadsheet with too many duplicated fields. The base should be easy to understand, easy to filter, and easy to hand over.

## Relationship sketch

```text
Clients
  -> Projects
      -> Tasks
      -> Assets
          -> Approvals
      -> Invoices
  -> Automation Logs
```

Projects are the center of the base. Most tables link back to Projects because that is usually how the team will search, filter, and report the work.

## Clients

Use this table for company / brand level info.

Fields I would start with:

- Client Name
- Industry
- Account Owner
- Status
- HubSpot ID or external CRM ID
- Last Contacted
- Notes

Keep this table clean. If the same client has 10 projects, the client details should not be copied into all 10 project records.

## Projects

This is the main workflow table.

Fields I would start with:

- Project Name
- Client
- Stage
- Budget
- Deadline
- Project Owner
- Health
- Scope Summary

Possible stages:

- Intake
- Scoped
- Ready for Production
- In Production
- Review
- Complete
- Archived

The stage field should drive most of the views and automations.

## Tasks

Tasks are the actual work items.

Fields I would start with:

- Task Name
- Project
- Assignee
- Due Date
- Status
- Priority
- Task Type

I would not overbuild task management in the first version. Start with the few task types the team really needs, then add detail only after testing.

## Assets

Use this for files, creative output, or deliverables that need review.

Fields I would start with:

- Asset Name
- Project
- Asset Type
- External File URL
- Approval Status
- Version

The external file URL could point to Drive, Dropbox, Frame.io, or any file review tool the team already uses.

## Approvals

This keeps review decisions separate from the asset itself.

Fields I would start with:

- Approval ID
- Asset
- Reviewer
- Decision
- Comments
- Decision Date

I prefer this because approval history can grow messy if every decision is stored inside the asset record only.

## Invoices

This is only for follow-up, not full accounting.

Fields I would start with:

- Invoice ID
- Project
- Client lookup
- Amount
- Due Date
- Paid Status

For a real build, I would confirm whether invoices are created manually, exported to accounting software, or synced from another system.

## Automation Logs

This table is for debugging.

Fields I would start with:

- Trigger Name
- Source Table
- Source Record ID
- Result
- Message
- Created Time

I like adding this early because Airtable automations can fail quietly, and the client usually needs somewhere to check what happened.

## Views / interfaces to build later

- Project manager view: active projects, overdue tasks, blocked tasks
- Production view: task checklist and asset review queue
- Finance view: complete projects and unpaid invoices
- Owner view: project health and upcoming deadlines

## Notes to confirm during build

- Which user roles actually need Airtable access?
- Are assets reviewed in Airtable or only linked from another tool?
- Should task checklists be standard or different by project type?
- What should count as a risky project?
- Is billing handled inside Airtable or just tracked there?
