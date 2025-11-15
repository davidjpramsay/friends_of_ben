# Friends of Ben - Agent Notes

## Project Snapshot
- Goal: modernize the classic Times Tables practice flow for addition (Weeks 1-6) and subtraction (Weeks 1-8) using the reference program outlines.
- Tech: vanilla HTML/CSS/JS with a lightweight D3 grid acting as the adaptive scoreboard.
- Entry points: `index.html` (UI scaffold), `assets/styles/main.css` (design system + layout), `assets/scripts/app.js` (all logic, data, and D3 hooks).

## Gameplay Flow
1. Hero buttons flip between addition/subtraction menus.
2. Each week card defines a fact generator (`buildFacts` functions inside `app.js`).
3. Pressing "Begin Practice" seeds `state.facts` with that week's problems, builds the tracker array, and renders the scoreboard grid via D3.
4. Tracker weights mirror the timestables app: correct answers lower the weight, mistakes/timeouts add weight, and weighted random selection drives the next question.
5. When every tile cools to zero the UI locks, celebrates mastery, and prompts a new selection.

## Extending Smarts
- Adding a new week: drop an entry into `additionWeeks` or `subtractionWeeks` with an id, title, focus line, description, and `buildFacts` callback. Keep the facts small-digit (<=20) and return an array shaped like `{prompt, answer, a, b, operator}`.
- Fact helpers live at the top of `app.js` (`buildAddWithFixed`, `buildPairsThatMakeTen`, etc.). Spin up new helpers there so every generator stays declarative.
- Scoreboard colors read from CSS variables (`--score-good`, `--score-learning`, `--score-retry`). Update the palette in `main.css` and the board changes automatically.
- Timer values come from the select dropdown; altering the options or default limit is just HTML edits.

## Testing & Verification
- Static stack: open `index.html` in any browser-no bundler required.
- Sanity checklist after edits:
  1. Switch between modes and ensure week cards + summary update.
  2. Start a week, answer correct/incorrect, confirm scoreboard colors respond.
  3. Let the timer expire and verify the fact weight escalates (tile reddens).
  4. Finish all facts (use dev tools to shorten arrays if needed) to confirm the completion state.

## Future Ideas
- Persist tracker data to `localStorage` to keep streaks between sessions.
- Add character art or audio cues per week to lean into the "Friends of Ben" story.
- Layer in reporting (per-week accuracy, average time per fact) before/after completion.
