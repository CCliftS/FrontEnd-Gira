// types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  ChangePass: undefined;
  Recovery: undefined;
  RecoveryCode: undefined;
  Teams: undefined;
  SignIn: undefined;

  // Otras rutas de tu aplicación
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type RecoveryScreenProps = NativeStackScreenProps<RootStackParamList, 'Recovery'>;
export type RecoveryCodeScreenProps = NativeStackScreenProps<RootStackParamList, 'RecoveryCode'>;
export type ChangePassScreenProps = NativeStackScreenProps<RootStackParamList, 'ChangePass'>;
export type TeamsScreenProps = NativeStackScreenProps<RootStackParamList, 'Teams'>;
// Definir tipos para otras pantallas según sea necesario