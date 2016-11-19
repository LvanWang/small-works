(function(){
    var ali = document.getElementById('lifeServ').getElementsByTagName('li');
    var aI = document.getElementsByName('lifeServ');
    var lifeServDiv = document.getElementById('lifeServDiv');
    var off1 = lifeServDiv.getElementsByTagName('a')[0];
    var adiv = document.getElementsByName('lifeServDiv')
    document.onmouseover = function() {
        ali[3].onmouseover = function() {
            liMouseover(this)
        }
    }
    lifeServDiv.onclick = function(e) {
        event.stopPropagation ? e.stopPropagation() : event.cancelBubble = true;
    }
    for (var i = 0; i < 4; i++) {
        ali[i].index = i
        ali[i].onmouseover = function() {
            liMouseover(this)
        }
        ali[i].onclick = function(e) {
            event.stopPropagation ? e.stopPropagation() : event.cancelBubble = true;
        }
    }
    document.onclick = function() {
        rumover()
    }
    off1.onclick = function() {
        rumover()
    }

    function rumover() {
        for (var i = 0; i < 4; i++) {
            aI[i].removeAttribute('style')
            ali[i].removeAttribute('style')
            ali[3].onmouseover = function(e) {
                var e = e || event
                event.stopPropagation ? e.stopPropagation() : event.cancelBubble = true;
            }
        }
        lifeServDiv.removeAttribute('style')
    }

    function liMouseover(This) {
        setTimeout(function() {
            lifeServDiv.style.height = '180px'
            lifeServDiv.style.bottom = '0'
            setTimeout(function() {
                for (var i = 0; i < 4; i++) {
                    aI[i].style.height = '0';
                    aI[i].style.margin = 'auto'
                    ali[i].style.height = '33px';
                    ali[i].style.borderBottom = 'none'
                    ali[i].style.borderTop = '2px solid #fff'
                    ali[i].style.zIndex = '0';
                    adiv[i].style.display = 'none'
                }
                adiv[This.index].style.display = 'block'
                This.style.zIndex = '2';
                This.style.borderTop = '2px solid #c81623'
            }, 100)
        }, 100)
    }

})()
function ul1mover(id1,id2){ 
    var airTicketUl1=document.getElementById(id1).getElementsByTagName('a')
    var airTicketUl2=document.getElementById(id2)
    for (var i = 0; i < airTicketUl1.length; i++) {
        airTicketUl1[i].index=i
        airTicketUl1[i].onmouseover=function(){
            for (var i = 0; i < airTicketUl1.length; i++) {
                airTicketUl1[i].removeAttribute('style')
            }
            this.style.background='url(img/mark.png) no-repeat center 4px'
            this.style.color='#fff'
            airTicketUl2.style.marginLeft=this.index*-246+'px'
        }
    }
}
ul1mover('airTicket-ul1','airTicket-ul2')
ul1mover('pay-ul1','pay-ul2')
var site=document.getElementsByName('site')
var siteText=document.getElementsByName('siteText')
for (var i = 0; i < site.length; i++) {
    site[i].getElementsByTagName('span')[1].index=i
    site[i].getElementsByTagName('span')[1].onclick=function(){

        var num=this.index*2
        var str=''
        str=siteText[num].value
        siteText[num].value=siteText[num+1].value
        siteText[num+1].value=str
    }
}