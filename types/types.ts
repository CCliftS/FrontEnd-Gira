// types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  ChangePass: undefined;
  Recovery: undefined;
  RecoveryCode: undefined;
  Teams: undefined;
  SignIn: undefined;
  HomePage: undefined;
  navbar: undefined;
  UserPage: undefined;
  UserEdit: undefined;
  EditEmailPage: undefined;
  EditPassPage: undefined;
  AddPage: undefined;
  MyTeamsPage: undefined;
  DataTeamPage: undefined;

  // Otras rutas de tu aplicación
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type RecoveryScreenProps = NativeStackScreenProps<RootStackParamList, 'Recovery'>;
export type TeamsScreenProps = NativeStackScreenProps<RootStackParamList, 'Teams'>;
export type HomePageScreenProps = NativeStackScreenProps<RootStackParamList, 'HomePage'>;
export type navbarProps = NativeStackScreenProps<RootStackParamList, 'navbar'>;
export type UserPageProps = NativeStackScreenProps<RootStackParamList, 'UserPage'>;
export type UserEditProps = NativeStackScreenProps<RootStackParamList, 'UserEdit'>;
export type EditEmailPageProps = NativeStackScreenProps<RootStackParamList, 'EditEmailPage'>;
export type EditPassPageProps = NativeStackScreenProps<RootStackParamList, 'EditPassPage'>;
export type AddPageProps = NativeStackScreenProps<RootStackParamList, 'AddPage'>;
export type MyTeamsPageProps = NativeStackScreenProps<RootStackParamList, 'MyTeamsPage'>;
export type DataTeamPageProps = NativeStackScreenProps<RootStackParamList, 'DataTeamPage'>;

// Definir tipos para otras pantallas según sea necesario