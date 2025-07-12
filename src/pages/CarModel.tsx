import { useState, type FC } from 'react';
import { useGetCarModelsQuery, type ICarModel } from '../store/carApi';
import type { IFormData } from './DataForms';

import warning from '../assets/warning.svg';
import checked from '../assets/checked.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

interface IProps {
  userFormData: IFormData;
  setUserFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const CarModel: FC<IProps> = ({ userFormData, setUserFormData }) => {
  // Получаем brandId из userFormData, если нет — используем 1 для примера
  const brandId = userFormData.vehicle_cert.brandId ?? 1;
  const { data: carModels, isLoading, error } = useGetCarModelsQuery(brandId);
  const [isOpenModels, setIsOpenModels] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCarModelClick = (item: ICarModel) => {
    setUserFormData((prev) => ({
      ...prev,
      vehicle_cert: {
        ...prev.vehicle_cert,
        carModelId: item.id,
        carModelName: item.name,
      },
    }));
    setIsOpenModels(false);
  };

  if (!brandId) return null;

  return (
    <div>
      <h3 className='text-suptitle'>
        Модель автомобиля <span className='required text-red-500'>*</span>
      </h3>
      <div className='relative w-full border rounded-[10px] overflow-hidden transition-colors border-[#E5E7EB]'>
        <button
          type='button'
          className='w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between'
          onClick={() => setIsOpenModels(!isOpenModels)}
        >
          {!userFormData.vehicle_cert.carModelName ? (
            <img src={warning} alt='' className='size-[20px] absolute' />
          ) : (
            <img
              src={checked}
              alt=''
              className='size-[15px] absolute rounded-full'
            />
          )}
          <span className='font-semibold ml-[25px]'>
            {userFormData.vehicle_cert.carModelName || 'Выберите модель'}
          </span>
          <span className='ml-2 transition-transform duration-200'>
            <img src={dropdownArrow} alt='' />
          </span>
        </button>
        <div
          className={`${
            isOpenModels ? 'block' : 'hidden'
          } w-full bg-white border border-[#E5E7EB] shadow-lg p-2`}
        >
          {isLoading && <div className='px-4 py-2'>Загрузка...</div>}
          {error && (
            <div className='px-4 py-2 text-red-500'>Ошибка загрузки</div>
          )}
          <ul className='space-y-2'>
            <li>
              <input
                type='text'
                placeholder='Поиск модели'
                className='w-full border rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors'
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
            </li>
            {carModels
              ?.filter((item) => {
                if (inputValue.trim()) {
                  return item.name.toLowerCase().includes(inputValue.trim());
                } else {
                  return item;
                }
              })
              ?.map((model) => (
                <li
                  key={model.id}
                  className='px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors'
                  onClick={() => handleCarModelClick(model)}
                >
                  {model.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarModel;
