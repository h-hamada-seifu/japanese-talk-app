'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { SpeechSuperScore } from '@/types';

interface ScoreBarChartProps {
  scores: SpeechSuperScore;
}

const LABELS: Record<string, string> = {
  pronunciation: '発音（はつおん）',
  fluency: 'なめらかさ',
  completeness: '完全（かんぜん）さ',
  tone: 'アクセント',
  rhythm: 'リズム',
};

/**
 * スコアに応じた色を返す
 */
function getScoreColor(score: number): string {
  if (score >= 80) return '#22C55E';
  if (score >= 60) return '#EAB308';
  return '#EF4444';
}

export function ScoreBarChart({ scores }: ScoreBarChartProps) {
  const data = [
    { name: LABELS.pronunciation, score: scores.pronunciation },
    { name: LABELS.fluency, score: scores.fluency },
    { name: LABELS.completeness, score: scores.completeness },
    { name: LABELS.tone, score: scores.tone },
    { name: LABELS.rhythm, score: scores.rhythm },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="name"
          width={100}
          tick={{ fontSize: 12 }}
        />
        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((entry, index) => (
            <Cell key={index} fill={getScoreColor(entry.score)} />
          ))}
          <LabelList
            dataKey="score"
            position="right"
            style={{ fontSize: 12, fontWeight: 'bold', fill: '#374151' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
