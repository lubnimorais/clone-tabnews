import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>

      <UpdatedAt />
      <Dependencies />
    </>
  );
}

function UpdatedAt() {
  /**
   * A CHAVE PASSADA NO SWR PODE SER PASSADA
   * COMO PRIMEIRO PARÂMETRO DA FUNÇÃO
   */
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function Dependencies() {
  /**
   * A CHAVE PASSADA NO SWR PODE SER PASSADA
   * COMO PRIMEIRO PARÂMETRO DA FUNÇÃO
   */
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (!isLoading && data) {
    return (
      <div>
        <span>Database:</span>
        <ul style={{ listStyle: "none", marginTop: 0 }}>
          <li>Versão: {data.dependencies.database.version}</li>
          <li>
            Conexões abertas: {data.dependencies.database.opened_connections}
          </li>
          <li>
            Conexões permitidas: {data.dependencies.database.max_connections}
          </li>
        </ul>
      </div>
    );
  }
}
