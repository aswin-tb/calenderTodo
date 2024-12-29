import commonApi from "./commonApi"

export const signupApi = (data) => {
    return commonApi("POST", data, "http://127.0.0.1:8000/signup/", "")
}

export const loginApi = (data) => {
    return commonApi("POST", data, "http://127.0.0.1:8000/token", "")
}

export const getTaskApi = (header) => {
    return commonApi("GET", "", "http://127.0.0.1:8000/task/", header)
}

export const postTaskApi = (header,data) => {
    return commonApi("POST",data,"http://127.0.0.1:8000/task/", header)
}
export const retrieveTaskApi = (id, header) => {
    return commonApi("GET", "", `http://127.0.0.1:8000/task/${id}/`, header)
}

export const deleteTaskApi = (id, header) => {
    return commonApi("DELETE", "", `http://127.0.0.1:8000/task/${id}/`, header)
}

export const updateTaskApi = (id, data, header) => {
    return commonApi("PUT", data, `http://127.0.0.1:8000/update/${id}/`, header)
} 