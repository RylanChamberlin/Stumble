import { useState } from "react";


type values = {
    email?: string; 
    password?: string; 
    username?: string; 
    name?: string; 
    repassword?: string;
}

export const useFormData = (values: values) => {
  const [formValues, setFormValues] = useState<any>({
    ...values
  });

  const handleFormValueChange = (key: string, value: string) => {
    setFormValues(
      {
        ...formValues,
        [key]: value
      }
    );
  };

  return [
    formValues,
    handleFormValueChange,
    setFormValues,
  ]
};