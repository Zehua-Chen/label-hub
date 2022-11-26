import React, {
  useRef,
  MouseEvent,
  ChangeEvent,
  PropsWithChildren,
} from 'react';

export interface UploadButtonProps {
  onChange?: (file: File) => unknown;
}

function UploadButton(
  props: PropsWithChildren<UploadButtonProps>
): JSX.Element {
  const { onChange, children } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  function onUploadClick(event: MouseEvent) {
    event.preventDefault();

    if (inputRef.current) {
      inputRef.current.hidden = false;
      inputRef.current.click();
      inputRef.current.hidden = true;
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const { files } = event.target;

    if (!files) {
      return;
    }

    if (files.length === 0) {
      return;
    }

    const file = files.item(0);

    if (!file) {
      return;
    }

    onChange ? onChange(file) : null;
  }

  return (
    <>
      <input ref={inputRef} type='file' hidden onChange={onInputChange} />
      <button className='btn btn-primary' onClick={onUploadClick}>
        {children}
      </button>
    </>
  );
}

export default UploadButton;
