import apiSlice from "../apiSlice"


export const quizMarkApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAllQuizzesMarks : builder.query({
            query: () => ({
                url: "/quizMark",
                method: "GET",
            }),
        }),

        getStuVideoQuizMarks : builder.query({
            query: ({student_id, video_id}) => ({
                url: `/quizMark?student_id_like=${student_id}&video_id_like=${video_id}`,
                method: "GET",
            }),
            // providesTags :  ['QuizMark'],
            providesTags: (result, error, arg) => [
                { type: "QuizMark", video_id: arg.video_id },
            ],
        }),

        addVidoeQuizMark : builder.mutation({
            query: (data) => ({
                url: `/quizMark`,
                method: "POST",
                body: data
            }),
            invalidatesTags : (result, error, arg) => [
                { type: "QuizMark", video_id: arg.video_id },
            ],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const quizMark = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAllQuizzesMarks",
                            undefined,
                            (draft) => {
                                draft.push(quizMark.data) 
                            }

                        )
                    )


                } catch (err) {
                    console.log(err);
                }
            },

        }),
        

    })
})


export const {
    useGetAllQuizzesMarksQuery,
    useGetStuVideoQuizMarksQuery,
    useAddVidoeQuizMarkMutation,
} = quizMarkApi;

// useGetStuVideoQuizMarksQuery