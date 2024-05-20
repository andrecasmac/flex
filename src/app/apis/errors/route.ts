"use server";

import { NextRequest, NextResponse } from "next/server";
import { urlError } from "./url";
export async function fetchAllErrors() {
    const errors = await fetch(urlError);
    const dataErrors = await errors.json();
    try {
        return NextResponse.json(dataErrors, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export {fetchAllErrors as GET}