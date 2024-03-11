import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { addItem } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ItemCard = ({ product }) => {
  const dispatch = useDispatch()
  function findfinalprice(item) {
    if (item) {
      return Math.floor(
        item.price - (item.discountPercentage * item.price) / 100
      );
    }
  }
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast.success("Item Added to Cart", {
      duration: 1000,
      position: "bottom-center",
    });
  };
  return (
    <Link href={`/shoppingarea/items/${product?.id}`}>
      <Card className="h-64 w-60 flex flex-col gap-1">
        <div className="group h-2/3 flex justify-center overflow-hidden relative">
          <img
            src={product?.thumbnail}
            alt=""
            className="h-full rounded-t-xl group-hover:scale-105 transition-all duration-200 group-hover:opacity-70"
          />
          <Button className="absolute rounded-none w-full h-10 text-lg -bottom-10 group-hover:bottom-0 transition-all" onClick={(e) => handleCartAddition(product, e)}>
            Add to Cart
          </Button>
        </div>
        <div className="text-base font-medium px-2">{product?.title}</div>
        <div className="px-2 text-red-600 flex gap-3">
          ${findfinalprice(product)}{" "}
          <span className="line-through text-slate-700">${product?.price}</span>
        </div>
      </Card>
    </Link>
  );
};

export default ItemCard;
