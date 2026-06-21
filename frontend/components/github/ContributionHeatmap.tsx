"use client";

import { useMemo } from "react";
import type { ContributionDayItem } from "@/lib/types";

interface ContributionHeatmapProps {
  calendar: ContributionDayItem[];
}

export default function ContributionHeatmap({ calendar }: ContributionHeatmapProps) {
  const { weeks, monthLabels } = useMemo(() => {
    if (!calendar || calendar.length === 0) {
      return { weeks: [], monthLabels: [] };
    }

    // Step 1: Pad the calendar so it starts on a Sunday
    const paddedCalendar: (ContributionDayItem | null)[] = [...calendar];
    const firstDayStr = calendar[0].day;
    // day of week: 0 (Sun) to 6 (Sat)
    const firstDayOfWeek = new Date(firstDayStr).getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
      paddedCalendar.unshift(null);
    }

    // Step 2: Group into weeks (chunks of 7)
    const groupedWeeks: (ContributionDayItem | null)[][] = [];
    for (let i = 0; i < paddedCalendar.length; i += 7) {
      groupedWeeks.push(paddedCalendar.slice(i, i + 7));
    }

    // Step 3: Determine month labels based on first day of each week
    const labels: { text: string; colIndex: number }[] = [];
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let lastMonth = -1;

    groupedWeeks.forEach((week, wIdx) => {
      // Find the first non-null day in this week
      const firstValidDay = week.find((day) => day !== null);
      if (firstValidDay) {
        const dateObj = new Date(firstValidDay.day);
        const currentMonth = dateObj.getMonth();
        if (currentMonth !== lastMonth) {
          labels.push({ text: MONTHS[currentMonth], colIndex: wIdx });
          lastMonth = currentMonth;
        }
      }
    });

    // Filter labels to avoid overlapping (e.g. if they are too close, at least 3 weeks apart)
    const filteredLabels: typeof labels = [];
    labels.forEach((label) => {
      if (
        filteredLabels.length === 0 ||
        label.colIndex - filteredLabels[filteredLabels.length - 1].colIndex >= 3
      ) {
        filteredLabels.push(label);
      }
    });

    return { weeks: groupedWeeks, monthLabels: filteredLabels };
  }, [calendar]);

  if (!calendar || calendar.length === 0) {
    return (
      <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 text-center text-text-tertiary">
        No contribution data available.
      </div>
    );
  }

  // Calculate totals
  const totalCommits = calendar.reduce((sum, day) => sum + day.commit_count, 0);

  return (
    <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <div>
          <h3 className="text-lg font-medium text-text-primary">
            Contribution Activity
          </h3>
          <p className="text-sm text-text-tertiary mt-1">
            {totalCommits} commits in the past 12 months
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <span>Less</span>
          <span className="w-3 h-3 rounded bg-bg-tertiary border border-border-default" />
          <span className="w-3 h-3 rounded bg-emerald-950/60" />
          <span className="w-3 h-3 rounded bg-emerald-800" />
          <span className="w-3 h-3 rounded bg-emerald-600" />
          <span className="w-3 h-3 rounded bg-emerald-400" />
          <span>More</span>
        </div>
      </div>

      <div className="flex flex-col w-full relative select-none">
        {/* Month Labels row */}
        <div className="flex mb-2 text-xs font-mono text-text-tertiary pl-8 h-4 relative">
          {monthLabels.map((lbl, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{ left: `calc(2rem + ${lbl.colIndex * 1.285}rem)` }}
            >
              {lbl.text}
            </div>
          ))}
        </div>

        {/* Heatmap Grid + Day Names */}
        <div className="flex">
          {/* Day Names column */}
          <div className="flex flex-col gap-1 pr-3 text-xs font-mono text-text-tertiary w-8 justify-between pb-1">
            <span>Sun</span>
            <span>Tue</span>
            <span>Thu</span>
            <span>Sat</span>
          </div>

          {/* Grid columns */}
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin flex-grow">
            {weeks.map((week, w_idx) => (
              <div key={w_idx} className="flex flex-col gap-1">
                {week.map((day, d_idx) => {
                  if (!day) {
                    return (
                      <div
                        key={d_idx}
                        className="w-3 h-3 bg-transparent rounded-sm"
                      />
                    );
                  }
                  return (
                    <div
                      key={day.day}
                      className={`w-3 h-3 rounded-sm transition-all duration-150 hover:scale-110 cursor-pointer ${
                        day.intensity_level === 0 ? "bg-bg-tertiary border border-border-default" :
                        day.intensity_level === 1 ? "bg-emerald-950/60" :
                        day.intensity_level === 2 ? "bg-emerald-800" :
                        day.intensity_level === 3 ? "bg-emerald-600" : "bg-emerald-400"
                      }`}
                      title={`${day.commit_count} commits on ${day.day}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
