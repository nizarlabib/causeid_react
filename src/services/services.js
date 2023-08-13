import http from "../api";

class Services {
  getUserById() {
    return http.get(`/user/${id}`);
  }
}

export default new Services();