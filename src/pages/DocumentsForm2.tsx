import React from 'react';
import { useParams, useNavigate  } from 'react-router';
import { useRecognizeDocumentMutation } from '../store/ocrApi';

import passportFrontSide from '../assets/images/passport-front-side.png';
import passportBackSide from '../assets/images/passport-back-side.png';
import tp_front from '../assets/images/tp_front.png';
import tp_back from '../assets/images/tp_back.png';
import loader from '../assets/loader.svg';

const RemoveIcon = ({ onClick }: { onClick: React.MouseEventHandler }) => (
  <svg
    width='20'
    height='21'
    viewBox='0 0 20 21'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='absolute top-0 right-0 z-[1] bg-white rounded cursor-pointer'
    onClick={onClick}
    style={{ boxShadow: '0 0 2px #0002' }}
  >
    <path
      d='M16.5 4L3.5 17'
      stroke='#E54335'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.5 4L16.5 17'
      stroke='#E54335'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    id='Layer_2'
    height='25'
    viewBox='0 0 512 512'
    width='25'
    xmlns='http://www.w3.org/2000/svg'
    data-name='Layer 2'
    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]'
  >
    <defs>
      <linearGradient
        id='linear-gradient'
        gradientTransform='matrix(-1 0 0 -1 512 512)'
        gradientUnits='userSpaceOnUse'
        x1='43.93'
        x2='468.07'
        y1='43.93'
        y2='468.07'
      >
        <stop offset='0' stopColor='#2492ff' />
        <stop offset='1' stopColor='#0043ae' />
      </linearGradient>
    </defs>
    <g id='Icon'>
      <g id='_70' data-name='70'>
        <rect
          id='Background'
          fill='url(#linear-gradient)'
          height='512'
          rx='150'
          transform='matrix(-1 0 0 -1 512 512)'
          width='512'
        />
        <g fill='#fff'>
          <path d='m183.47 197.72 47.53 47.53v-129.52c0-13.81 11.19-25 25-25 13.81 0 25 11.19 25 25v129.52l47.53-47.53c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36l-90.21 90.21c-9.76 9.76-25.59 9.76-35.36 0l-90.21-90.21c-9.76-9.76-9.76-25.59 0-35.36 9.76-9.76 25.59-9.76 35.36 0z' />
          <rect height='50' rx='25' width='250' x='131' y='371.27' />
        </g>
      </g>
    </g>
  </svg>
);

const DocumentsForm2: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [passportFront, setPassportFront] = React.useState<File | null>(null);
  const [passportBack, setPassportBack] = React.useState<File | null>(null);
  const [tpFront, setTpFront] = React.useState<File | null>(null);
  const [tpBack, setTpBack] = React.useState<File | null>(null);

  const [personalDataChecked, setPersonalDataChecked] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const isValid = Boolean(
    passportFront && passportBack && tpFront && tpBack && personalDataChecked
  );

  const [recognizeDocument, { isLoading, isError }] =
    useRecognizeDocumentMutation();

  const handleSend = async () => {
    setErrorMsg(null);
    if (
      !passportFront ||
      !passportBack ||
      !tpFront ||
      !tpBack ||
      !personalDataChecked
    )
      return;
    try {
      // Паспорт
      const passportRes = await recognizeDocument({
        documentType: 'passport',
        front: passportFront,
        back: passportBack,
      }).unwrap();

      const vehicleRes = await recognizeDocument({
        documentType: 'vehicle_cert',
        front: tpFront,
        back: tpBack,
      }).unwrap();
      localStorage.setItem('ocrData', JSON.stringify({
        passport: passportRes,
        vehicle_cert: vehicleRes
      }));
      navigate('/data-forms-2');
    } catch (err: any) {
      setErrorMsg(
        err?.data?.error ||
          err?.error ||
          (typeof err === 'string' ? err : 'Ошибка при отправке запроса')
      );
    }
  };

  return (
    <section className='passport py-14 pb-[100px]'>
      <div className='mx-auto px-4 max-w-[1200px]'>
        <h2 className='text-[#000B16] text-[20px] font-semibold mb-4'>
          Загрузка документов
        </h2>

        {/* Блок загрузки паспорта */}
        <div className='mb-[30px]'>
          <h2 className='mb-[12px] text-[16px] font-medium'>Паспорт</h2>
          <div className='grid grid-cols-2 gap-[12px]'>
            {/* Лицевая сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {passportFront ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setPassportFront(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(passportFront)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={passportFrontSide}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Лицевая сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setPassportFront(e.target.files![0])}
              />
            </label>

            {/* Обратная сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {passportBack ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setPassportBack(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(passportBack)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={passportBackSide}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Обратная сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setPassportBack(e.target.files![0])}
              />
            </label>
          </div>
          <div className='text-red-500 text-center text-[13px] -mt-2 mb-[20px] hidden'>
            Ошибка сканирования или загрузки документа
          </div>
        </div>

        {/* Блок загрузки свидетельства */}
        <div className='mb-[30px]'>
          <h2 className='mb-[12px] text-[16px] font-medium'>
            Свидетельство о регистрации ТС
          </h2>
          <div className='grid grid-cols-2 gap-[12px]'>
            {/* Лицевая сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {tpFront ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setTpFront(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(tpFront)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={tp_front}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Лицевая сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setTpFront(e.target.files![0])}
              />
            </label>

            {/* Обратная сторона */}
            <label className='relative flex flex-col cursor-pointer'>
              <div className='relative w-full h-[150px] border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center'>
                {tpBack ? (
                  <div className='relative h-full w-full flex items-center justify-center'>
                    <RemoveIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setTpBack(null);
                      }}
                    />
                    <img
                      src={URL.createObjectURL(tpBack)}
                      alt=''
                      className='object-contain max-h-full max-w-full'
                    />
                  </div>
                ) : (
                  <div className='relative h-full w-full flex justify-center items-center'>
                    <UploadIcon />
                    <img
                      className='file-upload-image blur-sm object-contain'
                      src={tp_back}
                      alt='Изображение'
                    />
                  </div>
                )}
              </div>
              <div className='text-center mt-2 text-[14px]'>
                Обратная сторона
              </div>
              <input
                type='file'
                className='hidden'
                onChange={(e) => setTpBack(e.target.files![0])}
              />
            </label>
          </div>
          {/* Блок ошибки */}
          {(isError || errorMsg) && (
            <div className='text-red-500 text-center text-[13px] mt-2 mb-[20px]'>
              Ошибка сканирования или загрузки документа
            </div>
          )}
        </div>

        {/* Блок ввода реферального ID */}
        <div className='form-group mb-6'>
          <div
            className='text-blue-500 py-2 rounded mb-2 underline text-[13px]'
            role='button'
          >
            Указать ID участника (необязательно)
          </div>
          {params.id && (
            <>
              <label htmlFor='referal-id' className='text-[14px] block'>
                ID участника команды (необязательно)
              </label>
              <input
                type='text'
                id='referal-id'
                placeholder='Введите ID'
                className='w-full mt-[12px] bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none'
              />
            </>
          )}
        </div>
        {/* Чекбокс согласия */}
        <div className='passport__bottom flex flex-col gap-[20px] mt-[60px]'>
          <label className='flex items-center gap-[14px] text-[13px]'>
            <input
              type='checkbox'
              className='appearance-none border-2 border-[#005CAA] w-5 h-5 rounded-[3px] personal-checkbox'
              checked={personalDataChecked}
              onChange={(e) => setPersonalDataChecked(e.target.checked)}
            />
            Согласие на обработку персональных данных
          </label>
        </div>
        {/* Кнопка "Далее" */}
        <div className='w-full mt-[40px]'>
          <button
            type='button'
            disabled={!isValid || isLoading}
            className='flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-white text-[16px] mb-[16px] disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleSend}
          >
            Далее
          </button>
        </div>
        {/* Модальное окно загрузки */}
        {isLoading && (
          <div className='fixed z-[10000] top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]'>
            <div className='w-[50%] h-[40%] bg-white flex flex-col items-center justify-center rounded'>
              <img src={loader} alt='' />
              <p className='text-center text-[16px]'>
                Идет сканирование документов
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentsForm2;
