export class AuthService {
  isAuth = false;
  sessions: any;

  signOut() {
    this.isAuth = false;
  }

  signIn() {
    this.isAuth = true;
  }

  getSessions() {
    return this.sessions;
  }
}
