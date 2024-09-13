export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface trademarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    Pages: number;
  };
}
export type Records = trademark[];

export interface trademark {
  id?: string;
  tmName: string;
  logoUrl: string;
}
