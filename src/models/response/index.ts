export interface ResponseModel<T = unknown> {
  info?: T;
  resMessage?: string;
  resCode?: number;
}
