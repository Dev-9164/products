import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Product } from "src/shared/model/product.model";

export type PaginatorCofiguration = {
    first: number,
    row: number,
    page: number,
}

export type Loaders = {
    isFetchingProducts: boolean,
    isPageRefreshing: boolean,
    isProductDeletionInProgress: boolean
}



@Injectable({ providedIn: 'root' })

export class HomeComponentService {
    private http = inject(HttpClient);

    updateProductStream: Subject<Product> = new Subject();
    updateProductObservable$: Observable<Product> = this.updateProductStream.asObservable();


    getProductDetails(): Observable<any> {
        return this.http.get('https://fakestoreapi.com/products');
    }


    deleteProduct(productId: number): Observable<any> {
        return this.http.delete(`https://fakestoreapi.com/products/${productId}`)
    }

    updateProduct(productId: number): Observable<any> {
        return this.http.put(`https://fakestoreapi.com/products/${productId}`, {});
    }
}