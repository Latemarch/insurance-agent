import fs from "fs";
import path from "path";
import ChartContainer from "./compoenents/ChartContainer";
import { Suspense } from "react";
import { useSelector } from "react-redux";

type candles = number[][];
export default async function mocktraiding() {
	const openTime = getRandomInt(100, 1239);
	// const fileNumber = getRandomInt(1, 64);
	// const candles = await fetch(`http://localhost:3000/api/data/${fileNumber}`) //
	// .then((res) => res.json());

	const candles = (await getCandle()) as candles;
	return (
		<section>
			{candles && (
				<Suspense>
					<ChartContainer candles={candles} openTime={openTime} />
				</Suspense>
			)}
		</section>
	);
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getCandle() {
	const filePath = path.join(process.cwd(), "public", "datas", "009.json");
	const fileContents = fs.readFileSync(filePath, "utf8");
	const candles = JSON.parse(fileContents);
	return candles;
}