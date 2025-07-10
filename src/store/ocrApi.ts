import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface OcrError {
  error: string;
}

export const ocrApi = createApi({
  reducerPath: 'ocrApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://oa.kg/api/' }),
  endpoints: (builder) => ({
    recognizeDocument: builder.mutation({
      query: ({ documentType, front, back }) => {
        const formData = new FormData();
        formData.append('documentType', documentType);
        formData.append('frontImage', front);
        formData.append('backImage', back);
        return {
          url: `ocr2/?documentType=${documentType}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useRecognizeDocumentMutation } = ocrApi;
