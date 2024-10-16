import {
  SettingOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileImageOutlined,
} from '@ant-design/icons';

import TabsContent from '@/components/TabsContent/TabsContent';

import CompanyLogoSettings from './CompanyLogoSettings';
import GeneralSettings from './GeneralSettings';
import CompanySettings from './CompanySettings';
import FinanceSettings from './FinanceSettings';
import MoneyFormatSettings from './MoneyFormatSettings';

import useLanguage from '@/locale/useLanguage';
import { useParams } from 'react-router-dom';

export default function Settings() {
  const translate = useLanguage();
  const { settingsKey } = useParams();
  const content = [
    {
      key: 'general_settings',
      label: translate('General Settings'),
      icon: <SettingOutlined />,
      children: <GeneralSettings />,
    },
    {
      key: 'company_settings',
      label: translate('Company Settings'),
      icon: <FileImageOutlined />,
      children: <CompanySettings />,
    },
    {
      key: 'currency_settings',
      label: translate('Currency Settings'),
      icon: <DollarOutlined />,
      children: <MoneyFormatSettings />,
    },
    {
      key: 'finance_settings',
      label: translate('Finance Settings'),
      icon: <CreditCardOutlined />,
      children: <FinanceSettings />,
    },
  ];

  const pageTitle = translate('Settings');

  return <TabsContent defaultActiveKey={settingsKey} content={content} pageTitle={pageTitle} />;
}
