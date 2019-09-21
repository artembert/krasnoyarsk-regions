export interface InvestProject {
  name: string,
  description?: string,
  municipal?: string,
  investor?: string,
  cost: string | number,
  start?: string,
  end?: string,
  x?: number,
  y?: number,
}
