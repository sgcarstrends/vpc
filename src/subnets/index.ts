import * as aws from "@pulumi/aws";
import { AWS_REGION, projectName } from "../../config";

export const createSubnets = (vpc: aws.ec2.Vpc) => {
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

  return { subnetA, subnetB };
};
