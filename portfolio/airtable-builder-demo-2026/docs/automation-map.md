# Automation Map

## Automation 1: Create project task checklist

Trigger:

- Table: Projects
- Condition: Stage changes to `Ready for Production`

Action:

- Create linked task records from a standard checklist.
- Add due dates relative to project deadline.
- Log the created tasks in Automation Logs.

Reason:

This prevents project managers from manually creating the same task set again and again.

## Automation 2: Asset ready for review

Trigger:

- Table: Assets
- Condition: Approval Status changes to `Client Review`

Action:

- Send notification to project owner.
- Add review deadline.
- Create Approval record if missing.

Reason:

Keeps review requests trackable instead of buried in messages.

## Automation 3: Rejected approval creates revision task

Trigger:

- Table: Approvals
- Condition: Decision changes to `Rejected`

Action:

- Create task linked to the same project.
- Copy reviewer comments into task notes.
- Set priority to high.

Reason:

Rejected approvals should immediately become actionable production work.

## Automation 4: Completed project creates invoice tracker

Trigger:

- Table: Projects
- Condition: Stage changes to `Complete`

Action:

- Create invoice record.
- Pull client and budget fields from project.
- Set paid status to unpaid.

Reason:

Reduces missed billing after project delivery.

## Automation 5: Nightly reporting sync

Trigger:

- Scheduled job once per night.

Action:

- Read active projects.
- Calculate health based on deadline and stage.
- Update dashboard/reporting fields.
- Log sync results.

Reason:

Keeps dashboards current without manual checking.

## QA checks

Before enabling automations:

- Test with duplicate project records.
- Test records with missing deadline.
- Test rejected approval with missing project link.
- Confirm automation log records are created.
- Confirm no automation loops are triggered.
