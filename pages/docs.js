import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Docs() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Backstage API | Docs</title>
        <meta name="description" content="Backstage API service documentation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Documentation
        </h1>

        <h2>List Users</h2>
        <p>
          This method will return an array of users.
        </p>
        <code className={styles.code}>
          GET https://backstage-hacktoberfest-service.vercel.app/api/users
        </code>
        <h2>Responses 200</h2>
        

        <h2>List NFTs</h2>
        <p>
          This method will return an array of NFTs.
        </p>
        <code className={styles.code}>
          GET https://backstage-hacktoberfest-service.vercel.app/api/nfts
        </code>
        <h2>Responses 200</h2>
        

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
