import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';


maybeCompleteAuthSession();

function login(id_token: string) {
  console.log('Signing in with Google...', { id_token });

  try {
    // const credential = provider.credential(id_token);

    // return credential;
  } catch (error) {
    throw error;
  }
}

export default function useGoogleAuthentication() {
  const [request, _, promptAsync] = useIdTokenAuthRequest({
    clientId: '1025146739011-0pfdqkidkodgjqtmvuoaspt21en6o9d6.apps.googleusercontent.com',
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
