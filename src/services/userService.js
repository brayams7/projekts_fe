import axios from "axios";
import { API_BASE_UI_AVATARS } from "./settings";

export const getDefaultAvatar = async (name) => {
  try {
    const data = await axios.get(`${API_BASE_UI_AVATARS}/?name=${name}&background=random&color=fff`);
    console.log({data})
    return data
  } catch (error) {
    let description = "error";
    return {
      code: 500,
      data: null,
      description,
    };
  }
};
