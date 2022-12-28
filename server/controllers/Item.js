import ItemService from "../services/Item.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

const { createItem, getAllItems, getItemById, issueItem, getAllIssuedItems, getIssuedItemById, updateIssuedItem } =
	ItemService;

const ItemGetAll = async (req, res, next) => {
	getAllItems()
		.then((items) => {
			return next(new OkResponse(items));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemGetById = async (req, res, next) => {
	const { id } = req.params;
	getItemById(id)
		.then((item) => {
			return next(new OkResponse(item));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemCreate = async (req, res, next) => {
	const item = req.body;
	createItem(item)
		.then((item) => {
			return next(new OkResponse(item));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemUpdate = async (req, res, next) => {
	const { id } = req.params;
	const item = req.body;
	updateIssuedItem(id, item)
		.then((item) => {
			return next(new OkResponse(item));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemDelete = async (req, res, next) => {
	const { id } = req.params;
	deleteItem(id)
		.then((item) => {
			return next(new OkResponse(item));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemController = { ItemGetAll, ItemGetById, ItemCreate, ItemUpdate, ItemDelete };

export default ItemController;
