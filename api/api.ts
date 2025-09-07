// api.ts
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://192.168.1.3:5261/api/';
// IMPORTANT: Use your machine's LAN IP, not localhost, for iOS/Android

async function getToken() {
  return await SecureStore.getItemAsync('jwt');
}

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const token = await getToken();
    console.log("Token : "+ token);
    console.log(`${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const data = await response.json(); // sirf ek hi baar parse karo
    if (!response.ok) throw new Error(`GET ${endpoint} failed`);

    return data as T;
  },
  post: async <T, U = any>(endpoint: string, body: U): Promise<T> => {
    const token = await getToken();
    console.log(BASE_URL + endpoint);
    console.log(JSON.stringify(body));
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json(); // sirf ek hi baar parse karo
    console.log('Response:', data);

    if (!response.ok) throw new Error(`POST ${endpoint} failed`);

    return data as T;
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('jwt');
  }
};
