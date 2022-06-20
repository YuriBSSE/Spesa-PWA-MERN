// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('admin');
  if (userStr) return userStr;
  else return null;
}
 
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('admin');
}
 
// set the token and user from the session storage
export const setUserSession = (user) => {
  sessionStorage.setItem('admin', user);
}