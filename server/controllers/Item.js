import ItemService from "../services/Item.js";
import { OkResponse, BadRequestResponse, UnauthorizedResponse } from "express-http-response";

const {
	createItem,
	updateItem,
	deleteItem,
	getAllItems,
	getItemById,
	requestItem,
	cancelRequest,
	approveRequest,
	rejectRequest,
	rejectRequests,
	approveRequests,
	returnItemRequest,
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
	if (!item.name || !item.stock || item.stock === undefined) {
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
	if (!req.body.item) return next(new BadRequestResponse("Please provide all required fields"));
	requestItem(req.user.id, req.body.item)
		.then((isRequestSent) => {
			if (isRequestSent) return next(new OkResponse("Request sent successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const CancelRequest = async (req, res, next) => {
	const { id } = req.params;
	cancelRequest(id)
		.then((isRequestCancelled) => {
			if (isRequestCancelled) return next(new OkResponse("Request cancelled successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ApproveRequest = async (req, res, next) => {
	if (req.user.role !== "store-keeper")
		return next(new UnauthorizedResponse("You are not authorized to perform this action"));
	const { id } = req.params;
	approveRequest(id)
		.then((isRequestApproved) => {
			if (isRequestApproved) return next(new OkResponse("Request approved successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const RejectRequest = async (req, res, next) => {
	if (req.user.role !== "store-keeper")
		return next(new UnauthorizedResponse("You are not authorized to perform this action"));
	const { id } = req.params;
	rejectRequest(id)
		.then((isRequestRejected) => {
			if (isRequestRejected) return next(new OkResponse("Request rejected successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const RejectRequests = async (req, res, next) => {
	if (req.user.role !== "store-keeper")
		return next(new UnauthorizedResponse("You are not authorized to perform this action"));
	const { ids } = req.body;
	rejectRequests(ids)
		.then((isRequestRejected) => {
			if (isRequestRejected) return next(new OkResponse("Request rejected successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ApproveRequests = async (req, res, next) => {
	if (req.user.role !== "store-keeper")
		return next(new UnauthorizedResponse("You are not authorized to perform this action"));
	const { ids } = req.body;
	approveRequests(ids)
		.then((isRequestApproved) => {
			if (isRequestApproved) return next(new OkResponse("Request approved successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemReturnRequest = async (req, res, next) => {
	if (!req.params.id) return next(new BadRequestResponse("Please provide all required fields"));
	returnItemRequest(req.params.id)
		.then((isRequestSent) => {
			if (isRequestSent) return next(new OkResponse("Request sent successfully"));
		})
		.catch((err) => {
			return next(new BadRequestResponse(err));
		});
};

const ItemIssue = async (req, res, next) => {
	const { reqId, item } = req.body;
	issueItem(item, reqId)
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
	CancelRequest,
	ApproveRequest,
	RejectRequest,
	RejectRequests,
	ApproveRequests,
	ItemReturnRequest,
	// Issued Items Controller
	ItemIssue,
	ItemGetAllIssued,
	ItemGetIssuedById,
	ItemUpdateIssued,
};

export default ItemController;
