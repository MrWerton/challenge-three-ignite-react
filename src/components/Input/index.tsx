import { useField } from '@unform/core';
import React, {
  ComponentType,
  InputHTMLAttributes, useCallback, useEffect,
  useRef,
  useState
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  icon?: ComponentType<IconBaseProps>
}
const Input = ({ name, icon: Icon, ...rest }: IInput) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
