import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ICarModel {
  id: number;
  name: string;
  brand: number;
}

export interface ICarBrand {
  id: number;
  name: string;
}

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://oa.kg/api/' }),
  endpoints: (builder) => ({
    getCarModels: builder.query<ICarModel[], number>({
      query: (brand) => ({
        url: 'car-models/',
        params: { brand },
      }),
    }),
    getBrands: builder.query<ICarBrand[], void>({
      query: () => 'brands/',
    }),
  }),
});

export const { useGetCarModelsQuery, useGetBrandsQuery } = carApi;
