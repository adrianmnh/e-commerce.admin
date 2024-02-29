import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { AdminContext } from '../../Context/AdminContext'

const AddProduct = () => {

	const { apiUrl } = React.useContext(AdminContext);
	const [image, setImage] = useState(false);
	const [productDetails, setProductDetails] = useState({
		name: '',
		image: '',
		category: '',
		retail_price: '',
		sale_price: ''
	})

	const imageHandler = (e) => {
		// setImage(URL.createObjectURL(e.target.files[0]));
		setImage(e.target.files[0]);
	}

	const changeHandler = (e) => {
		if(e.target.name === 'retail_price' || e.target.name === 'sale_price') {
			if( e.target.value > 10000000 ) return;
		}

		setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
		// console.log(productDetails);
	}

	// Link logic to backend
	const addProduct = async () => {
		console.log(productDetails);

		let responseData;
		let product = productDetails;

		let formData = new FormData();
		formData.append('product', image);

		console.log(formData)

		// console.log(...formData);
		// new Response(formData).text().then(console.log) // To see the entire raw body

		if (!product.name || !product.retail_price || !product.category) return alert('Please fill all the fields');

		if (isNaN(product.retail_price) || isNaN(product.sale_price)) return alert('Please enter valid price');

		// await fetch('http://localhost:4000/upload', {
		await fetch(`${apiUrl}/upload`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
			},
			body: formData,
		}).then((res) => res.json()).then((data) => responseData = data)

		// for( let key in responseData ) {
		// 	console.log(key, responseData[key]);
		// }

		console.log(product.sale_price)


		// If True image has been saved in multer storage
		if (responseData.success) {
			product.image = responseData.image_url;
			console.log(product);

			// await fetch('http://localhost:4000/add_product', {
			await fetch(`${apiUrl}/add_product`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			}).then((res) => res.json()).then((data) => {
				// console.log(data);
				if (data.success) {
					alert('Product added successfully')
					// Clear the form data
					setProductDetails({ name: '', image: '', category: '', retail_price: '', sale_price: '' });
					setImage(false);
				} else {
					alert('Failed')

				}
			})
		}

		// console.log(product);
	}


	return (
		<div className='add-product'>
			<div className='addproduct-itemfield'>
				<p>Product name</p>
				<input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type name here' />
			</div>
			<div className='addproduct-price'>
				<div className='addproduct-itemfield'>
					<p>Retail Price</p>
					<div className="price-input-wrapper">
						<span>$</span>
						<input className='price-input' value={productDetails.retail_price} onChange={changeHandler}
								type='text' inputMode='numeric' name='retail_price' placeholder='0' pattern="[0-9]*"
								onInput={(event) => {
									// Replace non-digit characters with nothing, except for a single decimal point
									event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
									// If there are more than two digits after the decimal point, remove them
									event.target.value = event.target.value.replace(/(\.\d{2})./g, '$1');
								  }} />
					</div>
				</div>
				<div className='addproduct-itemfield'>
					<p>Offer price</p>
					<div className="price-input-wrapper">
						<span>$</span>
						<input className='price-input' value={productDetails.sale_price} onChange={changeHandler}
								type='text' inputMode='Numeric' name='sale_price' placeholder='0' pattern="[0-9]*"
								onInput={(event) => {
									// Replace non-digit characters with nothing, except for a single decimal point
									event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
									// If there are more than two digits after the decimal point, remove them
									event.target.value = event.target.value.replace(/(\.\d{2})./g, '$1');
								  }} />
					</div>
				</div>
			</div>
			<div className='addproduct-itemfield'>
				<p>Product Category</p>
				<select value={productDetails.category} onChange={changeHandler} name='category' className='addproduct-selector' >
					<option value=''>------</option>
					<option value='women'>Women</option>
					<option value='men'>Men</option>
					<option value='kids'>Kids</option>
				</select>
			</div>
			<div className='addproduct-itemfield'>
				<label htmlFor='file-input'>
					<img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' />
				</label>
				<input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
			</div>
			<button onClick={addProduct} className="addproduct-btn">ADD</button>
		</div>

	)
}

export default AddProduct
