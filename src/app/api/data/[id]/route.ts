import client from "@/libs/client/client";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params: { id } }: { params: { id: string } }
) {
	console.log(id);
	const data = await client.btcusd.findUnique({
		where: {
			id: Number(id),
		},
	});

	return NextResponse.json(data);
}
