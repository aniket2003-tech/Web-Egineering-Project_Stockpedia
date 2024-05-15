export const checkCredentials = (navigate) => {
    const isAdmin = localStorage.getItem('isAdmin');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  
    // If user is admin and logged in, allow access to dashboard
    if (isAdmin === 'true' && isLoggedIn === 'true') {
      return true;
    }
  
    // If user is not logged in, redirect to admin login page
    else {
      setTimeout(() => {
        navigate('/admin_login');
      }, 0);
      return false;
    }
  };
  