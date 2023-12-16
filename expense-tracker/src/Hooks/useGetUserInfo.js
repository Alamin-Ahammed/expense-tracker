export const useGetUserInfo = () => {
  const { name, Profilephoto, email, userId, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );
  
  return { name, Profilephoto, email, userId, isAuth }
};
