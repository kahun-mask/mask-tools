import { AuthenticatorInfo } from '@mask-tools/web-authn-helpers/lib/types';

export class User {
  public id: BufferSource;
  public displayName: string;
  public username: string;
  public authenticators: AuthenticatorInfo[];
  public registered: boolean;
}
