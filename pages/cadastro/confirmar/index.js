import { Banner } from "@primer/react";
import DefaultLayout from "interface/DefaultLayout";

export default function ConfirmRegisterPage() {
  return (
    <DefaultLayout
      contentWidth="small"
      metadata={{
        title: "Confirme seu email",
      }}
    >
      <Banner
        variant="warning"
        title="Falta só uma etapa"
        description="Abra seu email enviado pelo TabCode e clique no link de confirmação."
      />
    </DefaultLayout>
  );
}
