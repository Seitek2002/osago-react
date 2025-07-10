import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Container from '../components/Container';
import { Link } from 'react-router';
import imgShield from '../assets/images/home-img.png';

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className='home min-h-screen text-white bg-gradient-to-b from-[#005CAA]/100 to-[#000C16]/100 box-border'>
      <Header title={t('home.title')} />
      <Container>
        <div className='home__content'>
          <div className='home__top flex justify-center pt-[35px]'>
            <img className='w-[105px]' src={imgShield} alt='shield' />
          </div>
          <div className='home__btns mt-[100px]'>
            <Link to='/choose-form' className='button block py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] mb-[16px] text-center'>
              <span className='text-[20px]'>{t('title')}</span>
              <br />
            </Link>
          </div>
        </div>
      </Container>

      <footer className='footer bg-[#2C2C2C] text-[#fff] py-8 text-sm leading-relaxed'>
        <Container>
          <div className='footer__content space-y-2 text-center'>
            <p className='footer__text'>{t('footer.GSO')}</p>
            <p>
              {t('footer.phoneNumber')}:
              <a href='tel:+996777394080' className='footer__link text-[#00A6FF] hover:underline'>
                +996 777 39 40 80
              </a>
            </p>
            <p>
              {t('footer.email')}:
              <a
                href='mailto:office@insurancebakai.kg'
                className='footer__link text-[#00A6FF] hover:underline'
              >
                office@insurancebakai.kg
              </a>
            </p>
            <p>{t('footer.address')}</p>
            <p>{t('footer.agentAddress')}</p>
            <p>{t('footer.agentInn')}</p>
            <p>{t('footer.OAO')}</p>
            <p>{t('footer.naming')}</p>
            <div className='footer__socials flex justify-center space-x-4 mt-4'>
              <a
                href='https://wa.me/996777394080'
                target='_blank'
                className='footer__social-link inline-block transition-transform transform hover:scale-110'
                aria-label='WhatsApp'
              >
                <svg
                  className='w-[35px]'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-label='WhatsApp'
                  role='img'
                  viewBox='0 0 512 512'
                >
                  <rect width='512' height='512' rx='15%' fill='#25d366' />
                  <path
                    fill='#25d366'
                    stroke='#ffffff'
                    strokeWidth='26'
                    d='M123 393l14-65a138 138 0 1150 47z'
                  />
                  <path
                    fill='#ffffff'
                    d='M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18'
                  />
                </svg>
              </a>
              <a
                href='https://t.me/yourTelegramUsername'
                target='_blank'
                className='footer__social-link inline-block transition-transform transform hover:scale-110'
                aria-label='Telegram'
              >
                <svg
                  className='w-[35px]'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-label='Telegram'
                  role='img'
                  viewBox='0 0 512 512'
                >
                  <rect width='512' height='512' rx='15%' fill='#37aee2' />
                  <path
                    fill='#c8daea'
                    d='M199 404c-11 0-10-4-13-14l-32-105 245-144'
                  />
                  <path fill='#a9c9dd' d='M199 404c7 0 11-4 16-8l45-43-56-34' />
                  <path
                    fill='#f6fbfe'
                    d='M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4'
                  />
                </svg>
              </a>
            </div>
            <p className='footer__copyright mt-4 text-xs text-[#AFAFAF]'>{t('footer.roots')}</p>
          </div>
        </Container>
      </footer>
    </section>
  );
};

export default Home;
