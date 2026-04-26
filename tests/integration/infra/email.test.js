import email from "infra/email";

import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "TabCode <contato@tabcode.com.br>",
      to: "johndoe@test.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "TabCode <contato@tabcode.com.br>",
      to: "johndoe@test.com",
      subject: "Último e-mail enviado",
      text: "Corpo do último e-mail.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    console.log("🚀 ~ lastEmail:", lastEmail);

    expect(lastEmail.sender).toBe("<contato@tabcode.com.br>");
    expect(lastEmail.recipients[0]).toBe("<johndoe@test.com>");
    expect(lastEmail.subject).toBe("Último e-mail enviado");
    expect(lastEmail.text).toBe("Corpo do último e-mail.\r\n");
  });
});
