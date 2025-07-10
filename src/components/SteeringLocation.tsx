import { useState, type FC } from 'react';
import type { IFormData } from '../pages/DataForms';

import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

interface IProps {
  userFormData: IFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const LOCATIONS = [
  { label: 'Левый', value: 'LEFT' },
  { label: 'Правый', value: 'RIGHT' },
];

const SteeringLocation: FC<IProps> = ({ userFormData, setUserFormData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (loc: { label: string; value: string }) => {
    setUserFormData((prev) => ({
      ...prev,
      vehicle_cert: {
        ...prev.vehicle_cert,
        steeringLocation: loc.value,
      },
    }));
    setIsOpen(false);
  };

  const selected = LOCATIONS.find(
    (l) => l.value === userFormData.vehicle_cert.steeringLocation
  );

  return (
    <div>
      <h3 className='text-suptitle'>
        Расположение руля <span className='required text-red-500'>*</span>
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
            {selected ? selected.label : 'Выберите расположение руля'}
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
            {LOCATIONS.map((loc) => (
              <li
                key={loc.value}
                className='px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors'
                onClick={() => handleSelect(loc)}
              >
                {loc.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SteeringLocation;
