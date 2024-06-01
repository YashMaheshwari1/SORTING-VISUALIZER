function insertionSort(array)
{
    const moves=[];
    do{
        var swapped = false;
        let n = array.length;
            for (let i = 1; i < n; i++) 
            {
                let current = array[i];
                let j = i-1; 
                while ((j > -1) && (current < array[j])) 
                {
                    swapped = true;
                    [array[j+1],array[j]] = [array[j],array[j+1]];
                    moves.push(
                        {indices:[j+1,j],swap:true}
                    );
                    j--;
                }
            }
    }while(swapped);
    return moves;
}