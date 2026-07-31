import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { registerSchema } from '../../schemas/authSchemas';
import { FiEye, FiEyeOff } from "react-icons/fi";
import './AuthForm.scss';

export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const passwordValue = watch('password');

  const onSubmit = async (values) => {
    try {
      await registerUser(values);
      toast.success('Registration successful!');
      onSuccess?.();
    } catch {
      toast.error('Failed to register. This email may already be in use.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="auth-form__titlegroup">
      <h2 className="auth-form__title">Registration</h2>
      <p className="auth-form__subtitle">
        Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information
      </p>
      </div>

      <div className="auth-form__fieldsgroup">
        <label className="auth-form__field">
          <input type="text" {...register('name')} placeholder="Name" />
          {errors.name && (
            <p className="auth-form__error">{errors.name.message}</p>
          )}
        </label>

        <label className="auth-form__field">
          <input type="email" {...register('email')} placeholder="Email" />
          {errors.email && (
            <p className="auth-form__error">{errors.email.message}</p>
          )}
        </label>

        <label className="auth-form__field auth-form__field--password">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
          />
          {passwordValue && (
            <button
              type="button"
              className="auth-form__toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          )}
          {errors.password && (
            <p className="auth-form__error">{errors.password.message}</p>
          )}
        </label>
      </div>

      <button type="submit" className="btn btn-primary auth-form__submit" disabled={isSubmitting}>
        Sign Up
      </button>

      <button type="button" className="auth-form__switch" onClick={onSwitchToLogin}>
        Already have an account? Log In
      </button>
    </form>
  );
}