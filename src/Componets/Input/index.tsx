import { ReactNode } from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

interface InputProps {
  children: ReactNode;
}

export function Input({ children }: InputProps) {
  return (
    <Container>
      <Text>Input</Text>
      {children}
    </Container>
  );
}
