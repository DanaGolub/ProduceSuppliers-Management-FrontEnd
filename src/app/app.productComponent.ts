import { Component } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
const BASE_URL_PRODUCTS = 'https://localhost:44384/api/Produce';
const BASE_URL_SUPPLIERS = 'https://localhost:44384/api/Supplier';
const BASE_URL_PRODUCT_SUPPLIERS = 'https://localhost:44384/api/ProduceSupplier';



@Component({
    selector: 'addProductForm',
    templateUrl: './app.productComponent.html',
    styleUrls: ['./app.productComponent.css']
})

export class productComponent {
    displayedColumns: string[] = ['Product ID', 'Product Name', ''];
    _productsArray: Array<any>;
    _suppliersArray: Array<any>;
    _productSuppliersArray: Array<any>;
    _errorMessage: String = "";
    _singleProductName: string = "";
    _singleProductNumber: number = 0;
    _singleSupplierName: string = "";
    _singleSupplierNumber: number = 0;
    _editableDescription: String = "";
    _editableSupplierName: String = "";
    _editPrId: Number = 0;
    _editSupplId: Number = 0;
    _editQuantity: Number;
    _prodID: Number;
    _supplID: Number;
    _prodSupplQty: Number;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        console.log("------------------------------------------------");
        console.log("getAllProducts base url ==> [get<any>] " + BASE_URL_PRODUCTS);
        // OBTAINING PRODUCTS LIST
        let urlProd = BASE_URL_PRODUCTS
        this.http.get<any>(urlProd).subscribe(data => {
            // Get data and wait for result.            
            this._productsArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
        },
            error => {
                // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
            })
        // OBTAINING SUPPLIERS LIST
        let urlSuppl = BASE_URL_SUPPLIERS
        this.http.get<any>(urlSuppl).subscribe(data => {
            // Get data and wait for result.            
            this._suppliersArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
        },
            error => {
                // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
            })

        // OBTAINING PRODUCT-SUPPLIERS LIST
        let urlProdSuppl = BASE_URL_PRODUCT_SUPPLIERS
        this.http.get<any>(urlProdSuppl).subscribe(data => {
            // Get data and wait for result.            
            this._productSuppliersArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
        },
            error => {
                // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
            })

    }
    //GET ALL REQUESTS /////////////////////////////////////////////////////////////////////////////////////////////
    getAllProducts() {
        console.log("------------------------------------------------");
        console.log("getAllProducts base url ==> [get<any>] " + BASE_URL_PRODUCTS);

        let url = BASE_URL_PRODUCTS
        this.http.get<any>(url).subscribe(data => {
            // Get data and wait for result.            
            this._productsArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
        },
            error => {
                // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
            })
    }

    getAllSuppliers() {
        console.log("------------------------------------------------");
        console.log("getAllSuppliers base url ==> [get<any>] " + BASE_URL_SUPPLIERS);

        let url = BASE_URL_SUPPLIERS
        this.http.get<any>(url).subscribe(data => {
            // Get data and wait for result.            
            this._suppliersArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
        },
            error => {
                // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
            })
    }
    getAllProductSuppliers() {
        console.log("------------------------------------------------");
        console.log("getAllSuppliers base url ==> [get<any>] " + BASE_URL_PRODUCT_SUPPLIERS);

        let url = BASE_URL_PRODUCT_SUPPLIERS
        this.http.get<any>(url).subscribe(data => {
            // Get data and wait for result.            
            this._productSuppliersArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
        },
            error => {
                // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
            })
    }
    //GET BY ID REQUESTS /////////////////////////////////////////////////////////////////////////////////////////////
    getProduct(id) {
        console.log("------------------------------------------------");
        console.log("getProduct base url ==> [get] " + BASE_URL_PRODUCTS + id);

        // console.log(id)
        let url = BASE_URL_PRODUCTS + "/" + id;
        this.http.get<any>(url)
            // Get data and wait for result.
            .subscribe(result => {
                this._singleProductName = result.description;
                this._singleProductNumber = result.produceID;
            },
                error => {
                    // Let user know about the error.
                    this._errorMessage = JSON.stringify(error);
                })
    }
    getSupplier(id) {
        console.log("------------------------------------------------");
        console.log("getProduct base url ==> [get] " + BASE_URL_SUPPLIERS + id);

        let url = BASE_URL_SUPPLIERS + "/" + id;
        this.http.get<any>(url)
            // Get data and wait for result.
            .subscribe(result => {
                this._singleSupplierName = result.supplierName;
                this._singleSupplierNumber = result.supplierID;
            },
                error => {
                    // Let user know about the error.
                    this._errorMessage = JSON.stringify(error);
                })
    }
    getProductsSupplier(idProd, idSuppl) {
        console.log("------------------------------------------------");
        console.log("getProduct base url ==> [get] " + BASE_URL_PRODUCT_SUPPLIERS + idProd + "/" + idSuppl);

        let url = BASE_URL_PRODUCT_SUPPLIERS + "/" + idProd + "/" + idSuppl;
        this.http.get<any>(url)
            // Get data and wait for result.
            .subscribe(result => {
                console.log(result)
                this._prodID = result.produceID;
                this._supplID = result.supplierID;
                this._prodSupplQty = result.qty;
            },
                error => {
                    // Let user know about the error.
                    this._errorMessage = JSON.stringify(error);
                })
    }
    //POST REQUESTS /////////////////////////////////////////////////////////////////////////////////////////////
    createProduct(data) {
        let url = BASE_URL_PRODUCTS
        console.log("------------------------------------------------");
        console.log("createProduct base url ==> [post] " + BASE_URL_PRODUCTS);

        this.http.post('https://localhost:44384/api/Produce', data)
            .subscribe((data) => {
                // Data is received from the post request.           
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllProducts();
            },
                error => { // An error occurred. Data is not received.
                    console.log(data + " ==> 3, error ==> " + JSON.stringify(error));
                    //this._errorMessage = JSON.stringify(error);                
                });

        console.log(data);
    }
    createSupplier(data) {
        let url = BASE_URL_SUPPLIERS
        console.log("------------------------------------------------");
        console.log("createSupplier base url ==> [post] " + BASE_URL_SUPPLIERS);

        this.http.post('https://localhost:44384/api/Supplier', data)
            .subscribe((data) => {
                // Data is received from the post request.           
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllSuppliers();

            },
                error => { // An error occurred. Data is not received.
                    console.log(data + " ==> 3, error ==> " + JSON.stringify(error));
                    //this._errorMessage = JSON.stringify(error);                
                });

        console.log(data);
    }
    createProductsSupplier(data) {
        let url = BASE_URL_PRODUCT_SUPPLIERS
        console.log("------------------------------------------------");
        console.log("createProduct base url ==> [post] " + BASE_URL_PRODUCT_SUPPLIERS);

        this.http.post('https://localhost:44384/api/ProduceSupplier', data)
            .subscribe((data) => {
                // Data is received from the post request.           
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllProductSuppliers();
            },
                error => { // An error occurred. Data is not received.
                    console.log(data + " ==> 3, error ==> " + JSON.stringify(error));
                    // this._errorMessage = JSON.stringify(error);            
                    this._errorMessage = "Error occurred";
                });
        console.log(data);
    }
    //DELETE REQUESTS /////////////////////////////////////////////////////////////////////////////////////////////
    deleteProduct(_id) {  //https://localhost:44371/api/Product/9
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        let url = BASE_URL_PRODUCTS + "/" + _id;
        console.log("------------------------------------------------");
        console.log("deleteProduct base url ==> [delete] " + BASE_URL_PRODUCTS + _id);

        this.http.delete(url, httpOptions).subscribe(
            // Data is received from the post request.
            (data) => {
                this._errorMessage = data["errorMessage"];
                this.getAllProducts();
                this.getAllProductSuppliers();
            },
            // An error occurred. Data is not received. 
            error => {
                this._errorMessage = JSON.stringify(error);
            });
    }
    deleteSupplier(_id) {  //https://localhost:44371/api/Product/9
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        let url = BASE_URL_SUPPLIERS + "/" + _id;
        console.log("------------------------------------------------");
        console.log("deleteProduct base url ==> [delete] " + BASE_URL_SUPPLIERS + _id);

        this.http.delete(url, httpOptions).subscribe(
            // Data is received from the post request.
            (data) => {
                this._errorMessage = data["errorMessage"];
                this.getAllSuppliers();
                this.getAllProductSuppliers();
            },
            // An error occurred. Data is not received. 
            error => {
                this._errorMessage = JSON.stringify(error);
            });
    }
    // deleteProductsSupplier(_idProduct, _idSupplier) {  //https://localhost:44371/api/Product/9
    //     const httpOptions = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //     };
    //     let url = BASE_URL_PRODUCT_SUPPLIERS + _idProduct + _idSupplier ;
    //     console.log("------------------------------------------------");
    //     console.log("deleteProduct base url ==> [delete] " + BASE_URL_PRODUCT_SUPPLIERS + _idProduct + _idSupplier);

    //     this.http.delete(url, httpOptions).subscribe(
    //         // Data is received from the post request.
    //         (data) => {
    //             this._errorMessage = data["errorMessage"];
    //             this.getAllProducts();
    //         },
    //         // An error occurred. Data is not received. 
    //         error => {
    //             this._errorMessage = JSON.stringify(error);
    //         });
    // }
    //UPDATE BY ID REQUESTS /////////////////////////////////////////////////////////////////////////////////////////////
    updateProduct() {
        // This free online service receives post submissions.
        this.http.put(BASE_URL_PRODUCTS + "/" + "MyEdit",
            {
                ProduceID: this._editPrId,
                Description: this._editableDescription,
            })
            .subscribe(
                // Data is received from the post request.
                (data) => {
                    // Inspect the data to know how to parse it.
                    console.log("PUT call successful. Inspect response.",
                        JSON.stringify(data));
                    this._errorMessage = data["errorMessage"];
                    this.getAllProducts();
                },
                // An error occurred. Data is not received. 
                error => {
                    this._errorMessage = JSON.stringify(error);
                });
    }
    updateSupplier() {
        // This free online service receives post submissions.
        this.http.put(BASE_URL_SUPPLIERS + "/" + "MyEdit",
            {
                SupplierID: this._editPrId,
                SupplierName: this._editableSupplierName,
            })
            .subscribe(
                // Data is received from the post request.
                (data) => {
                    // Inspect the data to know how to parse it.
                    console.log("PUT call successful. Inspect response.",
                        JSON.stringify(data));
                    this._errorMessage = data["errorMessage"];
                    this.getAllSuppliers();
                },
                // An error occurred. Data is not received. 
                error => {
                    this._errorMessage = JSON.stringify(error);
                });
    }

    updateProductsSuppliers() {
        this.http.put(BASE_URL_PRODUCT_SUPPLIERS + "/" + "MyEdit",
            {
                ProduceID: this._editPrId,
                SupplierID: this._editSupplId,
                Qty: this._editQuantity
            })
            .subscribe(
                // Data is received from the post request.
                (data) => {
                    // Inspect the data to know how to parse it.
                    console.log("PUT call successful. Inspect response.",
                        JSON.stringify(data));
                    this._errorMessage = data["errorMessage"];
                    this.getAllProductSuppliers();
                },
                // An error occurred. Data is not received. 
                error => {
                    this._errorMessage = JSON.stringify(error);
                });
    }
}
