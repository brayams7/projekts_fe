import { axiosToken } from "./settings";

export const getSubtasksOfTask = async (taskId) => {
  try {
    const data = await axiosToken.get(`/listChildrenTask/${taskId}`)
    return {
      code: data.code,
      description: data.message,
      data: data.response,
    }
  } catch (error) {
    console.log(error);
    let description = "Ocurrió un error en el servidor, Intente mas tarde";
    return {
      code: 500,
      data: null,
      description,
    }
  }
}

export const getListTasksOfFeatureService = async (featureId) => {
  try {
    const data = await axiosToken.get(`/listTaskOfFeature/${featureId}`)

    return {
      code: data.code,
      description: data.message,
      data: data.response,
    }
  } catch (error) {
    console.log(error);
    let description = "Ocurará un error en el servidor, Intente mas tarde";
    return {
      code: 500,
      data: null,
      description,
    }
  }
}

export const createTaskService = async (body) => {
  try {
    const data = await axiosToken.post(`/createTask`, body)
    return {
      code: data.code,
      description: data.message,
      data: data.response,
    }
  } catch (error) {
    console.log(error);
    let description = "Ocurrió un error en el servidor, Intente mas tarde";
    return {
      code: 500,
      data: null,
      description,
    }
  }
}

export const updateTaskService = async (body, taksId) => {
  try {
    const data = await axiosToken.put(`/updateTask/${taksId}`, body)
    return {
      code: data.code,
      description: data.message,
      data: data.response,
    }
  } catch (error) {
    console.log(error);
    let description = "Ocurrió un error en el servidor, Intente mas tarde";
    return {
      code: 500,
      data: null,
      description,
    }
  }
}

export const addChildTaskService = async (body, taksId) => {
  try {
    const data = await axiosToken.post(`/addChildTask/${taksId}`, body)
    return {
      code: data.code,
      description: data.message,
      data: data.response,
    }
  } catch (error) {
    console.log(error);
    let description = "Ocurrió un error en el servidor, Intente mas tarde";
    return {
      code: 500,
      data: null,
      description,
    }
  }
}
