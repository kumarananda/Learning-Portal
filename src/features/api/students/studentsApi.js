import apiSlice from "../apiSlice";


export const studentsApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAllStudents : builder.query({
            query : () => ({
                url: "/users?role_like=student",
                method : "GET"
            })
        })
    })
})


export const { useGetAllStudentsQuery,  } = studentsApi;