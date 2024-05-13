"use server";

import { NextRequest, NextResponse } from "next/server";
import { url } from './../../ulr'

export async function fetchProductsPerID(req: NextRequest, { params }: { params: any }) {

    const product = await fetch(`${url}/${params.id}`);
    const dataProduct = await product.json();

    try {
        return NextResponse.json(dataProduct, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export { fetchProductsPerID as GET }
