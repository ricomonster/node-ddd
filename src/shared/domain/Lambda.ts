export interface LambdaResponseOptions {
  body: any;
  status?: number;
  headers?: Record<any, any> | undefined;
}

export interface LambdaResponse {
  statusCode: number,
  body: string,
  headers: Record<any, any>,
}
