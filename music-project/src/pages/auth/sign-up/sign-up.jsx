import { Form, FloatingLabel } from "react-bootstrap";

const SignUp = ({
  onChange,
  confirmPassword,
  password,
  name,
  email,
  month,
  day,
  year,
  errors,
}) => {
  return (
    <>
      <FloatingLabel
        controlId="email"
        label="Введіть адресу електронної пошти"
        className="auth-floating-label"
      >
        <Form.Control
          className="auth-input mt-5"
          autoComplete="new-email"
          onChange={onChange}
          name="email"
          value={email}
          isInvalid={errors.email}
        />
      </FloatingLabel>
      {errors.email && <p className="input-error">{errors.email}</p>}
      <FloatingLabel
        controlId="password"
        label="Створіть пароль"
        className="auth-floating-label"
      >
        <Form.Control
          type="password"
          className="auth-input mt-2"
          autoComplete="new-password"
          onChange={onChange}
          name="password"
          value={password}
          isInvalid={errors.password}
        />
      </FloatingLabel>
      {errors.password && <p className="input-error">{errors.password}</p>}
      <FloatingLabel
        controlId="confirm_password"
        label="Підтвердьте пароль"
        className="auth-floating-label"
      >
        <Form.Control
          type="password"
          className="auth-input mt-2"
          onChange={onChange}
          name="confirmPassword"
          value={confirmPassword}
          isInvalid={errors.confirmPassword}
        />
      </FloatingLabel>
      {errors.confirmPassword && <p className="input-error">{errors.confirmPassword}</p>}
      <FloatingLabel
        controlId="name"
        label="Введіть ім’я користувача"
        className="auth-floating-label"
      >
        <Form.Control
          className="auth-input mt-2"
          onChange={onChange}
          name="name"
          value={name}
          isInvalid={errors.name}
        />
      </FloatingLabel>
      {errors.name && <p className="input-error">{errors.name}</p>}
      <p className="auth-select-label">Укажіть дату народження</p>
      <div className="auth-select-wrapper">
        <Form.Control
          placeholder="ДД"
          type="number"
          className="auth-number-input"
          name="day"
          value={day}
          onChange={onChange}
          isInvalid={errors.date}
        />
        <Form.Select
          className="auth-number-select"
          value={month}
          onChange={onChange}
          name="month"
        >
          <option>Місяць</option>
          <option value="0">Січень</option>
          <option value="1">Лютий</option>
          <option value="2">Березень</option>
          <option value="3">Квітень</option>
          <option value="4">Травень</option>
          <option value="5">Червень</option>
          <option value="6">Липень</option>
          <option value="7">Серпень</option>
          <option value="8">Вересень</option>
          <option value="9">Жовтень</option>
          <option value="10">Листопад</option>
          <option value="11">Грудень</option>
        </Form.Select>
        <Form.Control
          placeholder="РРРР"
          type="number"
          className="auth-number-input"
          name="year"
          value={year}
          onChange={onChange}
          isInvalid={errors.date}
        />
      </div>
      {errors.date && <p className="input-error">{errors.date}</p>}
    </>
  );
};

export default SignUp;
