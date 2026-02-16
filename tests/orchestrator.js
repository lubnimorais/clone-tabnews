import retry from "async-retry";

// AGUARDAR POR TODOS OS SERVIÇOS ESTAREM PRONTOS
async function waitForServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100, // números de tentativas
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

      // e se não funcionar, porque o servidor está retornando um HTML como erro
      // vai estourar um erro e o retry vai tentar novamente
      const responseBody = await response.json();
    }
  }
}

export default {
  waitForServices,
};
