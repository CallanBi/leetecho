import to from 'await-to-js';
import { useQuery, UseQueryOptions } from 'react-query';

const {
  bridge: { ipcRenderer },
} = window;

const useGetProblem = (
  params: GetProblemReq,
  options: Omit<UseQueryOptions<GetProblemResp['data'], Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<GetProblemResp['data'], Error>(
    ['getProblem', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('getProblem', params))) as [Error | null, GetProblemResp];
      if (err) {
        throw err;
      }

      const { data } = res || {};

      return data;
    },
    {
      retry: 2,
      cacheTime: 1000 * 60 /** 1 min */,
      ...options,
    },
  );

const useGetSubmissionsByTitleSlug = (
  params: GetSubmissionsByQuestionSlugReq,
  options: Omit<UseQueryOptions<GetSubmissionsByQuestionSlugResp['data'], Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<GetSubmissionsByQuestionSlugResp['data'], Error>(
    ['getSubmissions', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('getSubmissionsByTitleSlug', params))) as [
        Error | null,
        GetSubmissionsByQuestionSlugResp,
      ];
      if (err) {
        throw err;
      }

      const { data } = res || {};

      return data;
    },
    {
      retry: 2,
      cacheTime: 1000 * 60 /** 1 min */,
      ...options,
    },
  );

const useGetNotesByQuestionId = (
  params: GetNotesByQuestionIdReq,
  options: Omit<UseQueryOptions<GetNotesByQuestionIdResp['data'], Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<GetNotesByQuestionIdResp['data'], Error>(
    ['getNoteByQuestionId', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('getNotesByQuestionId', params))) as [
        Error | null,
        GetNotesByQuestionIdResp,
      ];
      if (err) {
        throw err;
      }

      const { data } = res || {};

      return data;
    },
    {
      retry: 2,
      cacheTime: 2000 /** 2s */,
      ...options,
    },
  );

const useGetSubmissionDetailById = (
  params: GetSubmissionDetailByIdReq,
  options: Omit<UseQueryOptions<GetSubmissionDetailByIdResp['data'], Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<GetSubmissionDetailByIdResp['data'], Error>(
    ['getSubmissionDetailById', params],
    async () => {
      const [err, res] = (await to(ipcRenderer.invoke('getSubmissionDetailById', params))) as [
        Error | null,
        GetSubmissionDetailByIdResp,
      ];
      if (err) {
        throw err;
      }

      const { data } = res || {};

      return data;
    },
    {
      retry: 2,
      cacheTime: 2000 /** 2s */,
      ...options,
    },
  );

export { useGetProblem, useGetSubmissionsByTitleSlug, useGetNotesByQuestionId, useGetSubmissionDetailById };
