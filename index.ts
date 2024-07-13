import { createVpc } from "./src/vpc";
import { createSubnets } from "./src/subnets";
import { createInternetGateway } from "./src/internet-gateway";
import { createRouteTableAndAssociations } from "./src/route-table";
import { createSecurityGroup } from "./src/security-group";

const vpc = createVpc();
const { subnetA, subnetB } = createSubnets(vpc);
const internetGateway = createInternetGateway(vpc);
const routeTable = createRouteTableAndAssociations(
  vpc,
  internetGateway,
  subnetA,
  subnetB,
);
const securityGroup = createSecurityGroup(vpc);

// Export the IDs of the created resources
exports.vpcId = vpc.id;
exports.subnetAId = subnetA.id;
exports.subnetBId = subnetB.id;
exports.routeTableId = routeTable.id;
exports.securityGroupId = securityGroup.id;
