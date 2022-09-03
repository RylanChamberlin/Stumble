import React, { FC } from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

type FormFieldProps = {
    placeholder: string
    handleFormValueChange: any
    formKey: string
    textInputProps?: any

}

const FormField: FC<FormFieldProps> = (props) => {
  return (
    <View style={styles.formFieldWrapper}>
      <TextInput
        placeholder={props.placeholder}
        style={styles.formFieldText}
        onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
        {...props.textInputProps}
      />
    </View>
  )
}

export default FormField;