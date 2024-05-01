export const isValidateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email);
};

export const isValidatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
  return passwordRegex.test(password);
};

export const isValidateName = (name: string) => {
  const nameRegex = /^[가-힣]{2,4}$/;
  return nameRegex.test(name);
};
