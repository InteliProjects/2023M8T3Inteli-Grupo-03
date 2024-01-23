import { group } from "k6";

import GetUser from "./scenarios/getUser.js";

export default () => {
  group("Endpoint GetUser - API k6", () => {
    GetUser();
  });
};
