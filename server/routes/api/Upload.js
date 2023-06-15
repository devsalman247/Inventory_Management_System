import { Router } from "express";
const router = Router();
import fs from "fs";
import path from "path";

import environment from "../../config/env/index.js";
import multer from "../../utils/multer.js";
const cpUpload = multer.fields([{ name: "file", maxCount: 1 }]);

router.post("/", cpUpload, function (req, res, next) {
	return res.json({ url: `${environment.backend}/uploads/${req.files["file"][0].filename}` });
});

router.post("/delete", function (req, res, next) {
	if (req.body.url) {
		fs.unlink(path.join(process.cwd(), "server/public", req.body.url), function (err) {
			if (err) {
				return res.sendStatus(204);
			}
			// if no error, file has been deleted successfully
			return res.json({ status: 200, event: "File deleted Successfully" });
		});
	} else {
		if (!event) return res.sendStatus(204);
	}
	// unlink the files
});

export default router;
