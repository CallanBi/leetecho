import to from 'await-to-js';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import {
  AddNoteRequest,
  AddNoteResponse,
  DeleteNoteRequest,
  DeleteNoteResponse,
  UpdateNoteRequest,
  UpdateNoteResponse,
} from 'src/main/services/leetcodeServices/utils/interfaces';

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
      cacheTime: 0,
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

const useUpdateNote = (
  options: Omit<
  UseMutationOptions<UpdateNoteResponse['noteUpdateUserNote'], Error, UpdateNoteRequest>,
  'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation<UpdateNoteResponse['noteUpdateUserNote'], Error, UpdateNoteRequest>(async (params) => {
    const [err, res] = (await to(ipcRenderer.invoke('updateNote', params))) as [
      Error | null,
      SuccessResp<UpdateNoteResponse['noteUpdateUserNote']>,
    ];
    if (err) {
      throw err;
    }
    const { data } = res;
    return data;
  }, options);

const useDeleteNote = (
  options: Omit<
  UseMutationOptions<DeleteNoteResponse['noteDeleteUserNote'], Error, DeleteNoteRequest>,
  'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation<DeleteNoteResponse['noteDeleteUserNote'], Error, DeleteNoteRequest>(async (params) => {
    const [err, res] = (await to(ipcRenderer.invoke('deleteNote', params))) as [
      Error | null,
      SuccessResp<DeleteNoteResponse['noteDeleteUserNote']>,
    ];
    if (err) {
      throw err;
    }
    const { data } = res;
    return data;
  }, options);

const useAddNote = (
  options: Omit<
  UseMutationOptions<AddNoteResponse['noteCreateCommonNote'], Error, AddNoteRequest>,
  'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation<AddNoteResponse['noteCreateCommonNote'], Error, AddNoteRequest>(async (params) => {
    const [err, res] = (await to(ipcRenderer.invoke('addNote', params))) as [
      Error | null,
      SuccessResp<AddNoteResponse['noteCreateCommonNote']>,
    ];
    if (err) {
      throw err;
    }
    const { data } = res;
    return data;
  }, options);

export {
  useGetProblem,
  useGetSubmissionsByTitleSlug,
  useGetNotesByQuestionId,
  useGetSubmissionDetailById,
  useUpdateNote,
  useDeleteNote,
  useAddNote,
};
