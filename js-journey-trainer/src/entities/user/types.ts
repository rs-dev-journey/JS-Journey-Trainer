export type User = {
  id: string;
  email: string;
  name?: string;
};

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
};

export type AuthListener = (authState: AuthState) => void;
