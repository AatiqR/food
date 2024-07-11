document.addEventListener('DOMContentLoaded', () => {
    let addBtn = document.querySelector('#addproductbtn');
    const uploadBtn = document.querySelector('#cart-add');
    const MAX_IMAGES = 50;  // Set a limit for the number of images to store

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            let formContainer = document.querySelector('#formContainer');
            formContainer.classList.toggle('hidden');
        });
    }

    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            let formContainer = document.querySelector('#formContainer');
            formContainer.classList.toggle('hidden');

            const fileInput = document.querySelector('#pic');
            const files = fileInput.files;
            const name = document.querySelector('#name').value;
            const description = document.querySelector('#description').value;
            const price = document.querySelector('#price').value;

            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    compressAndStoreImage(files[i], name, description, price);
                }
            } else {
                alert('Please select a file first.');
            }
        });
    }

    window.addEventListener('load', () => {
        displayImages();
    });

    function compressAndStoreImage(file, name, description, price) {
        const reader = new FileReader();
        reader.onloadend = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width / 2;
                canvas.height = img.height / 2;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);  // Adjust the quality as needed
                storeProduct(compressedDataUrl, name, description, price);
            };
        };
        reader.readAsDataURL(file);
    }

    function storeProduct(dataUrl, name, description, price) {
        let storedProducts = JSON.parse(localStorage.getItem('storedProducts')) || [];
        if (storedProducts.length >= MAX_IMAGES) {
            storedProducts.shift();  // Remove the oldest product
        }
        storedProducts.push({ dataUrl, name, description, price });
        localStorage.setItem('storedProducts', JSON.stringify(storedProducts));
        displayImages();
    }

    function displayImages() {
        const storedProducts = JSON.parse(localStorage.getItem('storedProducts')) || [];
        const imgContainer = document.getElementById('restaurant-menu');
        imgContainer.innerHTML = ''; // Clear existing images
        storedProducts.forEach(product => {
            imgContainer.innerHTML += 
            `
            <div class="menu-item">
                <img src="${product.dataUrl}" alt="" />
                <div class="title">${product.name}</div>
                <div class="location">${product.description}</div>
                <div class="order flex">
                    <div class="price">${product.price}</div>
                    <a href="#" class="btn btn-menu">Order Now</a>
                </div>
            </div>
            `;
        });
    }
});
