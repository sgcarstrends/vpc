import * as aws from "@pulumi/aws";
import { PROJECT_NAME } from "../../config";

export const createVpc = () =>
  new aws.ec2.Vpc(`${PROJECT_NAME}-vpc`, {
    cidrBlock: "10.0.0.0/16",
    tags: {
      Name: `${PROJECT_NAME}-vpc`,
    },
  });
