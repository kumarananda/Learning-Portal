import  apiSlice  from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import swal from 'sweetalert';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // nothing
                }
            },
        }),
        login: builder.mutation({
            // {role, data}
            query: ({data}) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),

            async onQueryStarted({role}, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    const user = result.data.user;

                    // check user type for login
                    if(role === "admin" && user.role === "student" ){
                        swal("Error!", "You are not admin!", "error")
                        return;
                    }
                    if(role === "student" && user.role === "admin" ){
                        swal("Error!", "You are not Student!", "error");
                        return;
                    }
                    
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
