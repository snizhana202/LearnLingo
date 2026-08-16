import { useState } from "react";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import Modal from "../Modal/Modal";
import BookingForm from "../BookingForm/BookingForm";
import "./TeacherCard.scss";
import { FiBookOpen } from "react-icons/fi";

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
      <img
        className="teacher-card__avatar"
        src={avatar_url}
        alt={`${name} ${surname}`}
      />

      <div className="teacher-card__body">
        <div className="teacher-card__header">
          <div className="teacher-card__top">
            <span className="teacher-card__eyebrow">Languages</span>
            <div className="teacher-card__meta">
              <span className="teacher-card__icons">
                {" "}
                <FiBookOpen className="teacher-card__book-icon" /> Lessons
                online
              </span>
              <span className="teacher-card__dot" />
              <span>Lessons done: {lessons_done}</span>
              <span className="teacher-card__dot" />
              <span className="teacher-card__icons">
                {" "}
                <FaStar className="teacher-card__star" />
                Rating: {rating}
              </span>
              <span className="teacher-card__dot" />
              <span>
                Price / 1 hour:{" "}
                <strong className="teacher-card__price">
                  {price_per_hour}$
                </strong>
              </span>

              <button
                type="button"
                className={`teacher-card__favorite ${isFavorite ? "is-active" : ""}`}
                onClick={() => onToggleFavorite(teacher.id)}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isFavorite ? (
                  <FaHeart className="teacher-card__heart" />
                ) : (
                  <FaRegHeart className="teacher-card__heart" />
                )}
              </button>
            </div>
          </div>

          <h3 className="teacher-card__name">
            {name} {surname}
          </h3>
        </div>

        <div className="teacher-card__details">
          <div className="teacher-card__info">
            <p className="teacher-card__line">
              <strong>Speaks:</strong>{" "}
              <span className="teacher-card__underline">
                {languages.join(", ")}
              </span>
            </p>
            <p className="teacher-card__line">
              <strong>Lesson Info:</strong> {lesson_info}
            </p>
            <p className="teacher-card__line">
              <strong>Conditions:</strong> {conditions.join(" ")}
            </p>
          </div>

          {expanded && <p className="teacher-card__experience">{experience}</p>}

          <button
            type="button"
            className="teacher-card__read-more"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>

        {expanded && (
          <ul className="teacher-card__reviews">
            {reviews.map((review) => (
              <li key={review.reviewer_name} className="teacher-card__review">
                <div className="teacher-card__review-head">
                  <img
                    className="teacher-card__review-avatar"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewer_name)}&background=random&color=fff`}
                    alt={review.reviewer_name}
                  />
                  <div className="teacher-card__review-meta">
                  <p className="teacher-card__review-author">
                    {review.reviewer_name}
                  </p>
                  <p className="teacher-card__review-rating">
                    <FaStar className="teacher-card__star" /> {review.reviewer_rating.toFixed(1)}
                  </p>
                  </div>
                </div>
                <p className="teacher-card__comment">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}

        <ul className="teacher-card__levels">
          {levels.map((level, index) => (
            <li key={level}>
              <span
                className={`teacher-card__level ${index === 0 ? "is-active" : ""}`}
              >
                #{level}
              </span>
            </li>
          ))}
        </ul>

        {expanded && (
          <button
            type="button"
            className="btn btn-primary teacher-card__book"
            onClick={() => setIsBookingOpen(true)}
          >
            Book trial lesson
          </button>
        )}
      </div>

      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)}>
        <BookingForm
          teacher={teacher}
          onSuccess={() => setIsBookingOpen(false)}
        />
      </Modal>
    </li>
  );
}
