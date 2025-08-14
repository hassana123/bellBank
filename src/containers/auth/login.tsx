import { useState, useEffect } from "react";
import Form from "~/components/controls/form";
import { Checkbox } from "~/components/controls";
import { Button } from "~/components/controls/";
import AuthFormWrapper from "~/components/controls/AuthFormWrapper";
import InputField from "~/components/controls/InputField";
import { LOGO_IMAGE } from "~/config";
import { useLoginMutation } from "~/store/queries/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginContainer() {
  const [form] = Form.useForm();
  const [remember, setRemember] = useState<boolean>(false);
  const navigate = useNavigate();


  

  return (
    <AuthFormWrapper>
      <div className="text-center mb-2">
        <img src={LOGO_IMAGE || "/placeholder.svg"} alt="BellCollect Logo" className="mx-auto mb-2" />
        <h1 className="text-md font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground text-sm">Sign in to your BellCollect account</p>
      </div>

      <Form form={form} layout="vertical"  className="space-y-5">
        <InputField
          label="Username or Email"
          name="username"
          placeholder="Enter your username or email"
          rules={[{ required: true, message: "Username or Email is required" }]}
        />

        <InputField
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          rules={[{ required: true, message: "Password is required" }]}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} label="Remember this device" name="remember" />
          </div>
          <a href="/forgot-password" className="text-primary font-medium hover:text-primary/80 transition-colors text-sm">
            Forgot Password?
          </a>
        </div>

        <Button size="large" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 rounded-lg transition-all duration-200" >
          "Signing in..."  "Sign In"
        </Button>
      </Form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          New to BellCollect?{" "}
          <a href="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Create an account
          </a>
        </p>
      </div>
    </AuthFormWrapper>
  );
}
