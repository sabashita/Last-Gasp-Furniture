let furnitures = ['chair', 'recliner', 'table', 'umbrella'];//for determine
let zoneFee = [0, 20, 0, 35, 45, 50];
const titleName = ["furniture", "quantity", "unitPrice", "price"];//for display the items
//define the abbreviation
const validAb = ['AL', 'AK', 'AZ', 'AR', 'CZ', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
    'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'];
let products = [];//all products
let abbreviation = "";
let pass = true;// for loop
let price = 0; // for every single line
const chairPrice = 25.50;
const reclinerPrice = 37.75;
const tablePrice = 49.95;
const umbrellaPrice = 24.89;
let total = 0; // total money
let taxRate = 0.15;
let taxFee = 0;
let subTotal = 0;

function resetList() {
    products = [];//init products when click shop again
    let tables = document.getElementById("purchaseList");
    //reset the th
    tables.innerHTML = "<tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Price</th></tr>";
    cleanPrice();

}
function purchase() {
    pass = true;
    products = [];
    while (pass) {

        getFurniture();//get product

        let yn = prompt("Continue shopping? y/n");
        yn = yn.toLowerCase();
        if (yn == "y" || yn == "yes") {
            pass = true;
            continue;
        } else {
            pass = false;
        }

        abbreviation = shipping();

    }

    let tables = document.getElementById("purchaseList");
    for (i = 0; i < products.length; i++) {
        const tr = document.createElement("tr");
        tr.className = "itemlist";

        let j = 0;
        while (j < 4) {
            let items = document.createElement("td");
            items.textContent = products[i][titleName[j]];
            tr.append(items);
            tables.appendChild(tr);
            j++;

        }


    }

    
    document.getElementById("total").textContent = money(total);
    document.getElementById("shipping").textContent = money(zoneFee[1]);
    document.getElementById("tax").textContent = money(taxFee);
    document.getElementById("subtotal").textContent = money(subTotal);
    document.getElementById("shippintTitle").textContent = `Shipping to [${abbreviation}]: `;

}

function cleanPrice(){
    document.getElementById("total").textContent = "";
    document.getElementById("shipping").textContent = "";
    document.getElementById("tax").textContent = "";
    document.getElementById("subtotal").textContent = "";
}

function getFurniture() {

    //receive the furniture that customer input
    let furniture = prompt("What item would you like to buy today: Chair, Recliner, Table or Umbrella?");
    if (furniture == null) {
        document.getElementById("warning").innerHTML = `Please Press enter one kind of furniture`;

    } else {
        furniture = furniture.toLowerCase();

    }
    let quantity = prompt(`How many ${furniture} would you like to buy?`);
    if (isNaN(quantity)) {
        alert("please enter numbers");
    }

    switch (furniture) {
        case furnitures[0]: price = quantity * chairPrice;
            products.push({ "furniture": furniture, "quantity": quantity, "unitPrice": chairPrice, "price": price });
            break;
        case furnitures[1]: price = quantity * reclinerPrice;
            products.push({ "furniture": furniture, "quantity": quantity, "unitPrice": reclinerPrice, "price": price });
            break;
        case furnitures[2]: price = quantity * tablePrice;
            products.push({ "furniture": furniture, "quantity": quantity, "unitPrice": tablePrice, "price": price });
            break;
        case furnitures[3]: price = quantity * umbrellaPrice;
            products.push({ "furniture": furniture, "quantity": quantity, "unitPrice": umbrellaPrice, "price": price });
            break;
    }
    total += price;
    
    taxFee = total * taxRate;
    subTotal = total + zoneFee[1];

    price = 0;


}

function shipping() {
    let ab = prompt("Which state are you shipping to?Please enter the two letter state abbreviation.");
    ab = ab.toLocaleUpperCase();
    if (validAb.indexOf(ab) == -1) {
        alert("Please enter valid of abbreviation states");
        return shipping();
    }
    return ab
}

// pattern transfer
  function money(n){
    const sign = n < 0 ? -1 : 1;
    const s = '$' + Math.abs(n).toFixed(2);
    return sign < 0 ? '('+s+')' : s;
  }

