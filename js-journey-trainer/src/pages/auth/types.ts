export type loginFormData = {
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
