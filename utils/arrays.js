module.exports = {
  resizeArray: (arr, x) => {
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
  },
  checkExist: (arr, obj) => {
    let isExist = false;

    for (item of arr) {
      if (item.id == obj.id) {
        isExist = true;
        item.quantity++;
        break;
      }
    }
    if (!isExist) {
      obj.quantity = 1;
      arr.push(obj);
    }
    return arr;
  }
};
