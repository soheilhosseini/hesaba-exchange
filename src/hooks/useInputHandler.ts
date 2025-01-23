import React from "react";

export const useInputHandler = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setValue(value);
  return { value, onChange };
};
