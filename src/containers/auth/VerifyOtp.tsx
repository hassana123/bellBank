import { useState, useEffect } from 'react';
import {RotateCcw, CheckCircle } from 'lucide-react';
//import AuthFormWrapper from '~/components/controls/AuthFormWrapper';
import { Button } from '~/components/controls';
import OtpInput from '~/components/controls/OtpInput';
import { LOGO_IMAGE } from '~/config';

export default function VerifyOtpContainer() {
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email] = useState<string>('hassana@bellcollect.com'); // This would come from props/context

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('OTP submitted:', otp);
      setLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp('');
    // Add resend logic here
    console.log('Resending OTP...');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={LOGO_IMAGE || "/placeholder.svg"}
            alt="BellCollect Logo"
            className="h-12 mx-auto mb-2"
          />
          {/* <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div> */}
          <h1 className="text-md font-bold text-gray-700 mb-2">Verify your email</h1>
          <p className="text-gray-600 text-sm ">
            We sent a 6-digit verification code to{' '}
            <span className="font-semibold text-gray-900 break-all">{email}</span>
          </p>
        </div>

        {/* OTP Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <div className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center">
                <OtpInput
                  length={6}
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
            </div>

            {/* Timer/Resend */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-gray-500">
                  Code expires in{' '}
                  <span className="font-mono font-semibold text-primary">
                    {formatTime(timer)}
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2 mx-auto transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Resend code
                </button>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={otp.length !== 6}
              loading={loading}
              size="large"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-12 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Verifying...'
              ) : (
                <div className='flex gap-3 items-center'>
                  <CheckCircle className="w-4 h-4" />
                  Verify Account
                </div>
              )}
            </Button>

            {/* Help Text */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Didn't receive the code?{' '}
                <a href="/support" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 transition-colors"
          >
            ← Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
