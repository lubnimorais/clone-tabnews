import { createRouter } from "next-connect";

import * as cookie from "cookie";

import controller from "infra/controller";

import authentication from "models/authentication";

import session from "models/session";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authentication.getAuthenticateUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  /**
   * response.setHeader("Set-Cookie", `NOME=${TOKEN}; PATH=(/ -> disponível para todo o site)`);
   */
  // response.setHeader("Set-Cookie", `session_id=${newSession.token}; Path=/`);

  /**
   *
   */
  const setCookie = cookie.serialize("session_id", newSession.token, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000, // transforma em segundos
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);

  return response.status(201).json(newSession);
}
