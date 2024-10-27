import { useState } from "react";

export const useForm = <T>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  // can be used either with an event or with a manual name and value
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    manualName?: string,
    manualValue?: any
  ) => {
    if (e) {
      const { name, value } = e.target;
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    } else if (manualName && manualValue !== undefined) {
      setValues((prevValues) => ({ ...prevValues, [manualName]: manualValue }));
    }
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, resetForm };
};
