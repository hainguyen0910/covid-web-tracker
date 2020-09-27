function reduce(arr, cb, initValue) {
    for (let i = 0; i < arr.length; i++) {
       initValue = cb(initValue, arr[i]);
    }
    console.log(initValue);
    return initValue;
}

reduce([1, 2, 3, 4], (sum, num) => {
    return sum * (num + 2);
}, 0);