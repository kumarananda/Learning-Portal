import apiSlice from "../apiSlice"


export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAssignments : builder.query({
            query: () => ({
                url: "/assignments",
                method: "GET",
            }),
        }),

        getAssignment : builder.query({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: 'Assignment', id }],
        }),

        addAssignment : builder.mutation({
            query: (data) => ({
                url: "/assignments",
                method: "POST",
                body :data

            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const assignment = await queryFulfilled;
                    if (assignment?.data?.id) {

                        // update assignments cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getAssignments",
                                undefined,
                                (draft) => {
                                    draft.push(assignment.data);
                                }
                            )
                        );
                        // update assignments cache pessimistically end
                    }
                } catch (err) {
                    console.log(err);
                }
            },

        }),
        editAssignment : builder.mutation({
            query: ({id,data}) => ({
                url: `/assignments/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const assignment = await queryFulfilled;
                    if (assignment?.data?.id) {

                        // update assignment cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getAssignments",
                                undefined,
                                (draft) => {
                                    const updateIndex = draft.findIndex(item => item.id == arg.id);
                                    draft[updateIndex] = assignment.data
                                }
                                
                            )
                        )

                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getAssignment",
                                arg.id.toString(),
                                (draft) => {
                                //    return draft = assignment.data
                                //    return assignment.data
                                    Object.assign(draft, assignment.data)
                                }
                                
                            )
                        );
                        // update assignment cache pessimistically end
                    }
                } catch (err) {
                    console.log(err);
                }
            },

        }),
        deleteAssignment : builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE",

            }),
            // if cache stored for single Quiz 
            invalidatesTags : (result, error, id) => [{ type: 'Assignment', id }],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const {meta} = await queryFulfilled;

                    // as json-server-auth delete response 
                    // console.log(meta?.response?.ok);

                    if (meta?.response?.ok) {

                        // update assignments cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getAssignments",
                                undefined,
                                (draft) => {
        
                                    //done
                                    return draft.filter(item => item.id !== arg) 
                                    
                                }
                            )
                        );
                        // update assignment cache pessimistically end
                    }
                } catch (err) {
                    console.log(err);
                }

            },

        }),
    })
})


export const { 
    useGetAssignmentsQuery, 
    useGetAssignmentQuery, 
    useAddAssignmentMutation, 
    useEditAssignmentMutation, 
    useDeleteAssignmentMutation,
} = assignmentsApi