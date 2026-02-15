#!/usr/bin/env python3
"""
Recruiter Dashboard Analytics Script
analyzes traffic to identify potential recruiter activity and engagement.
"""

import os
import sys
import json
from ga_client import GoogleAnalyticsClient, format_as_table

def run_recruiter_analysis(days=30):
    try:
        client = GoogleAnalyticsClient()
        print(f"\n--- Recruiter Dashboard (Last {days} Days) ---\n")

        # 1. Traffic Overview (Total)
        print("1. Traffic Overview (Total):")
        # Just getting totals, so empty dimensions list or date
        overview = client.run_report(
            start_date=f"{days}daysAgo",
            end_date="today",
            metrics=["activeUsers", "sessions", "newUsers", "screenPageViews"],
            dimensions=[] 
        )
        print(format_as_table(overview))
        print("\n")

        # 2. Top Traffic Sources (Session Source/Medium)
        print("2. Top Traffic Sources:")
        sources = client.run_report(
            start_date=f"{days}daysAgo",
            end_date="today",
            metrics=["sessions", "activeUsers"],
            dimensions=["sessionSourceMedium"],
            limit=10,
            order_by="-sessions"
        )
        print(format_as_table(sources))
        print("\n")

        # 3. Top Pages (Page Path)
        print("3. Top Pages & Views:")
        pages = client.run_report(
            start_date=f"{days}daysAgo",
            end_date="today",
            metrics=["screenPageViews", "activeUsers"],
            dimensions=["pagePath"],
            limit=10,
            order_by="-screenPageViews"
        )
        print(format_as_table(pages))
        print("\n")

        # 4. User Locations (City, Country)
        print("4. User Locations:")
        locations = client.run_report(
            start_date=f"{days}daysAgo",
            end_date="today",
            metrics=["activeUsers", "sessions"],
            dimensions=["city", "country"],
            limit=10,
            order_by="-activeUsers"
        )
        print(format_as_table(locations))
        print("\n")

    except Exception as e:
        print(f"Error running analysis: {e}")

if __name__ == "__main__":
    run_recruiter_analysis()
