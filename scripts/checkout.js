"use strict";

//address autofill


//Input Boxes
const emailInputBox = document.getElementById("emailInputBox");
const phoneNumberInputBox = document.getElementById("phoneNumberInputBox");
const firstNameInputBox = document.getElementById("firstNameInputBox");
const lastNameInputBox = document.getElementById("lastNameInputBox");
const address1InputBox = document.getElementById("address1InputBox");
const address2InputBox = document.getElementById("address2InputBox");
const cityInputBox = document.getElementById("cityInputBox");
const zipcodeInputBox = document.getElementById("zipcodeInputBox");
const creditCardNumberInputBox = document.getElementById("creditCardNumberInputBox");
const creditCardNameInputBox = document.getElementById("creditCardNameInputBox");
const creditCardExpriationDateInputBox = document.getElementById("creditCardExpriationDateInputBox");
const creditCardCVVInputBox = document.getElementById("creditCardCVVInputBox");
const discountAreaInputBox = document.getElementById("discountAreaInputBox");

//Dropdown
const stateDropdown = document.getElementById("stateDropdown");

//Divs
const cartOutputDiv = document.getElementById("cartOutputDiv");
const costOutputDiv = document.getElementById("costOutputDiv");
const discountAreaDiv = document.getElementById("discountAreaDiv");

//textboxes
const subtotalTextBox = document.getElementById("subtotalTextBox");
const taxesTextBox = document.getElementById("taxesTextBox");
const shippingTextbox = document.getElementById("shippingTextbox");
const totalTextBox = document.getElementById("totalTextBox");
const discountTextbox = document.getElementById("discountTextbox");

//button
const discountAreaSubmitButton = document.getElementById("discountAreaSubmitButton");
const completeOrderButton = document.getElementById("completeOrderButton");

//form
const checkoutForm = document.getElementById("checkoutForm");

//why are u global.
let subtotal = 0;
let discount = 0;

window.onload = () => {
    cartOutputDiv.innerHTML = "";
    loadStateDropdown();
    loadCheckout(JSON.parse(sessionStorage.cart));
    stateDropdown.onchange = loadTotals;
    discountAreaSubmitButton.onclick = () => {
        
        if(discountAreaInputBox.value == "GRANDOPENING"){
            
            discount = .1;
            loadTotals();
        }
    }

    checkoutForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        window.alert("Order Placed!");
        //redirect to home page

    });    

    // //Testing
    // sessionStorage.cart_test1 = JSON.stringify(cartModel1);
    // sessionStorage.cart_test2 = JSON.stringify(cartModel2);
    // sessionStorage.cart_test3 = JSON.stringify(cartModel3);

    // // console.log(parseCart());


}

//change how this works a bit
function loadCheckout(cart) {


    for (let item of cart) {
        cartOutputDiv.appendChild(createCard(item));
        subtotal += item.item.price;
    }
    //make subtotal not gloabl if possible
    loadTotals();
}

function loadTotals() {
    let taxRate = calculateTaxRate();
    let taxes = subtotal*taxRate;
    let shipping = 3.00;
    let discountAmount;

    if(stateDropdown.value == "GA"){
        shipping = 1.50;
    } 
    if(discount > 0){
        
        discountAreaDiv.style = "visibility: visible;";
        discountAmount = subtotal * discount;
        discountTextbox.innerHTML = `- $${discountAmount.toFixed(2)}`;
    } else {
        discountAmount = 0;
    }
    
    subtotalTextBox.innerHTML = `$${subtotal.toFixed(2)}`;
    taxesTextBox.innerHTML = `$${taxes.toFixed(2)}`;
    shippingTextbox.innerHTML = `$${shipping.toFixed(2)}`;
    console.log()

    totalTextBox.innerHTML = `$${(subtotal + taxes + shipping - discountAmount).toFixed(2)}`;
    if(taxesTextBox.innerHTML == "$NaN"){
        taxesTextBox.innerHTML = "Please Select Your State";
        totalTextBox.innerHTML = " ";
    }
}

function loadStateDropdown() {
    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    for (let state of states) {
        let item = document.createElement("option");
        item.innerHTML = state;
        stateDropdown.appendChild(item);
    }
}

function calculateTaxRate(){
    const stateSalesTaxRates = {
        "AL": 0.04,
        "AK": 0.00,
        "AZ": 0.056,
        "AR": 0.065,
        "CA": 0.0725,
        "CO": 0.029,
        "CT": 0.0635,
        "DE": 0.00,
        "FL": 0.06,
        "GA": 0.04,
        "HI": 0.04,
        "ID": 0.06,
        "IL": 0.0625,
        "IN": 0.07,
        "IA": 0.06,
        "KS": 0.065,
        "KY": 0.06,
        "LA": 0.0445,
        "ME": 0.055,
        "MD": 0.06,
        "MA": 0.0625,
        "MI": 0.06,
        "MN": 0.06875,
        "MS": 0.07,
        "MO": 0.04225,
        "MT": 0.00,
        "NE": 0.055,
        "NV": 0.0685,
        "NH": 0.00,
        "NJ": 0.06625,
        "NM": 0.05125,
        "NY": 0.04,
        "NC": 0.0475,
        "ND": 0.05,
        "OH": 0.0575,
        "OK": 0.045,
        "OR": 0.00,
        "PA": 0.06,
        "RI": 0.07,
        "SC": 0.06,
        "SD": 0.045,
        "TN": 0.07,
        "TX": 0.0625,
        "UT": 0.0485,
        "VT": 0.06,
        "VA": 0.053,
        "WA": 0.065,
        "WV": 0.06,
        "WI": 0.05,
        "WY": 0.04,
        "DC": 0.06
    };
    // console.log(stateSalesTaxRates[stateDropdown.value]);
    return stateSalesTaxRates[stateDropdown.value];
}

function createCard(data) {
    //TESTING
    console.log(data);

    //TODO: change the background color.
    const card = document.createElement('div');
    card.classList.add("card", "w-75", "mb-3", "border-0")

    // Create card body div
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Create row div
    const row = document.createElement('div');
    row.classList.add('row');

    // Create columns
    const colImage = document.createElement('div');
    colImage.classList.add('col');

    const colNameAndAmount = document.createElement('div');
    colNameAndAmount.classList.add('col');
    
    const colPrice = document.createElement('div');
    colPrice.classList.add('col');

    // Create and append image paragraph
    const img = document.createElement('img');
    img.src = "../"+ data.item.img;
    img.style = "width: 150px; height: 130px";
    colImage.appendChild(img);

    // Create and append item name paragraph
    const pItemName = document.createElement('p');
    pItemName.classList.add('h5', 'card-title', 'text-start');
    pItemName.textContent = data.item.name;
    colNameAndAmount.appendChild(pItemName);

    // Create and append amount paragraph
    const pAmount = document.createElement('p');
    pAmount.classList.add('text-start', "fst-italic");
    pAmount.textContent = `x${data.quantity}`;
    colNameAndAmount.appendChild(pAmount);

    //TODO: FIX
    // Create and append quantity paragraph
    const pPrice = document.createElement('p');
    pPrice.classList.add("fw-semibold");
    pPrice.textContent = `$${data.item.price.toFixed(2)}`;
    colPrice.appendChild(pPrice);

    // Append columns to row
    row.appendChild(colImage);
    row.appendChild(colNameAndAmount);
    row.appendChild(colPrice);

    // Append row to card body
    cardBody.appendChild(row);

    return cardBody;

}