import { EndPoint } from '@/storage/electronStore';

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

export type SaveTemplateRequest = {
  userInfo: {
    usrName: string;
    endPoint: EndPoint;
  };
  type: 'cover' | 'problem';
  content: string;
};

export type SaveTemplateResponse = Record<string, never>;
