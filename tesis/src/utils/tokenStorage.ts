export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const wipeToken = (): void => {
  localStorage.removeItem("token");
};
