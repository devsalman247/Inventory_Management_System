import ItemService from "../services/Item.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

const {
	createItem,
	updateItem,
	deleteItem,
	getAllItems,
	getItemById,
	requestItems,
	issueItem,
	getAllIssuedItems,
	getIssuedItemById,
	updateIssuedItem,
} = ItemService;

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
	if (!item.name || !item.issued || item.stock === undefined) {
		return next(new BadRequestResponse("Please provide all required fields"));
	}
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
	updateItem(id, item)
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

const ItemRequest = async (req, res, next) => {
	const items = req.body;
	requestItems(req.user.id, items)
		.then((isRequestSent) => {
			if (isRequestSent) return next(new OkResponse("Request sent successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemIssue = async (req, res, next) => {
	const item = req.body;
	issueItem(item)
		.then((item) => {
			return next(new OkResponse(item));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemUpdateIssued = async (req, res, next) => {};

const ItemGetAllIssued = async (req, res, next) => {
	getAllIssuedItems()
		.then((items) => {
			return next(new OkResponse(items));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemGetIssuedById = async (req, res, next) => {
	const { id } = req.params;
	getIssuedItemById(id)
		.then((item) => {
			return next(new OkResponse(item));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemController = {
	// Items Controller
	ItemGetAll,
	ItemGetById,
	ItemCreate,
	ItemUpdate,
	ItemDelete,
	ItemRequest,
	// Issued Items Controller
	ItemIssue,
	ItemGetAllIssued,
	ItemGetIssuedById,
	ItemUpdateIssued,
};

export default ItemController;
