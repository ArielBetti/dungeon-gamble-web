import { TSendLoginAPI } from "./types-sendlogin";

export type TSendRegisterParams = {
  login: string,
  password: string,
  name: string,
  tag: string,
  email: string,
};

export type TSendRegisterAPI = TSendLoginAPI;