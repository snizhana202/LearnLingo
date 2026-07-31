import { get, ref, remove, set } from 'firebase/database';
import { db } from '../firebase/config';

const favoritesPath = (uid) => `users/${uid}/favorites`;

export async function fetchFavoriteIds(uid) {
  const snapshot = await get(ref(db, favoritesPath(uid)));
  if (!snapshot.exists()) return [];
  return Object.keys(snapshot.val());
}

export function addFavorite(uid, teacherId) {
  return set(ref(db, `${favoritesPath(uid)}/${teacherId}`), true);
}

export function removeFavorite(uid, teacherId) {
  return remove(ref(db, `${favoritesPath(uid)}/${teacherId}`));
}