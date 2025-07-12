import { useMemo, useState, type FC } from 'react';
import type { IFormData } from '../pages/DataForms';
import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';
import EngineType from './EngineType';
import SteeringLocation from './SteeringLocation';
import BrandSelect from './BrandSelect';
import CarModel from '../pages/CarModel';

interface IProps {
  userFormData: IFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  isVehicleCertValid: boolean;
}

const VehicleSertDropdown: FC<IProps> = ({
  userFormData,
  setUserFormData,
  isVehicleCertValid,
}) => {
  const [isOpenTechPassport, setIsOpenTechPassport] = useState(false);
  const isEmpty = (val?: string | null) => !val || `${val}`.trim() === '';

  const getInputStyle = (value?: string | null) => ({
    borderColor: isEmpty(value) ? '#ef4444' : '#d1d5db',
  });

  // Конфиг для простых текстовых полей ТС
  const vehicleFields = [
    { label: 'Номер', name: 'number', required: true, type: 'text' },
    { label: 'VIN', name: 'vin', required: true, type: 'text' },
    {
      label: 'ФИО владельца',
      name: 'ownerFullName',
      required: true,
      type: 'text',
    },
    {
      label: 'ИНН владельца',
      name: 'personalNumber',
      required: true,
      type: 'text',
    },
    {
      label: 'Адрес владельца',
      name: 'ownerAddress',
      required: false,
      type: 'text',
      isTextArea: true,
    },
    {
      label: 'Год выпуска',
      name: 'yearOfManufacture',
      required: true,
      type: 'text',
    },
    {
      label: 'Цвет',
      name: 'color',
      required: false,
      type: 'text',
      hidden: true,
    },
    {
      label: 'Номер кузова/шасси',
      name: 'carBodyChassisNumber',
      required: false,
      type: 'text',
    },
    { label: 'Тип кузова', name: 'carBodyType', required: false, type: 'text' },
    {
      label: 'Объём двигателя',
      name: 'engineCapacity',
      required: false,
      type: 'text',
    },
    {
      label: 'Масса без нагрузки',
      name: 'unladenMass',
      required: false,
      type: 'text',
      hidden: true,
    },
    {
      label: 'Максимальная разрешённая масса',
      name: 'maxPermissibleMass',
      required: false,
      type: 'text',
      isNumber: true,
      hidden: true,
    },
    { label: 'Орган выдачи', name: 'authority', required: false, type: 'text' },
    {
      label: 'Дата регистрации',
      name: 'registrationDate',
      required: true,
      type: 'date',
    },
  ];

  const sortedVehicleFields = useMemo(() => {
    return vehicleFields.slice().sort((a, b) => {
      const aVal =
        userFormData.vehicle_cert[
          a.name as keyof typeof userFormData.vehicle_cert
        ];
      const bVal =
        userFormData.vehicle_cert[
          b.name as keyof typeof userFormData.vehicle_cert
        ];
      const aEmpty = isEmpty(
        typeof aVal === 'string' || typeof aVal === 'number' ? String(aVal) : ''
      );
      const bEmpty = isEmpty(
        typeof bVal === 'string' || typeof bVal === 'number' ? String(bVal) : ''
      );
      if (aEmpty === bEmpty) return 0;
      return aEmpty ? -1 : 1;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full relative border border-[#E5E7EB] rounded-[10px] overflow-hidden transition-colors mb-4'>
      <button
        type='button'
        className='w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[#201F1F] text-[16px] outline-none transition-colors flex items-center justify-between'
        onClick={() => setIsOpenTechPassport(!isOpenTechPassport)}
      >
        {!isVehicleCertValid ? (
          <img src={warning} alt='' className='size-[20px] absolute' />
        ) : (
          <img
            src={checked}
            alt=''
            className='size-[15px] absolute rounded-full'
          />
        )}
        <span className='font-semibold ml-[25px]'>Данные ТС</span>
        <span className='ml-2 transition-transform duration-200'>
          <img src={dropdownArrow} alt='' />
        </span>
      </button>
      <div
        className={`${
          isOpenTechPassport ? 'block' : 'hidden'
        } w-full bg-white border border-[#E5E7EB] shadow-lg p-2`}
      >
        <div>
          {sortedVehicleFields.map((field) => (
            <div
              className={
                field.hidden
                  ? 'dropdown__details-card bg-white rounded-xl flex-col gap-4 mb-4 hidden'
                  : 'dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'
              }
              key={field.name}
            >
              <div className='dropdown__detail flex flex-col gap-1'>
                <span className='litle-title text-[#6B7280] text-[14px] font-medium mb-1'>
                  {field.label}
                </span>
                {field.isTextArea ? (
                  <textarea
                    className={`litle-input bg-white rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors border focus:ring-1 focus:ring-indigo-500 ${
                      isEmpty(
                        userFormData.vehicle_cert[
                          field.name as keyof typeof userFormData.vehicle_cert
                        ] as string
                      )
                        ? 'h-[42px]'
                        : 'h-auto'
                    }`}
                    style={getInputStyle(
                      typeof userFormData.vehicle_cert[
                        field.name as keyof typeof userFormData.vehicle_cert
                      ] === 'string' ||
                        typeof userFormData.vehicle_cert[
                          field.name as keyof typeof userFormData.vehicle_cert
                        ] === 'number'
                        ? String(
                            userFormData.vehicle_cert[
                              field.name as keyof typeof userFormData.vehicle_cert
                            ]
                          )
                        : ''
                    )}
                    value={
                      typeof userFormData.vehicle_cert[
                        field.name as keyof typeof userFormData.vehicle_cert
                      ] === 'string' ||
                      typeof userFormData.vehicle_cert[
                        field.name as keyof typeof userFormData.vehicle_cert
                      ] === 'number'
                        ? String(
                            userFormData.vehicle_cert[
                              field.name as keyof typeof userFormData.vehicle_cert
                            ] ?? ''
                          )
                        : ''
                    }
                    onChange={(e) =>
                      setUserFormData((prev: IFormData) => ({
                        ...prev,
                        vehicle_cert: {
                          ...prev.vehicle_cert,
                          [field.name]: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <input
                    required={field.required}
                    type={field.type}
                    className={`litle-input ${
                      field.type === 'date' ? 'w-full' : ''
                    } bg-white rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors border focus:ring-1 focus:ring-indigo-500`}
                    style={getInputStyle(
                      typeof userFormData.vehicle_cert[
                        field.name as keyof typeof userFormData.vehicle_cert
                      ] === 'string' ||
                        typeof userFormData.vehicle_cert[
                          field.name as keyof typeof userFormData.vehicle_cert
                        ] === 'number'
                        ? String(
                            userFormData.vehicle_cert[
                              field.name as keyof typeof userFormData.vehicle_cert
                            ]
                          )
                        : ''
                    )}
                    value={
                      typeof userFormData.vehicle_cert[
                        field.name as keyof typeof userFormData.vehicle_cert
                      ] === 'string' ||
                      typeof userFormData.vehicle_cert[
                        field.name as keyof typeof userFormData.vehicle_cert
                      ] === 'number'
                        ? String(
                            userFormData.vehicle_cert[
                              field.name as keyof typeof userFormData.vehicle_cert
                            ] ?? ''
                          )
                        : ''
                    }
                    onChange={(e) =>
                      setUserFormData((prev: IFormData) => ({
                        ...prev,
                        vehicle_cert: {
                          ...prev.vehicle_cert,
                          [field.name]: field.isNumber
                            ? Number(e.target.value)
                            : e.target.value,
                        },
                      }))
                    }
                  />
                )}
              </div>
            </div>
          ))}
          {/* Расположение руля */}
          <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'>
            <SteeringLocation
              userFormData={userFormData}
              setUserFormData={setUserFormData}
            />
          </div>
          {/* Тип двигателя */}
          <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'>
            <EngineType
              userFormData={userFormData}
              setUserFormData={setUserFormData}
            />
          </div>
          {/* Мощность двигателя */}
          {/* engineType = ICE(обьем) or ELECTRIC(мощность) */}
          {userFormData.vehicle_cert.engineType == 'ELECTRIC' && (
            <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'>
              <div className='dropdown__detail flex flex-col gap-1'>
                <span className='litle-title text-[#6B7280] text-[14px] font-medium mb-1'>
                  Мощность двигателя
                </span>
                <input
                  type='text'
                  className='litle-input bg-white rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors border focus:ring-1 focus:ring-indigo-500'
                  style={getInputStyle(userFormData.vehicle_cert.enginePower)}
                  value={userFormData.vehicle_cert.enginePower || ''}
                  onChange={(e) =>
                    setUserFormData((prev: IFormData) => ({
                      ...prev,
                      vehicle_cert: {
                        ...prev.vehicle_cert,
                        enginePower: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {userFormData.vehicle_cert.engineType === 'ICE' && (
            <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'>
              <div className='dropdown__detail flex flex-col gap-1'>
                <span className='litle-title text-[#6B7280] text-[14px] font-medium mb-1'>
                  Объём двигателя
                </span>
                <input
                  type='text'
                  className='litle-input bg-white rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors border focus:ring-1 focus:ring-indigo-500'
                  style={getInputStyle(
                    userFormData.vehicle_cert.engineCapacity
                  )}
                  value={userFormData.vehicle_cert.engineCapacity || ''}
                  onChange={(e) =>
                    setUserFormData((prev: IFormData) => ({
                      ...prev,
                      vehicle_cert: {
                        ...prev.vehicle_cert,
                        engineCapacity: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          )}
          {userFormData.vehicle_cert.engineType === ''}
          {/* Категория ТС */}
          <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'>
            <div className='dropdown__detail flex flex-col gap-1'>
              <span className='litle-title text-[#6B7280] text-[14px] font-medium mb-1'>
                Категория ТС
              </span>
              <input
                type='text'
                readOnly
                className='litle-input bg-white rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors border focus:ring-1 focus:ring-indigo-500'
                style={getInputStyle(userFormData.vehicle_cert.vehicleCategory)}
                value={userFormData.vehicle_cert.vehicleCategory || ''}
                onChange={(e) =>
                  setUserFormData((prev: IFormData) => ({
                    ...prev,
                    vehicle_cert: {
                      ...prev.vehicle_cert,
                      vehicleCategory: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
          {/* Марка */}
          <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'>
            <BrandSelect
              userFormData={userFormData}
              setUserFormData={setUserFormData}
            />
          </div>
          {/* Модель */}
          <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'>
            <CarModel
              userFormData={userFormData}
              setUserFormData={setUserFormData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSertDropdown;
