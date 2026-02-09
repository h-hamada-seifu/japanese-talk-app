'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { SpeechSuperScore } from '@/types';

interface ScoreRadarChartProps {
  scores: SpeechSuperScore;
}

const LABELS: Record<string, string> = {
  pronunciation: '発音（はつおん）',
  fluency: 'なめらかさ',
  completeness: '完全（かんぜん）さ',
  tone: 'アクセント',
  rhythm: 'リズム',
};

export function ScoreRadarChart({ scores }: ScoreRadarChartProps) {
  // speedはWPM値で0-100スケールでないため除外
  const data = [
    { subject: LABELS.pronunciation, value: scores.pronunciation },
    { subject: LABELS.fluency, value: scores.fluency },
    { subject: LABELS.completeness, value: scores.completeness },
    { subject: LABELS.tone, value: scores.tone },
    { subject: LABELS.rhythm, value: scores.rhythm },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 12, fill: '#374151' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
        />
        <Radar
          name="スコア"
          dataKey="value"
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
