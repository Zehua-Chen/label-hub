import * as React from 'react';
import { useId } from 'react';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (value: boolean) => boolean;
}

function Checkbox(props: CheckboxProps): JSX.Element {
  const { label, checked = true, onChange } = props;
  const id = useId();

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (onChange) {
      onChange(e.target.checked);
    }
  }

  return (
    <div className='form-check'>
      <input
        className='form-check-input'
        type='checkbox'
        id={id}
        onChange={onInputChange}
        checked={checked}
      />
      <label className='form-check-label' htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
