import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// const session = getServerSession();
	// if (!session) {
	// 	return new Response("Unauthorized", { status: 401 });
	// }
	return NextResponse.redirect(new URL("/mocktrading", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/",
};
