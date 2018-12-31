import {
  authenticatorAssertionResponseToJSON,
  authenticatorAttestationResponseToJSON,
  preformatAssertionRequest,
  preformatCredentialRequest,
} from '@mask-tools/web-authn-helpers';

export const registrationCredentialRequest = (
  body: string,
) => {
  return fetch(
    '/webauthn/register/request',
    {
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  ).then((response) => response.json());
};

export const registrationCredentialResponse = (
  body: string,
) => {
  return fetch(
    '/webauthn/register/response',
    {
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  ).then((response) => response.json());
};

export const loginCredentialRequest = (
  body: string,
) => {
  return fetch(
    '/webauthn/login/request',
    {
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  ).then((response) => response.json());
};

export const loginCredentialResponse = (
  body: string,
) => {
  return fetch(
    '/webauthn/login/response',
    {
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  ).then((response) => response.json());
};

export const register = async (
  name: string,
  username: string,
): Promise<boolean> => {
  try {
    const credentialOptions = await registrationCredentialRequest(
      JSON.stringify({ name, username }),
    );

    const publicKey = preformatCredentialRequest(credentialOptions);
    const publicKeyCredential = await (navigator as any).credentials.create({
      publicKey,
    });
    const publicKeyCredentialJSON = authenticatorAttestationResponseToJSON(
      publicKeyCredential,
    );

    await registrationCredentialResponse(
      JSON.stringify(publicKeyCredentialJSON),
    );

    return true;
  } catch (e) {
    console.error('Failed to register user', e);
    return false;
  }
};

export const login = async (
  username: string,
): Promise<boolean> => {
  try {
    const credentialOptions = await loginCredentialRequest(
      JSON.stringify({ username }),
    );

    const publicKey = preformatAssertionRequest(credentialOptions);
    const publicKeyCredential = await (navigator as any).credentials.get({
      publicKey,
    });
    const publicKeyCredentialJSON = authenticatorAssertionResponseToJSON(
      publicKeyCredential,
    );

    await loginCredentialResponse(JSON.stringify(publicKeyCredentialJSON));

    return true;
  } catch (e) {
    console.error('Failed to login', e);
    return false;
  }
};