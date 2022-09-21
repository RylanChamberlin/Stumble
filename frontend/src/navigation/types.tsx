import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
 
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Login: undefined;
    SignUp: undefined;
    CreateUser: undefined | { user?: any };
    SinglePostScreen: { bar?: any } | undefined;
    UserInfo: undefined;
    ProfileFriendScreen: undefined;
    AddFriendScreen: undefined;
    CheckInScreen: undefined;
    NewPostScreen: {bar?: any} | undefined;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
    BarScreen: undefined;
    PostScreen: undefined;
    FriendScreen: undefined;
    ProfileScreen: undefined;
  };

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
