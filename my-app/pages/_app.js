import { SWRConfig } from 'swr'
import Layout from '@/components/Layout'
import RouteGuard from '@/components/RouteGuard'
import 'bootstrap/dist/css/bootstrap.min.css'

async function fetcher(url) {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  )
}
