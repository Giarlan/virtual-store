const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);
let modalQuantity = 1;
let cart = [];
let modalKey = 0;


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


        qs('.stuff-info h1').innerHTML = stuffJson[key].name;
        qs('.stuff-info-desc').innerHTML = stuffJson[key].description;
        qs('.default-image img').src = stuffJson[key].img;
        qs('.stuff-info-actual-price').innerHTML = `R$ ${stuffJson[key].price.toFixed(2)}`;
        qs('.stuff-info-size.selected').classList.remove('selected');
        qsa('.stuff-info-size').forEach((size, sizeIndex)=> { 
            if(sizeIndex === 2) {
                size.classList.add('selected');
            }           
            size.querySelector('span').innerHTML = stuffJson[key].sizes[sizeIndex];
        });

        qs('.stuff-info-amount').innerHTML = modalQuantity;

        qs('.stuff-window-area').style.opacity = 0;
        qs('.stuff-window-area').style.display = 'flex';
        setTimeout(()=> {
            qs('.stuff-window-area').style.opacity = 1;
        }, 100);
        });

    qs('.stuff-area').append(stuffItem);
});

function closeModal() {
    qs('.stuff-window-area').style.opacity = 0;
    setTimeout(()=> {  
        qs('.stuff-window-area').style.display = 'none';      
    }, 500);
}

qsa('.stuff-info-cancel-button, .stuff-info-cancel-mobile-button').forEach((item)=> {
    item.addEventListener('click', closeModal);
});

qs('.stuff-info-amount-subtract').addEventListener('click', ()=> {
    if(modalQuantity > 1) {
        modalQuantity--;
        qs('.stuff-info-amount').innerHTML = modalQuantity;
    }})

qs('.stuff-info-amount-add').addEventListener('click', ()=> {
    modalQuantity++;
    qs('.stuff-info-amount').innerHTML = modalQuantity;
    
})

qsa('.stuff-info-size').forEach((size, sizeIndex)=> {     
    size.addEventListener('click', (e)=> {
        qs('.stuff-info-size.selected').classList.remove('selected');
        size.classList.add('selected');        
    })
});

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

function updateCart() {
    if(cart.length > 0) {
        qs('aside').classList.add('show');
       /* for(let i in cart) {
            let stuffItem = stuffJson.find((item)=> item.id == cart[i].id);
            console.log(stuffItem);
        }*/


    } else {
        qs('aside').classList.remove('show');
    }
}