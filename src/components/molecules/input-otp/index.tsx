import { Fragment } from 'react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  InputOTP as BaseInputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

export interface CustomInputOTPProps {
  length?: number;
  groupSize?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  pattern?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  id?: string;
}

export const InputOTP = ({
  length = 6,
  groupSize = 3,
  value,
  onChange,
  onComplete,
  pattern = REGEXP_ONLY_DIGITS,
  disabled,
  label,
  error,
  id,
}: CustomInputOTPProps) => {
  const groups = Math.ceil(length / groupSize);

  const otpEl = (
    <BaseInputOTP
      id={id}
      maxLength={length}
      pattern={pattern}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      disabled={disabled}
    >
      {Array.from({ length: groups }).map((_, groupIndex) => {
        const start = groupIndex * groupSize;
        const end = Math.min(start + groupSize, length);

        return (
          <Fragment key={groupIndex}>
            <InputOTPGroup>
              {Array.from({ length: end - start }).map((_, i) => (
                <InputOTPSlot key={start + i} index={start + i} aria-invalid={!!error} />
              ))}
            </InputOTPGroup>
            {groupIndex < groups - 1 && <InputOTPSeparator />}
          </Fragment>
        );
      })}
    </BaseInputOTP>
  );

  if (!label && !error) return otpEl;

  return (
    <Field data-invalid={!!error} dir="ltr">
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      {otpEl}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

InputOTP.displayName = 'InputOTP';
