# ATC Practice Site

A CAP / TopSky inspired static practice app for Playwright fundamentals. It is not an aviation system and does not model real operational rules. It gives you a realistic-looking validation surface with stable locators, workflows, dynamic state, and evidence-style outputs.

## Open Locally

Open `index.html` directly in a browser, or serve the repo locally:

```sh
python3 -m http.server 4173
```

Then open:

```txt
http://127.0.0.1:4173/atc-practice/
```

## Playwright Practice Map

- Locators: headings, buttons, forms, table rows, status regions, dialogs, and `data-*` attributes.
- Assertions: selected callsign, clearance text, alert count, filtered table rows, dialog payloads, and status changes.
- User workflows: select a track, issue a clearance, acknowledge alerts, load coordination messages, pause/resume feed, export evidence.
- Timing: moving radar tracks, dynamic log timestamps, live regions, animated radar sweep, and event-driven UI updates.
- Test design: write one test per operational behavior, then refactor repeated actions into helper functions.

## Suggested Exercises

1. Verify the page loads with sector `NORD-17`, scenario `Morning Push`, and a connected session status.
2. Select `AFR108` from the radar and assert the detail panel updates to route `MERLU - NARAK`.
3. Issue a descend clearance to `FL310` and assert the clearance message, detail panel, and event log update.
4. Filter the flight list by `FL360` and assert only `BAW771` remains visible.
5. Inject a conflict, assert the new alert appears, then acknowledge it.
6. Pause the feed and assert the button text, `aria-pressed`, and session status change.
7. Load a coordination request, accept it, and assert it is removed from the queue.
8. Export the event log and assert the dialog summary and textarea include a recent action.

## Validation Mindset

For ATM/ATC practice, phrase tests as operational claims:

- "The controller can identify the selected aircraft."
- "A clearance action leaves visible evidence."
- "A safety alert can be acknowledged without clearing unrelated state."
- "Filters reduce traffic without changing underlying selected-track details."

That style will help you move from tutorial automation into validation work.
