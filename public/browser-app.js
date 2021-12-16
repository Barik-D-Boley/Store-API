const productsDOM = document.querySelector('.products');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.product-form');

const nameInputDOM = document.querySelector('.name-input');
const priceInputDOM = document.querySelector('.price-input');
const ratingInputDOM = document.querySelector('.rating-input');
const companyInputDOM = document.querySelector('.company-input');
const featuredInputDOM = document.querySelector('.featured-input');

const formAlertDOM = document.querySelector('.form-alert');

// Loading products from api/products
const showProducts = async () => {
    loadingDOM.style.visibility = 'visible';
    try {
        const { data: {products}, } = await axios.get('/api/v1/products');

        if (products.length < 1) {
            productsDOM.innerHTML = `<h5 class='empty-list'>No products in your list</h5>`;
            loadingDOM.style.visibility = 'hidden';
            return;
        }
        const allProducts = products.map((product) => {
            const { _id: productID, name, price, rating, company, featured } = product;
            
            return `<div class='single-product'>
                        <h5>${name}</h5>
                        <ul>
                            <li>$${price}</li>
                            <li>${rating}/5</li>
                            <li>${company}</li>
                            <li>${featured ? 'Featured' : 'Not Featured'}</li>
                        </ul>

                        <div class='product-links'>
                            <!-- Edit Link -->
                            <a href='edit-product.html?id=${productID}' class='edit-link'>
                                <i class='fas fa-edit'></i>
                            </a>

                            <!-- Delete btn -->
                            <button type='button' class='delete-btn' data-id='${productID}'>
                                <i class='fas fa-trash'></i>
                            </button>
                        </div>
                    </div>`;
        }).join('');
        productsDOM.innerHTML = allProducts;
    } catch (error) { productsDOM.innerHTML = `<h5 class='empty-list'>There was an error, please try again later... ${error}</h5>` }
    loadingDOM.style.visibility = 'hidden';
}

showProducts();

// Delete Products /api/products/:id

productsDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible';
        const id = el.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/products/${id}`);
            showProducts();
        } catch (error) { console.log(error) }
    }
    loadingDOM.style.visibility = 'hidden';
})

// Form
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the submit button from refreshing the page

    const name = nameInputDOM.value;
    const price = priceInputDOM.value;
    const rating = ratingInputDOM.value;
    const company = companyInputDOM.value;
    const featured = featuredInputDOM.checked;

    try {
        await axios.post('/api/v1/products', { name, price, rating, company, featured });
        showProducts();
        productInputDOM.value = '';
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Successfully added product';
        formAlertDOM.classList.add('text-success');
    } catch (error) {
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = 'An error occurred, please try again.'
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success');
    }, 3000)
})