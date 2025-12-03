import interviewsData from './interviews.json';

export interface Interview {
  id: string;
  type: 'youtube' | 'linkedin';
  url: string;
  videoId?: string;
  source: string;
  year: string;
  title: string;
  description: string;
}

export const interviews: Interview[] = interviewsData as Interview[];
