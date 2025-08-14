import Form from "~/components/controls/form";
import { useState } from "react";
import InputField from "~/components/controls/InputField";
import { Checkbox } from "~/components/controls";
import { Button } from "~/components/controls";
import AuthFormWrapper from "~/components/controls/AuthFormWrapper";
import { LOGO_IMAGE } from "~/config";
import {
  nameRules,
  phoneRules,
  emailRules,
  passwordRules,
  confirmPasswordRules,
} from "~/utils/validations/registerValidation";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "~/store/contexts/alert";


interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string; // Renamed from businessName
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export default function RegisterContainer() {
  const [form] = Form.useForm<RegisterFormValues>();
  const [agreed, setAgreed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { error: showError } = useAlertContext();

  
  return (
    <AuthFormWrapper>
      <div className="text-center mb-2">
        <img
          src={
            LOGO_IMAGE ||
            "/placeholder.svg?height=64&width=64&query=BellCollect Logo"
          }
          alt="BellCollect Logo"
          className="mx-auto mb-2"
        />
        <h1 className="text-md font-bold text-foreground mb-2">
          Create your account
        </h1>
        <p className="text-muted-foreground text-sm">
          Join thousands of users using BellCollect
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="space-y-5"
        initialValues={{ agree: false }}
      >
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h3 className="text-sm font-semibold text-foreground">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              rules={nameRules}
              validateTrigger={["onChange", "onBlur"]}
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              rules={nameRules}
              validateTrigger={["onChange", "onBlur"]}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
            <InputField
              label="Username"
              name="username"
              placeholder="Enter your username"
              rules={[{ required: true, message: "Username is required" }]}
              validateTrigger={["onChange", "onBlur"]}
            />

            <InputField
              label="Phone Number"
              name="phone"
              placeholder="11 digits (e.g., 08012345678)"
              rules={phoneRules}
              validateTrigger={["onChange", "onBlur"]}
            />
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h3 className="text-sm font-semibold text-foreground">
              Account Security
            </h3>
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
        <div className="pt-4 border-t border-border">
          <Form.Item name="agree" valuePropName="checked" noStyle>
            <div className="flex items-start gap-3">
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <div className="text-sm text-muted-foreground leading-relaxed">
                I agree to BellCollect's{" "}
                <a
                  href="/terms"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </Form.Item>
        </div>

        <Button
          size="large"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
      
            ? "Creating Account..."
            : "Create Account"
        </Button>
      </Form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Sign In
          </a>
        </p>
      </div>
    </AuthFormWrapper>
  );
}
