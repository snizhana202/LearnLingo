import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { bookingSchema, REASON_OPTIONS } from '../../schemas/bookingSchema';
import './BookingForm.scss';

export default function BookingForm({ teacher, onSuccess }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: { reason: REASON_OPTIONS[0] },
  });

  const selectedReason = watch('reason');

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    toast.success(`Trial lesson request sent to ${teacher.name}!`);
    onSuccess?.();
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="booking-form__title">Book trial lesson</h2>
      <p className="booking-form__subtitle">
        Our teacher will contact you to assign a lesson time
      </p>

      <div className="booking-form__teacher">
        <img src={teacher.avatar_url} alt={teacher.name} />
        <div>
          <p className="booking-form__teacher-label">Your teacher</p>
          <p className="booking-form__teacher-name">
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <fieldset className="booking-form__reasons">
        <legend>What is your main reason for learning English?</legend>
        {REASON_OPTIONS.map((reason) => (
          <label key={reason} className="booking-form__radio">
            <input type="radio" value={reason} {...register('reason')} checked={selectedReason === reason} readOnly />
            <span>{reason}</span>
          </label>
        ))}
      </fieldset>

      <div className="booking-form__group">
        <label className="booking-form__field">
          <input type="text" {...register('fullName')} placeholder="Full Name" />
        </label>
        <label className="booking-form__field">
          <input type="email" {...register('email')} placeholder="Email" />
        </label>
        <label className="booking-form__field">
          <input type="tel" {...register('phone')} placeholder="Phone number" />
        </label>
      </div>

      {(errors.fullName || errors.email || errors.phone) && (
        <p className="booking-form__error">
          {errors.fullName?.message || errors.email?.message || errors.phone?.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary booking-form__submit" disabled={isSubmitting}>
        Book
      </button>
    </form>
  );
}