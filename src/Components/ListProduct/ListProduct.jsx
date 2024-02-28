import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

	const [allProducts, setAllProducts] = useState(new Map());

	const fetchInfo = async () => {
		await fetch('http://localhost:4000/all_product')
			.then((res) => res.json())
			.then((data) => {
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

		await fetch('http://localhost:4000/remove_product', {
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


	return (
		<div className='list-product'>
			<h1>All Products List</h1>
			<div className="listproduct-format-main">
				<p>Product</p>
				<p>Title</p>
				<p>Retail</p>
				<p>Sale</p>
				<p>Category</p>
				<p>Remove</p>
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
						// console.log( product);
						return (
							<React.Fragment key={key}>
								<div className="listproduct-format-main listproduct-format">
									<img className='listproduct-product-image' src={product.image} />
									<p>{product.name}</p>
									<p>{`${product.retail_price ? `\$ ${product.retail_price}` : `-`}`}</p>
									<p>{`${product.sale_price ? `\$ ${product.sale_price}` : `-`}`}</p>
									<p>{product.category}</p>
									<img onClick={() => { removeProduct(product.id) }} className="listproduct-remove-icon" src={cross_icon} />
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
