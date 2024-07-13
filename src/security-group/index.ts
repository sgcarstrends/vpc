import * as aws from "@pulumi/aws";
import { projectName } from "../../config";

export const createSecurityGroup = (vpc: aws.ec2.Vpc) =>
  new aws.ec2.SecurityGroup(`${projectName}-security-group`, {
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
  });
