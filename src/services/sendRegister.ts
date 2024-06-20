import ENDPOINTS from "@/api/endpoints";
import { requester } from "@/api/requester";
import { TSendRegisterAPI, TSendRegisterParams } from "./types/types-sendregister";

export const sendRegister = async (
  body: TSendRegisterParams
): Promise<TSendRegisterAPI> => {
  const { data } = await requester({}).post<TSendRegisterAPI>(
    `${ENDPOINTS.register}`,
    body
  );

  return data;
};