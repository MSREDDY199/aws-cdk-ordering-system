# Welcome to the Order placing AWS CDK TypeScript project

This project revolves around facilitating the order placement process within an e-commerce-like environment. Our system comprises three distinct microservices tailored to handle specific functionalities:

* Product Microservice: This component is tasked with managing the product catalog and its availability. It serves as the repository for storing product information and ensuring real-time updates on product availability.

* Basket Microservice: The Basket microservice plays a pivotal role in managing users' shopping carts. It enables users to add, remove, and modify products within their baskets, providing a seamless experience for assembling desired items before proceeding to checkout.

* Order Microservice: Although currently in development, the Order microservice will be responsible for processing and storing orders placed by users. It will orchestrate the final step in the purchasing journey, ensuring that orders are accurately recorded and processed.

To support our microservices architecture, we leverage Amazon DynamoDB as our database solution, utilizing its scalable and high-performance nature. Within DynamoDB, we have established the following tables:

* Product Table: This table serves as the central repository for storing all product-related information, including details such as product name, description, pricing, and availability.

* Basket Table: Dedicated to storing the contents of users' shopping baskets, this table maintains a record of products selected by individual users as they navigate the platform, preparing them for eventual order placement.

* Orders Table: Reserved for storing comprehensive records of orders placed by users, this table captures vital information such as order ID, customer details, product selections, and transaction status, facilitating efficient order management and tracking.

Furthermore, our microservices architecture is powered by serverless computing, with Lambda functions serving as the underlying mechanism for executing business logic and handling requests. This serverless approach offers scalability, cost-efficiency, and simplified management, enabling us to focus on delivering value to our users without the overhead of managing infrastructure.

To facilitate communication and interaction with our microservices, we employ Amazon API Gateway, which enables us to create and manage RESTful APIs tailored to the specific requirements of each service. These APIs serve as the entry points for accessing and utilizing the functionalities offered by our Product, Basket, and Order microservices, ensuring seamless integration and interaction within our system architecture.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
