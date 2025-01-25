import { ReactNode } from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

interface AddsProps {
  children: ReactNode;
}

export function Adds({ children }: AddsProps) {
  return (
    <Container>
      <Text>Adds</Text>
      {children}
    </Container>
  );
}
