import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { readToken, isAuthenticated } from '@/lib/authenticate'
import { useAtom } from 'jotai'
import { favouritesAtom, searchHistoryAtom } from '@/store'
import { getFavourites, getHistory } from '@/lib/userData'

const PUBLIC_PATHS = ['/', '/login', '/register']

export default function RouteGuard({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [, setFavouritesList] = useAtom(favouritesAtom)
  const [, setSearchHistory] = useAtom(searchHistoryAtom)

  async function updateAtoms() {
    setFavouritesList(await getFavourites())
    setSearchHistory(await getHistory())
  }

  useEffect(() => {
    const token = readToken()

    if (!isAuthenticated() && !PUBLIC_PATHS.includes(pathname)) {
      router.push('/login')
    } else {
      updateAtoms()
    }
  }, [pathname])

  return children
}
