# Automation map notes

These are the first automations I would test for this base.

I would start small. Airtable automations are useful, but they can also make a base harder to debug if too many things happen in the background.

## 1. Create the project checklist

Trigger:

- Table: Projects
- When: Stage changes to `Ready for Production`

Action:

- Create the standard production tasks
- Link each task to the project
- Set the basic status and priority
- Write a row in Automation Logs

Why:

Every project usually starts with the same few steps. Creating those tasks automatically removes repeated setup work.

Checks:

- Should all projects use the same checklist?
- Should deadlines be based on project due date or project start date?
- How do we stop duplicate tasks if the stage is changed twice?

## 2. Asset moves into review

Trigger:

- Table: Assets
- When: Approval Status changes to `Client Review`

Action:

- Create or update an approval record
- Link the approval to the asset
- Add reviewer notes if they already exist

Why:

Reviews are easier to track when the decision is stored as a record instead of being hidden in comments or email.

Checks:

- Who should be the reviewer?
- Does review happen inside Airtable or in another tool?
- Is a notification needed?

## 3. Rejected approval creates revision task

Trigger:

- Table: Approvals
- When: Decision changes to `Rejected`

Action:

- Create a revision task
- Link it to the project
- Copy the comments into the task notes
- Set priority to high

Why:

A rejected item should become work for someone, not just a status change.

Checks:

- What if the comments are empty?
- Should this go to the project owner or production person?
- Should one rejection create one task or multiple tasks?

## 4. Complete project creates invoice follow-up

Trigger:

- Table: Projects
- When: Stage changes to `Complete`

Action:

- Create an invoice follow-up record
- Link it to the project
- Pull basic client and amount fields
- Set status to unpaid

Why:

This keeps billing follow-up visible after delivery.

Checks:

- Is the project budget the same as invoice amount?
- Are deposits needed?
- Is this only a tracker or does it need to sync elsewhere?

## 5. Daily project health check

Trigger:

- Scheduled once a day

Action:

- Read active projects
- Compare stage and deadline
- Update health field
- Log the number of records checked

Why:

Project health should not rely only on someone remembering to update it.

Checks:

- What counts as red, amber, or green?
- Should blocked tasks affect health?
- Should waiting for review affect health?

## QA list

Before turning on any automation:

- Test missing deadlines
- Test duplicate project names
- Test rejected approvals with no comments
- Test changing the same stage twice
- Check that duplicate tasks are not created
- Check the log table after every run
