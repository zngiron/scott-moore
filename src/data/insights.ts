import insightsData from './insights.json';

export interface InsightArticle {
  id: string;
  category: string;
  date: string;
  source: string;
  title: string;
  description: string;
  url: string;
}

export const insightArticles: InsightArticle[] = insightsData;
