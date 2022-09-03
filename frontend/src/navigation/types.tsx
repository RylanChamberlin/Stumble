export type RootStackParamList = {
 
    Login: undefined;
    SignUp: undefined;
    CreateUser: undefined | { user?: any };
    PostScreen: { bar?: any } | undefined;
    BottomTab: undefined;
    UserInfo: undefined;
    ProfileFriendScreen: undefined;
    AddFriendScreen: undefined;
    CheckInScreen: undefined;
    NewPostScreen: {bar?: any} | undefined;
}

//not in use
export type RootTabParamList = {
    BarScreen: undefined;
    PostScreen: undefined;
    FriendScreen: undefined;
    ProfileScreen: undefined;
  };