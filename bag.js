
let bagItemObjects;

onLoad();

function onLoad(){
    
    LoadBagItemsObjects();
    displayBagItems();
    displayBagSummary();



}

function displayBagSummary(){
    
    let bagSummaryElement=document.querySelector('.bag-summary')
    let totalItem=bagItemObjects.length;
     

    let totalMRP=0;
    let totalDiscount=0;
    const CONVENIENCE_FEE=99;

    bagItemObjects.forEach(bagItem=>{
        totalMRP+=bagItem.original_price;
        totalDiscount+=bagItem.original_price-bagItem.current_price;
    });

    let finalPayment=totalMRP-totalDiscount+CONVENIENCE_FEE


    bagSummaryElement.innerHTML=`
    <div class="bag-details-container mb-4">
                <div class="price-header text-lg font-bold mt-6 mb-4 mx-0 text-gray-700">
                Price Details (${totalItem} Items)
                </div>
                <div class="price-item mb-3 text-lg leading-4 text-gray-800">
                    <span class="price-item-tag">Total MRP</span>
                    <span class="price-item-value float-right">Rs ${totalMRP}</span>
                </div>
                <div class="mb-2">
                    <span class="price-item-tag">Discount on MRP</span>
                    <span class="price-item-value priceDetail-base-discount float-right text-[#03a685]">Rs ${totalDiscount}</span>
                </div>
                <div class="price-item mb-2">
                    <span class="price-item-tag">Convenience Fee</span>
                    <span class="price-item-value float-right">Rs99</span>
                </div>
                <hr>
                <div class="price-footer font-bold text-lg pt-4 border-t border-gray-300 text-[#3e4152] leading-4">
                    <span class="price-item-tag">Total Amount</span>
                    <span class="price-item-value float-right">Rs ${finalPayment}</span>
                </div>
     </div>
            <button class="btn-place-order w-full tracking-[1px] text-lg font-semibold rounded-sm pt-[10px] pb-[10px] pl-4 pr-4 curson-pointer bg-red-500 text-white">
            PLACE ORDER
            </button>
            `
}

function LoadBagItemsObjects(){
    bagItemObjects= bagItems.map(ItemId =>{
        for(let i=0;i<items.length;i++){
            if(ItemId == items[i].id){
                return items[i];
            }
        }
    });

}

function displayBagItems(){
    let containerElement=document.querySelector('.bag-items-container');
    let innerHTML='';
    bagItemObjects.forEach(bagItem => {
        innerHTML+=generateItemHTML(bagItem);
        
    });
   containerElement.innerHTML=innerHTML;
}

function removeFromBag(ItemId){
    bagItems=bagItems.filter(bagItemId => bagItemId !== ItemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    LoadBagItemsObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();

   
}

function generateItemHTML(item){
    return `<div class="bag-item-container mb-2 bg-[#fff] text-lg border border-solid border-gray-300 rounded relative pt-3 pr-3">
                    <div class="item-left-part absolute h-36 w-28 bg-[#FFF2DF] ml-2">
                        <img class="bag-item-image w-full rounded" src="./${item.image}" alt="">
                    </div>
                    <div class="item-right-part pl-3 relative min-h-36 ml-32 mb-3">
                        <div class="company text-[#1173F2] font-bold">
                            ${item.company}
                        </div>
                        <div class="item-name text-[#5f5f5f]">
                            ${item.item_name}
                        </div>
                        <div class="price-container">
                            <span class="current-price">₹ ${item.current_price}</span>
                            <span class="original-price line-through text-[#535766] text-xs">₹ ${item.original_price}</span>
                        </div>
                        <div class="discount-percentage text-[#E4840F] text-sm">
                            ${item.discount_percentage}% OFF
                        </div>
                        <div class="return-period inline-flex text-base pt-2">
                            <span class="return-period-days font-bold mr-1">Return period:${item.return_period} days</span>
                        </div>
                        <div class="delivery-details mt-1 text-[#282c3f] text-sm tracking-tight mb-2 leading-4">
                            Delivered By
                            <span class="delivery-details-days text-[#03a685]">${item.delivery_date}</span>
                        </div>
                    </div>
                    <div class="remove-from-cart absolute text-2xl top-3 right-4 w-4 h-4 cursor-pointer" onclick="removeFromBag(${item.id})">X</div>

                </div>
     `

}

