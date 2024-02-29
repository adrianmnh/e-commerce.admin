import React, { createContext, useEffect, useState } from 'react'

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {

	const apiUrl = import.meta.env.VITE_APP_API_URL;
	// const apiUrl = "http://localhost:4000";

	console.log(apiUrl);

	// const [allProducts, setAllProducts] = useState(new Map());

	// const fetchInfo = async () => {
	// 	await fetch('http://localhost:4000/all_product')
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setAllProducts(new Map(data.all_product))
	// 		});
	// }

	// useEffect(() => {
	// 	fetchInfo();
	// }, [])

	// const removeProduct = async (id) => {

	// 	if (!window.confirm('Are you sure?')) return;

	// 	await fetch('http://localhost:4000/remove_product', {
	// 		method: 'DELETE',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ id: id })
	// 	}).then((res) => res.json()).then((data) => {
	// 		if (data.success) {
	// 			alert('Product removed successfully');
	// 			fetchInfo();
	// 		} else {
	// 			alert('Failed to remove');
	// 		}
	// 	})
	// }

	const contextValue = {
		apiUrl
		// allProducts,
		// removeProduct
	}

	return (
		<AdminContext.Provider value={contextValue}>
			{props.children}
		</AdminContext.Provider>
	)
}

export default AdminContextProvider