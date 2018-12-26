interface Dictinary<T> {
  [index: string]: T;
}

declare module '@mask-tools/web-authn' {
  interface Navigator {
    credentials: CredentialsContainer;
  }

  export interface CredentialsContainer {
    create<T = AuthenticatorAttestationResponse>(options?: CredentialCreationOptions): Promise<T & Credential>;
    get<T = AuthenticatorAssertionResponse>(options?: CredentialRequestOptions): Promise<T & Credential>;
    store(credential: Credential): Promise<Credential>;
    preventSilentAccess(): Promise<void>;
  }

  export interface PublicKeyCredential extends Credential {
    readonly rawId: ArrayBuffer;
    readonly response: AuthenticatorResponse;
    getClientExtensionResults(): AuthenticationExtensionsClientOutputs;
  }

  interface CredentialCreationOptions {
    publicKey?: PublicKeyCredentialCreationOptions;
  }
  
  interface CredentialRequestOptions {
    publicKey?: PubicKeyCredentialRequestOptions;
  }

  export interface Credential {
    readonly id: string;
    readonly type: string;
  }

  export interface AuthenticatorResponse {
    readonly clientDataJSON: ArrayBuffer;
  }
  
  export interface AuthenticatorAttestationResponse extends AuthenticatorResponse {
    readonly attestationObject: ArrayBuffer;
  }

  export interface AuthenticatorAssertionResponse extends AuthenticatorResponse {
    readonly authenticatorData: ArrayBuffer;
    readonly signature: ArrayBuffer;
    readonly userHandle: ArrayBuffer;
  }

  export type AuthenticationExtensionsClientOutputs = Dictinary<string>;

  /**
   * @see {@link https://w3c.github.io/webauthn/#dictdef-publickeycredentialcreationoptions}
   */
  export interface PublicKeyCredentialCreationOptions {
    rp: PublicKeyCredentialRpEntity;
    user: PublicKeyCredentialUserEntity;
    challenge: BufferSource;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    timeout?: number; // unsigned long: 0 ～ 18446744073709551615
    excludeCredentials?: PublicKeyCredentialDescriptor[];
    authenticatorSelection?: AuthenticatorSelectionCriteria;
    attestation?: AttestationConveyancePreference;
    extensions?: AuthenticationExtensionsClientInputs;
  }

  /**
   * Relying Party Parameters for Credential Generation
   */
  export interface PublicKeyCredentialRpEntity {
    id?: string; // DOMString
    name?: string;
  }

  /**
   * User Account Parameters for Credential Generation
   */
  export interface PublicKeyCredentialUserEntity {
    id: BufferSource;
    name?: string;
    displayName?: string;
  }

  /**
   * Parameters for Credential Generation
   */
  export interface PublicKeyCredentialParameters {
    type: PublicKeyCredentialType;
    alg: COSEAlgorithmIdentifier;
  }

  /**
   * IANA CBOR Object Signing and Encryption (COSE) Algorithms Registry
   * @see {@link https://www.iana.org/assignments/cose/cose.xhtml#algorithms}
   */
  export type COSEAlgorithmIdentifier = number;

  /**
   * Credential Type Enumeration
   */
  export type PublicKeyCredentialType = 'public-key';

  /**
   * Credential Descriptor
   */
  export interface PublicKeyCredentialDescriptor {
    type: PublicKeyCredentialType;
    id: BufferSource;
    transports: AuthenticatorTransport[];
  }

  /**
   * Authenticator Transport Enumeration
   */
  export type AuthenticatorTransport =
    'usb' | // Removable USB
    'nfc' | // Near Field Communication
    'ble' | // Bluetooth Smart (Bluetooth Low Energy)
    'internal'; // A client device-specific transport.

  /**
   * Authenticator Selection Criteria
   */
  export interface AuthenticatorSelectionCriteria {
    authenticatorAttachment: AuthenticatorAttachment;
    requireResidentKey: boolean; // default: false
    userVerification: UserVerificationRequirement; // default: 'preferred'
  }

  /**
   * Authenticator Attachment Enumeration
   */
  export type AuthenticatorAttachment =
    'platform' |
    'cross-platform';

  /**
   * User Verification Requirement Enumeration
   */
  export type UserVerificationRequirement =
    'required' |
    'preferred' |
    'discouraged';

  /**
   * Attestation Conveyance Preference Enumeration
   */
  export type AttestationConveyancePreference =
    'none' |
    'indirect' |
    'direct';

  // FIXME: Confirm the type
  export type AuthenticationExtensionsClientInputs = any;


  export interface PubicKeyCredentialRequestOptions {
    challenge: BufferSource;
    timeout?: number;
    rpId?: string;
    allowCredentials?: PublicKeyCredentialDescriptor[];
    userVerification?: UserVerificationRequirement;
    extensions?: AuthenticationExtensionsClientInputs;
  }

  export interface CollectedClientData {
    type: string;
    challenge: string;
    origin: string;
    tokenBinding: TokenBinding;
  }

  enum TokenBindingStatus {
    present = 'present',
    supported = 'supported',
  }

  export interface TokenBinding {
    status: TokenBindingStatus;
    id: string;
  }

  /**
   * @see {@link https://w3c.github.io/webauthn/#dictdef-publickeycredentialentity}
   */
  export interface PublicKeyCredentialEntity {
    name: string;
    icon: string;
  }
}
