export abstract class AuthExternalInterface {
  abstract validateToken({ token }: { token: string }): Promise<string>;
}
