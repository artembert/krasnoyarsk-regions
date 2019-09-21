export interface InvestProject {
  name: string,
  description?: string,
  municipal?: string,
  investor?: string,
  cost_mln: string | number,
  start?: string,
  end?: string,
  x?: number,
  y?: number,
  crs?: string,
}
