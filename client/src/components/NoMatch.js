import { Link } from "react-router-dom";

function NoMatch() {
	return (
		<div className="uppercase flex flex-col justify-start items-center">
			<div className="text-sky-800 text-xl">Page Not Found</div>
			<Link to="/" className="underline mt-2">
				Back to Home
			</Link>
		</div>
	);
}

export default NoMatch;
