/* javascript file for search box */

/*make the text equal to the initial text if the text is empty
 * if the text is equal to the intial text, make the text color gray
 */
function show_initial_if_empty(element, initial_text) {
    if (element.value.trim() === "")
        element.value = initial_text;

    if (element.value.trim() === initial_text)
        element.style.color = "gray";
}

//search box event handlers
function make_search_field(key, initial_text) {
    //the initial text color is gray
    var element = $id(key);
    element.value = initial_text;
    element.style.color = "gray";

    $id("suggestions_box").onmouseover = function(){
        $id("suggestions_box").style.display = "block";  
    }
    $id("suggestions_box").onmouseout = function(){
        $id("suggestions_box").style.display = "none";  
    }
    //when the mouse is overm make the text color light gray
    element.onmouseover = function () {
        if (element.value.trim() === initial_text)
            element.style.color = "lightgray";
        
        $id("suggestions_box").style.display = "block";
    };

    element.onmouseout = function () {
        show_initial_if_empty(element, initial_text);
        $id("suggestions_box").style.display = "none";
    };
    
    element.onblur = function () {
        show_initial_if_empty(element, initial_text);
        $id("suggestions_box").style.display = "none";
    };

    /* when the text field is in focus, make the text empty if it is
     * equal to the initial text
     */
    element.onfocus = function () {
        if (element.value.trim() === initial_text)
            element.value = "";
        live_search();
    };

    /* when the key is down
     * make the text empty if it is equal to the initial text
     * also make the text color black
     */
    element.onkeydown = function () {
        if (element.value.trim() === initial_text)
            element.value = "";
        element.style.color = "black";
    };
}
//sort function based on rating/year (descending)
function sort(){
    var value=$id("combo_box").value.toLowerCase();
    var m = movies_search($id("searchField").value).sort(
            function(a,b){
                if(a[value]<b[value])
                    return 1;
                if(a[value]==b[value])
                    return 0;
                if(a[value]>b[value])
                    return -1;
            }
        );
    
    $id("view").innerHTML = "";
    fill_view(m);
}
//find all movies with txt within its info
function movies_search(txt) {
    var results = new Array();

    for (var i = 0; i < movies.length; i++) {
        //trim the value, and make case insensitive comparison
        var start = (movies[i].title+
                movies[i].year +
                movies[i].starring)
                .toLowerCase().search(txt.toLowerCase().trim());
        if (start != -1){ //if the index is found
            results.push(movies[i]);
        }
    }
    return results;
}
//live search
function live_search(ondemand){
    if(event.keyCode == 13 || ondemand){
        fill_view(movies_search($id("searchField").value));
    }else{
        var results = movies_search($id("searchField").value);
        if (results.length!=0){
            show_sugg(results);
        }
    }
}
//show live search results as suggestion items
function show_sugg(results){
    $id("suggestions_box").style.display = results.length == 0 ? "none" : "block";
    $id("suggestions_box").focus();
    $id("suggestions_box").innerHTML = "";
    
    for (var i = 0; i<5 && i < results.length; i++) {
        /* add the suggestion items */
        var div = document.createElement("div");
        div.setAttribute("class","sub_suggestions");
        div.setAttribute("id","sub_suggestions");
        div.setAttribute("data-title",results[i].title);
        div.onclick = function(){fillSearch(this)};
   
        var words = results[i].title + "(" +results[i].year+
                ") Starring: " + results[i].starring;
        div.appendChild(document.createTextNode(words));
        $id("suggestions_box").appendChild(div);
    }
}
//suggestion item click handler
function fillSearch(element){
    $id("suggestions_box").style.display = "none";
    $id("searchField").value = element.getAttribute("data-title"); ;
    $id("searchField").focus();
    fill_view(movies_search($id("searchField").value));
}