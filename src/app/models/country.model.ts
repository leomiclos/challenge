export interface Country {
    name: { common: string };
    capital: string[];
    population: number;
    flags: { svg: string, png: string };
    region: string;
  }