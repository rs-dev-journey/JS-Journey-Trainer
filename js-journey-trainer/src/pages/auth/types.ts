export type LoginFormData = {
  username: string;
  email: string;
  password: string;
};

export type Errors = {
  username?: string;
  email?: string;
  password?: string;
};

export type ErrorElement = {
  username: HTMLParagraphElement;
  email: HTMLParagraphElement;
  password: HTMLParagraphElement;
};

export type StatusAuth = {
  statusElement: HTMLElement;
  serverErrorElement: HTMLElement;
  submitButton: HTMLButtonElement;
};
