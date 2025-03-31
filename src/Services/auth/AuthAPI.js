import { api } from "../APIBase";
// Login Service
export const login = async (loginForm) => {
  try {
    const res = await api.post(
      "/auth/login",
      {
        email: loginForm.email,
        password: loginForm.password,
      },
      {
        withCredentials: true, // Make sure cookies are sent with the request
      }
    );
    if (res.status == 200) {
      //Everything OK set variables
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("mfaEnabled", res.data.mfaEnabled);
      localStorage.setItem("email", loginForm.email);
    }
    return res.data; // Both have a message property (success or error)
  } catch (e) {
    console.log("Error logging in", e);
    return e.response.data; // Return the message from the server
  }
};

export const signup = async (signUpForm) => {
  try {
    const res = await api.post(
      "/auth/register",
      {
        firstName: signUpForm.firstName,
        username: signUpForm.username,
        email: signUpForm.email,
        password: signUpForm.password,
      },
      {
        withCredentials: true, // Make sure cookies are sent with the request
      }
    );
    if (res.status == 201) {
      //Everything OK set variables
      // console.log(res.data)
      localStorage.setItem("accessToken", res.data.accessToken);
      return { ...res.data, success: true };
    } else {
      return { ...res.data, success: false }; // Both have a message property (success or error)
    }
  } catch (e) {
    return { ...e.response.data, success: false }; // Return the message from the server
  }
};

export const getMFASetup = async () => {
  try {
    const res = await api.post("/auth/enable-mfa", {}, {
      withCredentials: true, // Make sure cookies are sent with the request
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const verifyMFA = async (tokenMFA) => {
  try {
    const res = await api.post(
      "/auth/verify-mfa",
      { token: tokenMFA },
      { withCredentials: true }
    );
    if (res.data.username) { // HANDLE LOGIN NOW FOR CONTEXT AND OTHER PRUPOSES
      
      return { ...res.data, success: true };
    } else {
      return { ...res.data, success: false };
    }
  } catch (e) {
    console.log(e);
    return { ...e.response.data, success: false };
  }
};

export const closeSession = async() => {
  try{
    const response = await api.post('/auth/logout', {}, {withCredentials: true});
    if(response.success){
      return true
    }else{
      console.log(response);
      return false
    }
  }catch(e){
    console.log(e)
    return false;
  }
}
