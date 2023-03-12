const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);
let modalQuantity = 1;
let cart = [];
let modalKey = 0;

/* This function maps the Json file to catch item and put them on screen */
stuffJson.map ((item, index) => {
    let stuffItem = qs ('.type .stuff-item').cloneNode(true);

    stuffItem.setAttribute('data-key', index);
    stuffItem.querySelector('.stuff-item-img img').src = item.img;
    stuffItem.querySelector('.stuff-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    stuffItem.querySelector('.stuff-item-name').innerHTML = item.name;
    stuffItem.querySelector('.stuff-item-desc').innerHTML = item.description;
    stuffItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.stuff-item').getAttribute('data-key');
        modalQuantity = 1;
        modalKey = key;


        qs('.stuff-info h1').innerHTML = stuffJson[key].name;
        qs('.stuff-info-desc').innerHTML = stuffJson[key].description;
        qs('.default-image img').src = stuffJson[key].img;
        qs('.stuff-info-actual-price').innerHTML = `R$ ${stuffJson[key].price.toFixed(2)}`;
        qs('.stuff-info-size.selected').classList.remove('selected');
        qsa('.stuff-info-size').forEach((size, sizeIndex)=> { 
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }           
            size.querySelector('span').innerHTML = stuffJson[key].sizes[sizeIndex];
        });

        /* Show modal element effect on click */
        qs('.stuff-info-amount').innerHTML = modalQuantity;
        qs('.stuff-window-area').style.opacity = 0;
        qs('.stuff-window-area').style.display = 'flex';
        setTimeout(()=> {
            qs('.stuff-window-area').style.opacity = 1;
        }, 100);
        });

    qs('.stuff-area').append(stuffItem);
});

/* Modal element closing effect*/
function closeModal() {
    qs('.stuff-window-area').style.opacity = 0;
    setTimeout(()=> {  
        qs('.stuff-window-area').style.display = 'none';      
    }, 500);
}

qsa('.stuff-info-cancel-button, .stuff-info-cancel-mobile-button').forEach((item)=> {
    item.addEventListener('click', closeModal);
});


/* Button SUBTRACT and SUM actions */
qs('.stuff-info-amount-subtract').addEventListener('click', ()=> {
    if(modalQuantity > 1) {
        modalQuantity--;
        qs('.stuff-info-amount').innerHTML = modalQuantity;
    }})

qs('.stuff-info-amount-add').addEventListener('click', ()=> {
    modalQuantity++;
    qs('.stuff-info-amount').innerHTML = modalQuantity;
    
})

/* Selecting items size */
qsa('.stuff-info-size').forEach((size, sizeIndex)=> {     
    size.addEventListener('click', (e)=> {
        qs('.stuff-info-size.selected').classList.remove('selected');
        size.classList.add('selected');        
    })
});


/* Adding items to the cart */
qs('.stuff-info-add-button').addEventListener('click', ()=> {
   let size = parseInt(qs('.stuff-info-size.selected').getAttribute('data-key'));

    let identifier = stuffJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item)=> item.identifier == identifier);

    if(key > -1) {
        cart[key].amount += modalQuantity;
    } else {
        cart.push({ 
            identifier,
            id:stuffJson[modalKey].id,
            size,
            amount:modalQuantity
    
        });
    } 
    updateCart(); 
    closeModal();
});

/* Show updated cart on mobile screen */
qs('.menu-openner').addEventListener('click', ()=> {
    if(cart.length > 0) {
        qs('aside').style.left = '0';
    }

})

qs('.menu-closer').addEventListener('click', ()=> {
    qs('aside').style.left = '100vw';
})

/* Updating Cart items */
function updateCart() {

    qs('.menu-openner span').innerHTML = cart.length;
    
    if(cart.length > 0) {
        qs('aside').classList.add('show');
        qs('.cart').innerHTML = '';

        /* Variables to handle prices */
        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for(let i in cart) {
            let stuffItem = stuffJson.find((item)=>item.id == cart[i].id);
            subtotal += stuffItem.price * cart[i].amount;

            let cartItem = qs('.type .cart-item').cloneNode(true);

            let stuffSizeName;
            switch(cart[i].size){
                case 0:
                    stuffSizeName = 'P';
                    break;
                case 1:
                    stuffSizeName = 'M';
                    break;
                case 2:
                    stuffSizeName = 'G';
                    break;
            }
            let stuffName = `${stuffItem.name} (${stuffSizeName})`;

            cartItem.querySelector('img').src = stuffItem.img;
            cartItem.querySelector('.cart-item-name').innerHTML = stuffName;
            cartItem.querySelector('.cart-item-amount').innerHTML = cart[i].amount;

            /* Subtract items from cart */
            cartItem.querySelector('.cart-item-subtract').addEventListener('click', ()=> {
                if(cart[i].amount > 1) {
                    cart[i].amount--;
                    
                } else {
                    cart.splice(i, 1);
                } 


                updateCart();
                

            });

            /* Add items to cart */ 
            cartItem.querySelector('.cart-item-sum').addEventListener('click', ()=> {
                cart[i].amount++;
                updateCart();

            });

            qs('.cart').append(cartItem);
            
        }

        discount = subtotal * 0.1;
        total = subtotal - discount;

        qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        qs('.deduction span:last-child').innerHTML = `R$ ${discount.toFixed(2)}`;
        qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        qs('aside').classList.remove('show');
        qs('aside').style.left = '100vw';
    }
}