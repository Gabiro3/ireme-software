import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Select, Switch, Upload, Button, message, Image } from 'antd';
import { CloseOutlined, CheckOutlined, UploadOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios for making API requests
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { Buffer } from 'buffer';
let values = [];
let logoFile = null;
const formItems = [
  {
    settingKey: 'company_name',
    valueType: 'string',
  },
  {
    settingKey: 'company_address',
    valueType: 'string',
  },
  {
    settingKey: 'company_state',
    valueType: 'string',
  },
  {
    settingKey: 'company_country',
    valueType: 'string',
  },
  {
    settingKey: 'company_email',
    valueType: 'string',
  },
  {
    settingKey: 'company_phone',
    valueType: 'string',
  },
  {
    settingKey: 'company_website',
    valueType: 'string',
  },
  {
    settingKey: 'company_tax_number',
    valueType: 'string',
  },
  {
    settingKey: 'company_vat_number',
    valueType: 'string',
  },
  {
    settingKey: 'account_number',
    valueType: 'string',
  },
];

const SettingForm = () => {
  const [form] = Form.useForm(); // Initialize form instance
  const translate = useLanguage();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const adminID = currentAdmin?.id || '1'; // Assume adminID is in the redux store
  const [logoUrl, setLogoUrl] = useState(null);

  const formRef = useRef(form);
  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      console.log(`${API_BASE_URL}company`);
      const response = await axios.get(`${API_BASE_URL}company`, {
        params: { adminID }, // Send adminID as query parameter
      });
      const companyData = response.data.company;

      // Populate the form with fetched data
      form.setFieldsValue({
        company_name: companyData.company_name,
        company_address: companyData.company_address,
        company_state: companyData.country,
        company_country: companyData.country,
        company_email: companyData.email,
        company_phone: companyData.phone_number,
        company_website: companyData.website,
        company_tax_number: companyData.tax_number,
        company_vat_number: companyData.vat_number,
        account_number: companyData.reg_number,
      });
      let base64 = Buffer.from(companyData.company_logo.data).toString('base64');
      setLogoUrl(`data:image/png;base64,${base64}`);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  // Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    formRef.current = form;
    if (adminID) {
      fetchCompanyData();
    }
    values = formRef.current.getFieldsValue();
  }, [adminID]);
  const handleFormChange = (changedValues, allValues) => {
    values = allValues; // Update the current form values
  };
  // Handle logo upload
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must be smaller than 5MB!');
    }
    logoFile = file;
    return false;
  };

  return (
    <Form form={form} onValuesChange={handleFormChange}>
      {logoUrl && (
        <Form.Item label={translate('Current Company Logo')}>
          <Image
            src={logoUrl}
            alt="Company Logo"
            style={{ maxWidth: '150px', marginBottom: '20px' }} // You can adjust the size here
          />
        </Form.Item>
      )}
      <Form.Item
        name="file"
        label={translate('Change logo')}
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload
          beforeUpload={beforeUpload}
          listType="picture"
          accept="image/png, image/jpeg"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>{translate('click_to_upload')}</Button>
        </Upload>
      </Form.Item>
      {formItems.map((item) => {
        return (
          <Form.Item
            key={item.settingKey}
            label={item.label ? translate(item.label) : translate(item.settingKey)}
            name={item.settingKey}
            rules={[
              {
                required: false,
              },
            ]}
            valuePropName={item.valueType === 'boolean' ? 'checked' : 'value'}
          >
            {item.valueType === 'string' && <Input autoComplete="off" />}
            {item.valueType === 'number' && <InputNumber min={0} style={{ width: '100%' }} />}
            {item.valueType === 'boolean' && (
              <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            )}
            {item.valueType === 'array' && (
              <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
            )}
          </Form.Item>
        );
      })}
    </Form>
  );
};

// Export both the component and the fetchFieldValues function
export const fetchFieldValues = () => {
  return values; // Retrieve current form values
}; // Export the function
export const getLogo = () => logoFile;
export default SettingForm;
