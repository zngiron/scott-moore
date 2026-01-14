export type Interview = {
  id: number;
  video: string;
  thumbnail?: string;
  title: string;
  description: string;
  source: string;
  year: string;
};

export const interviews: Interview[] = [
  {
    id: 1,
    video: '/scott-moore-interview-money-talks.mp4',
    thumbnail: '/scott-moore-interview-money-talks-thumbnail.png',
    title: 'Philippines Wealth Growth Insights',
    description:
      'Philippines saw a 32% growth in individuals with $1M+ in investable assets over the past decade - outpacing many developed economies.',
    source: 'Money Talks',
    year: '2024',
  },
  {
    id: 2,
    video: '/scott-moore-interview-cnn-philippines.mp4',
    thumbnail: '/scott-moore-interview-cnn-philippines-thumbnail.png',
    title: 'Global Investment Strategies',
    description: 'Discussing portfolio optimization strategies for high-net-worth individuals in emerging markets.',
    source: 'CNN Philippines',
    year: '2024',
  },
  {
    id: 3,
    video: '/scott-moore-interview-money-fm.mp4',
    thumbnail: '/scott-moore-interview-money-fm-thumbnail.png',
    title: 'Wealth Preservation Strategies',
    description: 'Expert insights on risk management and long-term wealth preservation in volatile markets.',
    source: 'Money FM',
    year: '2024',
  },
];
