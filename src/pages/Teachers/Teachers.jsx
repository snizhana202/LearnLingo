import { useEffect, useState } from 'react';
import Filters from '../../components/Filters/Filters';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { useTeachers } from '../../hooks/useTeachers';
import { useFavorites } from '../../hooks/useFavorites';
import './Teachers.scss';

export default function Teachers() {
  const [filters, setFilters] = useState({});
  const { teachers, allTeachers, hasMore, loading, loadMore } = useTeachers(filters);
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    document.body.classList.add('page-bg-muted');
    return () => document.body.classList.remove('page-bg-muted');
  }, []);

  return (
    <div className="container teachers-page">
      <Filters filters={filters} onChange={setFilters} teachers={allTeachers} />

      {loading && <p className="teachers-page__status">Loading teachers...</p>}
      {!loading && teachers.length === 0 && (
        <p className="teachers-page__status">No teachers match these filters.</p>
      )}

      <ul className="teachers-page__list">
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isFavorite={favoriteIds.includes(teacher.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </ul>

      {hasMore && (
        <button type="button" className="btn btn-outline teachers-page__load-more" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}