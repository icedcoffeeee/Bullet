export interface Data {
  id: number;
  type: string;
  content: string;
  page: string;
  dateString: string;
  date: Date;
  childrenIds?: number[];
}
