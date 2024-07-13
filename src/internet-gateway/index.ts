import * as aws from "@pulumi/aws";
import { projectName } from "../../config";

export const createInternetGateway = (vpc: aws.ec2.Vpc) =>
  new aws.ec2.InternetGateway(`${projectName}-internet-gateway`, {
    vpcId: vpc.id,
    tags: {
      Name: `${projectName}-internet-gateway`,
    },
  });
