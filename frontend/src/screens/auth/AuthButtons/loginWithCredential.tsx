import { auth} from '../../../firebase';

export default async function loginWithCredential(credential: any, data?: any) {



    console.log('Logging in with credential', credential, data);
    const { user } = await auth.signInWithCredential(credential)
    console.log('Signed in with credential. Updating profile details...');


    if (data?.email && !user.email) {
    console.log('updated Email')
    await auth.updateEmail(user, data.email);
    }

    if (data?.displayName && !user.displayName) {
    console.log('updated Name')
    await auth.updateProfile(user, { displayName: data.displayName });
    }

    return user;
}