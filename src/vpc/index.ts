import * as aws from "@pulumi/aws";
import { projectName } from "../../config";

export const createVpc = () =>
  new aws.ec2.Vpc(`${projectName}-vpc`, {
    cidrBlock: "10.0.0.0/16",
    tags: {
      Name: `${projectName}-vpc`,
    },
  });
