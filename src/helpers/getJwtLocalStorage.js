export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.user?.token;
  return token;
};
