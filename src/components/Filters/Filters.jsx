import { useMemo } from 'react';
import './Filters.scss';

export default function Filters({ filters, onChange, teachers }) {
  const languages = useMemo(() => {
    const set = new Set(teachers.flatMap((t) => t.languages ?? []));
    return Array.from(set).sort();
  }, [teachers]);

  const levels = useMemo(() => {
    const set = new Set(teachers.flatMap((t) => t.levels ?? []));
    return Array.from(set).sort();
  }, [teachers]);

  const prices = useMemo(() => {
    const set = new Set(teachers.map((t) => Number(t.price_per_hour)).filter(Boolean));
    return Array.from(set).sort((a, b) => a - b);
  }, [teachers]);

  const handleChange = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value || undefined });
  };

  return (
    <div className="filters">
      <label className="filters__field">
        <span>Languages</span>
        <select value={filters.language ?? ''} onChange={handleChange('language')}>
          <option value="">All languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </label>

      <label className="filters__field">
        <span>Level of knowledge</span>
        <select value={filters.level ?? ''} onChange={handleChange('level')}>
          <option value="">All levels</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label className="filters__field">
  <span>Price</span>
  <select value={filters.price ?? ''} onChange={handleChange('price')}>
    <option value="">Any price</option>
    {prices.map((price) => (
      <option key={price} value={price}>
        {price} $
      </option>
    ))}
  </select>
</label>
    </div>
  );
}