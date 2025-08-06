import Form from "~/components/controls/form";
import { useState } from "react";
//import { UserAddOutlined } from '@ant-design/icons';
import InputField from "~/components/controls/InputField";
import { Checkbox } from "~/components/controls";
import { Button } from "~/components/controls/";
import AuthFormWrapper from "~/components/controls/AuthFormWrapper";
import { LOGO_IMAGE } from "~/config";
import {
  nameRules,
  phoneRules,
  emailRules,
  passwordRules,
  confirmPasswordRules,
} from "~/utils/validations/registerValidation";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterContainer() {
  const [form] = Form.useForm<RegisterFormValues>();
  const [agreed, setAgreed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Submitted values:", values);
      setLoading(false);
    }, 2000);
  };

  return (
    <AuthFormWrapper>
      <div className="text-center mb-2">
        <img
          src={LOGO_IMAGE || "/placeholder.svg"}
          alt="BellCollect Logo"
          className="mx-auto mb-2"
        />
        {/* <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserAddOutlined className="text-2xl text-primary" />
        </div> */}
        <h1 className="text-md  font-bold text-gray-700 mb-2">Create your account</h1>
        <p className="text-gray-600 text-sm ">Join thousands of businesses using BellCollect</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-5"
      >
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-700">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              rules={nameRules}
              validateTrigger={["onChange", "onBlur"]}
              onBeforeInput={(e) => {
                if (!/^[a-zA-Z\s\-']$/.test(e.data)) {
                  e.preventDefault();
                }
              }}
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              rules={nameRules}
              validateTrigger={["onChange", "onBlur"]}
              onBeforeInput={(e) => {
                if (!/^[a-zA-Z\s\-']$/.test(e.data)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        {/* Business Information Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-700">Business Information</h3>
          </div>
          
          <InputField
            label="Business Name"
            name="businessName"
            placeholder="Enter your business name"
            rules={[{ required: true, message: "Business name is required" }]}
            validateTrigger={["onChange", "onBlur"]}
          />
          
          <InputField
            label="Phone Number"
            name="phone"
            placeholder="11 digits (e.g., 08012345678)"
            rules={phoneRules}
            validateTrigger={["onChange", "onBlur"]}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault();
              }
            }}
          />
        </div>

        {/* Security Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-700">Account Security</h3>
          </div>
          
          <InputField
            label="Email Address"
            name="email"
            placeholder="Enter your email address"
            rules={emailRules}
            validateTrigger={["onChange", "onBlur"]}
          />
          
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            rules={passwordRules}
            validateTrigger={["onChange", "onBlur"]}
          />
          
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            rules={confirmPasswordRules(form.getFieldValue)}
            validateTrigger={["onChange", "onBlur"]}
          />
        </div>

        {/* Terms Agreement */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label=""
              className="mt-1"
            />
            <div className="text-sm text-gray-600 leading-relaxed">
              I agree to BellCollect's{' '}
              <a href="/terms" className="text-primary hover:text-primary/80 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:text-primary/80 font-medium">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <Button
          size="large"
          disabled={!agreed}
          loading={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-12 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Sign In
          </a>
        </p>
      </div>
    </AuthFormWrapper>
  );
}
