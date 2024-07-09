let addBtn = document.querySelector('#addproductbtn');
const uploadBtn = document.querySelector('.btn');
if (addBtn){ 
    addBtn.addEventListener('click', () => {
        let formContainer = document.querySelector('#formContainer');
        if (formContainer.classList.contains('hidden') ) {
            formContainer.classList.remove('hidden');
        } else {
            formContainer.classList.add('hidden');
        }
    });
}
if (uploadBtn){ 
    uploadBtn.addEventListener('click', () => {
        let formContainer = document.querySelector('#formContainer');
        if (formContainer.classList.contains('hidden')) {
            formContainer.classList.remove('hidden');
        } else {
            formContainer.classList.add('hidden');
        }

    });
}
uploadBtn.addEventListener('click', () => {
    const fileInput = document.querySelector('#pic');
    uploadBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem('uploadedImage', reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a file first.');
        }
    });
});
window.addEventListener('load', () => {
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
        const imgadd = document.getElementById('main');
        imgadd.innerHTML =  `<div class="card">
        <img  src='${storedImage}' id="addimage" alt="Uploaded Image" style="width:20%;">
    </div>`
    }
});
