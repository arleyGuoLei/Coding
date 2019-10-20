const arr = [1, 3, 5, 7, 9, 6, 10, 55, 30]

const quickSort = arr => {
  if (arr.length <= 1) {
    return arr
  }
  const midIndex = Math.floor(arr.length / 2)
  const midValue = arr.splice(midIndex, 1)[0]
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= midValue) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), midValue, ...quickSort(right)]
}

console.log(quickSort([...arr]))
console.log('JSLog: arr', arr)
