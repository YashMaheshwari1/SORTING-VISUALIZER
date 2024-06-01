function quickSort(array) 
{
    const moves=[];
    function swap(i,j)
    {
        [array[i],array[j]] = [array[j],array[i]];
        moves.push({indices:[i,j],swap:true});
    }
    function partition(low,high)
    {
        const pivot = array[high]; 
        let i = low - 1; 
        for (let j = low; j <= high-1; j++) 
        { 
            if (array[j] < pivot) 
            { 
                i++; 
                swap(i,j);
            } 
        } 
        swap(i+1,high); 
        return i+1;
    } 
    function quickSortRecursive(low, high) 
    { 
        if (low < high) 
        { 
        const pi = partition(low, high); 
        quickSortRecursive(low, pi - 1); 
        quickSortRecursive(pi + 1, high); 
        }
    }
    quickSortRecursive(0,array.length-1);
    return moves;
} 