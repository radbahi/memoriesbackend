import * as api from "../api"; //import * imports everything

export const signin = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    dispatch({ type: "AUTH", data: formData });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);

    dispatch({ type: "AUTH", data: formData });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
