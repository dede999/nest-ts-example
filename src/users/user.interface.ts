import { internet, random } from "faker/locale/pt_BR";

export default interface UserInterface {
  email: string;
  nickname?: string;
  password: string;
  uid: string;
}

export const userFactory = function(): UserInterface {
  return {
    email: internet.email(),
    password: internet.password(12),
    uid: random.uuid()
  }
}
