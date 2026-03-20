/**
 * @file このファイルはラベル、ヒント、エラー表示をまとめた入力フィールドラッパーを定義します。
 */

import type { FieldProps } from '@/type/ui';

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
}: FieldProps) {
  return (
    <label className="field" htmlFor={htmlFor}>
      <span className="field__label">
        {label}
        {required ? <span className="field__required">必須</span> : null}
      </span>
      {children}
      {hint ? <span className="field__hint">{hint}</span> : null}
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}
