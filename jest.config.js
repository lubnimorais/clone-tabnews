const dotenv = require("dotenv");

const nextJest = require("next/jest");

dotenv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  /**
   * caminho dos diretórios dos módulos, por padrão vem node_modules
   * Se queremos customizar a importação, mas queremos continuar conseguindo
   * importar módulos que foram instalados no node_modules temos que redeclarar
   * o diretório do node_modules.
   * E para ajudar o Jest a resolver módulos da raiz do projeto, declaramos na segunda
   * posição o placeholder <rootDir> criado pelo Jest dessa forma se o projeto começar
   * na raiz ou <rootDir>/src de começar pela pasta src
   */
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
