const addProductModal = document.querySelector('.addProductmodal');
const addProductBtn = document.querySelector('button.AddBtn');
const closeBtn = document.querySelector('.closeBtn');

//select form feilds

const productNameInput = document.querySelector("input[name='productName']");
const productPriceInput = document.querySelector("input[name='productPrice']");
const productCategorySelect = document.querySelector("select[name='productCategory']");
const productDescriptionTextarea = document.querySelector("textarea[name='productDescription']");
const imageUrlInput = document.querySelector("input[name='imageUrl']");
const addProductForm = document.querySelector('.addProductForm');

addProductBtn.addEventListener('click', () => {
    addProductModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    addProductModal.classList.add('hidden');
    // Clear form fields
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategorySelect.value = '';
    productDescriptionTextarea.value = '';
    imageUrlInput.value = '';
});

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Basic Validation check
    if (!productNameInput.value || !productPriceInput.value) {
        alert("Please fill in the required fields.");
        return;
    }

    const newProduct = {
        id: Date.now(), 
        name: productNameInput.value.trim(),
        price: parseFloat(productPriceInput.value),
        category: productCategorySelect.value,
        description: productDescriptionTextarea.value.trim(),
        imageUrl: imageUrlInput.value.trim() || 'https://via.placeholder.com/150' // Fallback image
    };

    // 2. Add to your table/state
    addProduct(newProduct);

    // 3. UI Cleanup
    addProductForm.reset(); // Clears all fields
    
    // 4. Close the modal (assuming you use a 'hidden' class or similar)
    const modal = document.querySelector('.addProductmodal');
    modal.classList.add('hidden'); 
    
    console.log("Product added successfully:", newProduct);
});

const addProduct = async (product) => {
    // Implementation for adding product to the table
    try {
        await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)

        })
        // Add product to the table
        const tableBody = document.querySelector('#productTable tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
               <tr class="border-b">
                <td class="px-4 py-3">${product.id}</td>
                <td class="px-4 py-3">
                    <img
                        src=${product.imageUrl}
                        alt="${product.name}" class="w-16 h-16 object-cover"></td>
                <td class="px-4 py-3">${product.name}</td>
                <td class="px-4 py-3">$${product.price.toFixed(2)}</td>
                <td class="px-4 py-3">${product.category}</td>
                <td class="px-4 py-3">${product.description}</td>
                <td class="px-4 py-3">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded product_id=${product.id}">Edit</button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded product_id=${product.id}">Delete</button>
                </td>
            </tr>
        `;
        tableBody.appendChild(newRow);
    } catch (error) {
        console.error('Error adding product:', error);
    }

};