import { useEffect, useState, type FC } from 'react';
import { useGetPurposeQuery, type IPurpose } from '../store/purposeApi';
import type { IFormData } from '../pages/DataForms';

import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

interface IProps {
  userFormData: IFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const PurposeDropdown: FC<IProps> = ({ userFormData, setUserFormData }) => {
  const { data: purposes } = useGetPurposeQuery();
  const [isOpenUseCar, setIsOpenUseCar] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  const handlePurposeClick = (item: IPurpose) => {
    setUserFormData((prev) => ({
      ...prev,
      purpose: item,
    }));
    setIsOpenUseCar(false);
    setTouchedFields((prev) => ({ ...prev, purpose: true }));
  };

  useEffect(() => {
    if (userFormData.purpose.name) {
      handlePurposeClick({ id: 2, name: 'Личная' });
    }
  }, [])

  return (
    <div>
      <h3 className='text-suptitle'>
        Использование авто <span className='required text-red-500'>*</span>
      </h3>
      <div
        className={`relative w-full border rounded-[10px] overflow-hidden transition-colors ${
          touchedFields.purpose && userFormData.purpose.name === 'Выберите цель'
            ? 'border-red-500'
            : 'border-[#E5E7EB]'
        }`}
      >
        <button
          type='button'
          className='w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between'
          onClick={() => setIsOpenUseCar(!isOpenUseCar)}
          onBlur={() =>
            setTouchedFields((prev) => ({ ...prev, purpose: true }))
          }
        >
          {userFormData.purpose.name === 'Выберите цель' ? (
            <img src={warning} alt='' className='size-[20px] absolute' />
          ) : (
            <img
              src={checked}
              alt=''
              className='size-[15px] absolute rounded-full'
            />
          )}
          <span className='font-semibold ml-[25px]'>
            {userFormData.purpose.name}
          </span>
          <span className='ml-2 transition-transform duration-200'>
            <img src={dropdownArrow} alt='' />
          </span>
        </button>
        <div
          className={`${
            isOpenUseCar ? 'block' : 'hidden'
          } w-full bg-white border border-[#E5E7EB] shadow-lg p-2`}
        >
          <ul className='space-y-2'>
            {purposes?.map((purpose) => (
              <li
                key={purpose.id}
                className='px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors'
                onClick={() => handlePurposeClick(purpose)}
              >
                {purpose.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PurposeDropdown;
