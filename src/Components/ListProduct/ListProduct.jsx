import React, { useEffect, useState, useContext } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { AdminContext } from '../../Context/AdminContext'

const ListProduct = () => {

	const { apiUrl } = useContext(AdminContext);

	const [allProducts, setAllProducts] = useState(new Map());


	const fetchInfo = async () => {
		// await fetch('http://localhost:4000/all_product')
		await fetch(`${apiUrl}/all_product`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setAllProducts(new Map(data.all_product))
			});
	}

	useEffect(() => {
		fetchInfo();
	}, [])

	// useEffect(() => {
	// console.log(allProducts);
	// }, [allProducts])

	const removeProduct = async (id) => {

		if (!window.confirm('Are you sure?')) return;

		// await fetch('http://localhost:4000/remove_product', {
		await fetch(`${apiUrl}/remove_product`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id })
		}).then((res) => res.json()).then((data) => {
			if (data.success) {
				alert('Product removed successfully');
				fetchInfo();
			} else {
				alert('Failed to remove');
			}
		})
	}

	const searchProduct = async () => {
		const search = document.querySelector('.search-bar input').value;
		if (search === '') {
			alert('Please enter a product name to search');
			return;
		}
		// await fetch('http://localhost:4000/search_product', {
		// 	await fetch(`${apiUrl}/search_product`, {
		// 		method: 'POST',
		// 		headers: {
		// 			Accept: 'application/json',
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({ search: search })
		// 	}).then((res) => res.json()).then((data) => {
		// 		if (data.success) {
		// 			setAllProducts(new Map(data.searched_product));
		// 		} else {
		// 			alert('No product found');
		// 		}
		// 	})


	}


	return (
		<div className='list-product'>
			{/* <h1>All Products List</h1> */}
			{/* <div className='search-bar'>
				<input type='text' placeholder='Search' />
				<button onClick={() => searchProduct()}>Search</button>
			</div> */}
			<div className="listproduct-format-main">
				<p>Product</p>
				<p>Title</p>
				<p className='center'>Retail</p>
				<p className='center'>Sale</p>
				<p className='center'>Category</p>
				<p className='center'>Remove</p>
			</div>
			<div className="listproduct-allproducts">
				<hr />
				{/* // Produt data from API */}
				{
					/*
						allProduct is a MAP. They key is the id of the object, and the value is the object itself.
						We can use the Object.entries() method to get an array of the key-value pairs of the map, and then use the map() method to map over the array.
					*/
					Array.from(allProducts.entries()).map(([key, product]) => {
						console.log(typeof product.inventory);
						return (
							<React.Fragment key={key}>
								<div className="listproduct-format-main listproduct-format">
									<img className='listproduct-product-image' src={product.image} />
									<div className='product-name-sizes'>
										<p>{product.name}</p>
										<p>Available sizes:</p>
										<div className='product-sizes'>
											{
												Object.entries(product.inventory).map(([size, quantity]) => {
													return (
														<p key={size}>{`${size} - ${quantity}`}</p>
													)
												})
											}
										</div>

									</div>
									<p className='center product-price'>{`${product.retail_price ? `\$ ${product.retail_price}` : `-`}`}</p>
									<p className='center product-price'>{`${product.sale_price ? `\$ ${product.sale_price}` : `-`}`}</p>
									<p className='center product-category'>{product.category}</p>
									<div className='product-modify-options'>
										<img onClick={() => { }} className="listproduct-remove-icon" src={cross_icon} />
										<img onClick={() => { removeProduct(product.id) }} className="listproduct-remove-icon" src={cross_icon} />
									</div>
								</div>
								<hr />
							</React.Fragment>
						)
					})
				}

			</div>
		</div>
	)
}

export default ListProduct
