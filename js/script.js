/*eslint-env browser*/

var totalPizza, totalChesse, totalSauce, totalToppings, total;

var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};

function hasClass(el, className) {
    "use strict";
    if (el.classList) {
        return el.classList.contains(className);
    } else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
}

function addClass(el, className) {
    "use strict";
    if (el.classList) {
        el.classList.add(className);
    } else if (!hasClass(el, className)) {
        el.className += " " + className;
    }
}

function removeClass(el, className) {
    "use strict";
    if (el.classList) {
        el.classList.remove(className);
    } else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}


function checkText(strtext) {
    "use strict";
    var filter = /^[A-Za-z]+$/;
    if (!filter.test(strtext.value)) {
        window.alert('Please enter only letters');
        return false;
    }
}

function checkAddress(address) {
    "use strict";
    var filter = /^\d+\w*\s*(?:[\-\/]?\s*)?\d*\s*\d+\/?\s*\d*\s*/;
    if (!filter.test(address.value)) {
        window.alert('Please provide a valid address');
        return false;
    }
}

function checkEmail(email) {
    "use strict";
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        window.alert('Please provide a valid email address');
        return false;
    }
}

function checkZipcode(zipcode) {
    "use strict";
    var filter = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
    if (!filter.test(zipcode.value)) {
        window.alert('Please provide a valid zip code');
        return false;
    }
}

function checkPhone(phone) {
    "use strict";
    var filter = /^\(?([0-9]{3})\)?[-\.\ ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!filter.test(phone.value)) {
        window.alert('Please provide a valid phone number');
        return false;
    }
}

function checkName(name) {
    "use strict";
    var filter = /^[a-zA-Z\s]*$/;
    if (!filter.test(name.value)) {
        window.alert('Please enter a valid credit card name');
        return false;
    }
}

function checkcvv(cvvNumber) {
    "use strict";
    var filter = /^[0-9]{3}$/;
    if (!filter.test(cvvNumber.value)) {
        window.alert('Please provide a valid CVV number');
        return false;
    }
}

function updatePizzaTotal() {
    "use strict";
    totalPizza = parseFloat($('totalPizza').innerHTML);
    totalChesse = parseFloat($('totalChesse').innerHTML);
    totalSauce = parseFloat($('totalSauce').innerHTML);
    totalToppings = parseFloat($('totalToppings').innerHTML);
    //total = totalPizza;
    total = totalPizza + totalChesse + totalSauce + totalToppings;
    $('total').innerHTML = total.toFixed(2);

    /*
        total = parseFloat(valtotal) + total;
        $('total').innerHTML = total
    */

    //window.console.log('totalPizza ' + totalPizza);
    //window.console.log('totalChesse ' + totalChesse);
}

function Luhn(card) {
    "use strict";
    var cc = card;
    var i, k, len, sNumber;
    var total = 0, aux = 0, aux1 = 0, val = 0, val1 = 0, array = [];
    for (i = 0; i < cc.length; i += 2) {
        aux = cc.charAt(i);
        aux1 = cc.charAt(i + 1);
        val = parseInt(aux, 10);
        val1 = parseInt(aux1, 10);
        val = val * 2;
        sNumber = val.toString();
        if (val > 9) {
            for (k = 0, len = sNumber.length; k < len; k += 1) {
                array.push(+sNumber.charAt(k));
                total = total + parseInt(sNumber.charAt(k), 10);
            }
        } else {
            array.push(val);
            total = total + val;
        }
        array.push(val1);
        total = total + val1;
        //console.log(array);
        //console.log(total);
        //console.log("----");
    }
    if (total % 10 > 0) {
        //console.log("falso");
        return false;
    } else {
        return true;
    }
}

function checkCreditCard(card) {
    "use strict";
    var cc = card.value;
    var ccfd = cc.charAt(0);
    var ccdd = cc.substr(0, 2);
    var cclen = cc.length;
    if (ccfd !== "4" && ccfd !== "5" && ccfd !== "3") {
        removeClass($('logocc'), 'vc');
        removeClass($('logocc'), 'ac');
        removeClass($('logocc'), 'mc');
        $('errorcc').innerHTML = "Invalid Card Number Prefix";
        return false;
    } else {
        switch (ccfd) {
        case "4":
                //console.log("visa");
            if (cclen === 13 || cclen === 16) {
                if (Luhn(cc)) {
                    addClass($('logocc'), 'vc');
                    $('errorcc').innerHTML = "";
                    return true;
                } else {
                    removeClass($('logocc'), 'vc');
                    $('errorcc').innerHTML = "Invalid Card Number";
                    return false;
                }
            } else {
                $('errorcc').innerHTML = "Invalid Number of Digits";
                return Luhn(cc);
                //break;
            }
        case "5":
            //console.log("mastercard");
            if (Number(ccdd) >= 50 && Number(ccdd) <= 55) {
                if (cclen === 16) {
                    if (Luhn(cc)) {
                        addClass($('logocc'), 'mc');
                        $('errorcc').innerHTML = "";
                        return true;
                    } else {
                        removeClass($('logocc'), 'mc');
                        $('errorcc').innerHTML = "Invalid Card Number";
                        return false;
                    }
                } else {
                    removeClass($('logocc'), 'mc');
                    $('errorcc').innerHTML = "Invalid Number of Digits";
                    return false;
                    //break;
                }
            } else {
                removeClass($('logocc'), 'mc');
                $('errorcc').innerHTML = "Invalid Card Number Prefix";
                return false;
                //break;
            }
        case "3":
            //console.log("americanexpress");
            if (Number(ccdd) === 37) {
                if (cclen === 15) {
                    if (Luhn(cc)) {
                        addClass($('logocc'), 'ac');
                        $('errorcc').innerHTML = "";
                        return true;
                    } else {
                        removeClass($('logocc'), 'ac');
                        $('errorcc').innerHTML = "Invalid Card Number";
                        return false;
                    }
                } else {
                    removeClass($('logocc'), 'ac');
                    $('errorcc').innerHTML = "Invalid Number of Digits";
                    return false;
                    //break;
                }
            } else {
                removeClass($('logocc'), 'ac');
                $('errorcc').innerHTML = "Invalid Card Number Prefix";
                return false;
                //break;
            }
        default:
            return false;
        }
    }

}

var setfocus = function (textReq) {
    "use strict";
    var x = textReq.value;
    var el = textReq;
    if (x.length === 0) {
        removeClass(el, 'invalid');
    }
};

function checkExpiration() {
    "use strict";
    var actualDate = new Date();
    var selectedMonth = $("monthB").selectedIndex;
    var selectedYear = $("yearB").options[$("yearB").selectedIndex].value;
    var actualMonth = actualDate.getMonth();
    var actualYear = actualDate.getFullYear();
    if (selectedYear == actualYear) {
        if (selectedMonth <= actualMonth + 1) {
            addClass($("monthB"), "invalid");
            addClass($("yearB"), "invalid");
            return false;
        } else {
            removeClass($("monthB"), "invalid");
            removeClass($("yearB"), "invalid");
            return true;
        }
    } else {
         removeClass($("yearB"), "invalid");
    }
}

var inputRequired = function (textReq) {
    "use strict";
    var x = textReq.value;
    /*var el = textReq;*/
    if (x.length === 0) {
        addClass(textReq, 'invalid');
        //window.console.log("requiered");
    } else {
        switch (textReq.id) {
        case "otherAddress":
        case "stateB":
        case "cityB":
        case "state":
        case "city":
        case "lastName":
        case "firstName":
            if (checkText(textReq) === false) {
                addClass(textReq, 'invalid');
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        case "streetAddressB":
        case "streetAddress":
            if (checkAddress(textReq) === false) {
                addClass(textReq, 'invalid');
                //$(zipCode).focus();
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        case "zipCodeB":
        case "zipCode":
            if (checkZipcode(textReq) === false) {
                addClass(textReq, 'invalid');
                //$(zipCode).focus();
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        case "phoneNumber":
            if (checkPhone(textReq) === false) {
                addClass(textReq, 'invalid');
                //$(phoneNumber).focus();
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        case "email":
            if (checkEmail(textReq) === false) {
                addClass(textReq, 'invalid');
                //$(email).focus();
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        case "cvv":
            if (checkcvv(textReq) === false) {
                addClass(textReq, 'invalid');
                //$(cvv).focus();
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        case "nameCard":
            if (checkName(textReq) === false) {
                addClass(textReq, 'invalid');
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        case "creditCard":
            if (checkCreditCard(textReq) === false) {
                addClass(textReq, 'invalid');
                //$(creditCard).focus();
            } else {
                removeClass(textReq, 'invalid');
            }
            break;
        default:
            //
        }
    }
};

function getToppingsTotal() {
    "use strict";
    var val = parseFloat($('totalToppings').innerHTML);
    if (this.checked === true) {
        val += parseFloat(this.value);
    } else {
        val -= parseFloat(this.value);
    }
    $('totalToppings').innerHTML = val.toFixed(2);
    updatePizzaTotal();
}

var sizesByDough = {
    HandTossed: [{
        value: 0.00,
        text: 'Select'
    }, {
        value: 9.99,
        text: 'Small ($9.99)'
    }, {
        value: 12.99,
        text: 'Medium ($12.99)'
    }, {
        value: 14.99,
        text: 'Large ($14.99)'
    }],
    ThinCrust: [{
        value: 0.00,
        text: 'Select'
    }, {
        value: 11.99,
        text: 'Medium ($11.99)'
    }, {
        value: 13.99,
        text: 'Large ($13.99)'
    }],
    NewYorkStyle: [{
        value: 0.00,
        text: 'Select'
    }, {
        value: 16.99,
        text: 'Large ($16.99)'
    }, {
        value: 19.99,
        text: 'Extra Large ($19.99)'
    }],
    GlutenFree: [{
        value: 0.00,
        text: 'Select'
    }, {
        value: 10.99,
        text: 'Small ($10.99)'
    }]
};


function changecat(value) {
    "use strict";
    var sizeId;
    $("cheese").disabled = true;
    $("sauce").disabled = true;
    $("toppings").disabled = true;
    //$('txtPizza').innerHTML = "Pizza: " + value + " ";
    if (value.length === 0) {
        $("sizes").innerHTML = "<option></option>";
    } else {
        var sizeOptions = "";
        for (sizeId in sizesByDough[value]) {
            sizeOptions += "<option value='" + sizesByDough[value][sizeId].value + "'>" + sizesByDough[value][sizeId].text + "</option>";
        }
        $("sizes").innerHTML = sizeOptions;
    }
}



function validateInfo() {
    "use strict";
    var i, flag = true;
    var nodes = document.querySelectorAll("#delivery input[type=text]");
    for (i = 0; i < nodes.length; i += 1) {
        if (nodes[i].id !== "apt") {
            if (nodes[i].id == "otherAddress") {
                //console.log("otherAddress");
                var el = $("other");
                var displayValue = el.style.display;
                //console.log(displayValue);
                if (displayValue == "block") {
                    inputRequired($(nodes[i].id));
                }
            } else {
                inputRequired($(nodes[i].id));
            }
        }
    }
    var ind = $("sizes").selectedIndex;
    if (ind === 0) {
        addClass($("sizes"), "invalid");
    } else {
        removeClass($("sizes"), "invalid");
    }
    var x = document.getElementsByClassName("invalid");
    if (x.length) {
        flag = false;
    }
    return flag;
}

function validateInfoB() {
    "use strict";
    var i, flag = true;
    var nodes = document.querySelectorAll("#billingf input[type=text]");
    for (i = 0; i < nodes.length; i += 1) {
        if (nodes[i].id !== "aptB") {
            inputRequired($(nodes[i].id));
        }
    }
    var ind = $("monthB").selectedIndex;
    if (ind === 0) {
        addClass($("monthB"), "invalid");
    } else {
        removeClass($("monthB"), "invalid");
        ind = $("yearB").selectedIndex;
        if (ind === 0) {
            addClass($("yearB"), "invalid");
        } else {
            removeClass($("yearB"), "invalid");
            checkExpiration();
        }
    }
    var x = document.getElementsByClassName("invalid");
    if (x.length) {
        flag = false;
    }
    return flag;
}

function isNumber(evt) {
    "use strict";
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
}

$("firstName").addEventListener("blur", function () {
    "use strict";
    inputRequired($("firstName"));
});

$("firstName").addEventListener("focus", function () {
    "use strict";
    setfocus($("firstName"));
});

$("lastName").addEventListener("blur", function () {
    "use strict";
    inputRequired($("lastName"));
});

$("addressType").addEventListener("change", function () {
    "use strict";
    var i;
    i = $("addressType").selectedIndex;
    if (i === 6) {
        $("other").style.display = 'block';
    } else {
        $("other").style.display = 'none';
        removeClass($("otherAddress"), 'invalid');
    }
});

$("otherAddress").addEventListener("blur", function () {
    "use strict";
    inputRequired($("otherAddress"));
});

$("streetAddress").addEventListener("blur", function () {
    "use strict";
    inputRequired($("streetAddress"));
});

$("city").addEventListener("blur", function () {
    "use strict";
    inputRequired($("city"));
});

$("state").addEventListener("blur", function () {
    "use strict";
    inputRequired($("state"));
});

$("zipCode").addEventListener("blur", function () {
    "use strict";
    inputRequired($("zipCode"));
});

/*$("zipCode").addEventListener("focus", function () {
    "use strict";
    setfocus($("zipCode"));
});*/

$("phoneNumber").addEventListener("blur", function () {
    "use strict";
    inputRequired($("phoneNumber"));
});

/*$("phoneNumber").addEventListener("focus", function () {
    "use strict";
    setfocus($("phoneNumber"));
});*/

$("email").addEventListener("blur", function () {
    "use strict";
    inputRequired($("email"));
});

/*$("email").addEventListener("focus", function () {
    "use strict";
    setfocus($("email"));
});*/

$("sizes").addEventListener("change", function () {
    "use strict";
    var e = $("sizes");
    var val = e.options[e.selectedIndex].value;
    $('totalPizza').innerHTML = val;
    updatePizzaTotal();
});

$("cheese").addEventListener("change", function () {
    "use strict";
    var e = $("cheese");
    var val = e.options[e.selectedIndex].value;
    $('totalChesse').innerHTML = val;
    updatePizzaTotal();
});

$("sauce").addEventListener("change", function () {
    "use strict";
    var e = $("sauce");
    var val = e.options[e.selectedIndex].value;
    $('totalSauce').innerHTML = val;
    updatePizzaTotal();
});

$("same").addEventListener("change", function () {
    "use strict";
    if (this.checked === true) {
        $("streetAddressB").value = $("streetAddress").value;
        removeClass($("streetAddressB"), "invalid");
        $("aptB").value = $("apt").value;
        removeClass($("aptB"), "invalid");
        $("cityB").value = $("city").value;
        removeClass($("cityB"), "invalid");
        $("stateB").value = $("state").value;
        removeClass($("stateB"), "invalid");
        $("zipCodeB").value = $("zipCode").value;
        removeClass($("zipCodeB"), "invalid");
    } else {
        $("streetAddressB").value = "";
        $("aptB").value = "";
        $("cityB").value = "";
        $("stateB").value = "";
        $("zipCodeB").value = "";
    }
});

$("streetAddressB").addEventListener("blur", function () {
    "use strict";
    inputRequired($("streetAddressB"));
});

$("cityB").addEventListener("blur", function () {
    "use strict";
    inputRequired($("cityB"));
});

$("stateB").addEventListener("blur", function () {
    "use strict";
    inputRequired($("stateB"));
});

$("zipCodeB").addEventListener("blur", function () {
    "use strict";
    inputRequired($("zipCodeB"));
});

$("nameCard").addEventListener("blur", function () {
    "use strict";
    inputRequired($("nameCard"));
});

$("creditCard").addEventListener("blur", function () {
    "use strict";
    inputRequired($("creditCard"));
});

$("monthB").addEventListener("change", function () {
    "use strict";
    if ($("monthB").selectedIndex == 0) {
        alert("Please select a month");
        addClass($("monthB"), "invalid");
    } else {
        removeClass($("monthB"), "invalid");
        checkExpiration();
    }
});

$("yearB").addEventListener("change", function () {
    "use strict";
    if ($("yearB").selectedIndex === 0) {
        alert("Please select a year");
        addClass($("yearB"), "invalid");
    } else {
        removeClass($("yearB"), "invalid");
        checkExpiration();
/*        var auxdate = checkExpiration();
        if (auxdate === false) {
             alert("Incorrect expiration date");            
        }*/
    }
});

$("cvv").addEventListener("blur", function () {
    "use strict";
    inputRequired($("cvv"));
});

window.addEventListener("load", function () {
    "use strict";
    $("other").style.display = 'none';
    $("billing").style.display = 'none';
    var radioOption = [document.getElementsByName('dough')[0], document.getElementsByName('dough')[1], document.getElementsByName('dough')[2], document.getElementsByName('dough')[3]];
    radioOption.forEach(function (e) {
        e.addEventListener("click", function () {
            changecat(e.value);
        });
    });

    var el = $('toppings');
    var tops = el.getElementsByTagName('input');
    var i;
    for (i = 0; i < tops.length; i += 1) {
        if (tops[i].type === 'checkbox') {
            tops[i].onclick = getToppingsTotal;
        }
    }

    $("cheese").disabled = true;
    $("sauce").disabled = true;
    $("toppings").disabled = true;
    $("sizes").addEventListener("click", function () {
        $("cheese").disabled = false;
        $("sauce").disabled = false;
        $("toppings").disabled = false;
    });
    $("sizes").addEventListener("focus", function () {
        removeClass($("sizes"), "invalid");
    });
    var initialValue = 0;
    $('totalPizza').innerHTML = initialValue.toFixed(2);
    $('totalChesse').innerHTML = initialValue.toFixed(2);
    $('totalSauce').innerHTML = initialValue.toFixed(2);
    $('totalToppings').innerHTML = initialValue.toFixed(2);
    $('total').innerHTML = initialValue.toFixed(2);
    $('buildPizza').addEventListener("click", function () {
        //$("billing").style.display = 'block';
        if (validateInfo() === true) {
            $("billing").style.display = 'block';
        } else {
            alert("Please enter the requeired info");
            $("billing").style.display = 'none';
        }
    });
    $("state").setAttribute('maxlength', 2);
    $("stateB").setAttribute('maxlength', 2);
    $("cvv").setAttribute('maxlength', 3);
    $("creditCard").setAttribute('maxlength', 16);
    $('orderPizza').addEventListener("click", function () {
        if (validateInfo() === true) {
            var el = $("billing");
            var displayValue = el.style.display;
            if (displayValue === "block") {
                if (validateInfoB() === true) {
                    alert("Your order has been processed");
                    window.location.replace("index.html");
                } else {
                    alert("Please enter the requeired info");
                }
            }

        } else {
            alert("Please enter the requeired info");
        }
    });
})

/*window.addEventListener("load", function () {
    "use strict";
    $("firstName").focus();
    $("firstName").addEventListener("blur", inputRequired($("firstName")), true);

});*/
