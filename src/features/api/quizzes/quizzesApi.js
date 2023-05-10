import apiSlice from "../apiSlice"


export const quizzessApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getQuizzess : builder.query({
            query: () => ({
                url: "/quizzes",
                method: "GET",
            }),
        }),
        getQuiz : builder.query({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: 'Quiz', id }],
        }),
        getQuizForVideo : builder.query({
            query: (video_id) => ({
                url: `/quizzes?video_id_like=${video_id}`,
                method: "GET",
            }),
            providesTags: (result, error, videoId) => [{ type: 'Quiz', videoId }],
        }),

        addQuiz : builder.mutation({
            query: (data) => ({
                url: "/quizzes",
                method: "POST",
                body :data

            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const quiz = await queryFulfilled;
                    if (quiz?.data?.id) {

                        // update quiz cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getQuizzess",
                                undefined,
                                (draft) => {
                                    draft.push(quiz.data);
                                }
                            )
                        );
                        // update quiz cache pessimistically end
                    }
                } catch (err) {
                    console.log(err);
                }
            },

        }),
        editQuiz: builder.mutation({
            query: ({id,data}) => ({
                url: `/quizzes/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const quiz = await queryFulfilled;
                    if (quiz?.data?.id) {

                        // update quiz cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getQuizzess",
                                undefined,
                                (draft) => {
                                    const updateIndex = draft.findIndex(item => item.id == arg.id);
                                    draft[updateIndex] = quiz.data
                                }
                                
                            )
                        )

                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getQuiz",
                                arg.id.toString(),
                                (draft) => {
                                //    return draft = task.data
                                //    return task.data
                                    Object.assign(draft, quiz.data)
                                }
                                
                            )
                        );
                        // update quiz cache pessimistically end
                    }
                } catch (err) {
                    console.log(err);
                }
            },

        }),
        deleteQuiz : builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE",

            }),
            // if cache stored for single Quiz 
            invalidatesTags : (result, error, id) => [{ type: 'Quiz', id }],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const {meta, data} = await queryFulfilled;

                    // as json-server-auth delete response 
                    // console.log(meta?.response?.ok);

                    if (meta?.response?.ok) {

                        // update quizzes cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getQuizzess",
                                undefined,
                                (draft) => {
                                    // done
                                    // const deleteIndex = draft.findIndex(item => item.id == arg) 
                                    // draft.splice(deleteIndex, 1)
        
                                    //done
                                    return draft.filter(item => item.id !== arg) 
                                    
                                }
                            )
                        );
                        // update quizzes cache pessimistically end
                    }
                } catch (err) {
                    console.log(err);
                }

            },

        }),
    })
})


export const { 
    useGetQuizzessQuery, 
    useGetQuizQuery, 
    useGetQuizForVideoQuery,
    useAddQuizMutation, 
    useEditQuizMutation, 
    useDeleteQuizMutation 
} = quizzessApi