import React from "react";

export const useInputHandler = (initialValue: string | number) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = ({
    target: { value },
  }: {
    target: { value: string | number };
  }) => setValue(value);
  return { value, onChange };
};
