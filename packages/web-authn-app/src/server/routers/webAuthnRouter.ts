import {
  CollectedClientData,
  PublicKeyCredential,
  PublicKeyCredentialRpEntity,
  PublicKeyCredentialUserEntity,
} from '@mask-tools/web-authn';
import {
  createRandomBuffer,
  createStringedCredentialCreationOptions,
  createStringedCredentialRequestOptions,
  verifyAuthenticatorAssertionResponse,
  verifyAuthenticatorAttestationResponse,
} from '@mask-tools/web-authn-helpers/lib/server';
import {
  AssertionVerificationResponse,
  AttestationVerificationResponse,
  StringedAuthenticatorAttestationResponse,
} from '@mask-tools/web-authn-helpers/lib/types';
import base64url from 'base64url';
import {
  Request,
  Response,
  Router,
} from 'express';
import { User } from '../entities/user';
import { userStorage } from '../storages/userStorage';
import { asyncHandler } from '../utils/expressUtils';
import CookieSessionObject = CookieSessionInterfaces.CookieSessionObject;

const RelyingParty: PublicKeyCredentialRpEntity = {
  // id: '',
  name: 'Kahun Mask',
};
const HTTP_ORIGIN = process.env.HTTP_ORIGIN || 'http://localhost:3000';
export const webAuthnRouter = Router();

webAuthnRouter.post('/webauthn/register/request', (
  req: Request,
  res: Response,
) => {
  const { name, username } = req.body;

  if (!username || !name) {
    res.status(400).send('Invalid body');
    return;
  }

  const user = userStorage.get(username);
  if (user && user.registered) {
    res.status(400).send('User is already registered');
  }

  const newUser = new User();
  newUser.id = createRandomBuffer();
  newUser.displayName = name;
  newUser.username = username;
  newUser.registered = false;
  newUser.authenticators = [];
  userStorage.set(username, newUser);

  const userEntity: PublicKeyCredentialUserEntity = {
    displayName: newUser.displayName,
    id: newUser.id,
    name: newUser.username,
  };
  const creationOptions = createStringedCredentialCreationOptions(
    RelyingParty,
    userEntity,
  );

  (req.session as CookieSessionObject).challenge = creationOptions.challenge;
  (req.session as CookieSessionObject).username = username;

  res.send(creationOptions);
});

webAuthnRouter.post('/webauthn/register/response', asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const webAuthnResponse:
    PublicKeyCredential<StringedAuthenticatorAttestationResponse> = req.body;
  const { id, rawId, response, type } = webAuthnResponse;
  const username = (req.session as CookieSessionObject).username;
  const challenge = (req.session as CookieSessionObject).challenge;

  if (
    !username || !id || !rawId || !response || !type || type !== 'public-key'
  ) {
    res.status(400).send('Invalid body');
    return;
  }

  const clientData: CollectedClientData = JSON.parse(
    base64url.decode(response.clientDataJSON),
  );

  if (clientData.challenge !== challenge) {
    res.status(400).send('Invalid challenge');
    return;
  }

  if (clientData.origin !== HTTP_ORIGIN) {
    res.status(400).send('Invalid origin');
    return;
  }

  let result: AttestationVerificationResponse = { verified: false };
  if (clientData.type === 'webauthn.create') {
    result = await verifyAuthenticatorAttestationResponse(webAuthnResponse);
    if (result.verified && result.authenticator) {
      const user = userStorage.get(username);
      if (user) {
        user.authenticators.push(result.authenticator);
        user.registered = true;
        userStorage.set(username, user);
      }
    }
  } else {
    res.status(400).send('Invalid clientData.type');
    return;
  }

  if (result.verified) {
    (req.session as CookieSessionObject).loggedIn = true;
    res.send(true);
  } else {
    res.status(401).send('Failed to register');
  }
}));

webAuthnRouter.post('/webauthn/login/request', (
  req: Request,
  res: Response,
) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).send('Invalid body');
    return;
  }

  const user = userStorage.get(username);
  if (!user || !user.registered) {
    res.status(400).send('Invalid user');
    return;
  }

  const assertionRequest = createStringedCredentialRequestOptions(
    user.authenticators,
  );
  (req.session as CookieSessionObject).username = username;
  (req.session as CookieSessionObject).challenge = assertionRequest.challenge;

  res.json(assertionRequest);
});

webAuthnRouter.post('/webauthn/login/response', (
  req: Request,
  res: Response,
) => {
  const webAuthnResponse = req.body;
  const { id, rawId, response, type } = webAuthnResponse;
  const username = (req.session as CookieSessionObject).username;
  const challenge = (req.session as CookieSessionObject).challenge;

  if (
    !username || !id || !rawId || !response || !type || type !== 'public-key'
  ) {
    res.status(400).send('Invalid body');
    return;
  }

  const clientData = JSON.parse(
    base64url.decode(response.clientDataJSON),
  );

  if (clientData.challenge !== challenge) {
    res.status(400).send('Invalid challenge');
    return;
  }

  if (clientData.origin !== HTTP_ORIGIN) {
    res.status(400).send('Invalid origin');
    return;
  }

  let result: AssertionVerificationResponse = { verified: false };
  if (clientData.type === 'webauthn.get') {
    const user = userStorage.get((req.session as CookieSessionObject).username);
    if (user) {
      result = verifyAuthenticatorAssertionResponse(
        webAuthnResponse,
        user.authenticators,
      );
    }
  } else {
    res.status(400).send('Invalid clientData.type');
    return;
  }

  if (result.verified) {
    (req.session as CookieSessionObject).loggedIn = true;
    res.send(true);
  } else {
    res.status(401).send('Failed to login');
  }
});
