// alert('Welcome to my Project- Sorting Visualizer');
// const mycanvas = document.getElementById("mycanvas");
mycanvas.height = 450;
mycanvas.width=700;
mycanvas.style.background="lightblue";
const margin = 30;
const n=30;
const array=[];
const low=0;
const high=n-1;
let moves = [];
const cols=[];
const spacing=(mycanvas.width - margin*2)/n;
const ctx=mycanvas.getContext("2d");
const maxcolumnheight = 300;
init();
let audioCtx=null;
function playnote(freq,type)
{
    if(audioCtx==null)
    {
        audioCtx=new(
            AudioContext ||
            webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.type=type;
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.4;
    node.gain.linearRampToValueAtTime(
        0,audioCtx.currentTime+dur
    );
    osc.connect(audioCtx.destination);
}
function init()
{
    for(let i=0;i<n;i++)
    {
        array[i] = Math.random();
    }
    moves=[];
    for(let i=0;i<array.length;i++)
        {
            const x = (i*spacing) + spacing/2 + margin  ;
            const y = mycanvas.height - margin -i*4 ;
            const width = spacing ;
            const height = maxcolumnheight*array[i] ;
            cols[i] = new Column(x,y,width,height);
        }
}
function BubbleSort()
{
    moves = bubbleSort(array);
}
function SelectionSort()
{
    moves = selectionSort(array);
}
function InsertionSort()
{
    moves = insertionSort(array);
}
function MergeSort()
{
    moves = mergeSortWithMoves(array);
}
function QuickSort()
{
    moves = quickSort(array);
}
animate();
function animate()
{
    ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
    let changed = false;
    for(let i=0;i<cols.length;i++)
    {
        changed = cols[i].draw(ctx) || changed;
    }
    if(!changed && moves.length>0)
    {
        const move = moves.shift();
        const [i,j]=move.indices;
        const waveformtype = move.swap?"square":"sine";
        playnote(cols[i].height + cols[j].height,waveformtype);
        if(move.swap)
        {
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i],-1);
            [cols[i],cols[j]] = [cols[j],cols[i]];
        }
        else
        {
            cols[i].jump();
            cols[j].jump();
        }
    }
    requestAnimationFrame(animate);
}
