export interface ICountry {
  name: string,
  alpha3Code: string,
  nativeName: string,
  region: string,
  subregion: string,
  population: number,
  capital:string,
  topLevelDomain:string[],
  borders:string[],
  currencies: any[],
  languages: any[],
  flag: string
}
