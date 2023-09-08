import { axiosToken } from "./settings";

export const getWokspaceById = async () => {
  try {
    const data = await axiosToken.get(`/workpace/${1}`);
    return {
      code: data.code,
      description: data.message,
      data: data.response,
    };
  } catch (error) {
    console.log(error);
    let description = "Ocurrió un error en el servidor, Intente mas tarde";
    return {
      code: 500,
      data: null,
      description,
    };
  }
};
