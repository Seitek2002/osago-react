import { useEffect, useState } from 'react';
import {
  useCalculateMutation,
  useCreatePolicyMutation,
} from '../store/calculateApi';
import type { IInsuranceData } from '../types';

function getFutureDate(period: string): string {
  const date = new Date();

  switch (period) {
    case '15 дней':
      date.setDate(date.getDate() + 15);
      break;
    case '1 месяц':
      date.setMonth(date.getMonth() + 1);
      break;
    case '3 месяца':
      date.setMonth(date.getMonth() + 3);
      break;
    case '6 месяцев':
      date.setMonth(date.getMonth() + 6);
      break;
    case '9 месяцев':
      date.setMonth(date.getMonth() + 9);
      break;
    case '12 месяцев':
      date.setDate(date.getDate() + 364);
      break;
    default:
      throw new Error('Неподдерживаемый период: ' + period);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function Calculator2() {
  const [calculate] = useCalculateMutation();
  const [createPolicy, { isLoading }] = useCreatePolicyMutation();
  const [coef, setCoef] = useState('');
  const [formData, setFormData] = useState<IInsuranceData>(
    JSON.parse(localStorage.getItem('calculateData') || '{}')
  );
  const [diagnosticCard, setDiagnosticCard] = useState('false');
  const [previousAgreement, setPreviousAgreement] = useState('0');
  const [amount, setAmount] = useState('0');
  const [insuranceDuration, setInsuranceDuration] = useState<string>('12 месяцев');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEmpty = (val?: string | null) => !val || val.trim() === '';

  const getInputStyle = (value?: string | null) => ({
    borderColor: isEmpty(value) ? '#ef4444' : '#d1d5db',
  });

  const getData = async (data: IInsuranceData) => {
    try {
      const res = await calculate(data).unwrap();
      if (res) {
        setCoef(res.vehicleTypeCoefficient);
        setAmount(res.amount.toFixed(2));
      } else {
        setCoef('1');
      }
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.data.keep24 || 'Ошибка');
    }
  };

  useEffect(() => {
    getData(formData);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFormData((prev) => ({
      ...prev,
      vehicleTypeCoefficient: coef,
    }));

    try {
      const res = await createPolicy({
        ...formData,
        phoneNumber: formData.phoneNumber,
        vehicleTypeCoefficient: coef,
      }).unwrap();

      if (
        typeof res === 'object' &&
        res !== null &&
        'result' in res &&
        (res as any).result === 206 &&
        'message' in res
      ) {
        setErrorMessage((res as { message: string }).message);
      } else {
        setErrorMessage(null);
      }
      window.open(res.paymentUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      // Если сервер вернул ошибку с result === 206
      const errorData = (err as any)?.data;
      if (
        errorData &&
        typeof errorData === 'object' &&
        'result' in errorData &&
        errorData.result === 206 &&
        'message' in errorData
      ) {
        setErrorMessage(errorData.message);
      } else {
        console.log(errorData.keep24.message);
        setErrorMessage(errorData.keep24.message || 'Ошибка');
      }
    }
  };

  return (
    <section className='calculator pt-14 pb-5'>
      <form className='max-w-[800px] mx-auto px-4' onSubmit={handleSubmit}>
        <div className='calculator__content space-y-4'>
          <h2 className='text-title text-2xl font-bold'>Калькулятор ОСАГО</h2>
          <h3 className='text-suptitle font-semibold'>
            Есть ли у Вас диагностическая карта?{' '}
            <span className='text-[#FC3400]'>*</span>
          </h3>
          <div className='radio-group grid grid-cols-2 gap-5'>
            <label className='flex items-center bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm p-[12px]'>
              <input
                type='radio'
                value={'true'}
                checked={diagnosticCard === 'true'}
                onChange={() => {
                  setDiagnosticCard('true');
                  setFormData((prev) => {
                    return {
                      ...prev,
                      technicalInspection: true,
                    };
                  });
                }}
                className='mr-2'
              />
              Да
            </label>
            <label className='flex items-center bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm p-[12px]'>
              <input
                type='radio'
                value='false'
                checked={diagnosticCard === 'false'}
                onChange={() => {
                  setDiagnosticCard('false');
                  setFormData((prev) => {
                    return {
                      ...prev,
                      technicalInspection: false,
                    };
                  });
                }}
                className='mr-2'
              />
              Нет
            </label>
          </div>

          {diagnosticCard === 'true' ? (
            <>
              <div className='form-group mt-4'>
                <label className='text-suptitle block' htmlFor='number'>
                  Номер технического осмотра{' '}
                  <span className='required text-red-500'>*</span>
                </label>
                <input
                  required
                  type='text'
                  id='number'
                  placeholder=''
                  className='form-input mt-[12px] w-full bg-[#F7F8FA] rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 border'
                  style={getInputStyle(formData.technicalInspectionNumber)}
                  value={formData.technicalInspectionNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      technicalInspectionNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className='form-group mt-4'>
                <label className='text-suptitle block' htmlFor='date'>
                  Дата выдачи технического осмотра{' '}
                  <span className='required text-red-500'>*</span>
                </label>
                <input
                  required
                  type='date'
                  id='date'
                  className='form-input mt-[12px] w-full bg-[#F7F8FA] rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 border'
                  style={getInputStyle(formData.technicalInspectionIssuingDate)}
                  value={formData.technicalInspectionIssuingDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      technicalInspectionIssuingDate: e.target.value,
                    }))
                  }
                />
              </div>
            </>
          ) : (
            <div></div>
          )}

          <h3 className='text-suptitle font-semibold hidden'>
            Заключали ли Вы раньше договор ОСАГО?{' '}
            <span className='text-[#FC3400]'>*</span>
          </h3>
          <div className='radio-group grid grid-cols-2 gap-5 hidden'>
            <label className='flex items-center bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm p-[12px]'>
              <input
                type='radio'
                value='1'
                checked={previousAgreement === '1'}
                onChange={() => setPreviousAgreement('1')}
                className='mr-2'
              />
              Да
            </label>
            <label className='flex items-center bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm p-[12px]'>
              <input
                type='radio'
                value='0'
                checked={previousAgreement === '0'}
                onChange={() => setPreviousAgreement('0')}
                className='mr-2'
              />
              Нет
            </label>
          </div>
          <h3 className='text-suptitle font-semibold'>
            Укажите срок страхования <span className='text-[#FC3400]'>*</span>
          </h3>
          <div className='insurance-duration grid grid-cols-3 gap-[8px]'>
            {[
              '15 дней',
              '1 месяц',
              '3 месяца',
              '6 месяцев',
              '9 месяцев',
              '12 месяцев',
            ].map((val) => (
              <div
                key={val}
                onClick={() => {
                  setInsuranceDuration(val);
                  setFormData((prev) => ({
                    ...prev,
                    endDate: getFutureDate(val),
                  }));
                }}
                className={`px-4 py-2 border rounded-lg text-[14px] text-center ${
                  insuranceDuration === val
                    ? 'border-[#005CAA] bg-[#005CAA14]'
                    : ''
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
        <div className='bg-white mt-[50px]'>
          <div className='flex items-center justify-between border-t-[2px] py-[5px]'>
            <h3>Стоимость:</h3>
            <b className='text-[22px]'>{amount} сом</b>
          </div>
          <footer className='footer w-full mt-[40px]'>
            <div className='footer__content w-full'>
              <button
                type='submit'
                disabled={isLoading}
                className='flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] mb-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Идет рассчет...' : 'Оплатить'}
              </button>
              {errorMessage && (
                <div className="text-red-600 text-sm mt-2 text-center whitespace-pre-line">
                  {errorMessage}
                </div>
              )}
            </div>
          </footer>
          <p className='text-[12px]'>
            Тут может быть дополнительная информация о цене
          </p>
        </div>
      </form>
    </section>
  );
}
