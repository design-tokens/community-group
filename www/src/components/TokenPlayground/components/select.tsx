import type { ComponentChildren, JSX } from 'preact';
import { useId } from 'preact/hooks';
import s from './select.module.css';

export interface SelectProps extends Omit<
  JSX.IntrinsicElements['select'],
  'children' | 'label'
> {
  label: ComponentChildren;
  options: { label: ComponentChildren; value: string }[];
}

export function Select({ label, options, ...props }: SelectProps) {
  const id = useId();
  return (
    <div class={s.container}>
      <label htmlFor={id} class={s.label}>
        {label}
      </label>
      <select class={s.select} {...props} id={id}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
