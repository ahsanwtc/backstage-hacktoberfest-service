import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Backstage API Service</title>
        <meta name="description" content="Backstage API service for database access" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/ahsanwtc/backstage-hacktoberfest-service">Backstage API Service</a>
        </h1>

        <p className={styles.description}>
          Endpoints:{' '}
          <code className={styles.code}>/api/users & /api/nfts</code>
        </p>

        <div className={styles.grid}>
          <Link href="/docs" className={styles.card}>
            <h2 style={{ cursor: 'pointer' }}>Documentation &rarr;</h2>
          </Link>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
