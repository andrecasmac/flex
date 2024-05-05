
import { ProductsT } from "@/app/tables/table/colums";
import { fetchAllProducts } from "@/app/apis/products/route";

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

