const arr = [1, 3, 5, 7, 9, 6, 10, 55, 30]

const buildHeap = arr => {
  const size = arr.length
  const start = Math.floor(size / 2) - 1
  for (let i = start; i >= 0; i--) {
    modifyHeap(arr, i, size)
  }
}

const modifyHeap = (arr, index, size) => {
  while (true) {
    let max = index
    const left = 2 * index + 1
    const right = 2 * index + 2
    if (left < size && arr[left] > arr[max]) {
      max = left
    }
    if (right < size && arr[right] > arr[max]) {
      max = right
    }
    if (max !== index) {
      swap(arr, max, index)
      max = index
    } else {
      break
    }
  }
}

const swap = (arr, max, index) => {
  [arr[max], arr[index]] = [arr[index], arr[max]]
}

const heapSort = arr => {
  buildHeap(arr)

  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i)
    modifyHeap(arr, 0, i)
  }

  return arr
}

console.log(heapSort(arr))
