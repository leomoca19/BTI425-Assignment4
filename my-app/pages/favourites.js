import { useAtom } from 'jotai'

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
}
