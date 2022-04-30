export interface Application {
  start(params: any | null | undefined): Promise<any> | void | any;
}
