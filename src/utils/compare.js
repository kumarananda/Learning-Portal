
// related compareFunction function
// const compareFunction = (a, b) => a.id === b.video_id ;
// Get items that only occur in the left array,
// using the compareFunction to determine equality.
export const  compareTwoArray = (left, right, compareFunction) => 
  left.filter(leftValue =>
    !right.some(rightValue => 
      compareFunction(leftValue, rightValue)));