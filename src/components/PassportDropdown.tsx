import { useMemo, useState, type FC } from 'react';
import type { IFormData } from '../pages/DataForms';

import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

interface IProps {
  userFormData: IFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  isPassportValid: boolean;
}

const PassportDropdown: FC<IProps> = ({
  userFormData,
  setUserFormData,
  isPassportValid,
}) => {
  const [isOpenPassport, setIsOpenPassport] = useState(false);
  const isEmpty = (val?: string | null) => !val || val.trim() === '';

  const getInputStyle = (value?: string | null) => ({
    borderColor: isEmpty(value) ? '#ef4444' : '#d1d5db',
  });

  // Конфиг для полей паспорта
  const passportFields = [
    { label: 'Фамилия', name: 'surname', required: true, type: 'text' },
    { label: 'Имя', name: 'name', required: true, type: 'text' },
    { label: 'Отчество', name: 'patronymic', required: false, type: 'text' },
    {
      label: 'Пол',
      name: 'gender',
      required: false,
      type: 'text',
      dropdown: true,
      options: [
        {
          label: 'Мужской',
          value: 'MALE',
        },
        {
          label: 'Женский',
          value: 'FEMALE',
        },
        {
          label: 'Не указан',
          value: '',
        },
      ],
    },
    { label: 'Дата рождения', name: 'birthDate', required: true, type: 'date' },
    { label: 'ИНН', name: 'personalNumber', required: true, type: 'text' },
    { label: 'Серия', name: 'series', required: false, type: 'text' },
    { label: 'Номер', name: 'number', required: false, type: 'text' },
    { label: 'Дата выдачи', name: 'issueDate', required: true, type: 'date' },
    {
      label: 'Дата истечения',
      name: 'expiryDate',
      required: false,
      type: 'date',
      hidden: true,
    },
    {
      label: 'Место рождения',
      name: 'birthPlace',
      required: false,
      type: 'text',
      hidden: true,
    },
    {
      label: 'Орган выдачи',
      name: 'authority',
      required: false,
      type: 'text',
      hidden: true,
    },
    {
      label: 'Этническая принадлежность',
      name: 'ethnicity',
      required: false,
      type: 'text',
      hidden: true,
    },
  ];

  const sortedFields = useMemo(() => {
    return passportFields.slice().sort((a, b) => {
      const aVal =
        userFormData.passport[a.name as keyof typeof userFormData.passport];
      const bVal =
        userFormData.passport[b.name as keyof typeof userFormData.passport];
      const aEmpty = isEmpty(typeof aVal === 'string' ? aVal : '');
      const bEmpty = isEmpty(typeof bVal === 'string' ? bVal : '');
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
        onClick={() => setIsOpenPassport(!isOpenPassport)}
      >
        {!isPassportValid ? (
          <img src={warning} alt='' className='size-[20px] absolute' />
        ) : (
          <img
            src={checked}
            alt=''
            className='size-[15px] absolute rounded-full'
          />
        )}
        <span className='font-semibold ml-[25px]'>Данные ID паспорта</span>
        <span className='ml-2 transition-transform duration-200'>
          <img src={dropdownArrow} alt='' />
        </span>
      </button>
      <div
        className={`${
          isOpenPassport ? 'block' : 'hidden'
        } w-full bg-white border border-[#E5E7EB] shadow-lg p-2`}
      >
        <div>
          {sortedFields.map((field) => {
            return (
              <div
                className={
                  field.hidden
                    ? 'dropdown__details-card bg-white rounded-xl hidden flex-col gap-4 mb-4'
                    : 'dropdown__details-card bg-white rounded-xl flex flex-col gap-4 mb-4'
                }
                key={field.name}
              >
                <div className='dropdown__detail flex flex-col gap-1'>
                  <span className='litle-title text-[#6B7280] text-[14px] font-medium mb-1'>
                    {field.label}
                  </span>
                  {field.dropdown ? (
                    <select
                      required={field.required}
                      className={`litle-input bg-white rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors border focus:ring-1 focus:ring-indigo-500 appearance-none bg-[url('/arrow.svg')] bg-no-repeat bg-[position:right_0.7rem_top_50%] bg-[length:0.65rem_auto]`}
                      style={getInputStyle(
                        typeof userFormData.passport[
                          field.name as keyof typeof userFormData.passport
                        ] === 'string'
                          ? userFormData.passport[
                              field.name as keyof typeof userFormData.passport
                            ]
                          : ''
                      )}
                      value={
                        typeof userFormData.passport[
                          field.name as keyof typeof userFormData.passport
                        ] === 'string'
                          ? userFormData.passport[
                              field.name as keyof typeof userFormData.passport
                            ]
                          : ''
                      }
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          passport: {
                            ...userFormData.passport,
                            [field.name]: e.target.value,
                          },
                        })
                      }
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required={field.required}
                      type={field.type}
                      className={`litle-input ${
                        field.type === 'date' ? 'w-full' : ''
                      } bg-white rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors border focus:ring-1 focus:ring-indigo-500`}
                      style={getInputStyle(
                        userFormData.passport[
                          field.name as keyof typeof userFormData.passport
                        ]
                      )}
                      value={
                        userFormData.passport[
                          field.name as keyof typeof userFormData.passport
                        ] || ''
                      }
                      onChange={(e) =>
                        setUserFormData((prev: IFormData) => ({
                          ...prev,
                          passport: {
                            ...prev.passport,
                            [field.name]: e.target.value,
                          },
                        }))
                      }
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PassportDropdown;
