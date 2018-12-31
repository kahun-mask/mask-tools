import {
  AttestationConveyancePreference,
  AuthenticationExtensionsClientInputs,
  AuthenticatorSelectionCriteria,
  AuthenticatorTransport,
  PublicKeyCredentialDescriptor,
  PublicKeyCredentialParameters,
  PublicKeyCredentialRpEntity,
  PublicKeyCredentialType,
  UserVerificationRequirement,
} from '@mask-tools/web-authn';

export interface StringedPublicKeyCredentialCreationOptions {
  challenge: string;
  user: StringedPublicKeyCredentialUserEntity;
  rp: PublicKeyCredentialRpEntity;
  pubKeyCredParams: PublicKeyCredentialParameters[];
  timeout?: number; // unsigned long: 0 ～ 18446744073709551615
  excludeCredentials?: PublicKeyCredentialDescriptor[];
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  attestation?: AttestationConveyancePreference;
  extensions?: AuthenticationExtensionsClientInputs;
}

export interface StringedPubicKeyCredentialRequestOptions {
  challenge: string;
  allowCredentials: StringedPublicKeyCredentialDescriptor[];
  timeout?: number;
  rpId?: string;
  userVerification?: UserVerificationRequirement;
  extensions?: AuthenticationExtensionsClientInputs;
}

export interface StringedAuthenticatorAttestationResponse {
  attestationObject: string;
  clientDataJSON: string;
}

export interface StringedAuthenticatorAssertionResponse {
  authenticatorData: string;
  signature: string;
  userHandle: string;
  clientDataJSON: string;
}

export interface StringedPublicKeyCredentialDescriptor {
  type: PublicKeyCredentialType;
  id: string;
  transports: AuthenticatorTransport[];
}

export interface StringedPublicKeyCredentialUserEntity {
  id: string;
  name?: string;
  displayName?: string;
}

export interface AuthenticatorInfo {
  fmt: string;
  id: string;
  publicKey: string;
  counter: number;
}

export interface AttestationVerificationResponse {
  verified: boolean;
  authenticator?: AuthenticatorInfo;
}

export interface AssertionVerificationResponse {
  verified: boolean;
  authenticator?: AuthenticatorInfo;
}
