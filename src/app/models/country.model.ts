export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  capital: string[];
  population: number;
  flags: { svg: string, png: string };
  region: string;
  subregion: string;
  tld: string[];
  currencies: { [key: string]: { name: string; symbol: string } };
  languages: { [key: string]: string };
  borders: string[];
}
