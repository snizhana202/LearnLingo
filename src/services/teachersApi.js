import { get, ref } from 'firebase/database';
import { db } from '../firebase/config';

const TEACHERS_PATH = 'teachers';
export const PAGE_SIZE = 4;

let cachedTeachers = null;

export async function fetchAllTeachers() {
  if (cachedTeachers) return cachedTeachers;

  const snapshot = await get(ref(db, TEACHERS_PATH));
  if (!snapshot.exists()) {
    cachedTeachers = [];
    return cachedTeachers;
  }

  const data = snapshot.val();
  cachedTeachers = Object.entries(data).map(([id, value]) => ({ id, ...value }));
  return cachedTeachers;
}

export function filterTeachers(teachers, { language, level, price } = {}) {
  return teachers.filter((teacher) => {
    const matchesLanguage = !language || teacher.languages?.includes(language);
    const matchesLevel = !level || teacher.levels?.includes(level);
    const matchesPrice = !price || Number(teacher.price_per_hour) === Number(price);
    return matchesLanguage && matchesLevel && matchesPrice;
  });
}

export function paginate(list, page, pageSize = PAGE_SIZE) {
  const end = page * pageSize;
  return {
    items: list.slice(0, end),
    hasMore: end < list.length,
  };
}