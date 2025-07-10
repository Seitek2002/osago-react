import { useTranslation } from 'react-i18next';
import Container from './Container';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

interface IProps {
  title?: string;
  type?: string;
}

const Header: FC<IProps> = ({ title, type }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleLangSwitch = () => {
    i18n.changeLanguage(i18n.language === 'kg' ? 'ru' : 'kg');
  };

  return (
    <header
      className={
        type === 'services'
          ? 'text-[#191D23] bg-white fixed top-0 left-0 w-full py-[16px] z-20'
          : 'fixed top-0 left-0 w-full py-[16px] z-20 text-[#fff]'
      }
    >
      <Container>
        <div className='relative flex justify-center'>
          {title !== t('home.title') && (
            <svg
              width='25'
              height='24'
              viewBox='0 0 25 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute top-0 left-0 cursor-pointer'
              onClick={() => navigate(-1)}
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.061 6.90909L8.14862 11.0226C8.24705 11.0077 8.34784 11 8.45044 11L20.4504 11V13L8.17014 13H6.45044H5.4033L4.4522 12L12.061 4C12.825 4.80332 12.825 6.10577 12.061 6.90909ZM6.3544 14H9.12124L12.061 17.0909C12.825 17.8942 12.825 19.1967 12.061 20L6.3544 14Z'
                fill={ type === 'services' ? '#040D1C' : '#fff' }
              />
            </svg>
          )}
          <span style={{ paddingRight: type === 'services' ? '0' : '50px' }}>{title || 'ОСАГО'}</span>
          <span
            className='lang-switch'
            style={{
              color: '#000',
              position: 'absolute',
              right: '-10px',
              top: 0,
              cursor: 'pointer',
              background: 'white',
              padding: '0 10px',
            }}
            onClick={handleLangSwitch}
          >
            {i18n.language === 'kg' ? 'Русский' : 'Кыргызча'}
          </span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
