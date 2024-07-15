// NavigationTypes.ts
import { NavigatorScreenParams } from '@react-navigation/native';
export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  AnimalList: { focusSearchInput: boolean } | undefined;
  UserEdit: undefined;
  Bluetooth: undefined;
  ArrivalConfirmation: undefined,
  EarringApplication: undefined,
  EarringReception: undefined
  GTALinkEarrings: undefined,
  LOGGER: undefined
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
