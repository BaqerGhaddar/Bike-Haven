module.exports = resizeArray = (arr, x) => {
  const newArr = [];
  while (arr.length) {
    if (arr.length < 3) {
      const tempArr = Array(3 - arr.length);
      newArr.push([...arr.splice(0, arr.length), ...tempArr]);
    } else {
      newArr.push(arr.splice(0, 3));
    }
  }
  return newArr;
};
