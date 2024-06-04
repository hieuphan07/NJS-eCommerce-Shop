export async function action({ request, params }) {
	const { productId } = params;
	console.log('Clicked delete button');
	const isConfirm = window.confirm('Are you sure to delete this item?');
	if (isConfirm) {
		const response = await fetch(
			`http://localhost:5500/products/${productId}`,
			{
				method: 'DELETE',
				credentials: 'include',
			}
		);
		if (!response.ok) {
			throw new Error('Something went wrong, cannot delete this item');
		}
		return response;
	}
}
