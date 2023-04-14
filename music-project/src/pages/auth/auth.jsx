import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { signUp, signIn } from "../../api/auth";

import "./auth.css";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import {
  validateDate,
  validateEmail,
  validateMaxLength,
} from "../../utils/validate";
import { useAuth } from "../../utils/auth-context";

const DEFAULT_SIGN_IN = {
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
  },
};

const DEFAULT_SIGN_UP = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  day: "",
  month: "",
  year: "",
  errors: {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    date: "",
  },
};

const Auth = () => {
  const { isOpen, onClose, onSetUser } = useAuth();
  const [step, setStep] = useState(0);
  const [signInState, setSignInState] = useState(DEFAULT_SIGN_IN);

  const [signUpState, setSignUpState] = useState(DEFAULT_SIGN_UP);

  const handleSignInChange = ({ target: { name, value } }) => {
    setSignInState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpChange = ({ target: { name, value } }) => {
    setSignUpState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGoToSignIn = () => {
    setStep(0);
    setSignInState(DEFAULT_SIGN_IN);
  };

  const handleGoToSignUp = () => {
    setStep(1);
    setSignUpState(DEFAULT_SIGN_UP);
  };

  const authTitle =
    step === 0 ? "Увійти" : "Зареєструватись через електронну пошту";

  const btnTitle = step === 0 ? "Увійти" : "Зареєструватися";
  const questionBtnTitle = step === 0 ? "Зареєструватися" : "Увійти";

  const question = step === 0 ? "Немає акаунта?" : "Маєте акаунт?";

  const validateSignIn = () => {
    const isEmailValid = validateEmail(signInState.email);

    const isPasswordValid = !!signInState.password;

    setSignInState((prevState) => ({
      ...prevState,
      errors: {
        email: isEmailValid ? "" : "Невалідна електронна адреса.",
        password: isPasswordValid ? "" : "Введіть пароль.",
      },
    }));

    return isEmailValid && isPasswordValid;
  };

  const validateSignUp = () => {
    const isEmailValid = validateEmail(signUpState.email);
    const isDateValid = validateDate(
      +signUpState.day,
      +signUpState.month,
      +signUpState.year
    );
    const isPasswordValid = validateMaxLength(signUpState.password, 30, 6);
    const isNameValid = validateMaxLength(signUpState.name, 30, 2);
    const isConfirmPasswordValid =
      signUpState.password === signUpState.confirmPassword;

    setSignUpState((prevState) => ({
      ...prevState,
      errors: {
        email: isEmailValid ? "" : "Невалідна електронна адреса.",
        password: isPasswordValid
          ? ""
          : "Пароль повинен містити від 6 до 30 символів.",
        confirmPassword: isConfirmPasswordValid ? "" : "Паролі не співпадають.",
        name: isNameValid ? "" : "Імʼя повинне мати від 2 до 30 символів.",
        date: isDateValid ? "" : "Невалідна дата.",
      },
    }));

    return (
      isEmailValid &&
      isDateValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isNameValid
    );
  };

  const handleClick = () => {
    if (step === 0) {
      const isValid = validateSignIn();
      if (isValid) {
        const signInStateTmp = { ...signInState };
        delete signInStateTmp.errors;
        signIn(signInStateTmp).then(({ success, msg }) => {
          if (success) {
            onSetUser(signInState.email);
            setTimeout(() => {
              onClose();
            }, 1000);
          } else {
            toast(msg, {
              type: "error",
            });
          }
        });
      }
      return;
    }

    const isValid = validateSignUp();

    if (isValid) {
      const signUpStateTmp = { ...signUpState };
      delete signUpStateTmp.errors;
      delete signUpStateTmp.confirmPassword;

      signUp(signUpStateTmp).then(({ success, msg }) => {
        if (success) {
          onSetUser(signUpState.email);
          toast(msg, {
            type: "success",
          });
          setTimeout(() => {
            onClose();
          }, 1000);
        } else {
          toast(msg, {
            type: "error",
          });
        }
      });
    }
  };

  return (
    <Modal show={isOpen} className="auth-modal" centered>
      <Modal.Header closeButton className="auth-header" onHide={onClose} />
      <div className="auth-content auth-body">
        <p className="auth-title">{authTitle}</p>
        <div className="auth-divider" />
        {step === 0 ? (
          <SignIn
            onChange={handleSignInChange}
            password={signInState.password}
            email={signInState.email}
            errors={signInState.errors}
          />
        ) : (
          <SignUp
            onChange={handleSignUpChange}
            email={signUpState.email}
            password={signUpState.password}
            confirmPassword={signUpState.confirmPassword}
            name={signUpState.name}
            errors={signUpState.errors}
          />
        )}
        <div className="auth-sign-in-wrapper">
          <Button
            className={`auth-sign-in ${
              step === 0 ? "sign-in-btn" : "sign-up-btn"
            }`}
            onClick={handleClick}
          >
            {btnTitle}
          </Button>
        </div>
        <div className="auth-divider auth-divider-bottom" />
        <div className="auth-question-wrapper">
          <p className="auth-question-text">{question}</p>
          <Button
            className="auth-question-text auth-button-link"
            variant="link"
            onClick={step === 0 ? handleGoToSignUp : handleGoToSignIn}
          >
            {questionBtnTitle}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Auth;
