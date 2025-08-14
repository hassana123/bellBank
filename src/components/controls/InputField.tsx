//import  { useState } from 'react';
import { Form, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  rules?: any[];
  validateTrigger?: string[];
  onBeforeInput?: (e: any) => void;
  className?: string;
}

export default function InputField({
  label,
  name,
  placeholder,
  type = 'text',
  rules,
  validateTrigger,
  onBeforeInput,
  className = '',
}: InputFieldProps) {
  //const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  
  

  return (
    <Form.Item
      label={<span className="text-sm font-medium dark:text-white text-gray-700">{label}</span>}
      name={name}
      rules={rules}
      validateTrigger={validateTrigger}
      className={className}
    >
      {isPasswordField ? (
        <Input.Password
          placeholder={placeholder}
          onBeforeInput={onBeforeInput}
          className="h-11 rounded-lg border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined className="text-gray-400 hover:text-primary transition-colors" />
            ) : (
              <EyeInvisibleOutlined className="text-gray-400 hover:text-primary transition-colors" />
            )
          }
        />
      ) : (
        <Input
          placeholder={placeholder}
          type={type}
          onBeforeInput={onBeforeInput}
          className="h-11 rounded-lg border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      )}
    </Form.Item>
  );
}
