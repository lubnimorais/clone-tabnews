import retry from "async-retry";

import { faker } from "@faker-js/faker";

import database from "infra/database";

import migrator from "models/migrator";
import user from "models/user";
import session from "models/session";
import activation from "models/activation";

import webserver from "infra/webserver";

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`;

// AGUARDAR POR TODOS OS SERVIÇOS ESTAREM PRONTOS
async function waitForServices() {
  await waitForWebServer();
  await waitForEmailServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100, // números de tentativas
      maxTimeout: 1000, // configura o tempo de espera de cada tentativa
    });

    /**
     * o corpo da função precisa estourar um erro
     * caso queira o retry tente novamente executar
     * ela.
     * Porque se não gerar um erro, ele vai entender
     * que executou a função com sucesso, vai soltar
     * a execução da próxima linha e vai soltar o
     * orquestrator, que vai soltar o hook do beforeAll
     * do Jest e os testes vão começar a rodar.
     */
    async function fetchStatusPage() {
      const response = await fetch(`${webserver.origin}/api/v1/status`);

      if (response.status !== 200) {
        throw new Error();
      }
    }
  }

  async function waitForEmailServer() {
    return retry(fetchEmailPage, {
      retries: 100, // números de tentativas
      maxTimeout: 1000, // configura o tempo de espera de cada tentativa
    });

    /**
     * o corpo da função precisa estourar um erro
     * caso queira o retry tente novamente executar
     * ela.
     * Porque se não gerar um erro, ele vai entender
     * que executou a função com sucesso, vai soltar
     * a execução da próxima linha e vai soltar o
     * orquestrator, que vai soltar o hook do beforeAll
     * do Jest e os testes vão começar a rodar.
     */
    async function fetchEmailPage() {
      const response = await fetch(emailHttpUrl);

      if (response.status !== 200) {
        throw new Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function createUser(userObject) {
  return await user.create({
    username:
      userObject?.username || faker.internet.username().replace(/[_.-]/g, ""),
    email: userObject?.email || faker.internet.email(),
    password: userObject?.password || "validpassword",
  });
}

async function createSession(userId) {
  return await session.create(userId);
}

async function deleteAllEmails() {
  await fetch(`${emailHttpUrl}/messages`, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListResponse = await fetch(`${emailHttpUrl}/messages`);

  const emailListBody = await emailListResponse.json();
  const lastEmailItem = emailListBody.pop();

  if (!lastEmailItem) {
    return null;
  }

  const emailTextResponse = await fetch(
    `${emailHttpUrl}/messages/${lastEmailItem.id}.plain`,
  );

  const emailTextBody = await emailTextResponse.text();

  lastEmailItem.text = emailTextBody;

  return lastEmailItem;
}

function extractUUID(text) {
  const match = text.match(/[0-9a-fA-F-]{36}/);
  return match ? match[0] : null;
}

async function activateUser(inactiveUser) {
  return await activation.activeUserByUserId(inactiveUser.id);
}

async function addFeaturesToUser(userObject, features) {
  const updatedUser = await user.addFeatures(userObject.id, features);

  return updatedUser;
}

const orchestrator = {
  waitForServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
  extractUUID,
  activateUser,
  addFeaturesToUser,
};

export default orchestrator;
