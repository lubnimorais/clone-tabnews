import retry from "async-retry";

import { faker } from "@faker-js/faker";

import database from "infra/database";

import migrator from "models/migrator";

import user from "models/user";

import session from "models/session";

// AGUARDAR POR TODOS OS SERVIÇOS ESTAREM PRONTOS
async function waitForServices() {
  await waitForWebServer();

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
      const response = await fetch("http://localhost:3000/api/v1/status");

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

const orchestrator = {
  waitForServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
  createSession,
};

export default orchestrator;
