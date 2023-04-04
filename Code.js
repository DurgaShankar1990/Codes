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


======================================== sticky section ============================================================

function stickyBox(marginTop, marginBottom) {
    var $nav = $('.js-sticky');
    var $footer = $('.js-sticky-end');
    var navTop = 0;
    var footerTop = 0;
    var navHeight = 0;
    if ($nav.length) {
        navTop = $nav.offset().top;
        $(window).scroll(function() {
            navHeight = $nav.outerHeight();
            if ($footer.length)
                footerTop = $footer.offset().top;
            if ($(window).scrollTop() >= navTop - marginTop) {
                $nav.removeClass("bottom").addClass("fixed");
            } else {
                $nav.removeClass("fixed");
            }
            if ($footer.length) {
                if ($(window).scrollTop() >= footerTop - navHeight - marginTop - marginBottom) {
                    $nav.removeClass("fixed").addClass("bottom");
                } else {
                    $nav.removeClass("bottom");
                }
            }
        });
    }
}
stickyBox(110, 0);

// =========================== copy link


$('.copy_text').click(function (e) {
   e.preventDefault();
   var copyText1 = $(this).attr('href');
   var copyText = 'https:'+copyText1
   document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', copyText);
    e.preventDefault();
   }, true);
   document.execCommand('copy');  
   console.log('copied text : ', copyText);
  $('body').removeClass('social-open')
 });


/*=======================================================================================*/
                                    Counter-Up

/*<script src="https://cdnjs.cloudflare.com/ajax/libs/easy-pie-chart/2.1.6/jquery.easypiechart.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js"></script>
<div class="counter-group">
    <div class="circle-circle">
        <div  class="chart" data-percent="{{ module.counter_value }}">
          <div class="number"><span class="counter">{{ module.counter_value }}</span><span>%</span></div>
        </div>
    </div>
    <div class="circle-text">
        <p>{{ module.content }}</p>
    </div>
</div>*/
/*=======================================================================================*/

$(function() {
  $(window).scroll(function() {
    /* Check the location of each desired element */
    $('.chart').each(function(i) {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        /* If the object is completely visible in the window, fade it in */
        if (bottom_of_window > bottom_of_object) {

            $('.chart').easyPieChart({
                 barColor: '#e82138',
                 trackColor: '#8c8c8c',
                 scaleColor: false,
                 lineCap: 'round',
                 lineWidth: 4,
                 size: 134,
                 animate: 1000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }
      });
  });
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });
});
