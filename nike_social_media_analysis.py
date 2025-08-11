import pandas as pd
import plotly.graph_objects as go
from plotly.io import to_html


def get_social_media_data():
    """Return mock social media data for Nike in 2025."""
    return [
        {
            "platform": "YouTube",
            "followers": 2_090_000,
            "avg_likes": 4029,
            "avg_comments": 9,
        },
        {
            "platform": "Instagram",
            "followers": 303_000_000,
            "avg_likes": 99_000,
            "avg_comments": 830,
        },
        {
            "platform": "TikTok",
            "followers": 4_900_000,
            "avg_likes": 2200,
            "avg_comments": 39,
            # Provided engagement rate overrides calculated value
            "engagement_rate": 0.0282,
        },
        {
            "platform": "Facebook",
            "followers": 39_000_000,
            "avg_likes": 5200,
            "avg_comments": 429,
        },
        {
            "platform": "Twitter/X",
            "followers": 9_700_000,
            "avg_likes": 5000,
            "avg_comments": 100,
        },
        {
            "platform": "LinkedIn",
            "followers": 4_000_000,
        },
        {
            "platform": "Pinterest",
            "followers": 1_100_000,
        },
    ]


def analyze_engagement(data):
    """Calculate engagement rates and platform ranking."""
    for entry in data:
        if entry.get("platform") == "TikTok":
            # engagement rate already provided
            entry["engagement_rate"] = entry["engagement_rate"]
        elif all(k in entry for k in ("avg_likes", "avg_comments")) and entry.get("followers"):
            er = (entry["avg_likes"] + entry["avg_comments"]) / entry["followers"]
            entry["engagement_rate"] = er
        else:
            entry["engagement_rate"] = None

    ranked = sorted(
        [e for e in data if e["engagement_rate"] is not None],
        key=lambda x: x["engagement_rate"],
        reverse=True,
    )
    for idx, entry in enumerate(ranked, start=1):
        entry["rank"] = idx
    for entry in data:
        entry.setdefault("rank", None)
    return data


def print_summary_report(analyzed_data):
    """Print a formatted summary report."""
    print("Nike Social Media Analytics Report 2025")
    print("=" * 40)
    df = pd.DataFrame(analyzed_data)
    display_df = df[["platform", "followers", "engagement_rate", "rank"]].copy()
    display_df["engagement_rate"] = display_df["engagement_rate"].apply(
        lambda x: f"{x*100:.2f}%" if pd.notna(x) else "N/A"
    )
    print(display_df.to_string(index=False))

    print("\nStrategic Recommendations:")
    recommendations = {
        "Instagram": "Leverage user-generated content and micro-influencers to boost authenticity.",
        "Facebook": "Use interactive posts and targeted campaigns to encourage sharing and comments.",
        "Twitter/X": "Engage with trending topics and real-time conversations to increase visibility.",
    }
    for platform in ["Instagram", "Facebook", "Twitter/X"]:
        print(f"- {platform}: {recommendations[platform]}")

    print("\nExecutive Summary:")
    summary = (
        "TikTok leads Nike's social channels in engagement rate, followed by YouTube. "
        "Other platforms show lower engagement and should adopt tailored strategies to grow audience interaction."
    )
    print(summary)


def export_to_csv(analyzed_data, filename="nike_social_media_analysis_2025.csv"):
    """Export analysis results to CSV."""
    df = pd.DataFrame(analyzed_data)
    df.to_csv(filename, index=False)


def generate_html_dashboard(analyzed_data, filename="nike_dashboard.html"):
    """Generate an interactive HTML dashboard."""
    df = pd.DataFrame(analyzed_data)

    follower_fig = go.Figure(
        data=[go.Bar(x=df["platform"], y=df["followers"])]
    )
    follower_fig.update_layout(
        title="Followers by Platform", xaxis_title="Platform", yaxis_title="Followers"
    )

    er_df = df[df["engagement_rate"].notna()]
    er_fig = go.Figure(
        data=[go.Bar(x=er_df["platform"], y=er_df["engagement_rate"] * 100)]
    )
    er_fig.update_layout(
        title="Engagement Rate by Platform",
        xaxis_title="Platform",
        yaxis_title="Engagement Rate (%)",
    )

    table_fig = go.Figure(
        data=[
            go.Table(
                header=dict(
                    values=[
                        "Platform",
                        "Followers",
                        "Avg Likes",
                        "Avg Comments",
                        "Engagement Rate (%)",
                        "Rank",
                    ]
                ),
                cells=dict(
                    values=[
                        df["platform"],
                        df["followers"],
                        df.get("avg_likes", pd.Series([None] * len(df))),
                        df.get("avg_comments", pd.Series([None] * len(df))),
                        df["engagement_rate"].apply(
                            lambda x: f"{x*100:.2f}" if pd.notna(x) else "N/A"
                        ),
                        df["rank"].apply(lambda x: x if pd.notna(x) else "N/A"),
                    ]
                ),
            )
        ]
    )

    html_parts = [
        "<h1>Nike Social Media Dashboard 2025</h1>",
        to_html(follower_fig, include_plotlyjs="inline", full_html=False),
        to_html(er_fig, include_plotlyjs=False, full_html=False),
        to_html(table_fig, include_plotlyjs=False, full_html=False),
    ]
    with open(filename, "w", encoding="utf-8") as f:
        f.write("\n".join(html_parts))


def main():
    data = get_social_media_data()
    analyzed = analyze_engagement(data)
    print_summary_report(analyzed)
    export_to_csv(analyzed)
    generate_html_dashboard(analyzed)
    print(
        "Analysis complete. Files 'nike_social_media_analysis_2025.csv' and 'nike_dashboard.html' have been generated."
    )


if __name__ == "__main__":
    main()
