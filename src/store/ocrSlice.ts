import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ocrApi } from './ocrApi';

import type { PassportData, DriverLicenseData, VehicleRegistrationCertificateData } from './ocrTypes';

interface OcrState {
  passport: PassportData | null;
  driver_license: DriverLicenseData | null;
  vehicle_cert: VehicleRegistrationCertificateData | null;
  loading: boolean;
  passportError: string | null;
  driverLicenseError: string | null;
  vehicleCertError: string | null;
}

const initialState: OcrState = {
  passport: null,
  driver_license: null,
  vehicle_cert: null,
  loading: false,
  passportError: null,
  driverLicenseError: null,
  vehicleCertError: null,
};

const ocrSlice = createSlice({
  name: 'ocr',
  initialState,
  reducers: {
    clear(state) {
      state.passport = null;
      state.driver_license = null;
      state.vehicle_cert = null;
      state.passportError = null;
      state.driverLicenseError = null;
      state.vehicleCertError = null;
      state.loading = false;
      localStorage.removeItem('ocrData');
    },
    saveToLocalStorage(state) {
      const data = {
        passport: state.passport,
        driver_license: state.driver_license,
        vehicle_cert: state.vehicle_cert,
      };
      localStorage.setItem('ocrData', JSON.stringify(data));
    },
    loadFromLocalStorage(state) {
      const data = localStorage.getItem('ocrData');
      if (data) {
        const parsed = JSON.parse(data);
        state.passport = parsed.passport || null;
        state.driver_license = parsed.driver_license || null;
        state.vehicle_cert = parsed.vehicle_cert || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ocrApi.endpoints.recognizeDocument.matchPending,
        (state) => {
          state.loading = true;
          state.passportError = null;
          state.driverLicenseError = null;
          state.vehicleCertError = null;
        }
      )
      .addMatcher(
        ocrApi.endpoints.recognizeDocument.matchFulfilled,
        (state, action: PayloadAction<{ data?: any; documentType: string }>) => {
          state.loading = false;
          if (action.payload.documentType === 'passport') {
            state.passport = action.payload.data || null;
            state.passportError = null;
          }
          if (action.payload.documentType === 'driver_license') {
            state.driver_license = action.payload.data || null;
            state.driverLicenseError = null;
          }
          if (action.payload.documentType === 'vehicle_cert') {
            state.vehicle_cert = action.payload.data || null;
            state.vehicleCertError = null;
          }
        }
      )
      .addMatcher(
        ocrApi.endpoints.recognizeDocument.matchRejected,
        (state, action) => {
          state.loading = false;
          const docType = action.meta?.arg?.originalArgs?.documentType;
          let errorMsg = 'Ошибка при распознавании документа';
          if (action.error?.message) {
            errorMsg = action.error.message;
          } else if (action.payload && typeof action.payload === 'object' && 'data' in action.payload && typeof action.payload.data === 'string') {
            errorMsg = action.payload.data;
          }
          if (docType === 'passport') state.passportError = errorMsg;
          if (docType === 'driver_license') state.driverLicenseError = errorMsg;
          if (docType === 'vehicle_cert') state.vehicleCertError = errorMsg;
        }
      );
  },
});

export const { clear, saveToLocalStorage, loadFromLocalStorage } = ocrSlice.actions;
export default ocrSlice.reducer;
