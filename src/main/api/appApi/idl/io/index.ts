import { EndPoint } from '@/storage/electron-store';

export type ReadUserTemplateRequest = {
  userInfo: {
    usrName: string;
    endPoint: EndPoint;
  };
};

export type CreateTemplateRequest = {
  userInfo: {
    usrName: string;
    endPoint: EndPoint;
  };
};

export type ReadUserTemplateResponse = {
  fileNameWithFileType: string;
  content: string;
}[];

export type CreateTemplateResponse = Record<string, never>;
