import React, { useState, useContext, useRef } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { AdminContext } from '../../Context/AdminContext'

const AddProduct = () => {

	const { apiUrl } = useContext(AdminContext);
	const [image, setImage] = useState(false);
	const allowAdd = useRef(true);
	const [productDetails, setProductDetails] = useState({
		name: '',
		image: '',
		category: '',
		// description: '',
		retail_price: '',
		sale_price: '',
		// xs: 70,
		// s: 0,
		// m: 0,
		// l: 0,
		// xl: 0,
		// xxl: 0
		// inventory: {
		// 	xs: 70,
		// 	s: 0,
		// 	m: 0,
		// 	l: 0,
		// 	xl: 0,
		// 	xxl: 0
		// }
	})

	const imageHandler = (e) => {
		// setImage(URL.createObjectURL(e.target.files[0]));
		setImage(e.target.files[0]);
	}

	const changeHandler = (e) => {
		console.log(e.target.name, e.target.value);
		if (e.target.name === 'retail_price' || e.target.name === 'sale_price') {
			if (e.target.value > 1000000) return;
		}
		if (e.target.name.startsWith('inventory-')) {
			const size = e.target.name.split('-')[1]; // get the size from the name
			if (e.target.value > 99999) return;
			setProductDetails(prevDetails => ({
				...prevDetails,
				[size]: e.target.value
			}))
		} else {
			setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
		}
		// if (e.target.name.startsWith('inventory-')) {
		// 	const size = e.target.name.split('-')[1]; // get the size from the name
		// 	if (e.target.value > 99999) return;
		// 	setProductDetails(prevDetails => ({
		// 		...prevDetails,
		// 		inventory: {
		// 			...prevDetails.inventory,
		// 			[size]: e.target.value
		// 		}
		// 	}));
		// } else {
		// 	setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
		// }

	}

	// Link logic to backend
	const addProduct = async () => {

		if (!allowAdd.current) return;

		console.log(productDetails);

		if (!image) {
			return alert('Please select an image');
		}

		let responseData;
		let product = productDetails;

		let formData = new FormData();
		formData.append('product', image);

		// console.log(formData)

		// console.log(...formData);
		// new Response(formData).text().then(console.log) // To see the entire raw body

		if (!product.name || !product.retail_price || !product.category) {
			// return alert('Please fill all the fields');
			return
		}

		if (isNaN(product.retail_price) || isNaN(product.sale_price)) {
			// return alert('Please enter valid price');
			return
		}

		allowAdd.current = false;
		console.log('adding product');

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
					// setProductDetails({ name: '', image: '', category: '', retail_price: '', sale_price: '' });
					// setImage(false);
				} else {
					alert('Failed')

				}
			})
		}


		setTimeout(() => {
			allowAdd.current = true;
		}, 2000)


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
			<div className="addproduct-itemfield">
				<p>Product Description</p>
				<textarea className="addproduct-textarea" placeholder="Type description here"></textarea>
				<button>fetch description</button>
			</div>
			<div className="addproduct-itemsizes">
				<p>Product Sizes</p>
				<div className="addproduct-sizes">
					<div className="addproduct-size">
						<p>XS</p>
						<input value={productDetails.xs} onChange={changeHandler} type='text' inputMode='Numeric' name='inventory-xs'
							placeholder='0' onInput={(event) => {
								// Replace with digits only
								event.target.value = event.target.value.replace(/[^0-9]/g, '');
							}} />
					</div>
					<div className="addproduct-size">
						<p>S</p>
						<input value={productDetails.s} onChange={changeHandler} type='text' inputMode='Numeric' name='inventory-s'
							placeholder='0' onInput={(event) => {
								event.target.value = event.target.value.replace(/[^0-9]/g, '');
							}} />
					</div>
					<div className="addproduct-size">
						<p>M</p>
						<input value={productDetails.m} onChange={changeHandler} type='text' inputMode='Numeric' name='inventory-m'
							placeholder='0' onInput={(event) => {
								event.target.value = event.target.value.replace(/[^0-9]/g, '');
							}} />
					</div>
					<div className="addproduct-size">
						<p>L</p>
						<input value={productDetails.l} onChange={changeHandler} type='text' inputMode='Numeric' name='inventory-l'
							placeholder='0' onInput={(event) => {
								event.target.value = event.target.value.replace(/[^0-9]/g, '');
							}} />
					</div>
					<div className="addproduct-size">
						<p>XL</p>
						<input value={productDetails.xl} onChange={changeHandler} type='text' inputMode='Numeric' name='inventory-xl'
							placeholder='0' onInput={(event) => {
								event.target.value = event.target.value.replace(/[^0-9]/g, '');
							}} />
					</div>
				</div>
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
