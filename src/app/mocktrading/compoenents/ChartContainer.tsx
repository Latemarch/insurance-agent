"use client";
import { useEffect, useState } from "react";
import CandleChart from "./CandleChart";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "@/redux/slices/priceSlice";
import Modal from "./Modal";
import { Session } from "next-auth";
import { setBalance } from "@/redux/slices/walletSlice";
import { getUserBalance } from "@/libs/server/fetchingFtns";
import usePost from "@/hooks/usePost";

type Props = {
	candles: number[][];
	openTime: number;
};
export default function ChartContainer({ candles, openTime }: Props) {
	const [startPoint, setStartPoint] = useState(openTime);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [count, setCount] = useState(20);
	const [updateBalance] = usePost("/api/user/balance");
	const { wallet } = useSelector((state: any) => state.wallet);
	const dispatch = useDispatch();

	const candleObj = candles.map((candle, idx) => ({
		x: idx + 1 - openTime,
		y: [
			candle[1].toFixed(0),
			candle[2].toFixed(0),
			candle[3].toFixed(0),
			candle[4].toFixed(0),
		],
	}));
	const data = candleObj.slice(startPoint, startPoint + 40);
	const price = Number(data[data.length - 1].y[3]);

	const handleClick = () => {
		setStartPoint((prev) => prev + 1);
		setCount((prev) => prev - 1);
	};
	useEffect(() => {
		dispatch(setPrice(price));
		if (count === 0) {
			setIsModalOpen(true);
			updateBalance(wallet.balance);
		}
	}, [count]);

	useEffect(() => {
		const fetchData = async () => {
			const initialBalance = await getUserBalance();
			console.log(initialBalance);
			if (initialBalance && initialBalance > 90) {
				dispatch(setBalance(initialBalance));
			}
		};
		fetchData();
	}, []);
	return (
		<section className="w-full md:h-48">
			<Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
			<CandleChart data={data} />
			<div className="flex flex-col gap-2 justify-around">
				<div className="flex gap-2">
					<div className="flex flex-col items-start p-2 justify-between h-16 w-1/2 bg-blue-200 text-sm">
						<div className="flex justify-between w-full px-2">
							<p>Current Price :</p>
							<p>${price}</p>
						</div>
						<div className="flex justify-between w-full px-2">
							<p>Leverage :</p>
							<p>{"x1"}</p>
						</div>
					</div>
					<button
						className="flex flex-col items-center justify-center h-16 w-1/2 bg-gray-600 rounded-xl text-2xl text-gray-200"
						onClick={handleClick}
					>
						NEXT({count})
					</button>
				</div>
			</div>
		</section>
	);
}
