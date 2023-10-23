import apiClient from "../http-common";

class UserService {
  signin(data: any): Promise<any> {
    return apiClient.post(`user/signin`, data);
  }

  signup(data: any): Promise<any> {
    return apiClient.post(`user/signup`, data);
  }
}

export default new UserService();
