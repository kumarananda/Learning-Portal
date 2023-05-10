import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiSlice = createApi({
    reducerPath : "api",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:9000"
    }),
    tagTypes : ["Quiz", "Video", "Assignment", "QuizMark"],
    endpoints : (builder) => ({}) 

})
export default apiSlice