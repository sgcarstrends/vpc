import * as aws from "@pulumi/aws";
import { PROJECT_NAME } from "../../config";

export const createInternetGateway = (vpc: aws.ec2.Vpc) =>
  new aws.ec2.InternetGateway(`${PROJECT_NAME}-internet-gateway`, {
    vpcId: vpc.id,
    tags: {
      Name: `${PROJECT_NAME}-internet-gateway`,
    },
  });
