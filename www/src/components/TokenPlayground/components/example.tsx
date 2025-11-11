// cSpell:words figma
import { Select, type SelectProps } from './select';

export type ExampleProps = Omit<SelectProps, 'children' | 'options'>;

export default function Example(props: ExampleProps) {
  return (
    <Select
      {...props}
      options={[
        { label: <>Figma Simple Design System</>, value: 'figma-sds.json' },
      ]}
      label="Preset"
    />
  );
}
