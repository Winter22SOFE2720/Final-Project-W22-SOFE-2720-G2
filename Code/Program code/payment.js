/* payment.js is used for calculations and functionality of the checkout page (index.html)*/
var subtotal = document.location.search.replace(/^.*?\=/, '');
var discountVals = ['0.15', '0.20'];
var applied = false;
var counter = 0;

display();
document.getElementById('creditOptions').style.display = 'none';
document.getElementById('giftOptions').style.display = 'none';

document.getElementsByClassName('apply-discount')[0].addEventListener('click', enterDiscount);

/*displays all the necessary payment info to the user*/
function display()
{
    var tax = calculateTax(subtotal);
    var discount = applyDiscount(applied, counter);
    var total = calculateTotal(subtotal, tax, discount);
    var shipping = determineShipping(subtotal);
    var final = calculateFinal(total, shipping);
    document.getElementsByClassName("subtotal")[0].innerText = '$' + subtotal;
    document.getElementsByClassName("tax")[0].innerText = '$' + tax;
    document.getElementsByClassName("ship")[0].innerText = '$' + shipping;
    document.getElementsByClassName("total")[0].innerText = '$' + final;
}

/*calculates tax of subtotal*/
function calculateTax(subtotal) {
    const taxRate = 0.13;
    var tax = subtotal * taxRate;
    tax = Math.round(tax * 100) / 100;
    return (tax);
}

/*calculates total cost with subtotal, tax, and an optional applied discount*/
function calculateTotal(subtotal, tax, discount) {
    var total = +subtotal + +tax;
    var deduction = 0;

    if (discount > 0) {
        deduction = total * discount;
        deduction = Math.round(deduction * 100) / 100;
        document.getElementsByClassName("discount")[0].innerText = '-$' + deduction;
        total = total - deduction;
    }
    return total;
}

/*listens for a discount code to be entered and checks if it is valid. If valid, the discount value will be retrieved from the storedDiscounts array and applied to the order*/
function enterDiscount() {
    document.getElementsByClassName("discount")[0].innerHTML = "";
    var storedDiscounts = ["spring-22", "vip-101"];
    var discount = document.getElementById("dCode").value;
    
    var counter = 0;

    for (var i = 0; i < storedDiscounts.length; i++) {
        if (discount.localeCompare(storedDiscounts[i]) == 0) {
            applied = true;
            counter++;
            break;
        }

        else {
            applied = false;
        }

    }
  
    document.getElementById("dCode").value = "";
    display();
}

/*determines if discount entered will or will not be applied*/
function applyDiscount(applied, counter) {
    var applied = applied;
    var discountVal;

    if (applied == true) {
        discountVal = discountVals[counter];
      
    }

    else {
        discountVal = 0;
    }

    return (discountVal);


}

/*calculates final cost with shipping*/
function calculateFinal(total, shipping) {
    var final = total + shipping;
    return final;
}

/*determines shipping. Shipping is free if subtotal is $50 or above before tax and discounts. It is $8.99 otherwise*/
function determineShipping(subtotal) {
    var shipFee;
    if (subtotal >= 50) {
        shipFee = 0;
    }
    else {
        shipFee = 8.99;
    }

    return shipFee;

}

/*listens to see if gift card or credit card payment method are selected*/
document.getElementById('giftCard').addEventListener('click', giftCardSelect);

document.getElementById('creditCard').addEventListener('click', creditSelect);

/*displays necessary input info for user's credit card information*/
function giftCardSelect() {
    console.log('gift card');
    document.getElementById('giftOptions').style.display = 'block';
    document.getElementById('creditOptions').style.display = 'none';
}

/*displays necessary input info for a gift card*/
function creditSelect() {
    console.log('credit card');
    document.getElementById('giftOptions').style.display = 'none';
    document.getElementById('creditOptions').style.display = 'block';
}

