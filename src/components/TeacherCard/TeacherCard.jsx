import { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import Modal from '../Modal/Modal';
import BookingForm from '../BookingForm/BookingForm';
import './TeacherCard.scss';

export default function TeacherCard({ teacher, isFavorite, onToggleFavorite }) {
  const [expanded, setExpanded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const {
    name,
    surname,
    languages = [],
    levels = [],
    rating,
    reviews = [],
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions = [],
    experience,
  } = teacher;

  return (
    <li className="teacher-card">
      <img className="teacher-card__avatar" src={avatar_url} alt={`${name} ${surname}`} />

      <div className="teacher-card__body">
        <div className="teacher-card__top">
          <span className="teacher-card__eyebrow">Languages</span>

          <div className="teacher-card__meta">
            <span>Lessons done: {lessons_done}</span>
            <span className="teacher-card__dot" />
            <span>Rating: {rating}</span>
            <span className="teacher-card__dot" />
            <span>
              Price / 1 hour: <strong>{price_per_hour}$</strong>
            </span>

            <button
              type="button"
              className={`teacher-card__favorite ${isFavorite ? 'is-active' : ''}`}
              onClick={() => onToggleFavorite(teacher.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <CiHeart />
            </button>
          </div>
        </div>

        <h3 className="teacher-card__name">
          {name} {surname}
        </h3>

        <p className="teacher-card__line">
          <strong>Speaks:</strong> {languages.join(', ')}
        </p>
        <p className="teacher-card__line">
          <strong>Lesson Info:</strong> {lesson_info}
        </p>
        <p className="teacher-card__line">
          <strong>Conditions:</strong> {conditions.join(' ')}
        </p>

        {expanded && (
          <div className="teacher-card__details">
            <p className="teacher-card__line">
              <strong>Experience:</strong> {experience}
            </p>
            <p className="teacher-card__line">
              <strong>Levels:</strong> {levels.join(', ')}
            </p>

            <ul className="teacher-card__reviews">
              {reviews.map((review) => (
                <li key={review.reviewer_name} className="teacher-card__review">
                  <p className="teacher-card__review-author">
                    {review.reviewer_name} — {review.reviewer_rating}★
                  </p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>

            <button type="button" className="btn btn-primary" onClick={() => setIsBookingOpen(true)}>
              Book trial lesson
            </button>
          </div>
        )}

        <button type="button" className="teacher-card__read-more" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      </div>

      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)}>
        <BookingForm teacher={teacher} onSuccess={() => setIsBookingOpen(false)} />
      </Modal>
    </li>
  );
}