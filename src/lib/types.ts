export type CareerItem = {
  year: string;
  position: string;
  company: string;
  description: string;
};

export type Interview = {
  id: string;
  type: 'youtube' | 'linkedin';
  url: string;
  videoId?: string;
  thumbnail?: string;
  source: string;
  year: string;
  title: string;
  description: string;
};

export type InsightArticle = {
  id: string;
  category: string;
  date: string;
  source: string;
  title: string;
  description: string;
  url: string;
};
