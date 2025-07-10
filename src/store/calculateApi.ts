import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IInsuranceData } from '../types';

export interface OcrError {
  error: string;
}

export const calculateApi = createApi({
  reducerPath: 'calculateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://oa.kg/api/' }),
  endpoints: (builder) => ({
    calculate: builder.mutation<{amount: number, vehicleTypeCoefficient: string}, IInsuranceData>({
      query: (data) => {
        return {
          url: `osago/calculate/`,
          method: 'POST',
          body: data,
        };
      },
    }),
    createPolicy: builder.mutation<{ id: number; paymentUrl: string }, IInsuranceData>({
      query: (data) => ({
        url: `policies/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCalculateMutation, useCreatePolicyMutation } = calculateApi;
