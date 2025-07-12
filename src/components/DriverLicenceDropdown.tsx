import React, { useState, type FC } from 'react';
import type { IFormData, IDriverLicense } from '../pages/DataForms';
import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

interface DriverLicenseDropdownProps {
  userFormData: IFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const DriverLicenseDropdown: FC<DriverLicenseDropdownProps> = ({
  userFormData,
  setUserFormData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const driverLicense: IDriverLicense = userFormData.driverLicense || {
    surname: '',
    name: '',
    birthDate: '',
    birthPlace: '',
    licenceNumber: '',
    personalNumber: '',
    residence: '',
    authority: '',
    issueDate: '',
    expiryDate: '',
    categories: {},
  };

  const isEmpty = (val?: string) => !val || val.trim() === '';

  const getInputStyle = (value?: string) => ({
    borderColor: isEmpty(value) ? '#ef4444' : '#d1d5db',
  });

  const isLicenseValid = !Object.values({
    surname: driverLicense.surname,
    name: driverLicense.name,
    birthDate: driverLicense.birthDate,
    licenceNumber: driverLicense.licenceNumber,
    personalNumber: driverLicense.personalNumber,
    issueDate: driverLicense.issueDate,
    expiryDate: driverLicense.expiryDate,
  }).some(isEmpty);

  const updateDriverLicenseField = (
    field: keyof IDriverLicense,
    val: string
  ) => {
    setUserFormData((prev) => ({
      ...prev,
      driverLicense: {
        ...prev.driverLicense,
        [field]: val,
      },
    }));
  };

  // Конфиг для полей водительского удостоверения
  const driverFields = [
    { label: 'Фамилия', name: 'surname', required: true, type: 'text' },
    { label: 'Имя', name: 'name', required: true, type: 'text' },
    { label: 'Дата рождения', name: 'birthDate', required: true, type: 'date' },
    { label: 'Место рождения', name: 'birthPlace', required: false, type: 'text', hidden: true },
    { label: '№ удостоверения', name: 'licenceNumber', required: true, type: 'text' },
    { label: 'ИНН', name: 'personalNumber', required: true, type: 'text' },
    { label: 'Адрес проживания', name: 'residence', required: false, type: 'text' },
    { label: 'Орган выдачи', name: 'authority', required: false, type: 'text' },
    { label: 'Дата выдачи', name: 'issueDate', required: true, type: 'date' },
    { label: 'Дата истечения', name: 'expiryDate', required: true, type: 'date' },
  ];

  return (
    <div className='w-full relative border border-[#E5E7EB] rounded-[10px] overflow-hidden transition-colors mb-4'>
      <button
        type='button'
        className='w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-4 text-[#201F1F] text-[16px] outline-none transition-colors flex items-center justify-between'
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isLicenseValid ? (
          <img src={warning} alt='' className='size-[20px] absolute' />
        ) : (
          <img
            src={checked}
            alt=''
            className='size-[15px] absolute rounded-full'
          />
        )}
        <span className='font-semibold ml-[25px]'>
          Данные водительского удостоверения
        </span>
        <span className='ml-2 transition-transform duration-200'>
          <img src={dropdownArrow} alt='' />
        </span>
      </button>
      {isOpen && (
        <div className='w-full bg-white border border-[#E5E7EB] shadow-lg p-2'>
          {driverFields
            .slice()
            .sort((a, b) => {
              const aVal = driverLicense[a.name as keyof IDriverLicense];
              const bVal = driverLicense[b.name as keyof IDriverLicense];
              const aEmpty = isEmpty(typeof aVal === 'string' ? aVal : '');
              const bEmpty = isEmpty(typeof bVal === 'string' ? bVal : '');
              if (aEmpty === bEmpty) return 0;
              return aEmpty ? -1 : 1;
            })
            .map((field) => (
              <div className={field.hidden ? 'dropdown__details-card bg-white rounded-xl hidden flex-col gap-4 mb-4' : 'dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'} key={field.name}>
                <label className='text-[14px] font-medium text-[#6B7280] mb-1'>
                  {field.label}
                </label>
                <input
                  required={field.required}
                  type={field.type}
                  className={`litle-input ${field.type === 'date' ? 'w-full' : ''} bg-white rounded-[8px] py-2 px-3 text-[16px] placeholder:text-[#ADB0BA] outline-none border focus:ring-1 focus:ring-indigo-500`}
                  style={getInputStyle(
                    typeof driverLicense[field.name as keyof IDriverLicense] === 'string'
                      ? driverLicense[field.name as keyof IDriverLicense] as string
                      : ''
                  )}
                  value={
                    typeof driverLicense[field.name as keyof IDriverLicense] === 'string'
                      ? driverLicense[field.name as keyof IDriverLicense] as string
                      : ''
                  }
                  onChange={(e) =>
                    updateDriverLicenseField(field.name as keyof IDriverLicense, e.target.value)
                  }
                />
              </div>
            ))}
          {userFormData?.vehicle_cert?.vehicleCategory && (
            <div className='dropdown__details-card bg-white rounded-xl flex flex-col gap-2 mb-4'>
              <label className='text-[14px] font-medium text-[#6B7280]'>
                Категории
              </label>
              <input
                readOnly
                className='litle-input bg-white rounded-[8px] py-2 px-3 text-[14px] outline-none border focus:ring-1 focus:ring-indigo-500'
                style={{ borderColor: '#d1d5db' }}
                value={
                  userFormData.vehicle_cert.vehicleCategory +
                  driverLicense?.categories?.[
                    userFormData.vehicle_cert.vehicleCategory
                  ]
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverLicenseDropdown;
