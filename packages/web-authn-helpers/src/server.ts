import {
  AttestationConveyancePreference,
  AttestationFmtPackedObject,
  PubicKeyCredentialRequestOptions,
  PublicKeyCredential,
  PublicKeyCredentialCreationOptions,
  PublicKeyCredentialDescriptor,
  PublicKeyCredentialParameters,
  PublicKeyCredentialRpEntity,
  PublicKeyCredentialUserEntity,
  UserVerificationRequirement,
} from '@mask-tools/web-authn';
import base64url from 'base64url';
import * as cbor from 'cbor';
import * as crypto from 'crypto';
import {
  AssertionVerificationResponse,
  AttestationVerificationResponse,
  AuthenticatorInfo,
  StringedAuthenticatorAssertionResponse,
  StringedAuthenticatorAttestationResponse,
  StringedPubicKeyCredentialRequestOptions,
  StringedPublicKeyCredentialCreationOptions,
  StringedPublicKeyCredentialDescriptor,
  StringedPublicKeyCredentialUserEntity,
} from './types';

const U2F_USER_PRESENTED = 0x01;

export const createRandomBuffer = (length: number = 32): ArrayBuffer => {
  return crypto.randomBytes(length);
};

export const createCredentialRequestOptions = (
  authenticators: AuthenticatorInfo[],
  rpId?: string,
  userVerification?: UserVerificationRequirement,
): PubicKeyCredentialRequestOptions => {
  const allowCredentials: PublicKeyCredentialDescriptor[] = [];
  for (const authr of authenticators) {
    allowCredentials.push({
      id: base64url.toBuffer(authr.id),
      transports: ['usb', 'nfc', 'ble'],
      type: 'public-key'
    });
  }
  return {
    allowCredentials,
    challenge: createRandomBuffer(),
    rpId,
    userVerification,
  };
};

export const createStringedCredentialRequestOptions = (
  authenticators: AuthenticatorInfo[],
  rpId?: string,
  userVerification?: UserVerificationRequirement,
): StringedPubicKeyCredentialRequestOptions => {
  const credentialRequestOptions = createCredentialRequestOptions(
    authenticators,
    rpId,
    userVerification,
  );

  const allowCredentials: StringedPublicKeyCredentialDescriptor[] = [];
  if (credentialRequestOptions.allowCredentials) {
    credentialRequestOptions.allowCredentials.forEach((credential) => {
      allowCredentials.push({
        ...credential,
        id: base64url.encode(credential.id as Buffer),
      });
    });
  }

  const challenge = base64url.encode(
    credentialRequestOptions.challenge as Buffer,
  );

  return {
    allowCredentials,
    challenge,
  };
};

const DEFAULT_PUB_KEY_CREDENTIAL_PARAMS: PublicKeyCredentialParameters[] = [
  { type: 'public-key', alg: -7 },
];

export const createCredentialCreationOptions = (
  rp: PublicKeyCredentialRpEntity,
  user: PublicKeyCredentialUserEntity,
  attestation: AttestationConveyancePreference = 'direct',
  pubKeyCredParams:
    PublicKeyCredentialParameters[] = DEFAULT_PUB_KEY_CREDENTIAL_PARAMS,
): PublicKeyCredentialCreationOptions => {
  return {
    attestation,
    challenge: createRandomBuffer(),
    pubKeyCredParams,
    rp,
    user,
  };
};

export const createStringedCredentialCreationOptions = (
  rp: PublicKeyCredentialRpEntity,
  rawUser: PublicKeyCredentialUserEntity,
  attestation: AttestationConveyancePreference = 'direct',
  pubKeyCredParams:
    PublicKeyCredentialParameters[] = DEFAULT_PUB_KEY_CREDENTIAL_PARAMS,
): StringedPublicKeyCredentialCreationOptions => {
  const credentialCreationOptions = createCredentialCreationOptions(
    rp,
    rawUser,
    attestation,
    pubKeyCredParams,
  );

  const challenge = base64url.encode(
    credentialCreationOptions.challenge as Buffer,
  );
  const user: StringedPublicKeyCredentialUserEntity = {
    ...rawUser,
    id: base64url.encode(rawUser.id as Buffer),
  };

  return {
    ...credentialCreationOptions,
    challenge,
    user,
  };
};

export const verifySignature = (
  signature: Buffer,
  data: Buffer,
  publicKey: string,
): boolean => {
  return crypto.createVerify('SHA256')
    .update(data)
    .verify(publicKey, signature);
};

export const createHashFromBuffer = (data: Buffer): Buffer => {
  return crypto.createHash('SHA256')
    .update(data)
    .digest();
};

export const getCBORFirstIndex = <T = any>(
  COSEPublicKey: Buffer
): Promise<T> => new Promise((resolve, reject) => {
  cbor.decodeAll(COSEPublicKey, (error, result) => {
    if (error) {
      reject(error);
    } else {
      try {
        resolve(result[0]);
      } catch (e) {
        reject(e);
      }
    }
  });
});

export const COSEECDHAtoPKCS = async (COSEPublicKey: Buffer): Promise<Buffer> => {
  const COSEStruct = await getCBORFirstIndex(COSEPublicKey);
  const tag = Buffer.from([0x04]);
  const x = COSEStruct.get(-2);
  const y = COSEStruct.get(-3);
  return Buffer.concat([tag, x, y]);
};

export const ASN1toPEM = (pkBuffer: Buffer): string => {
  if (!Buffer.isBuffer(pkBuffer)) {
    throw new Error('ASN1toPEM: pkBuffer must be Buffer');
  }

  let type: string;
  if (pkBuffer.length === 65 && pkBuffer[0] === 0x04) {
    pkBuffer = Buffer.concat([
      Buffer.from(
        '3059301306072a8648ce3d020106082a8648ce3d030107034200',
        'hex',
      ),
      pkBuffer,
    ]);
    type = 'PUBLIC KEY';
  } else {
    type = 'CERTIFICATE';
  }

  const base64Cert = pkBuffer.toString('base64');
  let PEMKey = '';
  for (let i = 0; i < Math.ceil(base64Cert.length) / 64; i++) {
    const start = 64 * i;
    PEMKey += base64Cert.substr(start, 64) + '\n';
  }
  return `-----BEGIN ${type}-----\n${PEMKey}-----END ${type}-----\n`;
};

export const parseCredentialAuthData = (buffer: Buffer) => {
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);
  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);
  const flags = flagsBuf[0];
  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);
  const counter = counterBuf.readUInt32BE(0);
  const aaguid = buffer.slice(0, 16);
  buffer = buffer.slice(16);
  const credIDLenBuf = buffer.slice(0, 2);
  buffer = buffer.slice(2);
  const credIDLen = credIDLenBuf.readUInt16BE(0);
  const credID = buffer.slice(0, credIDLen);
  buffer = buffer.slice(credIDLen);
  const COSEPublicKey = buffer;
  return {
    COSEPublicKey,
    aaguid,
    counter,
    counterBuf,
    credID,
    credIDLenBuf,
    flags,
    flagsBuf,
    rpIdHash,
  };
};

export const verifyAuthenticatorAttestationResponse = async (
  webAuthnResponse:
    PublicKeyCredential<StringedAuthenticatorAttestationResponse>,
): Promise<AttestationVerificationResponse> => {
  const response: AttestationVerificationResponse = { verified: false };

  const attestationBuffer = base64url.toBuffer(
    webAuthnResponse.response.attestationObject,
  );
  const ctapCredentialResponse =
    await getCBORFirstIndex<AttestationFmtPackedObject>(attestationBuffer);

  if (ctapCredentialResponse.fmt === 'packed') {
    const authrDataStruct = parseCredentialAuthData(
      ctapCredentialResponse.authData
    );
    if (!(authrDataStruct.flags & U2F_USER_PRESENTED)) {
      throw new Error('Usre was NOT presented during authentication');
    }

    const clientDataHash = createHashFromBuffer(
      base64url.toBuffer(webAuthnResponse.response.clientDataJSON),
    );
    const publicKey = await COSEECDHAtoPKCS(authrDataStruct.COSEPublicKey);
    const signatureBase = Buffer.concat([
      authrDataStruct.rpIdHash,
      authrDataStruct.flagsBuf,
      authrDataStruct.counterBuf,
      authrDataStruct.aaguid,
      authrDataStruct.credIDLenBuf,
      authrDataStruct.credID,
      authrDataStruct.COSEPublicKey,
      clientDataHash,
    ]);
    const PEMCertificate = ASN1toPEM(ctapCredentialResponse.attStmt.x5c[0]);
    const signature = ctapCredentialResponse.attStmt.sig;
    response.verified = verifySignature(
      signature,
      signatureBase,
      PEMCertificate,
    );
    if (response.verified) {
      response.authenticator = {
        counter: authrDataStruct.counter,
        id: base64url.encode(authrDataStruct.credID),
        fmt: 'packed',
        publicKey: base64url.encode(publicKey)
      };
    }
  }

  return response;
};

export const findAuthenticator = (
  credID: string,
  authenticators: AuthenticatorInfo[]
): AuthenticatorInfo => {
  for (const authr of authenticators) {
    if (authr.id === credID) {
      return authr;
    }
  }

  throw new Error('Unknown authenticator with credID');
};

export const parseAssertionAuthData = (
  buffer: Buffer,
) => {
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);
  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);
  const flags = flagsBuf[0];
  const counterBuf = buffer.slice(0, 4);
  const counter = counterBuf.readUInt32BE(0);
  return {
    counter,
    counterBuf,
    flags,
    flagsBuf,
    rpIdHash,
  };
};

export const verifyAuthenticatorAssertionResponse = (
  webAuthnResponse: PublicKeyCredential<StringedAuthenticatorAssertionResponse>,
  authenticators: AuthenticatorInfo[],
) => {
  const response: AssertionVerificationResponse = { verified: false };

  const authenticator = findAuthenticator(webAuthnResponse.id, authenticators);
  const authenticatorData = base64url.toBuffer(
    webAuthnResponse.response.authenticatorData,
  );

  if (authenticator.fmt === 'packed') {
    const authenticatorDataStruct = parseAssertionAuthData(authenticatorData);
    if (!(authenticatorDataStruct.flags & U2F_USER_PRESENTED)) {
      throw new Error('User was NOT presented during authentication');
    }

    const clientDataHash = createHashFromBuffer(
      base64url.toBuffer(webAuthnResponse.response.clientDataJSON),
    );
    const signatureBase = Buffer.concat([
      authenticatorDataStruct.rpIdHash,
      authenticatorDataStruct.flagsBuf,
      authenticatorDataStruct.counterBuf,
      clientDataHash,
    ]);
    const publicKey = ASN1toPEM(base64url.toBuffer(authenticator.publicKey));
    const signature = base64url.toBuffer(webAuthnResponse.response.signature);

    response.verified = verifySignature(signature, signatureBase, publicKey);
    if (response.verified) {
      if (authenticatorDataStruct.counter <= authenticator.counter) {
        throw new Error('Authenticator counter did not increase');
      }
      authenticator.counter = authenticatorDataStruct.counter;
      response.authenticator = authenticator;
    }
  }

  return response;
};
