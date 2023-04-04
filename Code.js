======================================== URL Parameter ============================================================

const url = new URL(window.location); 
const output = document.getElementById('output');

function searchData(){
    var searchParams = new URLSearchParams(window.location.search);
    let paramObj = {};
    for(var value of searchParams.keys()) {
        paramObj[value] = searchParams.get(value);
    }
    const config = {
        method: 'POST',
        url: 'https://www.titanengrg.com/_hcms/api/searchObjData',
        headers: {
            'Content-Type': 'application/json'
        },
        data: paramObj
    }
    async function sData() {
        const items =  await axios(config);
        const data = items.data.results;
        console.log(data)
        output.innerHTML = "";
        data.forEach( ele => {
            output.innerHTML +=`<div class="row-flex item"> <img src="${ele.properties.image }"> <div> ${ele.properties.model} </div> <div>${ele.properties.car_type} </div>  </div>` 
        })
    }
    sData()
}

$('#carType').change(function(e){
    url.searchParams.set('carType', $(this).val() );
    window.history.pushState({}, '', url);
    searchData();
});
$('#brand').change(function(e){
    url.searchParams.set('brand', $(this).val() );
    window.history.pushState({}, '', url);
    searchData();
})


async function data(){
    const items =  await axios.get('https://www.titanengrg.com/_hcms/api/GetDataObject');
    const  data= items.data.results;
    data.forEach( ele => {
        output.innerHTML +=`<div class="row-flex item"> <img src="${ ele.properties.image }"> <div> ${ele.properties.model} </div> <div>${ele.properties.car_type} </div>  </div>` 
    })
}
data();


======================================== Tabber ============================================================

function hsOnReadyLoadTabber() {
  // Variables  
  var i;
  var tabPane = document.getElementsByClassName("tab-pane");
  var tabAnchor = document.querySelectorAll(".tabber-tabs a");
 
  // Loop through all of the tab anchors
  for (i = 0; i < tabAnchor.length; i++) {

    // Click function for when tab is clicked on
    tabAnchor[i].addEventListener("click", function(e){
      e.preventDefault();
      var tabIsOpen = this.parentElement.classList.contains("active");
      var tabPaneId = this.getAttribute("href").substring(1);
      var activeTabPane = document.getElementById(tabPaneId);
      // If the tab clicked is not already opened
      if (tabIsOpen === false) {
        for (i = 0; i < tabAnchor.length; i++) {
          // Removes active class on all tab anchors
          tabAnchor[i].parentElement.classList.remove("active");
        }
        for (i = 0; i < tabPane.length; i++) {
          // Removes active class on all tab panes
          tabPane[i].classList.remove("active");
        }
        // Adds active class to the active tab pane and anchor
        this.parentElement.classList.add("active");
        activeTabPane.classList.add("active");
      }
    });  
  }
}

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
   ) {
  hsOnReadyLoadTabber();
} else {
  document.addEventListener("DOMContentLoaded", hsOnReadyLoadTabber);
}
