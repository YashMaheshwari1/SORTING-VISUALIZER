function selectionSort(array)
{   
    const moves=[];
    let n = array.length;       
    do{
        var swapped = false;
    for(let i = 0; i < n-1;++i)
    { 
        let min = i; 
        for(let j = i+1; j < n; j++)
        { 
            if(array[j]<array[min])
            {
                min = j;
            } 
        } 
        if(min!=i) 
        {
        swapped = true;
        [array[min],array[i]] = [array[i],array[min]];
        moves.push(
            {indices:[min,i],swap:true}
        );
        }
        else
            {
                moves.push(
                    {indices:[min,i],swap:false}
                );
            }
    } 
    }while(swapped);
    return moves;
} 