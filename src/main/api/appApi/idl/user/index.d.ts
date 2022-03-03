/** user types */
export {};

declare global {
  type LoginReq = {
    usrName: string;
    pwd: string;
  };

  type LoginResp = SuccessResp<Record<string, never>>;
}
