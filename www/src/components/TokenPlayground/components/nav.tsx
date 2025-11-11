// cSpell:words figma
import type { Preset } from '../lib/types';
import s from './nav.module.css';
import { Select } from './select';

export interface NavProps {
  preset: Preset;
  onPresetChange: (preset: Preset) => void;
}

export default function Nav({ preset, onPresetChange }: NavProps) {
  return (
    <header aria-label="Controls" class={s.container}>
      <menu class={s.menu} aria-label="Design System">
        <Select
          value={preset}
          label={<>Preset</>}
          onChange={(e) => {
            if (confirm('Change design system? You’ll lose all local edits.')) {
              onPresetChange((e.target as HTMLSelectElement).value as Preset);
            }
          }}
          options={[
            { label: <>Figma Simple Design System</>, value: 'figma-sds' },
            { label: <>GitHub Primer</>, value: 'github-primer' },
          ]}
        />
      </menu>
    </header>
  );
}
