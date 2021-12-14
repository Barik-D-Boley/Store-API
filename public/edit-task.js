const productIDDOM = document.querySelector('.product-edit-id');
const productNameDOM = document.querySelector('.product-edit-name');
const productCompleteDOM = document.querySelector('.product-edit-completed');
const editFormDOM = document.querySelector('.single-product-form');
const editBtnDOM = document.querySelector('.product-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showProduct = async () => {
    try {
        const { data: {product}, } = await axios.get(`/api/v1/products/${id}`);
        const { _id: productID, completed, name } = product;

        productIDDOM.textContent = productID;
        productNameDOM.value = name;
        tempName = name;

        if (completed) productCompleteDOM.checked = true;
    } catch (error) {
        console.log(error);
    }
}
showProduct();

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...';
    e.preventDefault();
    try {
        const productName = productNameDOM.value;
        const productCompleted = productCompleteDOM.checked;

        const { data: {products}, } = await axios.patch(`/api/v1/products/${id}`, {
            name: productName, completed: productCompleted
        })

        const { _id: productID, completed, name } = products;
        productIDDOM.textContent = productID;
        tempName = name;

        if (completed) productCompleteDOM.checked = true;
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Successfully edited product';
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        console.error(error);
        productNameDOM.value = tempName;
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = 'Error, please try again'
    }
    editBtnDOM.textContent = 'Edit';
    setTimeout(() => {
        formAlertDOM.style.display = 'name';
        formAlertDOM.classList.remove('text-success');
    }, 3000)
})