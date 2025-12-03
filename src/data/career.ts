import careerData from './career.json';

export type CareerItem = {
  year: string;
  position: string;
  company: string;
  description: string;
};

export const careerItems: CareerItem[] = careerData;
