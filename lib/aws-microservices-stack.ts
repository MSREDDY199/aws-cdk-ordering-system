import { Construct } from 'constructs';
import { SwnDatabase } from './database';
import { SwnMicroservices } from './microservices';
import { SwnApiGateway } from './apigateway';
import { Stack, StackProps } from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsMicroservicesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const database = new SwnDatabase(this, 'Database')

    const microservices = new SwnMicroservices(this, 'Microservices', {
      productTable : database.productTable,
      basketTable: database.basketTable
    })

    const apiGateway = new SwnApiGateway(this, 'ApiGateway', {
      productMicroservice: microservices.productFunction,
      basketMicroservice: microservices.basketFunction
    })

    //dax code for later purposes
    // const cfnCluster = new dax.CfnCluster(this, 'MyCfnCluster', {
    //   iamRoleArn: 'iamRoleArn',
    //   nodeType: 'nodeType',
    //   replicationFactor: 123,
    
    //   // the properties below are optional
    //   availabilityZones: ['availabilityZones'],
    //   clusterEndpointEncryptionType: 'clusterEndpointEncryptionType',
    //   clusterName: 'clusterName',
    //   description: 'description',
    //   notificationTopicArn: 'notificationTopicArn',
    //   parameterGroupName: 'parameterGroupName',
    //   preferredMaintenanceWindow: 'preferredMaintenanceWindow',
    //   securityGroupIds: ['securityGroupIds'],
    //   sseSpecification: {
    //     sseEnabled: false,
    //   },
    //   subnetGroupName: 'subnetGroupName'
    // });

  }
}
