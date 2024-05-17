"use server";

import { NextRequest, NextResponse } from "next/server";
import { url } from "./ulr";

export async function fetchAllProducts() {
    const products = await fetch(url);
    const dataProducts = await products.json();
    try {
        return NextResponse.json(dataProducts, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export { fetchAllProducts as GET }
