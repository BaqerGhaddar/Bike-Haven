module.exports = {
  resizeArray: (arr, x) => {
    const newArr = [];
    while (arr.length) {
      if (arr.length < x) {
        const tempArr = Array(x - arr.length);
        newArr.push([...arr.splice(0, arr.length), ...tempArr]);
      } else {
        newArr.push(arr.splice(0, x));
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
