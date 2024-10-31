import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'Ireme Software'}
      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://ireme-software.vercel.app">www.ireme-software.co.rw</a>{' '}
          </p>
          <p>
            Email : <a href="ireme.software@gmail.com">ireme.software@gmail.com</a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://ireme-software.vercel.app`);
            }}
            style={{ borderRadius: '7px', backgroundColor: '#153fd6' }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
