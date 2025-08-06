
import { useEffect, useRef } from 'react';

interface OtpInputProps {
  length?: number;
  value?: string;
  onChange: (val: string) => void;
}

export default function OtpInput({
  length = 6,
  value = '',
  onChange,
}: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const indexToFocus = value.length < length ? value.length : length - 1;
    inputsRef.current[indexToFocus]?.focus();
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    const cleanVal = val.replace(/[^0-9]/g, '');

    // Always update the OTP, even if empty
    const otpArray = Array.from({ length }, (_, i) => value[i] || '');
    otpArray[index] = cleanVal;

    const newOtp = otpArray.join('').slice(0, length);
    onChange(newOtp);

    // Move to next if valid
    if (cleanVal && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
) => {
  if (e.key === 'Backspace') {
    const otpArray = Array.from({ length }, (_, i) => value[i] || '');

    // Get the actual input value from the ref
    const currentInput = inputsRef.current[index];
    const hasValue = currentInput?.value?.length === 1;

    if (hasValue) {
      otpArray[index] = '';
      onChange(otpArray.join(''));
    } else if (index > 0) {
      otpArray[index - 1] = '';
      onChange(otpArray.join(''));
      inputsRef.current[index - 1]?.focus();
    }
  }
};
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          maxLength={1}
          inputMode="numeric"
          type="text"
          className="w-12 h-12 text-black text-center border border-gray-300 rounded-md text-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          value={value[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}
