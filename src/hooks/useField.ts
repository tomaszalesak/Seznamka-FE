import { ChangeEvent, useCallback, useState } from 'react';

const useField = (id: string, required?: boolean, _number = false) => {
  // let setValue: (arg0: string | number) => void;
  // let value;

  // if (number) {
  //   [value, setValue as (arg0: number) => void] = useState(0);
  // } else {
  //   [value, setValue as (arg0: string) => void] = useState('');
  // }

  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const error = required && touched && !value;

  return [
    // Current value for convenient access
    value,
    // Props for the TextField
    {
      id,
      value,
      onChange: useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
        []
      ),
      onBlur: useCallback(() => setTouched(true), []),
      required,
      error,
      helperText: error ? 'Required' : undefined
    }
  ] as const;
};

export default useField;
