---
layout: post
title: "CatPipeline: Building an AWS CI/CD Pipeline"
date: 2022-07-04 19:22:54 +0000
categories: Cybersecurity
tags: [aws,cloud]
author: admin
---

Ever wanted to see code go from a git commit to a running container in production automatically? This is the lab for you. Based on Adrian Cantrill's CatPipeline demo, this walkthrough builds a full CI/CD pipeline on AWS using CodeCommit, CodeBuild, ECR, ECS Fargate, and an Application Load Balancer. It's hands-on, it's practical, and yes it deploys pictures of cats. Let's jump in!

## Stage 1: Configure Security & Create a CodeCommit Repository

### SSH Key Setup for CodeCommit

Generate an SSH key pair for CodeCommit authentication. The setup steps differ by OS:
- **Windows:** Follow the [Windows SSH guide](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-ssh-windows.html)
- **Linux/macOS:** Follow the [Linux/macOS SSH guide](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-ssh-unixmac.html)

### Clone the Repository

Once SSH is set up, create a CodeCommit repository and clone it into a local folder:

```bash
git clone ssh://git-codecommit.us-east-1.amazonaws.com/v1/repos/catpipeline ~/repos/catpipeline-codecommit
```

### Add the Lab Files

Download and unzip the lab files provided via [this link](https://github.com/acantril/learn-cantrill-io-labs/raw/master/aws-codepipeline-catpipeline/01_LABSETUP/container.zip), copy them into the cloned repo, then push:

```bash
git add -A .
git commit -m "container of cats"
git push
```

---

## Stage 2: CodeBuild + ECR — Build and Store the Docker Image

### Create an ECR Repository

Create a private Amazon Elastic Container Registry (ECR) to store the Docker images that CodeBuild produces.

### Grant CodeBuild Access to ECR

Before CodeBuild can push images to ECR, attach an inline policy to its IAM role:

```json
{
  "Statement": [
    {
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:CompleteLayerUpload",
        "ecr:GetAuthorizationToken",
        "ecr:InitiateLayerUpload",
        "ecr:PutImage",
        "ecr:UploadLayerPart"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ],
  "Version": "2012-10-17"
}
```

### Create the buildspec.yml

Add a `buildspec.yml` file to the CodeCommit repository. This file tells CodeBuild how to build and push the Docker image:

```yaml
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t $IMAGE_REPO_NAME:$IMAGE_TAG .
      - docker tag $IMAGE_REPO_NAME:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image...
      - docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG
```

> **Gotcha:** YAML does not allow tabs for indentation. If the build fails with "a character that cannot start any token" at line 4, convert all tab indentation to spaces. In VSCode: click the indentation indicator in the status bar → "Convert Indentation to Spaces", then push the fixed file.

### Test the Docker Image

A CloudFormation stack provisions a test EC2. Connect via EC2 Instance Connect and verify the image:

```bash
# Confirm Docker is running
docker ps

# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Pull the image
docker pull <IMAGE_URI>

# Run it
docker run -p 80:80 <IMAGE_ID>
```

Navigate to `http://<EC2_PUBLIC_IP>` — cats should appear!

---

## Stage 3: CodePipeline — Automate Build on Commit

Create a CodePipeline with two stages: **Source** (CodeCommit) and **Build** (CodeBuild). Now every push to the repository automatically triggers a new build.

Update `buildspec.yml` to tag images with the git commit hash and output an `imagedefinitions.json` artifact (required for ECS deployment in Stage 4):

```yaml
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
      - REPOSITORY_URI=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME
      - COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
      - IMAGE_TAG=${COMMIT_HASH:=latest}
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t $REPOSITORY_URI:latest .
      - docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$IMAGE_TAG
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image...
      - docker push $REPOSITORY_URI:latest
      - docker push $REPOSITORY_URI:$IMAGE_TAG
      - echo Writing image definitions file...
      - printf '[{"name":"%s","imageUri":"%s"}]' "$IMAGE_REPO_NAME" "$REPOSITORY_URI:$IMAGE_TAG" > imagedefinitions.json
artifacts:
  files: imagedefinitions.json
```

Push the updated file to trigger the pipeline and confirm it runs successfully.

---

## Stage 4: ECS Fargate + ALB — Automated Deployment

### Create an Application Load Balancer

Create an ALB with a security group that allows all inbound HTTP traffic. Configure a target group for the ECS service.

### Create the ECS Cluster and Task Definition

Create an ECS cluster, then define a Fargate task. Here's the task definition JSON for reference:

```json
{
  "family": "catpiplinedemo",
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "catpipline",
      "image": "<ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/catpipeline",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/catpiplinedemo",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Create the ECS Service

Create a Fargate service in the cluster, attaching it to the ALB target group. Verify the service starts and the ALB DNS name shows the running application.

### Add a Deploy Stage to CodePipeline

Edit the pipeline and add a **Deploy** stage after Build:
- **Action provider:** Amazon ECS
- **Input artifact:** `imagedefinitions.json` from the build stage
- **Cluster / Service:** your Fargate cluster and service

### Test the Full Pipeline

Make a change in your local `index.html` and push it:

```bash
git add index.html
git commit -m "update cat display page"
git push
```

Watch the pipeline run through Source → Build → Deploy. Once complete, copy the ALB DNS name into the browser to see the updated application live.

---

## Conclusion

This was a genuinely fun demo to go through. Building the full pipeline — from commit to running container behind a load balancer — really cements how CI/CD works in AWS. A couple of things to watch out for:

1. **YAML tabs vs. spaces** — always use spaces in `buildspec.yml`
2. **Spelling in CodePipeline** — the deploy stage configuration is case-sensitive when naming ECS clusters and services

Happy 4th of July, and happy shipping! :)