import { Duration } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs"

interface SwnApiGatewayProps {
    productMicroservice: IFunction,
    basketMicroservice: IFunction
}

export class SwnApiGateway extends Construct {

    constructor(scope: Construct, id: string, props: SwnApiGatewayProps) {
        super(scope, id)

        // Product API Gateway
        this.createProductApi(props.productMicroservice);

        // Basket API Gateway
        this.createBasketApi(props.basketMicroservice);
    }

    private createProductApi(productMicroservice: IFunction) {
        //Product microservice api gateway
        //root name = product

        //GET /product
        //POST /product

        // Single product with id parameter
        //GET /product/{id}
        //PUT /product/{id}
        //DELETE /product/{id}

        const productgw = new LambdaRestApi(this, 'productApi', {
            restApiName: 'Product Service',
            handler: productMicroservice,
            proxy: false
        });
    
        const product = productgw.root.addResource('product');
        product.addMethod('GET') //GET /product
        product.addMethod('POST') //POST /product
    
        const singleProduct = product.addResource('{id}') ///product/{id}
        singleProduct.addMethod('GET') //GET /product/{id}
        singleProduct.addMethod("PUT") //PUT /product/{id}
        singleProduct.addMethod('DELETE') //DELETE /product/{id}
    }

    private createBasketApi(basketMicroservice: IFunction) {
        // Basket microservice API Gateway
        // root name = basket

        // GET /basket
        // POST /basket

        // resource name = /basket/{userName}

        // GET /basket/{userName}
        // DELETE /basket/{userName}

        // POST /basket/checkout

        const basketgw = new LambdaRestApi(this, 'basketApi', {
            restApiName: 'Basket Service',
            handler: basketMicroservice,
            proxy: false
        });
    
        const basket = basketgw.root.addResource('basket');
        basket.addMethod('GET') //GET /basket
        basket.addMethod('POST') //POST /basket
    
        const singleBasket = basket.addResource('{userName}') ///basket/{userName}
        singleBasket.addMethod('GET') //GET /basket/{userName}
        singleBasket.addMethod('DELETE') //DELETE /basket/{userName}

        const basketCheckout = basket.addResource('checkout');
        basketCheckout.addMethod('POST');  // POST /basket/checkout

    }

    

}