import {swap} from 'src/old/sorting'
import assert from 'assert'

export const insertionSort = array => {

    for (let i = 0; i < array.length; i++) {
        // invariant: subarray <0, i) is sorted
        putInPlace(i)
    }

    function putInPlace(i) {
        while (i > 0 && array[i] < array[i - 1]) {
            swap(array, i, i - 1)
            i--
        }
    }
}

export const bubbleSort = array => {
    // Little bit effective version of bubble sort which
    // counts on the end of array to be sorted
    for (let i = array.length - 1; i > 0; i--) {
        // invariant: subarray <i, array.length) is sorted
        let j = 0
        while (j < i) {
            if (array[j] > array[j + 1])
                swap(array, j, j + 1)
            j++
        }
    }
}

export const selectionSort = array => {

    for (let i = 0; i < array.length; i++) {
        // invariant: subarray <0, i) is sorted and contains min elements
        const minIndex = findMin(i, array.length - 1)
        if (minIndex !== i)
            swap(array, i, minIndex)
    }

    function findMin(l, h) {
        let min = array[l]
        let minIndex = l
        for (let i = l + 1; i <= h; i++) {
            if (array[i] < min) {
                min = array[i]
                minIndex = i
            }
        }
        return minIndex
    }
}

/**
 * Array on <l, h)
 */
export const quickSort = (array, l = 0, h = array.length) => {
    // Array of 1 element or empty array is sorted
    if (h - l <= 1)
        return

    const pivot = partition(array, l, h)
    quickSort(array, l, pivot)
    quickSort(array, pivot + 1, h)
}

export const partition = (array, l, h) => {
    assert(l != null)
    assert(h != null)
    // Array of 1 element or empty array is partitioned
    if (h - l <= 1)
        return

    const pivot = l
    const pivotVal = array[pivot]
    let li = l + 1
    let hi = h - 1

    while (li < hi) {
        while (array[li] <= pivotVal && li < h) // Prevent going outside of the bounds
            li++
        while (array[hi] > pivotVal && hi > l)
            hi--
        assert(li !== hi)
        if (li < hi &&
            li < h) // Do not swap if li is out of bounds (for every x in array  <= pivot )
            swap(array, li, hi)
    }
    swap(array, pivot, li - 1)
    return hi
}

export const mergeSort = (array) => {
    doMergeSort(array)
}


const doMergeSort = (array,
                     aux = new Array(array.length),
                     l = 0, h = array.length) => {
    const len = h - l
    if (len < 2)
        return // Array of size 0 & 1 => Sorted already

    const m = Math.floor(l + len / 2)
    doMergeSort(array, aux, l, m)
    doMergeSort(array, aux, m, h)
    mergeArrays(array, aux, l, m, h)
}

export const mergeArrays = (array, aux, l, m, h) => {
    for (let i = l; i < h; i++)
        aux[i] = array[i]

    let i = l
    let j = m

    const moveFirst = k =>
        array[k] = aux[i++]

    const moveSecond = k =>
        array[k] = aux[j++]

    const isFirstDone = () => i === m

    const isSecondDone = () => j === h

    let firstDone = isFirstDone()
    let secondDone = isSecondDone()

    let k = l
    while (!firstDone || !secondDone) {
        if (firstDone)
            moveSecond(k)
        else if (secondDone)
            moveFirst(k)
        else if (aux[i] < aux[j])
            moveFirst(k)
        else
            moveSecond(k)
        k++

        firstDone = isFirstDone()
        secondDone = isSecondDone()
    }
}
