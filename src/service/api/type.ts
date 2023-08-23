export interface APIResponse<T> {
  // TODO-server 맟춰야함
  data: T;
  statusCode: number;
  error: string;
  message: string;
}
