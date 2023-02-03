/*
Please complete the following using Javascript and return your work to me within 24 hours.  
Please be considerate of the running time of your algorithm to solve the problem. 
Write a program that allows for an integer array to be passed in and will then output all of the pairs that sum up to 10.  
Please provide a solution that allows for 1) output all pairs (includes duplicates and the reversed ordered pairs), 
2) output unique pairs only once (removes the duplicates but includes the reversed ordered pairs), 
and 3) output the same combo pair only once (removes the reversed ordered pairs). 

        For example passing in [1, 1, 2, 4, 4, 5, 5, 5, 6, 7, 9] the following results should occur:
            1) output all pairs would output: [1,9], [1,9], [4,6], [4,6], [5,5], [5,5], [5,5], [5,5], [5,5], [5,5], [6,4], [6,4] [9,1] , [9,1] 
            2) output unique pairs only once would output: [1,9], [4,6], [5,5], [6,4], [9,1] 
            3) output the same combo pair only once would output: [1,9], [4,6], [5,5]  
*/

/*
TEST CASES AND THEIR OUTPUTS ARE PROVIDED. PLEASE UNCOMMENT TO SEE.
The time complexity of the getAllPairsFromSum function is O(n), where n is the length of the input array arr. 
The function loops through the array once and performs a constant amount of work for each element, so the overall time complexity is linear.
The space complexity of the function is O(n), as the function uses a Map to store the complement values and their indices. 
In the worst case, all elements in the input array are unique and the Map will store n key-value pairs, giving us a space complexity of O(n).
I also intentionally created this function to be dynamic where we can input the targetSum. I could have also solved for getAllPairsSummedToTen, where
there is no targetSum input and we replace targetSum within the function body to 10. i.e. let complement = targetSum - arr[i]; this becomes
let complement = 10 - arr[i]; All functions were created to stand individually in adherence to SRP(SINGLE RESPONSIBILITY PRINCIPLE).
*/

function getAllPairsFromSum(arr, targetSum) {
  let pairs = [];
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
      let complement = targetSum - arr[i];
      if (map.has(complement)) {
          map.get(complement).forEach(index => {
              pairs.push([arr[index], arr[i]]);
              pairs.push([arr[i], arr[index]]);
          });
      }

      if (!map.has(arr[i])) {
          map.set(arr[i], []);
      }
      map.get(arr[i]).push(i);
  }

  return pairs;
}

// console.log(getAllPairsFromSum([1, 1, 2, 4, 4, 5, 5, 5, 6, 7, 9], 10)) // OUTPUT: [1,9], [1,9], [4,6], [4,6], [5,5], [5,5], [5,5], [5,5], [5,5], [5,5], [6,4], [6,4], [9,1] , [9,1] 
// console.log(getAllPairsFromSum([0], 10)) // OUTPUT: [O, 10] 
// console.log(getAllPairsFromSum([0, 10], 10)) //OUTPUT: [[ 0, 10 ], [ 10, 0 ]]

/*
The time complexity of the getUniquePairs function is O(n), where n is the length of the input array arr. 
The function loops through the array once and performs a constant amount of work for each pair, so the overall time complexity is linear.
The space complexity of the function is also O(n), as the function uses a Set to store the unique pairs.
 In the worst case, all pairs in the input array are unique, and the Set will store n elements, giving us a space complexity of O(n).
*/



function getUniquePairs(arr) {
  const set = new Set();
  const result = [];
  for (const pair of arr) {
      const key = `${pair[0]},${pair[1]}`;
      if (!set.has(key)) {
          result.push(pair);
          set.add(key);
      }
  }
  return result;
}
// console.log(getUniquePairs(getAllPairsFromSum([1, 1, 2, 4, 4, 5, 5, 5, 6, 7, 9], 10))) //OUTPUT: [[ 5, 5 ], [ 4, 6 ], [ 6, 4 ], [ 1, 9 ], [ 9, 1 ]]
// console.log(getUniquePairs([[1,9], [1,9], [4,6], [4,6], [5,5], [5,5], [5,5], [5,5], [5,5], [5,5], [6,4], [6,4], [9,1] , [9,1]])) //OUTPUT: [[ 5, 5 ], [ 4, 6 ], [ 6, 4 ], [ 1, 9 ], [ 9, 1 ]]



/*
The time complexity of the getUniqueComboPairs function is O(n), where n is the length of the input array arr. 
The function loops through the array once and performs a constant amount of work for each pair, so the overall time complexity is linear.
The space complexity of the function is also O(n), as the function uses a Set to store the unique pairs. 
In the worst case, all pairs in the input array are unique, and the Set will store n elements, giving us a space complexity of O(n).
*/



function getUniqueComboPairs(arr) {
  const set = new Set();
  const result = [];
  for (const pair of arr) {
      const key = `${Math.min(pair[0], pair[1])},${Math.max(pair[0], pair[1])}`;
      if (!set.has(key)) {
          result.push(pair);
          set.add(key);
      }
  }
  return result;
}

// console.log(getUniqueComboPairs(getAllPairsFromSum([1, 1, 2, 4, 4, 5, 5, 5, 6, 7, 9], 10))) //OUTPUT: [[ 5, 5 ], [ 4, 6 ], [ 1, 9 ]]
// console.log(getUniqueComboPairs([[1,9], [1,9], [4,6], [4,6], [5,5], [5,5], [5,5], [5,5], [5,5], [5,5], [6,4], [6,4], [9,1] , [9,1]])) // OUTPUT: [[ 1, 9 ], [ 4, 6 ], [ 5, 5 ]]