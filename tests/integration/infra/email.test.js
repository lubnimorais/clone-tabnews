import email from "infra/email";

import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "TabCode <lubnidev@gmail.com>",
      to: "johndoe@test.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "TabCode <lubnidev@gmail.com>",
      to: "johndoe@test.com",
      subject: "Último e-mail enviado",
      text: "Corpo do último e-mail.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<lubnidev@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<johndoe@test.com>");
    expect(lastEmail.subject).toBe("Último e-mail enviado");
    expect(lastEmail.text).toBe("Corpo do último e-mail.\r\n");
  });
});
