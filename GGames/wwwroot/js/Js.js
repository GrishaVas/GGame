window.onload = () => {
    // getData('item').checked = true;
    //topBodySite(document.querySelector(".body-site"));
    elementAddInnerHtml(document.querySelector('.body-site'), '/Home/ShortFilter', 'GET', false, '');
    //elementAddInnerHtml(document.querySelector('.body-site'), '/Account/Login', 'GET', false, '');

    switch (document.location.pathname) {
        case "/Home/Index":
            document.querySelector("#Input1").checked = true;
            break;
        case "/":
            document.querySelector("#Input1").checked = true;
            break;
        case "/Home/Shop":
            document.querySelector("#Input2").checked = true;
            break;

        case "/Home/News":
            document.querySelector("#Input3").checked = true;
            break;


        default:
            break;
    }

    var inputs = document.querySelectorAll(".shop-pull-down-menu-items>.defalult-radiobutton");//фильтры
    var search = document.querySelectorAll('.search');
    document.querySelector('.shop-button-load-more>button')?.addEventListener("click", () => { //load
        var params = "";
        for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
                params += inputs[j].getAttribute("data-filter") + "&";
            }
        }
        for (var j = 0; j < search.length; j++) {
            search[j].value = "";
        }
        params += "load=true";
        elementUpdateInnerHtml(document.getElementById('big-card-container'), 'Shop_Filters', "POST", true, params,null);
    }, false);

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click",() => {
            document.querySelector('.shop-button-load-more').style.display = 'flex';
            var params = "";
            for (var j = 0; j < inputs.length; j++) {
                if (inputs[j].checked) {
                    params += inputs[j].getAttribute("data-filter") + "&";
                    console.log(params);
                }
            }
            for (var j = 0; j < search.length; j++) {
                search[j].value = "";
            }
            params = params.substr(0, params.length - 1);
            elementUpdateInnerHtml(document.getElementById('big-card-container'), 'Shop_Filters', "POST", true, params,null);
        }, false);
        ///
    }
    
    for (let i = 0; i < search.length; i++) {
        search[i].addEventListener("input", () => {
            document.querySelector('.shop-button-load-more').style.display = 'flex';
            var params = "";
            for (var j = 0; j < inputs.length; j++) {
                if (inputs[j].checked) {
                    params += inputs[j].getAttribute("data-filter") + "&";
                }
            }
            params += "search=" + search[i].value;
            elementUpdateInnerHtml(document.getElementById('big-card-container'), 'Shop_Filters', "POST", true, params, null);
        }, false);
    }
    

    if (document.querySelector(".short-slideshow-points") != undefined && document.querySelector(".slideshow-elements") != undefined) {
        let numberSlideshow = { Value: 0 };
        var elements = getChildSlideshowElements();
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", function () {
                currentElement(elements[i], numberSlideshow);
            });
        }


        let numberShortSlideshow = { Value: 0 };
        //moveShortSlideshow(document.querySelector(".short-slideshow-elements"), 0, numberShortSlideshow);
        var elementsshortSlideshow = getChildElements(document.querySelector(".short-slideshow-points"));
        for (let i = 0; i < elementsshortSlideshow.length; i++) {
            elementsshortSlideshow[i].addEventListener("click", function () {
                shortSlideshowCurrentElement(elementsshortSlideshow[i], numberShortSlideshow);
            });
        }

        var maxWidth = window.matchMedia("(max-width: 1200px)");
        var minWidth = window.matchMedia("(min-width: 1200px)");
        maxWidth.addListener(function (evt) { max600px(evt, numberSlideshow, numberShortSlideshow); });
        minWidth.addListener(function (evt) { min600px(evt, numberShortSlideshow, numberSlideshow); });

        if (minWidth.matches) {
            slideshowStart(numberSlideshow);
        } else moveShortSlideshow(document.querySelector(".short-slideshow-elements"), 0, numberShortSlideshow);
    }

    els = document.querySelectorAll(".fade"); //fade
    for (let i = 0; i < els.length; i++) {
        if (!come(els[i])) {
            if (els[i].getBoundingClientRect().y > window.innerHeight) {
                els[i].className += " fade-up";
            } else {
                if (els[i].getBoundingClientRect().y < 0) {
                    els[i].className += " fade-down";
                }
            }
        }
        window.addEventListener("scroll", function () {
            //console.log(els[i].className + " " + pastAnswer + " old");
            animationFade(els[i]);
            //console.log(els[i].className + " " + pastAnswer);
        });

    }

    var listner = function () {
        var news = document.querySelector(".news");
        if (document.location.pathname == "/Home/News" && window.scrollY + window.innerHeight >= news.clientHeight) {
            elementUpdateInnerHtml(news, "/Home/LoadNews", "GET", true, "", setFade);
            window.removeEventListener("scroll", listner);
        }
    };
        window.addEventListener("scroll", listner);
    setOnClick();//pull-down-menu pull-down


    // var myElemetn = document.querySelector("#small-card-container");
    // var pastAnswer = come(myElemetn);
    // var string = " ";
    // string = myElemetn.className;
    // if (!pastAnswer) {
    //     if (myElemetn.getBoundingClientRect().y > window.innerHeight) {
    //         myElemetn.className += " fade-up";

    //     } else {
    //         if (myElemetn.getBoundingClientRect().y < 0) {
    //             myElemetn.className += " fade-down";
    //         }
    //     }
    // }
    // window.onscroll = function () {
    //     pastAnswer = animationFade(myElemetn, pastAnswer, string);
    // };
}
// function topBodySite(el) {
//     el.style.top = `${document.querySelector(".bg-site").clientHeight}px`;
// }
////equals

function setFade() {
    els = document.querySelectorAll(".fade"); //fade
    for (let i = 0; i < els.length; i++) {
        if (!come(els[i])) {
            if (els[i].getBoundingClientRect().y > window.innerHeight) {
                els[i].className += " fade-up";
            } else {
                if (els[i].getBoundingClientRect().y < 0) {
                    els[i].className += " fade-down";
                }
            }
        }
        window.addEventListener("scroll", function () {
            //console.log(els[i].className + " " + pastAnswer + " old");
            animationFade(els[i]);
            //console.log(els[i].className + " " + pastAnswer);
        });

    }
}

function inputEqualsStr(inp, str) {
    if (inp.value == str) {
        return true;
    } else {
        inp.style = "border-color:red;";
        return false;
    }

}



////submit
function acceptPasswords(inp, inp1, form) {
    if (inp.value == inp1.value && inp1.value != "" && inp.value != "") {
        form.submit();
    } else
    {
        inp.style = "border-color:red;";
        inp1.style = "border-color:red;";
    }

}


//////ajax

    function elementUpdateInnerHtml(el, url, ajaxMethod, async, params,callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status >= 200 && xhr.status < 300) {
                //console.log("yes");
                //document.querySelector("#fields").disabled = false;
                el.innerHTML = this.responseText;
                if (this.responseText == "") {
                    location.reload()
                }
                if (callback != null) {
                    callback();
                }
            }
        }
        }
        
        if (ajaxMethod == "POST") {
            xhr.open(ajaxMethod, url, async);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    } else xhr.open(ajaxMethod, url + "?" + params, async);
        xhr.send(params);
        //document.querySelector("#fields").disabled = true;
}
function elementAddInnerHtml(el, innerHtmlFile, ajaxMethod, async, params) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status >= 200 && xhr.status < 300) {
                    el.innerHTML += this.responseText;
            }
        }
    }
    xhr.open(ajaxMethod, innerHtmlFile, async);
    if (ajaxMethod == "POST") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    xhr.send(params);
    //console.log(document.location.pathname);
    //console.log(window.location.href);
}

function ajaxHandler(request, inputs, lable) {
    if (request.responseText.includes("fail")) {
        var inputsName = request.responseText.split("_");
        for (var i = 0; i < inputs.length; i++) {
            for (var j = 0; j < inputsName.length; j++) {
                if (inputsName[j] == inputs[i].name) {
                    inputs[i].style = "border-color:red";
                    lable.style.display = "block";
                }
            }
        }
    } else {
        //document.querySelector(".body-site").innerHTML = request.responseText;
        window.location.href = "/Home/Index";
    }
}

function ajaxSendRequest(inputs,lable, handler, innerHtmlFilePath, ajaxMethod, async, params) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status >= 200 && xhr.status < 300) {
                handler(xhr, inputs, lable);
            }
        }
    }
    xhr.open(ajaxMethod, innerHtmlFilePath, async);
    if (ajaxMethod == "POST") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    xhr.send(params);
}
////////////////////////////////
//short filter
function changeElDisplay(el,display) {
    if (el.style.display == "none") {
        el.style.display = display;
    } else el.style.display = "none";

}

////////////////////////////////
//radio buttin
function clickRadio(el) {
    var siblings = document.querySelectorAll("input[type='radio'][name='" + el.name + "']");
    for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] != el)
            siblings[i].oldChecked = false;
    }
    if (el.oldChecked)
        el.checked = false;
    el.oldChecked = el.checked;
}
////////////////////////////////
//pulldownmenu Shop

function setOnClick() {
    var shopPullDownmenus = document.querySelectorAll(".shop-pull-down-menu");
    if (shopPullDownmenus != undefined) {
        for (let i = 0; i < shopPullDownmenus.length; i++) {
            getChildElements(getChildElements(shopPullDownmenus[i])[0])[0].onclick = () => {
                pullDownMenuShow(shopPullDownmenus[i], getChildElements(shopPullDownmenus[i])[1]);
            };
        }
    }
}
function pullDownMenuShow(menu, menuItemsElement) {
    if (!menu.className.includes(" show")) {
        menu.style.height = `${menuItemsElement.clientHeight + 60}px`;
        menuItemsElement.style.transform = `translateY(${0}%)`;
        getChildElements(getChildElements(getChildElements(menu)[0])[2])[0].setAttribute("d", "M 10,30 L 40,30 L 25,20 Z");
        menu.className += " show";
    } else {
        menu.style.height = "";
        menuItemsElement.style.transform = `translateY(${-100}%)`;
        getChildElements(getChildElements(getChildElements(menu)[0])[2])[0].setAttribute("d", "M 10,30 L 40,30 L 25,40 Z");
        menu.className = menu.className.replace(" show", "");
    }

}

////////////////////////////////
//gallery
function galleryNext(galleryItems) {
    var imgs = getChildElements(galleryItems);
    var itemsCount = imgs.length;
    for (let i = 0; i < imgs.length; i++) {
        var translateX = new Number(imgs[i].style.transform.substring(11, imgs[i].style.transform.length - 2));
        if ((translateX - 100) / itemsCount != -100) {
            imgs[i].style.transform = `translateX(${translateX - 100}%)`;
        } else imgs[i].style.transform = `translateX(0%)`;
    }
}

//function galleryPred(galleryItems) {
//    var imgs = getChildElements(galleryItems);
//    //for (let i = 0; i < imgs.length; i++) {
//    var translateX = new Number(galleryItems.style.transform.substring(11, galleryItems.style.transform.length - 2));
//    if (translateX != 0) {
//        galleryItems.style.transform = `translateX(${translateX + imgs[0].clientWidth}%)`;
//        console.log(`translateX(${imgs[0].clientWidth}px)`);
//    } else galleryItems.style.transform = `translateX(${-galleryItems.clientWidth + imgs[0].clientWidth}%)`;
//    //} imgs[i]
//}

function galleryPred(galleryItems) {
    var imgs = getChildElements(galleryItems);
    for (let i = 0; i < imgs.length; i++) {
        var translateX = new Number(imgs[i].style.transform.substring(11, imgs[i].style.transform.length - 2));
        if (translateX != 0) {
            imgs[i].style.transform = `translateX(${translateX + 100}%)`;
        } else imgs[i].style.transform = `translateX(${-imgs.length * 100 + 100}%)`;
    }
}

////////////////////////////////
//fade
function animationFade(element) {
    var answer = come(element);
    if (!answer && (element.className.indexOf(" fade-down") == -1 && element.className.indexOf(" fade-up") == -1)) {
        if (element.getBoundingClientRect().y < window.innerHeight - element.clientHeight / 2) {
            element.className += " fade-down";
        } else {
            element.className += " fade-up";
        }
    } else
        if (answer && (element.className.indexOf(" fade-down") != -1 || element.className.indexOf(" fade-up") != -1)) {
            element.className = element.className.replace(" fade-up", "");
            element.className = element.className.replace(" fade-down", "");
        }
}


function come(elem) {
    // console.log(elem.className + " " + (elem.getBoundingClientRect().y + elem.clientHeight / 2 > 0 && elem.getBoundingClientRect().y < window.innerHeight - elem.clientHeight / 2));
    return (elem.getBoundingClientRect().y + elem.clientHeight / 2 > 0 && elem.getBoundingClientRect().y < window.innerHeight - elem.clientHeight / 2);
}

////////////////////////////////
//media slideshow
function max600px(evt, bigSlideshow, shortSldeshow) {
    if (evt.matches) {
        clearInterval(bigSlideshow.Value);
        moveShortSlideshow(document.querySelector(".short-slideshow-elements"), 0, shortSldeshow);
    }

}
function min600px(evt, shortSldeshow, bigSlideshow) {
    if (evt.matches) {
        clearTimeout(shortSldeshow.Value);
        slideshowStart(bigSlideshow);
    }
}

////////////////////////////////
//save radiobuttons
function changeRadioButton(id) {
    document.getElementById(id).checked = true;
    saveData(document.getElementById(id));
}

function saveData(elemet) {

    localStorage.clear();
    localStorage.setItem(elemet.getAttribute('name'), elemet.getAttribute('id'));
}

function getData(item) {
    return document.getElementById(localStorage.getItem(item));
}

////////////////////////////////
//bigSlideshow

function slideshowStart(number) {
    number.Value = setInterval(function () {
        slideshowAnimation(document.querySelector(".slideshow-element-main img"));
        setTimeout(function () {
            document.querySelector(".slideshow-element-main img").setAttribute("class", "slideshow-element-main-image");
            document.querySelector(".slideshow-element-main-content").setAttribute("class", "slideshow-element-main-content");
            nextElement();
        }, 900);//1:2 and <10ms
    }, 4000);
}

function slideshowAnimation(element) {
    element.setAttribute("class", "slideshow-element-main-image move");
    document.querySelector(".slideshow-element-main-content").setAttribute("class", "slideshow-element-main-content content-move");
}

function currentElement(element, number) {
    // for (let i = 0; i < numbers.length; i++) {
    //     clearTimeout(numbers[i]);
    // }
    clearInterval(number.Value);
    var elements = getChildSlideshowElements();
    var mainImg = document.querySelector(".slideshow-element-main img");
    var span = document.querySelector(".slideshow-element-main div span");
    var link = document.querySelector(".slideshow-element-main div a");
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("class", "slideshow-element");
    }
    span.textContent = element.getAttribute("data-game-name");
    link.setAttribute("href", `/Home/AboutGame?game=${element.getAttribute("data-game-name")}`);
    mainImg.setAttribute("src", `${element.getAttribute("data-slide-image")}`);
    element.setAttribute("class", "slideshow-element-current");
    slideshowStart(number);
}

function nextElement() {
    var elements = getChildSlideshowElements();
    var mainImg = document.querySelector(".slideshow-element-main img");
    var span = document.querySelector(".slideshow-element-main div span");
    var link = document.querySelector(".slideshow-element-main div a");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute("class").includes("slideshow-element-current")) {
            if (i < 4) {
                elements[i].setAttribute("class", "slideshow-element");
                elements[i + 1].setAttribute("class", "slideshow-element-current");
                span.textContent = elements[i + 1].getAttribute("data-game-name");
                link.setAttribute("href", `/Home/AboutGame?game=${elements[i + 1].getAttribute("data-game-name")}`);
                mainImg.setAttribute("src", `${elements[i + 1].getAttribute("data-slide-image")}`);
            } else {
                elements[i].setAttribute("class", "slideshow-element");
                elements[0].setAttribute("class", "slideshow-element-current");
                span.textContent = elements[0].getAttribute("data-game-name");
                link.setAttribute("href", `/Home/AboutGame?game=${elements[0].getAttribute("data-game-name")}`);
                mainImg.setAttribute("src", `${elements[0].getAttribute("data-slide-image")}`);
            }
            return;
        }
    }
}

function getChildElements(element) {
    var elements = new Array();
    var nodes = element.childNodes;
    for (let index = 0; index < nodes.length; index++) {
        if (nodes[index].nodeType == 1) {
            elements.push(nodes[index]);
        }
    }
    return elements;
}

function getChildSlideshowElements() {
    var elements = new Array();
    var nodes = document.querySelector(".slideshow-elements").childNodes;
    for (let index = 0; index < nodes.length; index++) {
        if (nodes[index].nodeType == 1) {
            elements.push(nodes[index]);
        }
    }
    return elements;
}

////////////////////////////////
//shortSlideshow

function shortSlideshowCurrentElement(element, timeoutNumber) {
    clearTimeout(timeoutNumber.Value);
    var elements = getChildElements(document.querySelector(".short-slideshow-points"));
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("class", "point");
    }
    element.setAttribute("class", "point active");
    var array = getChildElements(document.querySelector(".short-slideshow-elements"));
    for (let i = 0; i < array.length; i++) {
        array[i].style.transform = `translateX(${-100 * elements.indexOf(element)}%)`;
    }
    moveShortSlideshow(document.querySelector(".short-slideshow-elements"), elements.indexOf(element), timeoutNumber);
}

function moveShortSlideshow(shortContainer, translateX, number) {
    array = getChildElements(shortContainer);
    arrayPoints = getChildElements(document.querySelector(".short-slideshow-points"));
    if (translateX < array.length) {
        for (let i = 0; i < array.length; i++) {
            array[i].style.transform = `translateX(${-100 * translateX}%)`;
        }
        if (translateX == 0) {
            arrayPoints[array.length - 1].setAttribute("class", "point");
        } else
            arrayPoints[translateX - 1].setAttribute("class", "point");
        arrayPoints[translateX].setAttribute("class", "point active");
        translateX++;
    } else {
        translateX = 0;
        for (let i = 0; i < array.length; i++) {
            array[i].style.transform = `translateX(${-100 * translateX}%)`;
        }
        arrayPoints[array.length - 1].setAttribute("class", "point");
        arrayPoints[translateX].setAttribute("class", "point active");
        translateX++;
    }
    number.Value = setTimeout(function () {
        moveShortSlideshow(shortContainer, translateX, number);
    }, 3000);
}