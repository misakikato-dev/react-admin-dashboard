/**
 * @file このファイルはユーザーフォームの値、バリデーション、送信状態を管理するフックを定義します。
 */

import { useEffect, useState, type FormEvent } from 'react';
import {
  sanitizeUserFormValues,
  validateUserForm,
} from '@/features/users/utils/validation';
import type { UserFormErrors, UserFormValues } from '@/type/users';
import type {
  UseUserFormOptions,
  UseUserFormResult,
} from '@/type/usersHooks';

export function useUserForm({
  initialValues,
  onSubmit,
}: UseUserFormOptions): UseUserFormResult {
  const {
    bio: initialBio,
    company: initialCompany,
    email: initialEmail,
    name: initialName,
    location: initialLocation,
    phone: initialPhone,
    role: initialRole,
    status: initialStatus,
  } = initialValues;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues({
      name: initialName,
      email: initialEmail,
      company: initialCompany,
      role: initialRole,
      status: initialStatus,
      phone: initialPhone,
      location: initialLocation,
      bio: initialBio,
    });
    setErrors({});
  }, [
    initialBio,
    initialCompany,
    initialEmail,
    initialLocation,
    initialName,
    initialPhone,
    initialRole,
    initialStatus,
  ]);

  const setFieldValue = <Field extends keyof UserFormValues>(
    field: Field,
    value: UserFormValues[Field]
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleBlur = (field: keyof UserFormValues) => {
    const nextErrors = validateUserForm(values);

    setErrors((current) => {
      const updated = { ...current };

      if (nextErrors[field]) {
        updated[field] = nextErrors[field];
      } else {
        delete updated[field];
      }

      return updated;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = sanitizeUserFormValues(values);
    const nextErrors = validateUserForm(normalized);

    setValues(normalized);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(normalized);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    handleBlur,
    handleSubmit,
  };
}
