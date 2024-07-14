import * as aws from "@pulumi/aws";
import { PROJECT_NAME } from "../../config";

export const createRouteTableAndAssociations = (
  vpc: aws.ec2.Vpc,
  internetGateway: aws.ec2.InternetGateway,
  subnetA: aws.ec2.Subnet,
  subnetB: aws.ec2.Subnet,
) => {
  const routeTable = new aws.ec2.RouteTable(`${PROJECT_NAME}-route-table`, {
    vpcId: vpc.id,
    routes: [
      {
        cidrBlock: "0.0.0.0/0",
        gatewayId: internetGateway.id,
      },
    ],
    tags: {
      Name: `${PROJECT_NAME}-route-table`,
    },
  });

  new aws.ec2.RouteTableAssociation(`${PROJECT_NAME}-rta-subnetA`, {
    subnetId: subnetA.id,
    routeTableId: routeTable.id,
  });

  new aws.ec2.RouteTableAssociation(`${PROJECT_NAME}-rta-subnetB`, {
    subnetId: subnetB.id,
    routeTableId: routeTable.id,
  });

  return routeTable;
};
