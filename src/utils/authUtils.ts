export const getUserIdFromToken = () => {
    const authToken=localStorage.getItem('authToken');
    if(!authToken){
      return null;
    }
    const tokenParts = authToken.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }
   
    const payload=JSON.parse(atob(tokenParts[1]));
    return payload.sub
  }