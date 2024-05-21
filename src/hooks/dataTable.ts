'use server'
import { ErrorList } from "@/app/examples/tables/table/colums";
import {promises as fs} from 'fs'
/*import { fetchAllProducts } from "@/app/apis/products/route";
import { fetchAllErrors } from "@/app/apis/errors/route";

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

/*Function to read the JSON, parse it and then return it in an object*/
export async function getTableError(): Promise<ErrorList[]> {
    try {
        const file = await fs.readFile(process.cwd() + '/src/app/examples/modal/modalErrorData.json', 'utf8');
        const dataErrors: ErrorList[] = await JSON.parse(file);
        return dataErrors;
    } catch (error) {
        console.error("Error fetching errors:", error);
        throw error;
    }
}
