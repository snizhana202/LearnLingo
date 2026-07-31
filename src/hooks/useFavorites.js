import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { addFavorite, fetchFavoriteIds, removeFavorite } from '../services/favoritesApi';

export function useFavorites() {
  const { currentUser, isLoggedIn } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
         // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavoriteIds([]);
      return;
    }
    fetchFavoriteIds(currentUser.uid).then(setFavoriteIds);
  }, [isLoggedIn, currentUser]);

  const toggleFavorite = useCallback(
    async (teacherId) => {
      if (!isLoggedIn) {
        toast.info('Увійдіть, щоб додавати викладачів в обране.');
        return;
      }

      const isFavorite = favoriteIds.includes(teacherId);
      if (isFavorite) {
        await removeFavorite(currentUser.uid, teacherId);
        setFavoriteIds((prev) => prev.filter((id) => id !== teacherId));
      } else {
        await addFavorite(currentUser.uid, teacherId);
        setFavoriteIds((prev) => [...prev, teacherId]);
      }
    },
    [currentUser, favoriteIds, isLoggedIn]
  );

  return { favoriteIds, toggleFavorite };
}