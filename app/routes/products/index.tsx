import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import type {MetaFunction, LinksFunction } from "remix";
import { Link, useLoaderData } from 'remix';
import { getProducts } from "~/services/products";
import { getProductTags } from "~/services/productTag";
import stylesUrl from "~/styles/products/products.css";

export let meta: MetaFunction = () => {
  return {
    title: "Products"
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader = async () => {
    let tags = await getProductTags();
    let products = await getProducts();
    
    return {
        products,
        tags
    }
    
}

let editButton = () =>{
    return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 30 30" width="30" height="30">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"/>
            </svg>
    );
}

let deleteButton = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 30 30" width="30" height="30">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"/>
        </svg>
    )
}

let addButton = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
        </svg>
    )
}


export default function Index() {
    let loader = useLoaderData();
    return (
        <div className="products">
            <h1>
                Products
            </h1>
            <p>Our little tests db.</p>
            <table>
               <tbody>
                    <tr>
                        <th className="column-name">Product name</th>
                        <th className="column-tags">tags</th>
                        <th colSpan={2} className="add-button">{addButton()}</th>
                    </tr>
                    {loader.products.map((product: { id: string; name: string; tags: string[];}) => (
                        <tr key={product.id}>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {loader.tags.map((tag: {id: string; name: string}) => {
                                    if (product.tags.includes(tag.id))
                                        return tag.name
                                        return ""
                                })}
                            </td>
                            <td className="delete-button">
                                {deleteButton()}
                            </td>
                            <td className="edit-button">
                                {editButton()}
                            </td>
                        </tr>
                    ))}
               </tbody>
            </table>
        </div>
        
    );
}
