# tutor_app

This repository contains a Python script that analyzes Nike's 2025 social media metrics and an interactive CBT (cognitive behavioural therapy) workbook for managing jealousy.

## Requirements

- Python 3
- pandas
- plotly

## Usage

Install dependencies:

```bash
pip install pandas plotly
```

Run the analysis:

```bash
python nike_social_media_analysis.py
```

The script prints a console report and generates two files:

- `nike_social_media_analysis_2025.csv`
- `nike_dashboard.html`

## CBT Jealousy Workbook

Open `kpt_workbook.html` in a browser to explore interactive worksheets and coping techniques for jealousy management. The page is self-contained and relies on CDN-hosted Tailwind CSS and Font Awesome for styling.

### Daily progress tracking

The right-hand sidebar contains a "Прогресс сегодня" card that tracks four exercise milestones and three journal milestones. Each tile fills its progress bar automatically and highlights individual checklist items when the corresponding activity is completed:

| Category | Action that increments the counter |
| --- | --- |
| 📝 Упражнения | • "СТОП! Я справляюсь" button in worksheet 1<br>• "✅ Упражнение выполнено" in the grounding technique<br>• Any "💾" save action in worksheets 2 or 3 (Проверка реальности / Правила жизни)<br>• Completing the 15-minute habituation timer in worksheet 4 |
| 📖 Записи | • Saving a mood tracker entry from the sidebar<br>• Saving any worksheet analysis (counts once, even if you save multiple sheets)<br>• Saving the management plan in worksheet 4 |

If all seven milestones are reached, a celebratory badge appears. The "🔄 Сброс" button resets the counters for a fresh practice session.

