import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import logo from '../assets/images/logo.png'

const ChooseForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [referalId, setReferalId] = useState('');

  useEffect(() => {
    if (id) {
      setReferalId(id);
    }
  }, [id]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-[10px] px-4'>
      <h2 className='font-bold text-center text-[28px]'>
        Онлайн оформление ОСАГО
      </h2>
      <img className='max-w-[300px]' src={logo} alt='' />
      <p className='text-center'>
        ЗАО «Бакай Иншуренс» является дочерней компанией ОАО «Бакай Банк», что
        является гарантом надежности и финансовой устойчивости бренда.
      </p>

      <div className='font-bold text-center text-[20px]'>
        Сколько водителей будет управлять автомобилем?
      </div>

      <Link
        to={`/documents-form/${referalId}`}
        className='button flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Один водитель
      </Link>

      <Link
        to={`/documents-form-2/${referalId}`}
        className='button flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Несколько водителей
      </Link>
    </div>
  );
};

export default ChooseForm;
