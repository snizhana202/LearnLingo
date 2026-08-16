import { useEffect } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useTeachers } from "../../hooks/useTeachers";
import { useFavorites } from "../../hooks/useFavorites";
import "../Teachers/Teachers.scss";

export default function Favorites() {
  const { allTeachers, loading } = useTeachers({});
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    document.body.classList.add("page-bg-muted");
    return () => document.body.classList.remove("page-bg-muted");
  }, []);

  const favoriteTeachers = allTeachers.filter((teacher) =>
    favoriteIds.includes(teacher.id),
  );

  return (
    <div className="container teachers-page">
      {loading && <p className="teachers-page__status">Loading...</p>}
      {!loading && favoriteTeachers.length === 0 && (
        <p className="teachers-page__status">
          You have no favorite teachers yet.
        </p>
      )}

      <ul className="teachers-page__list">
        {favoriteTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isFavorite
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
}
