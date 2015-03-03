
//allows the comparison to be ascending ("ASC") or descending (anything else)
function comp(var1,var2,type){
    if(type=="ASC")
        return var1<var2;
    else
        return var1>var2;
}

function sort_array(data, attribute,type) {

    var len = data.length,
            min;

    for (var i = 0; i < len; i++) {

        //set minimum to this position
        min = i;

        //check the rest of the array to see if anything is smaller
        for (var j = i + 1; j < len; j++) {
            var x=data[j][attribute];
            var y=data[min][attribute];
            if (comp(data[j][attribute],data[min][attribute],type)) {
                min = j;
            }
        }

        //if the minimum isn't in the position, swap it
        if (i != min) {
            var temp = data[i];
            data[i]= data[min];
            data[min] = temp;
        }
    }

    return data;
}