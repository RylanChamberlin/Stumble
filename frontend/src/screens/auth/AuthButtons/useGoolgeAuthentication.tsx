import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { GoogleAuthProvider } from 'firebase/auth';



maybeCompleteAuthSession();

function login(id_token: string) {
  console.log('Signing in with Google...', { id_token });

  try {
    const credential = GoogleAuthProvider.credential(id_token);

    return credential;
  } catch (error) {
    throw error;
  }
}

export default function useGoogleAuthentication() {
  const [request, _, promptAsync] = useIdTokenAuthRequest({
    expoClientId: '1025146739011-0pfdqkidkodgjqtmvuoaspt21en6o9d6.apps.googleusercontent.com',
    iosClientId: '1025146739011-i7k6r5giobglnu4pbqlp5smijhgsgv6c.apps.googleusercontent.com',
    webClientId: '1025146739011-1dok3te1fsg6pdl2l864qf1el0b9qgu7.apps.googleusercontent.com'
  });

  async function prompt() {
    const response = await promptAsync();

    if (response?.type !== 'success') {
      throw new Error(response.type);
    }
    const credential = login(response.params.id_token);

    return [credential];
  }

  return [!!request, prompt] as const;
}
