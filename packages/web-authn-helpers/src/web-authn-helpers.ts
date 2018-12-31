import {
  decode,
  encode,
} from '@mask-tools/base64-arraybuffer';
import {
  AuthenticatorAssertionResponse,
  AuthenticatorAttestationResponse,
  PubicKeyCredentialRequestOptions,
  PublicKeyCredential,
  PublicKeyCredentialCreationOptions,
  PublicKeyCredentialUserEntity,
} from '@mask-tools/web-authn';
import {
  StringedAuthenticatorAssertionResponse,
  StringedAuthenticatorAttestationResponse,
  StringedPubicKeyCredentialRequestOptions,
  StringedPublicKeyCredential,
  StringedPublicKeyCredentialCreationOptions,
} from './types';

export const preformatCredentialRequest = (
  options: StringedPublicKeyCredentialCreationOptions,
): PublicKeyCredentialCreationOptions => {

  const {
    user: rawUser,
    challenge: rawChallenge,
  } = options;

  const challenge: BufferSource = decode(rawChallenge);
  const user: PublicKeyCredentialUserEntity = {
    ...rawUser,
    id: decode(rawUser.id),
  };

  return {
    ...options,
    challenge,
    user,
  };

};

export const preformatAssertionRequest = (
  options: StringedPubicKeyCredentialRequestOptions,
): PubicKeyCredentialRequestOptions => {

  const {
    challenge: rawChallenge,
    allowCredentials: rawAllowCredentials,
  } = options;

  const challenge: BufferSource = decode(rawChallenge);
  const allowCredentials = rawAllowCredentials.map((allowCredential) => {
    return {
      ...allowCredential,
      id: decode(allowCredential.id),
    };
  });

  return {
    ...options,
    allowCredentials,
    challenge,
  };

};

export const authenticatorAttestationResponseToJSON = (
  publicKeyCredential: PublicKeyCredential<AuthenticatorAttestationResponse>,
): StringedPublicKeyCredential<StringedAuthenticatorAttestationResponse> => {

  const { id, type } = publicKeyCredential;
  const rawId = encode(publicKeyCredential.rawId);

  const attestationObject: string = encode(
    publicKeyCredential.response.attestationObject,
  );
  const clientDataJSON: string = encode(
    publicKeyCredential.response.clientDataJSON,
  );

  return {
    id,
    rawId,
    response: {
      attestationObject,
      clientDataJSON,
    },
    type,
  };

};

export const authenticatorAssertionResponseToJSON = (
  publicKeyCredential: PublicKeyCredential<AuthenticatorAssertionResponse>,
): StringedPublicKeyCredential<StringedAuthenticatorAssertionResponse> => {

  const { id, type } = publicKeyCredential;
  const rawId = encode(publicKeyCredential.rawId);
  const authenticatorData: string = encode(
    publicKeyCredential.response.authenticatorData,
  );
  const signature: string = encode(publicKeyCredential.response.signature);
  const userHandle: string = encode(publicKeyCredential.response.userHandle);
  const clientDataJSON: string = encode(
    publicKeyCredential.response.clientDataJSON,
  );

  return {
    id,
    rawId,
    response: {
      authenticatorData,
      clientDataJSON,
      signature,
      userHandle,
    },
    type,
  };

};
