import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { settingsAction } from '@/redux/settings/actions';
import { selectSettings } from '@/redux/settings/selectors';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';
import useLanguage from '@/locale/useLanguage';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';
import axios from 'axios';
import { fetchFieldValues } from '../CompanySettingsModule/SettingsForm';
import { getLogo } from '../CompanyLogoSettingsModule/forms/AppSettingForm';

export default function UpdateSettingForm({ config, children, withUpload, uploadSettingKey }) {
  let { entity, settingsCategory } = config;
  const dispatch = useDispatch();
  const { result, isLoading } = useSelector(selectSettings);
  const translate = useLanguage();
  const [form] = Form.useForm();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const adminID = currentAdmin?.id || '1';

  const onSubmit = async (fieldsValue) => {
    console.log('🚀 ~ onSubmit ~ fieldsValue:', fieldsValue);
    console.log(uploadSettingKey);
    if (withUpload) {
      try {
        const formData = new FormData();
        const logo = getLogo();
        formData.append('company_logo', logo); // Add the logo file to the form data
        const response = await axios.patch(`${API_BASE_URL}update-company/${companyID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        successHandler(response, {
          notifyOnSuccess: true, // Notify the user on success
          notifyOnFailed: false, // No failure notification since it's a success
        });
      } catch (error) {
        errorHandler(error, {
          notifyOnFailed: true, // Notify the user on failure
        });
      }
    } else {
      try {
        const companyID = '1'; // Replace with logic to get company ID

        const fieldValues = fetchFieldValues();
        const logo = getLogo();
        // Prepare form data for API request
        const formData = {
          company_name: fieldValues.company_name,
          company_address: fieldValues.company_address,
          country: fieldValues.company_country,
          email: fieldValues.company_email,
          phone_number: fieldValues.company_phone,
          company_website: fieldValues.company_website,
          tax_number: fieldValues.company_tax_number,
          vat_number: fieldValues.company_vat_number,
          reg_number: fieldValues.company_reg_number,
          company_logo: logo,
          adminID: adminID, // Include the admin ID in the payload
        };

        // Make the PATCH request
        const response = await axios.patch(`${API_BASE_URL}update-company/${companyID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        successHandler(response, {
          notifyOnSuccess: true, // Notify the user on success
          notifyOnFailed: false, // No failure notification since it's a success
        });
        // Handle success (e.g., show a success message or refresh the data)
      } catch (error) {
        errorHandler(error, {
          notifyOnFailed: true, // Notify the user on failure
        });
        // Handle error (e.g., show an error message)
      }
    }
  };

  useEffect(() => {
    if (result && result[settingsCategory]) {
      const current = result[settingsCategory];
      form.setFieldsValue(current); // Populate form with current settings
    }
  }, [result]);

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Form
          form={form}
          initialValues={result[settingsCategory] || {}}
          onFinish={onSubmit}
          // onValuesChange={handleValuesChange}
          labelCol={{ span: 10 }}
          labelAlign="left"
          wrapperCol={{ span: 16 }}
        >
          {children}
          <Form.Item
            style={{
              display: 'inline-block',
              paddingRight: '5px',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: '7px', backgroundColor: '#153fd6' }}
            >
              {translate('Save')}
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              paddingLeft: '5px',
            }}
          >
            {/* <Button onClick={() => console.log('Cancel clicked')}>{translate('Cancel')}</Button> */}
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}
