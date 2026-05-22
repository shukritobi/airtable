# Airtable builder demo: ops CRM + production tracker

This is a small Airtable build example for a common workflow: clients, projects, tasks, assets, reviews, and invoice follow-up.

I am keeping the example simple on purpose. The point is to show the thinking behind the base structure, not to overcomplicate it with too many automations.

## Working scenario

A small team needs one Airtable base to track:

1. clients
2. active projects
3. production tasks
4. files or deliverables
5. approvals and revision notes
6. invoice follow-up
7. basic reporting

Before building the actual base, I would usually map the tables first, then decide what should be linked records, formulas, lookups, rollups, or automation triggers.

## Tables I would start with

| Table | Why it exists | Notes |
| --- | --- | --- |
| Clients | One record per company or brand | Keep account info here instead of repeating it everywhere |
| Projects | Main job or campaign | This is the center of the workflow |
| Tasks | Production and admin work | Some tasks can be created from a checklist |
| Assets | Files or deliverables that need review | Can link to Drive, Dropbox, Frame.io, or similar tools |
| Approvals | Review decisions and comments | Keeps decisions easier to track later |
| Invoices | Billing follow-up | Simple tracker, not a full accounting setup |
| Automation Logs | Notes from scripts and automations | Useful when something does not fire properly |

## Automations to test first

- When a project is marked `Ready for Production`, create the starting task checklist.
- When an asset moves to `Client Review`, create or update an approval record.
- When an approval is rejected, create a revision task with the comments.
- When a project is complete, create an invoice follow-up record.
- Run a scheduled check to mark projects as green, amber, or red.

## Files here

- `docs/base-architecture.md`: table and field notes
- `docs/automation-map.md`: automation planning notes
- `docs/handover-checklist.md`: checks before giving the base to another user
- `airtable-scripts/01-create-project-checklist.js`: Airtable automation script example
- `src/airtableClient.ts`: small TypeScript Airtable API wrapper
- `src/syncProjects.ts`: scheduled sync example
- `src/webhookRouter.ts`: webhook-style task creation example
- `sample-data/projects.csv`: sample project data

## Status

This is a working demo/spec. The next step would be to build the base in Airtable, test the scripts on dummy records, and adjust the fields after seeing how the workflow behaves with real data.
