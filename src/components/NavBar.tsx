"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
	const { data: session } = useSession();
	return (
		<div className="flex mt-2 justify-around">
			<Link href="/">Home</Link>
			<Link href="/mocktrading"> MOCK</Link>
			{session ? (
				<button onClick={() => signOut()}>LogOut</button>
			) : (
				<button onClick={() => signIn()}>LogIn</button>
			)}
		</div>
	);
}
