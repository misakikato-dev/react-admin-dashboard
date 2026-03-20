/**
 * @file このファイルはユーザー作成と編集で共通利用する入力フォームを定義します。
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { Message } from '@/constants/Message';
import {
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
} from '@/features/users/lib/userOptions';
import type { UserFormProps } from '@/type/usersComponents';

const userFormMessage = Message.users.form;
const userFormFields = userFormMessage.fields;

export function UserForm({
  form,
  cancelTo,
  submitLabel = userFormMessage.submit,
}: UserFormProps) {
  const { values, errors, isSubmitting, setFieldValue, handleBlur, handleSubmit } =
    form;

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="form-grid">
        <Field
          error={errors.name}
          htmlFor="name"
          hint={userFormMessage.characterCount(values.name.length, 40)}
          label={userFormFields.name.label}
          required
        >
          <input
            id="name"
            maxLength={40}
            name="name"
            placeholder={userFormFields.name.placeholder}
            type="text"
            value={values.name}
            onBlur={() => handleBlur('name')}
            onChange={(event) => setFieldValue('name', event.target.value)}
          />
        </Field>

        <Field
          error={errors.email}
          htmlFor="email"
          hint={userFormMessage.characterCount(values.email.length, 120)}
          label={userFormFields.email.label}
          required
        >
          <input
            id="email"
            maxLength={120}
            name="email"
            placeholder={userFormFields.email.placeholder}
            type="email"
            value={values.email}
            onBlur={() => handleBlur('email')}
            onChange={(event) => setFieldValue('email', event.target.value)}
          />
        </Field>

        <Field
          error={errors.company}
          htmlFor="company"
          hint={userFormMessage.characterCount(values.company.length, 60)}
          label={userFormFields.company.label}
          required
        >
          <input
            id="company"
            maxLength={60}
            name="company"
            placeholder={userFormFields.company.placeholder}
            type="text"
            value={values.company}
            onBlur={() => handleBlur('company')}
            onChange={(event) => setFieldValue('company', event.target.value)}
          />
        </Field>

        <Field error={errors.role} htmlFor="role" label={userFormFields.role.label} required>
          <select
            id="role"
            name="role"
            value={values.role}
            onBlur={() => handleBlur('role')}
            onChange={(event) =>
              setFieldValue('role', event.target.value as typeof values.role)
            }
          >
            {USER_ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          error={errors.status}
          htmlFor="status"
          label={userFormFields.status.label}
          required
        >
          <select
            id="status"
            name="status"
            value={values.status}
            onBlur={() => handleBlur('status')}
            onChange={(event) =>
              setFieldValue('status', event.target.value as typeof values.status)
            }
          >
            {USER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          error={errors.phone}
          htmlFor="phone"
          hint={userFormMessage.characterCount(values.phone.length, 20)}
          label={userFormFields.phone.label}
          required
        >
          <input
            id="phone"
            maxLength={20}
            name="phone"
            placeholder={userFormFields.phone.placeholder}
            type="tel"
            value={values.phone}
            onBlur={() => handleBlur('phone')}
            onChange={(event) => setFieldValue('phone', event.target.value)}
          />
        </Field>

        <Field
          error={errors.location}
          htmlFor="location"
          hint={userFormMessage.characterCount(values.location.length, 40)}
          label={userFormFields.location.label}
          required
        >
          <input
            id="location"
            maxLength={40}
            name="location"
            placeholder={userFormFields.location.placeholder}
            type="text"
            value={values.location}
            onBlur={() => handleBlur('location')}
            onChange={(event) => setFieldValue('location', event.target.value)}
          />
        </Field>
      </div>

      <Field
        error={errors.bio}
        htmlFor="bio"
        hint={userFormMessage.characterCount(values.bio.length, 240)}
        label={userFormFields.bio.label}
      >
        <textarea
          id="bio"
          maxLength={240}
          name="bio"
          placeholder={userFormFields.bio.placeholder}
          rows={5}
          value={values.bio}
          onBlur={() => handleBlur('bio')}
          onChange={(event) => setFieldValue('bio', event.target.value)}
        />
      </Field>

      <div className="form-actions">
        <Link className="button button--ghost" to={cancelTo}>
          {userFormMessage.cancel}
        </Link>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? userFormMessage.submitting : submitLabel}
        </Button>
      </div>
    </form>
  );
}
