import * as aws from "@pulumi/aws";
import { AWS_REGION, PROJECT_NAME } from "../../config";

export const createSubnets = (vpc: aws.ec2.Vpc) => {
  const subnetA = new aws.ec2.Subnet(`${PROJECT_NAME}-subnetA`, {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    availabilityZone: `${AWS_REGION}a`,
    tags: {
      Name: `${PROJECT_NAME}-subnetA`,
    },
  });

  const subnetB = new aws.ec2.Subnet(`${PROJECT_NAME}-subnetB`, {
    vpcId: vpc.id,
    cidrBlock: "10.0.2.0/24",
    availabilityZone: `${AWS_REGION}b`,
    tags: {
      Name: `${PROJECT_NAME}-subnetB`,
    },
  });

  return { subnetA, subnetB };
};
