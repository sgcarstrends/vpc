import * as pulumi from "@pulumi/pulumi";

export const PROJECT_NAME = `${pulumi.getProject()}-${pulumi.getStack()}`;

export const config = new pulumi.Config();
export const AWS_REGION = config.require("AWS_REGION");
