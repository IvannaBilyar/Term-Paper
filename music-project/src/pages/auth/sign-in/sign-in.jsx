import { Form, FloatingLabel } from "react-bootstrap";

const SignIn = ({ onChange, email, password, errors }) => {
  return (
    <>
      <FloatingLabel
        controlId="login-email"
        label="Адреса електронної пошти"
        className="auth-floating-label"
      >
        <Form.Control
          className="auth-input mt-5"
          name="email"
          value={email}
          onChange={onChange}
          isInvalid={errors.email}
        />
      </FloatingLabel>
      {errors.email && <p className="input-error">{errors.email}</p>}
      <FloatingLabel
        controlId="login-password"
        label="Пароль"
        className="auth-floating-label"
      >
        <Form.Control
          className="auth-input mt-2"
          name="password"
          value={password}
          onChange={onChange}
          isInvalid={errors.password}
        />
      </FloatingLabel>
      {errors.password && <p className="input-error">{errors.password}</p>}
    </>
  );
};

export default SignIn;
