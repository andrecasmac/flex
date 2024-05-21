'use server'
import { ProductsT, ErrorList } from "@/app/examples/tables/table/colums";
/*import { fetchAllProducts } from "@/app/apis/products/route";*/
import { fetchAllErrors } from "@/app/apis/errors/route";
/*
export async function getTable(): Promise<ProductsT[]> {
    try {
        const productsData = await fetchAllProducts();
        const dataProducts: ProductsT[] = await productsData.json();
        return dataProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}
*/
export async function getTableError(): Promise<ErrorList[]> {
    try {
        const errorsData = await fetchAllErrors();
        const dataErrors: ErrorList[] = await errorsData.json();
        return dataErrors;
    } catch (error) {
        console.error("Error fetching errors:", error);
        throw error;
    }
}

