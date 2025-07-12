import { useState, type FC } from 'react';
import type { IFormData } from '../pages/DataForms';

import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

interface IProps {
  userFormData: IFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const ENGINE_TYPES = [
  { label: 'Двигатель внутреннего сгорания', value: 'ICE' },
  { label: 'Электродвигатель', value: 'ELECTRIC' },
];

const EngineType: FC<IProps> = ({ userFormData, setUserFormData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type: { label: string; value: string }) => {
    setUserFormData((prev) => ({
      ...prev,
      vehicle_cert: {
        ...prev.vehicle_cert,
        engineType: type.value,
      },
    }));
    setIsOpen(false);
  };

  const selected = ENGINE_TYPES.find(
    (t) => {
      if(userFormData.vehicle_cert.engineType) {
        return t.value === userFormData.vehicle_cert.engineType
      } else {
          if(userFormData.vehicle_cert.enginePower) {
            return t.value === 'ELECTRIC'
          } else if(userFormData.vehicle_cert.engineCapacity) {
            return t.value === 'ICE'
          }
      }
    }
  );

  return (
    <div>
      <h3 className='text-suptitle'>
        Тип двигателя <span className='required text-red-500'>*</span>
      </h3>
      <div className="relative w-full border rounded-[10px] overflow-hidden transition-colors border-[#E5E7EB]">
        <button
          type='button'
          className='w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between'
          onClick={() => setIsOpen(!isOpen)}
        >
          {!selected ? (
            <img src={warning} alt='' className='size-[20px] absolute' />
          ) : (
            <img
              src={checked}
              alt=''
              className='size-[15px] absolute rounded-full'
            />
          )}
          <span className='font-semibold ml-[25px]'>
            {selected ? selected.label : 'Выберите тип двигателя'}
          </span>
          <span className='ml-2 transition-transform duration-200'>
            <img src={dropdownArrow} alt='' />
          </span>
        </button>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full bg-white border border-[#E5E7EB] shadow-lg p-2`}
        >
          <ul className='space-y-2'>
            {ENGINE_TYPES.map((type) => (
              <li
                key={type.value}
                className='px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors'
                onClick={() => handleSelect(type)}
              >
                {type.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EngineType;
