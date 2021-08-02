function getNumsAverage(nums) {
    return getSum(nums) / nums.length
 }
 
 function getSum(nums){
     var sum = 0;
     for (var i = 0; i < nums.length; i++) {
         sum += nums[i]
     }
     return sum
 }
 
 function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
 }

 function createMat(rows = 3, cols = 3,fillWith = 0) {
    const mat = [];
    for (let i = 0; i < rows; i++) {
        mat[i] = [];
        for (let j = 0; j < cols; j++) {
            mat[i][j] = fillWith;
        }
    }
    return mat
}
 function createMatWithFnc(rows = 3, cols = 3,fillWith = 0) {
    const mat = [];
    for (let i = 0; i < rows; i++) {
        mat[i] = [];
        for (let j = 0; j < cols; j++) {
            mat[i][j] = fillWith();
        }
    }
    return mat
}
// neighbour cell checker
function checkNegs(mat, pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
      if (i < 0 || i >= mat.length) continue
  
      for (var j = pos.j - 1; j <= pos.j + 1; j++) {
        if (j < 0 || j >= mat[0].length) continue
        if (i === pos.i && j === pos.j) continue
  
        var cell = mat[i][j]
        console.log(cell);
      }
    }
  }