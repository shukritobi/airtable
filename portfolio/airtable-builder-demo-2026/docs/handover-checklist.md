# Handover checklist notes

These are the checks I would run before handing the base to someone else.

Airtable bases can look fine during build, but the real test is whether another person can use it without asking where everything is.

## Before handover

- Rename tables and fields so they are clear.
- Remove test records or keep them in a clearly marked demo view.
- Check required fields.
- Check that linked records are not broken.
- Check formulas, lookups, and rollups.
- Check that automations have simple names.
- Check that the log table is receiving records.
- Hide old views that are no longer useful.

## User walkthrough

I would walk the team through these flows:

1. Add a new client
2. Add a new project
3. Move a project into production
4. Check the generated tasks
5. Add or update an asset
6. Record an approval decision
7. See invoice follow-up
8. Check the dashboard or project health view

## Admin notes to leave behind

- What each table is for
- Which fields should not be edited manually
- Which automations are active
- What to check if an automation fails
- How project health is calculated
- What is still rough or pending

## First week after handover

- Watch how people actually use the base.
- Fix confusing field names.
- Remove views no one uses.
- Add filters where people keep asking the same question.
- Check if any automation created duplicates.

## Second pass

After the team has used the base for a while, I would review:

- Are the project stages still correct?
- Are task checklists too long or too short?
- Are approval notes easy to find?
- Is the invoice tracker useful enough?
- Should anything sync with another tool?

## Done enough for handover

I would consider the base ready when:

- A user can create a project without help.
- A project manager can see blocked or overdue work quickly.
- Review decisions are easy to find later.
- Completed projects do not disappear from billing follow-up.
- Admin can check automation logs without opening every automation.
