import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const projectName = `${pulumi.getProject()}-${pulumi.getStack()}`;
const config = new pulumi.Config();
const AWS_REGION = config.require("AWS_REGION");

// Create a new VPC
const vpc = new aws.ec2.Vpc(`${projectName}-vpc`, {
  cidrBlock: "10.0.0.0/16",
  tags: {
    Name: `${projectName}-vpc`,
  },
});

// Create subnets
const subnetA = new aws.ec2.Subnet(`${projectName}-subnetA`, {
  vpcId: vpc.id,
  cidrBlock: "10.0.1.0/24",
  availabilityZone: `${AWS_REGION}a`,
  tags: {
    Name: `${projectName}-subnetA`,
  },
});

const subnetB = new aws.ec2.Subnet(`${projectName}-subnetB`, {
  vpcId: vpc.id,
  cidrBlock: "10.0.2.0/24",
  availabilityZone: `${AWS_REGION}b`,
  tags: {
    Name: `${projectName}-subnetB`,
  },
});

// Create an Internet Gateway
const internetGateway = new aws.ec2.InternetGateway(
  `${projectName}-internet-gateway`,
  {
    vpcId: vpc.id,
    tags: {
      Name: `${projectName}-internet-gateway`,
    },
  },
);

// Create a route table
const routeTable = new aws.ec2.RouteTable(`${projectName}-route-table`, {
  vpcId: vpc.id,
  routes: [
    {
      cidrBlock: "0.0.0.0/0",
      gatewayId: internetGateway.id,
    },
  ],
  tags: {
    Name: `${projectName}-route-table`,
  },
});

// Associate the route table with the subnets
new aws.ec2.RouteTableAssociation(`${projectName}-rta-subnetA`, {
  subnetId: subnetA.id,
  routeTableId: routeTable.id,
});

new aws.ec2.RouteTableAssociation(`${projectName}-rta-subnetB`, {
  subnetId: subnetB.id,
  routeTableId: routeTable.id,
});

// Create a security group
const securityGroup = new aws.ec2.SecurityGroup(
  `${projectName}-security-group`,
  {
    description: "Security group",
    vpcId: vpc.id,
    ingress: [
      {
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
    egress: [
      {
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
      },
    ],
    tags: {
      Name: `${projectName}-security-group`,
    },
  },
);

// Export the IDs of the created resources
exports.vpcId = vpc.id;
exports.subnetAId = subnetA.id;
exports.subnetBId = subnetB.id;
exports.securityGroupId = securityGroup.id;
