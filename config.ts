import * as pulumi from "@pulumi/pulumi";

export const projectName = `${pulumi.getProject()}-${pulumi.getStack()}`;
export const config = new pulumi.Config();
export const AWS_REGION = config.require("AWS_REGION");
