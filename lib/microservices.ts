import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface SwnMicroservicesProps {
    productTable: ITable,
    basketTable: ITable
}

export class SwnMicroservices extends Construct {

    public readonly productFunction: IFunction;

    public readonly basketFunction: IFunction;

    constructor(scope: Construct, id: string, props: SwnMicroservicesProps) {
        super(scope, id)

        // product microservices
        this.productFunction = this.createProductFunction(props.productTable);

        // basket microservices
        this.basketFunction = this.createBasketFunction(props.basketTable);

    }

    // product lambda function
    private createProductFunction(productTable: ITable): NodejsFunction {
        const productFunctionProps: NodejsFunctionProps = {
          bundling: {
            externalModules: [
              'aws-sdk',
              'amazon-dax-client'
            ]
          },
          environment: {
            PRIMARY_KEY: 'id',
            DYNAMODB_TABLE_NAME: productTable.tableName
          },
          runtime: Runtime.NODEJS_14_X
        }
    
        //product microservices lambda function
        const productFunction = new NodejsFunction(this, 'productLambdaFunction', {
          entry: join(__dirname, `/../src/product/index.js`),
          ...productFunctionProps
        })
    
        productTable.grantReadWriteData(productFunction);

        return productFunction;
    }

    // basket lambda function
    private createBasketFunction(basketTable: ITable): NodejsFunction {
      const basketFunctionProps: NodejsFunctionProps = {
        bundling: {
          externalModules: [
            'aws-sdk',
            'amazon-dax-client'
          ]
        },
        environment: {
          PRIMARY_KEY: 'id',
          DYNAMODB_TABLE_NAME: basketTable.tableName
        },
        runtime: Runtime.NODEJS_14_X
      }
  
      //product microservices lambda function
      const basketFunction = new NodejsFunction(this, 'basketLambdaFunction', {
        entry: join(__dirname, `/../src/basket/index.js`),
        ...basketFunctionProps
      })
  
      basketTable.grantReadWriteData(basketFunction);

      return basketFunction;
  }
}