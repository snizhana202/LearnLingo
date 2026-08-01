import { useEffect, useMemo, useState } from 'react';
import { fetchAllTeachers, filterTeachers, paginate } from '../services/teachersApi';

export function useTeachers(filters) {
  const [allTeachers, setAllTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetchAllTeachers()
      .then(setAllTeachers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filters]);

  const filtered = useMemo(() => filterTeachers(allTeachers, filters), [allTeachers, filters]);
  const { items, hasMore } = useMemo(() => paginate(filtered, page), [filtered, page]);

  const loadMore = () => setPage((prev) => prev + 1);

  return { teachers: items, allTeachers, hasMore, loading, error, loadMore };
}