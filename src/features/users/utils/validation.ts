/**
 * @file このファイルはユーザーフォーム入力の正規化と検証ロジックを定義します。
 */

import { Message } from '@/constants/Message';
import type { UserFormErrors, UserFormValues } from '@/type/users';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-()\s]+$/;

const MAX_LENGTH = {
  name: 40,
  email: 120,
  company: 60,
  phone: 20,
  location: 40,
  bio: 240,
} as const;

function validateRequired(value: string, message: string) {
  if (!value.trim()) {
    return message;
  }

  return null;
}

function validateMaxLength(value: string, maxLength: number, fieldName: string) {
  if (value.length > maxLength) {
    return Message.users.validation.maxLength(fieldName, maxLength);
  }

  return null;
}

export function sanitizeUserFormValues(values: UserFormValues): UserFormValues {
  return {
    ...values,
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    phone: values.phone.trim(),
    location: values.location.trim(),
    bio: values.bio.trim(),
  };
}

export function validateUserForm(values: UserFormValues): UserFormErrors {
  const errors: UserFormErrors = {};

  const nameRequiredError = validateRequired(
    values.name,
    Message.users.validation.required.name
  );
  const emailRequiredError = validateRequired(
    values.email,
    Message.users.validation.required.email
  );
  const companyRequiredError = validateRequired(
    values.company,
    Message.users.validation.required.company
  );
  const phoneRequiredError = validateRequired(
    values.phone,
    Message.users.validation.required.phone
  );
  const locationRequiredError = validateRequired(
    values.location,
    Message.users.validation.required.location
  );

  if (nameRequiredError) {
    errors.name = nameRequiredError;
  } else {
    const nameLengthError = validateMaxLength(
      values.name,
      MAX_LENGTH.name,
      Message.users.form.fields.name.label
    );
    if (nameLengthError) {
      errors.name = nameLengthError;
    }
  }

  if (emailRequiredError) {
    errors.email = emailRequiredError;
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = Message.users.validation.invalidEmail;
  } else {
    const emailLengthError = validateMaxLength(
      values.email,
      MAX_LENGTH.email,
      Message.users.form.fields.email.label
    );
    if (emailLengthError) {
      errors.email = emailLengthError;
    }
  }

  if (companyRequiredError) {
    errors.company = companyRequiredError;
  } else {
    const companyLengthError = validateMaxLength(
      values.company,
      MAX_LENGTH.company,
      Message.users.form.fields.company.label
    );
    if (companyLengthError) {
      errors.company = companyLengthError;
    }
  }

  if (phoneRequiredError) {
    errors.phone = phoneRequiredError;
  } else if (!PHONE_PATTERN.test(values.phone)) {
    errors.phone = Message.users.validation.invalidPhone;
  } else {
    const phoneLengthError = validateMaxLength(
      values.phone,
      MAX_LENGTH.phone,
      Message.users.form.fields.phone.label
    );
    if (phoneLengthError) {
      errors.phone = phoneLengthError;
    }
  }

  if (locationRequiredError) {
    errors.location = locationRequiredError;
  } else {
    const locationLengthError = validateMaxLength(
      values.location,
      MAX_LENGTH.location,
      Message.users.form.fields.location.label
    );
    if (locationLengthError) {
      errors.location = locationLengthError;
    }
  }

  const bioLengthError = validateMaxLength(
    values.bio,
    MAX_LENGTH.bio,
    Message.users.form.fields.bio.label
  );
  if (bioLengthError) {
    errors.bio = bioLengthError;
  }

  return errors;
}
