/** IPC types */
export { };

declare global {
  type WindowStatus = 'maximized' | 'minimized' | 'closed' | 'windowed';

  /** set-win-status */
  type SetWinStatusReq = WindowStatus;
  type SetWinStatusResp = {
    isSuccessful: boolean;
    winStatus?: WindowStatus | '';
  };

  /** get-win-status */
  type GetWinStatusReq = undefined;
  type GetWinStatusResp = WindowStatus;

}