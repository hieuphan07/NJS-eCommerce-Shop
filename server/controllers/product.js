const mongoose = require('mongoose');

const Product = require('../models/product.js');
const Order = require('../models/order.js');
const { sendEmail } = require('../utils/sendEmail.js');

exports.getProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (err) {
		next(err);
	}
};

exports.getProduct = async (req, res, next) => {
	const productId = req.params.productId;
	try {
		const product = await Product.findById(productId);
		if (product) {
			return res.status(200).json(product);
		} else {
			return res.status(200).json({ error: { message: 'No product founds.' } });
		}
	} catch (err) {
		next(err);
	}
};

exports.postOrder = async (req, res, next) => {
	const order = req.body;
	const parsedItems = order.items.map((item) => {
		return {
			...item,
			productId: new mongoose.Types.ObjectId(item._id),
			quantity: Number(item.quantity),
			amount: Number(item.amount),
		};
	});
	const parsedOrder = { ...order, items: parsedItems };
	try {
		const newOrder = new Order(parsedOrder);
		await newOrder.save();
		const recentOrder = await Order.findOne({ _id: newOrder._id }).populate({
			path: 'items',
			populate: { path: 'productId' },
		});
		sendEmail(order.contact.email, recentOrder);
		return res.status(201).json({ message: 'Order sent', newOrder });
	} catch (err) {
		return next(err);
	}
};

// render ordered products
exports.getOrderedProducts = async (req, res, next) => {
	try {
		const order = await Order.findOne({
			_id: '66432ceeeda27cdd9038d21c',
		}).populate({ path: 'items', populate: { path: 'productId' } });

		const parsedItems = order.items.map((item) => {
			return {
				productId: {
					...item.productId._doc,
					price:
						Number(item.productId.price).toLocaleString('en', {
							useGrouping: true,
						}) +
						' ' +
						'VND',
				},
				amount:
					Number(item.amount).toLocaleString('en', { useGrouping: true }) +
					' ' +
					'VND',
				quantity: Number(item.quantity),
			};
		});
		const parsedOrder = {
			...order._doc,
			items: parsedItems,
			total:
				Number(order._doc.total).toLocaleString('en', {
					useGrouping: true,
				}) +
				' ' +
				'VND',
		};
		return res.render('ordered-products.ejs', { order: parsedOrder });
	} catch (err) {
		console.log(err);
		next(err);
	}
};

exports.getOrder = async (req, res, next) => {
	const userId = req.session.user._id;
	const orderByUser = await Order.find({ userId: userId });
	if (orderByUser) {
		return res.status(200).json(orderByUser);
	}
};
