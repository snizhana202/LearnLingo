import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../schemas/authSchemas";
import "./AuthForm.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm({ onSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const passwordValue = watch('password');

  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success("You have successfully logged in!");
      onSuccess?.();
    } catch {
      toast.error(
        "Failed to log in. Please check your credentials and try again.",
      );
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="auth-form__titlegroup">
        <h2 className="auth-form__title">Log In</h2>
        <p className="auth-form__subtitle">
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>

      <div className="auth-form__fieldsgroup">
        <label className="auth-form__field">
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && (
            <p className="auth-form__error">{errors.email.message}</p>
          )}
        </label>

        <label className="auth-form__field auth-form__field--password">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register("password")}
            placeholder="Password"
          />
           {passwordValue && (
          <button
            type="button"
            className="auth-form__toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
            )}
          {errors.password && (
            <p className="auth-form__error">{errors.password.message}</p>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary auth-form__submit"
        disabled={isSubmitting}
      >
        Log In
      </button>

      <button
        type="button"
        className="auth-form__switch"
        onClick={onSwitchToRegister}
      >
        Don't have an account? Sign up
      </button>
    </form>
  );
}
