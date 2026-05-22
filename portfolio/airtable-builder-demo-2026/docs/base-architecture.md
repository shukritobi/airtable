# Base Architecture

## Design goal

Create a simple but scalable Airtable operating system for teams managing clients, projects, assets, approvals, and billing.

## Table relationships

```text
Clients
  -> Projects
      -> Tasks
      -> Assets
          -> Approvals
      -> Invoices
  -> Automation Logs
```

## Clients table

Recommended fields:

- Client Name: primary field
- Industry: single select
- Account Owner: collaborator
- Status: lead, active, paused, inactive
- HubSpot ID: text
- Last Contacted: date
- Notes: long text

## Projects table

Recommended fields:

- Project Name: primary field
- Client: linked record to Clients
- Stage: intake, scoped, ready for production, in production, review, complete, archived
- Budget: currency
- Deadline: date
- Project Owner: collaborator
- Health: green, amber, red
- Scope Summary: long text

## Tasks table

Recommended fields:

- Task Name: primary field
- Project: linked record to Projects
- Assignee: collaborator
- Due Date: date
- Status: not started, in progress, blocked, done
- Priority: low, normal, high, urgent
- Task Type: admin, design, production, review, delivery

## Assets table

Recommended fields:

- Asset Name: primary field
- Project: linked record to Projects
- Asset Type: video, image, copy, document, product shot, other
- Frame.io URL: URL
- Approval Status: draft, internal review, client review, approved, rejected
- Version: number

## Approvals table

Recommended fields:

- Approval ID: formula or autonumber
- Asset: linked record to Assets
- Reviewer: email or collaborator
- Decision: pending, approved, rejected
- Comments: long text
- Decision Date: date

## Invoices table

Recommended fields:

- Invoice ID: primary field
- Project: linked record to Projects
- Client: lookup from Projects
- Amount: currency
- Due Date: date
- Paid Status: unpaid, partial, paid, overdue

## Automation Logs table

Recommended fields:

- Log ID: autonumber
- Trigger Name: text
- Source Table: text
- Source Record ID: text
- Result: success, warning, error
- Message: long text
- Created Time: created time

## Interface suggestions

- Executive dashboard: project health, overdue tasks, revenue pipeline
- Project manager view: active projects, blocked tasks, upcoming deadlines
- Production view: asset list, review status, revision queue
- Finance view: completed projects, invoices due, overdue payments

## Build principles

- Keep formula fields readable.
- Use linked records instead of duplicated text where possible.
- Add automation logs early so future debugging is easier.
- Avoid too many single-use views.
- Create one clean interface per user role.
