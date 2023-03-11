const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);


stuffJson.map ((item, index) => {
    let stuffItem = qs ('.type .stuff-item').cloneNode(true);

    stuffItem.querySelector('.stuff-item-img img').src = item.img;
    stuffItem.querySelector('.stuff-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    stuffItem.querySelector('.stuff-item-name').innerHTML = item.name;
    stuffItem.querySelector('.stuff-item-desc').innerHTML = item.description;
    stuffItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        qs('.stuff-window-area').style.display = 'flex';
        })

    qs('.stuff-area').append(stuffItem);
});