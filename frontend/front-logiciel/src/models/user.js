export default class User {
    constructor(username, email, password, role, token) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
      this.token = token
    }
  }