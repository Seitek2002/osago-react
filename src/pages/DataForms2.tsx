import React, { useEffect, useState } from 'react';
import PurposeDropdown from '../components/PurposeDropdown';
import PassportDropdown from '../components/PassportDropdown';
import VehicleSertDropdown from '../components/VehicleSertDropdown';
import { useNavigate } from 'react-router';

export interface IPassport {
  surname?: string;
  name?: string;
  patronymic?: string;
  gender?: string;
  birthDate?: string;
  personalNumber?: string;
  series?: string;
  number?: string;
  issueDate?: string;
  expiryDate?: string;
  birthPlace?: string;
  authority?: string;
  ethnicity?: string;
}

export interface IVehicleCert {
  number?: string;
  vin?: string;
  ownerFullName?: string;
  personalNumber?: string;
  ownerAddress?: string;
  steeringLocation?: string;
  engineType?: string;
  yearOfManufacture?: string;
  color?: string;
  carBodyChassisNumber?: string;
  carBodyType?: string;
  vehicleCategory?: string;
  engineCapacity?: string | null;
  enginePower?: string | null;
  unladenMass?: string | null;
  maxPermissibleMass?: number | null;
  authority?: string;
  registrationDate?: string;
  brandId?: number | null;
  carModelId?: number | null;
  brandName?: string | null;
  carModelName?: string | null;
  fuelType?: string | null;
}

export interface IFormData {
  phoneNumber: string;
  address?: string;
  passport: IPassport;
  vehicle_cert: IVehicleCert;
  purpose: { id?: number; name: string };
  unlimitedDrivers: boolean;
  referralCode?: number;
}

const localData = JSON.parse(localStorage.getItem('ocrData') || '{}');

const FORM_STORAGE_KEY = 'formData2';

const getInitialFormState = () => {
  const saved = localStorage.getItem(FORM_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialFormState;
    }
  }
  return initialFormState;
};

const initialFormState: IFormData = {
  phoneNumber: '',
  passport: localData.passport?.data ?? {},
  vehicle_cert: localData.vehicle_cert?.data ?? {},
  purpose: { name: 'Личная', id: 2 },
  address: localData.vehicle_cert?.data?.ownerAddress ?? '',
  unlimitedDrivers: true,
  referralCode: undefined,
};

const DataForms2: React.FC = () => {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState<IFormData>(
    getInitialFormState()
  );

  // Валидация паспорта по требованиям пользователя
  const isPassportValid =
    !!userFormData.passport.surname &&
    !!userFormData.passport.name &&
    !!userFormData.passport.gender &&
    !!userFormData.passport.birthDate &&
    !!userFormData.passport.series &&
    !!userFormData.passport.number &&
    !!userFormData.passport.expiryDate &&
    !!userFormData.passport.authority &&
    !!userFormData.passport.issueDate &&
    !!userFormData.passport.personalNumber;

  // Валидация техпаспорта по требованиям пользователя
  const isVehicleCertValid =
    !!userFormData.vehicle_cert.brandId &&
    !!userFormData.vehicle_cert.carModelId &&
    !!userFormData.vehicle_cert.steeringLocation &&
    !!userFormData.vehicle_cert.engineType &&
    !!userFormData.vehicle_cert.yearOfManufacture &&
    !!userFormData.vehicle_cert.vehicleCategory &&
    !!userFormData.vehicle_cert.engineCapacity &&
    !!userFormData.vehicle_cert.maxPermissibleMass &&
    !!userFormData.vehicle_cert.number &&
    !!userFormData.vehicle_cert.vin &&
    !!userFormData.vehicle_cert.ownerFullName &&
    !!userFormData.vehicle_cert.personalNumber &&
    !!userFormData.vehicle_cert.registrationDate;

  const isFormValid =
    !!userFormData.phoneNumber &&
    !!userFormData.address &&
    userFormData.purpose.name !== 'Выберите цель' &&
    isPassportValid &&
    isVehicleCertValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      passport: { ...userFormData.passport },
      vehicleRegistrationCertificate: {
        number: userFormData.vehicle_cert.number,
        vin: userFormData.vehicle_cert.vin,
        ownerFullName: userFormData.vehicle_cert.ownerFullName,
        personalNumber: userFormData.vehicle_cert.personalNumber,
        ownerAddress: userFormData.vehicle_cert.ownerAddress,
        brand: userFormData.vehicle_cert.brandId,
        car_model: userFormData.vehicle_cert.carModelId,
        steeringLocation: userFormData.vehicle_cert.steeringLocation,
        engineType: userFormData.vehicle_cert.engineType,
        yearOfManufacture: userFormData.vehicle_cert.yearOfManufacture,
        color: userFormData.vehicle_cert.color,
        carBodyChassisNumber: userFormData.vehicle_cert.carBodyChassisNumber,
        carBodyType: userFormData.vehicle_cert.carBodyType,
        vehicleCategory: userFormData.vehicle_cert.vehicleCategory,
        fuelType: userFormData.vehicle_cert.fuelType || null,
        engineCapacity: userFormData.vehicle_cert.engineCapacity,
        enginePower: userFormData.vehicle_cert.enginePower,
        unladenMass: userFormData.vehicle_cert.unladenMass,
        maxPermissibleMass: userFormData.vehicle_cert.maxPermissibleMass,
        authority: userFormData.vehicle_cert.authority,
        registrationDate: userFormData.vehicle_cert.registrationDate,
      },
      unlimitedDrivers: true,
      purpose: userFormData.purpose.id,
      endDate: '2026-04-01',
      phoneNumber: userFormData.phoneNumber,
      technicalInspection: false,
    };

    localStorage.setItem('calculateData', JSON.stringify(data));
    navigate('/calculator-2');
    console.log(data);
  };

  const isEmpty = (val?: string | null) => !val || val.trim() === '';

  const getInputStyle = (value?: string | null) => ({
    borderColor: isEmpty(value) ? '#ef4444' : '#d1d5db',
  });

  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(userFormData));
  }, [userFormData]);

  return (
    <section className='form-section pt-14 pb-[100px]'>
      <form onSubmit={handleSubmit} className='mx-auto px-4 max-w-[1200px]'>
        <div className='form-section__content space-y-4'>
          <h2 className='text-title text-2xl font-semibold'>
            Проверьте свои данные
          </h2>

          {/* Номер телефона */}
          <div className='form-group mt-4'>
            <label className='text-suptitle block' htmlFor='phoneNumber'>
              Номер телефона <span className='required text-red-500'>*</span>
            </label>
            <input
              required
              type='text'
              id='phoneNumber'
              placeholder='+996 (502) 235-509'
              className='form-input mt-[12px] w-full bg-[#F7F8FA] rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 border'
              style={getInputStyle(userFormData.phoneNumber)}
              value={userFormData.phoneNumber}
              onChange={(e) =>
                setUserFormData((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </div>

          {/* Адрес */}
          <div className='form-group mt-4'>
            <label className='text-suptitle mb-[12px] block' htmlFor='address'>
              Адрес проживания <span className='required text-red-500'>*</span>
            </label>
            <textarea
              required
              className={`form-input w-full bg-[#F7F8FA] rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 border ${
                isEmpty(userFormData.address) ? 'h-[42px]' : 'h-auto'
              }`}
              style={getInputStyle(userFormData.address)}
              id='address'
              placeholder='Введите адрес'
              value={userFormData.address || ''}
              onChange={(e) =>
                setUserFormData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          </div>

          {/* Использование авто */}
          <PurposeDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
          />

          <h3 className='text-suptitle'>
            Проверьте ваши данные{' '}
            <span className='required text-red-500'>*</span>
          </h3>

          {/* Блок паспорта */}
          <PassportDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
            isPassportValid={isPassportValid}
          />

          {/* Блок техпаспорта */}
          <VehicleSertDropdown
            userFormData={userFormData}
            setUserFormData={setUserFormData}
            isVehicleCertValid={isVehicleCertValid}
          />
        </div>

        <div className='mt-8'>
          <button
            className='flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-white text-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={!isFormValid}
          >
            Далее
          </button>
        </div>
      </form>
    </section>
  );
};

export default DataForms2;
