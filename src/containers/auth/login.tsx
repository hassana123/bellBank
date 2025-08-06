import { useState } from 'react';
//import { LoginOutlined } from '@ant-design/icons';
import Form from '~/components/controls/form';
import { Checkbox } from '~/components/controls';
import { Button } from '~/components/controls/';
import AuthFormWrapper from '~/components/controls/AuthFormWrapper';
import InputField from '~/components/controls/InputField';
import { LOGO_IMAGE } from '~/config';
import { useLoginMutation } from '~/store/queries/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '~/store/contexts';
import { CSRF_TOKEN } from '~/config';
interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginContainer() {
  const [form] = Form.useForm();
  const [remember, setRemember] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();
  console.log(CSRF_TOKEN);
  
  const loginMutation = useLoginMutation({
    onSuccess(response) {
      login(response.data);
      navigate('/dashboard');
      console.log(response);
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };
  console.log(CSRF_TOKEN, "hey");

  return (
    <AuthFormWrapper>
      <div className="text-center mb-2">
        <img
          src={LOGO_IMAGE || "/placeholder.svg"}
          alt="BellCollect Logo"
          className="mx-auto  mb-2"
        />
        {/* <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <LoginOutlined className="text-2xl text-primary" />
        </div> */}
        <h1 className="text-md  font-bold text-gray-700 mb-2">Welcome back</h1>
        <p className="text-gray-600 text-sm ">Sign in to your BellCollect account</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-5"
      >
        <InputField
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        />

        <InputField
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          rules={[
            { required: true, message: 'Password is required' },
          ]}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              label="Remember this device"
              name="remember"
            />
          </div>
          <a
            href="/forgot-password"
            className="text-primary font-medium hover:text-primary/80 transition-colors text-sm"
          >
            Forgot Password?
          </a>
        </div>

        <Button
          size="large"
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-12 rounded-lg transition-all duration-200"
          loading={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </Form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-600">
          New to BellCollect?{' '}
          <a href="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Create an account
          </a>
        </p>
      </div>
    </AuthFormWrapper>
  );
}
