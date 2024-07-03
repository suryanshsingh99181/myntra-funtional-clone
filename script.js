// const menuButton = document.getElementById('menu-button');
// const mobileMenu = document.getElementById('mobile-menu');

// menuButton.addEventListener('click', () => {
//     mobileMenu.classList.toggle('hidden');
// });


// let item={
//     item_image:'images/1.jpg',
//     rating:{
//         stars:4.9,
//         noOfReviews:1400,
//     },
//     company_name: 'Carton London',
//     item_name: 'Rhodium-Plated CZ Floral Studs',
//     current_price:660,
//     original_price:1026,
//     discount_percentage:42,

// }
let bagItems;

onLoad();

function onLoad(){
    let bagItemsStr=localStorage.getItem('bagItems');
    bagItems=bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemsOnHomePage();
    displayBagIcon();
}

function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon(){
    let bagItemCountElement=document.querySelector(".bag-item-count");
    if(bagItems.length > 0){
        bagItemCountElement.innerText=bagItems.length;
        bagItemCountElement.style.visibility = 'visible';
    }
    else{
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage(){
    let itemsContainerElement=document.querySelector(`.items-container`);

if(!itemsContainerElement){
    return;
}
let innerHTML='';
items.forEach(item => {
    innerHTML +=`<div class="item-container w-52 mx-4 mt-5 h-2/5">
            <img class="item-image"src="${item.image}" alt="earring">
            <div class="rating text-xs font-bold ml-1">
                ${item.rating.stars} ★ | ${item.rating.count}
            </div>
            <div class="company-name text-base font-bold ml-1 leading-none text-blue-700 mb-1 overflow-hidden text-ellipsis whitespace-nowrap ">${item.company}</div>
            <div class="item-name mt-1 text-sm font-bold text-gray-400 ml-1 block whitespace-nowrap overflow-hidden text-ellipsis">${item.item_name}</div>
            <div class="price">
                <span class="current-price text-xs font-bold text-blue-700 ml-1">₹ ${item.current_price}</span>
                <span class="original-price ml-1 font-semibold text-xs line-through">₹ ${item.original_price}</span>
                <span class="discount text-orange-400 text-xs">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag bg-lime-500 border-none w-full rounded-lg pl-3 pr-3 pt-1 pb-1 text-base font-semibold" onclick="addToBag(${item.id})">Add to Bag</button>

        </div>`;
});
itemsContainerElement.innerHTML=innerHTML;

}

