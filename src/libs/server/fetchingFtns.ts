const domain = process.env.NEXT_PUBLIC_API_URL;
export const getUserBalance = async () => {
	const res = await fetch(`${domain}/api/user/balance`, { cache: "no-store" });
	if (!res.ok) {
		const message = await res.text();
		console.error("API error:", message);
	}
	const data = await res.json();
	return data.data.balance;
};

export const getCandles = async (fileNumber: string) => {
	let candles: number[][];
	try {
		candles = await fetch(`${domain}/api/data/${fileNumber}`)
			.then((res) => res.json())
			.then((data) => data.data);
	} catch (e) {
		console.error("Error fetching data(candles):", e);
		candles = [[1627862460.562, 39832.5, 39844.5, 39748.5, 39784, 16173063]];
	}
	return candles;
};
