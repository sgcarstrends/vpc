import * as aws from "@pulumi/aws";
import { PROJECT_NAME } from "../../config";

export const createSecurityGroup = (vpc: aws.ec2.Vpc) =>
  new aws.ec2.SecurityGroup(`${PROJECT_NAME}-security-group`, {
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
      Name: `${PROJECT_NAME}-security-group`,
    },
  });
