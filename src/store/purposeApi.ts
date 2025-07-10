import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface OcrError {
  error: string;
}

export interface IPurpose {
  id: number;
  name: string;
}

export const purposeApi = createApi({
  reducerPath: 'purposeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://oa.kg/api/' }),
  endpoints: (builder) => ({
    getPurpose: builder.query<IPurpose[], void>({
      query: () => 'use-purposes/',
    }),
  }),
});

export const { useGetPurposeQuery } = purposeApi;
