import * as api from "../api"; //import * imports everything

export const signin = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", formData });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);

    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", formData });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
