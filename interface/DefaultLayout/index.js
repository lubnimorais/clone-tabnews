import Head from "next/head";

import { Header, PageLayout, Text } from "@primer/react";

import styles from "./styles.module.css";

// DICIONÁRIO (MAPA) NOME E CLASSES
const contentWidthClasses = {
  small: styles.smallContent,
};

export default function DefaultLayout({
  children,
  metadata = {},
  contentWidth,
}) {
  const extraContentClassName = contentWidthClasses[contentWidth];

  return (
    <>
      <Head>
        <title>
          {metadata.title ? `${metadata.title} · TabCode` : "TabCode"}
        </title>

        {metadata.description && (
          <meta name="description" value={metadata.description} />
        )}
      </Head>

      <Header>
        <Header.Item full>
          <Header.Link href="/">TabCode</Header.Link>
        </Header.Item>

        <Header.Item>
          <Header.Link href="/login">Login</Header.Link>
        </Header.Item>

        <Header.Item>
          <Header.Link href="/cadastro">Cadastrar</Header.Link>
        </Header.Item>
      </Header>

      <PageLayout>
        <PageLayout.Content
          width={contentWidth}
          className={extraContentClassName}
        >
          {children}
        </PageLayout.Content>

        <PageLayout.Footer divider="line">
          <Text size="small">&copy; {new Date().getFullYear()} TabCode</Text>
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
