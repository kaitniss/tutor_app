# tutor_app

This repository now contains:

- A React single-file WOOP web app for Success-course facilitation (`web/src/WOOPSuccessApp.jsx`).
- A mini-textbook + Notion mapping guide (`docs/woop_success_course_guide.md`).
- The original Nike social media analysis script (`nike_social_media_analysis.py`).

## WOOP web app (single-file component)

Drop `web/src/WOOPSuccessApp.jsx` into a Vite/Next React project and render it from your app entry point.

### What the app includes

- Guided WOOP sequence: Wish → Outcome → Obstacle → Plan.
- Visualization timers for Outcome/Obstacle imagery pauses.
- Internal-obstacle prompting and observable When–Then planning.
- Success-course reflection prompts (12-month success/failure + meaning/feelings).
- Facilitation script panel + preloaded examples.
- Notion markdown export and printable WOOP card.

## Notion implementation

Follow `docs/woop_success_course_guide.md` to create a matching Notion database and templates.

## Original Nike analysis script

### Requirements

- Python 3
- pandas
- plotly

### Usage

Install dependencies:

```bash
pip install pandas plotly
```

Run the analysis:

```bash
python nike_social_media_analysis.py
```

The script prints a console report and generates:

- `nike_social_media_analysis_2025.csv`
- `nike_dashboard.html`
