import { AuthCredential, getAuth, signInWithCredential, updateEmail, updateProfile } from "firebase/auth";


export default async function loginWithCredential(credential: AuthCredential, data?: any) {


    const auth = getAuth();
    console.log('Logging in with credential', credential, data);
    const { user } = await signInWithCredential(auth, credential);
    console.log('Signed in with credential. Updating profile details...');


    // if (data?.email && !user.email) {
    // console.log('updated Email')
    // await updateEmail(user, data.email);
    // }

    // if (data?.displayName && !user.displayName) {
    // console.log('updated Name')
    // await updateProfile(user, { displayName: data.displayName });
    // }

    return user;
}