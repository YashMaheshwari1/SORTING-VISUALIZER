function mergeSortWithMoves(array) 
{
    const moves = [];
    function merge(arr, left, middle, right) 
    {
        let l1 = middle - left + 1;
        let l2 = right - middle;
        const arr1 = new Array(l1);
        const arr2 = new Array(l2);
        let i = 0;
        let j = 0;
        // let k=left;
        for (let i = 0; i < l1; ++i) 
        {
            arr1[i] = arr[left + i];
        }
        for (let i = 0; i < l2; ++i) 
        {
            arr2[i] = arr[middle + 1 + i];
        }
        while (i < l1 && j < l2) 
        {
            if (arr1[i] > arr2[j]) 
            {
                // arr[k]=arr2[j];
                [arr1[i],arr2[j]] = [arr2[j],arr1[i]];
                moves.push({indices: [left + i, middle + 1 + j], swap: true});
                j++;
            } 
            else 
            {
                // arr[k]=arr1[i];
                moves.push({indices: [left + i, middle + 1 + j], swap: false});
                i++;
            }
            // k++;
        }
        // while (i < l1) {
        //     arr[k] = arr1[i];
        //     i++;
        //     k++;
        // }
        // while (j < l2) {
        //     arr[k] = arr2[j];
        //     j++;
        //     k++;
        // }
    }
    function mergeSort(arr, left, right) 
    {
        if (left < right) 
        {
            const middle = left + parseInt((right - left) / 2);
            mergeSort(arr, left, middle);
            mergeSort(arr, middle + 1, right);
            merge(arr, left, middle, right);
        }
    }
    mergeSort(array, 0, array.length - 1);
    return moves;
}
const arr =  [ 38, 27, 43, 10]

console.log("Original array: " + arr);

mergeSortWithMoves(arr, 0, arr.length - 1);

console.log("After sorting: " + arr);


