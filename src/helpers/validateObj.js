export const validateEmail = {
  required: "This field is required",
  pattern: {
    value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
    message: "email@gmail.ru",
  },
};

export const validateUsername = {
  required: "This is required",
  pattern: {
    value: /^\S*$/,
    message: "Inccorect username",
  },
  minLength: {
    message: "Your username needs to be at least 3 characters.",
    value: 3,
  },
  maxLength: {
    message: "Your username must be no more than 20 characters long.",
    value: 20,
  },
};

export const validatePasswordRequired = {
  required: "This field is required",
  minLength: {
    message: "Your password needs to be at least 6 characters.",
    value: 6,
  },
  maxLength: {
    message: "Your password must be no more than 40 characters long.",
    value: 40,
  },
};

export const validatePassword = {
  minLength: {
    message: "Your password needs to be at least 6 characters.",
    value: 6,
  },
  maxLength: {
    message: "Your password must be no more than 40 characters long.",
    value: 40,
  },
};

export const validateRepeatPassword = {
  required: "This field is required",
  validate: (value, formValues) => value === formValues.password,
};

export const validateUrlImages = {
  validate: (value) => {
    if (!value) {
      return true;
    }
    return new Promise((res) => {
      const image = new Image();
      image.src = value;
      image.onload = () => res(true);
      image.onerror = () => res(false);
    });
  },
};

export const validateRequired = { required: "This field is required" };
