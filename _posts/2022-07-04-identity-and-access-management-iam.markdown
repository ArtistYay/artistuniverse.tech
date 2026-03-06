---
layout: post
title: "Identity and Access Management (IAM)"
date: 2022-07-04 11:26:28 +0000
categories: Cybersecurity
tags: [aws,cloud]
author: admin
---

IAM misconfigurations are behind some of the biggest cloud breaches in recent history. In March 2021, MobiKwik suffered a 100 million user data breach traced back to a single leaked AWS access key. Getting IAM right isn't optional: it's the foundation of everything you build in the cloud. In this post, I'll cover what AWS IAM is, walk through creating and assuming an IAM role with a scoped S3 policy, and show how to use CloudFormation to enforce an MFA-gated IAM baseline across an entire account.

## What Is AWS IAM?

IAM has existed as a concept long before AWS. At its core, it's an access control framework: defining **who** can access **what** resources, under **what conditions**. AWS IAM puts this into practice by letting you:

- Create **users**, **groups**, and **roles**
- Attach **policies** that grant or deny specific API actions on specific resources
- Enforce conditions like MFA presence, IP address restrictions, and time-of-day controls

The distinction between **authentication** (proving who you are) and **authorization** (controlling what you can do) is central to understanding IAM.

## Lab: Create and Assume an IAM Role with S3 Scoping

This lab creates a custom policy that grants full S3 access except to two protected buckets, then attaches it to a role and user.

### Step 1: Create the Policy

The policy below grants broad S3 access while explicitly scoping resource access to avoid the two pre-created sensitive buckets. It uses the visual policy editor output:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "s3:ListStorageLensConfigurations",
        "s3:ListAccessPointsForObjectLambda",
        "s3:GetAccessPoint",
        "s3:PutAccountPublicAccessBlock",
        "s3:GetAccountPublicAccessBlock",
        "s3:ListAllMyBuckets",
        "s3:ListAccessPoints",
        "s3:PutAccessPointPublicAccessBlock",
        "s3:ListJobs",
        "s3:PutStorageLensConfiguration",
        "s3:ListMultiRegionAccessPoints",
        "s3:CreateJob"
      ],
      "Resource": "*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "arn:aws:s3::851592760101:accesspoint/*"
    },
    {
      "Sid": "VisualEditor2",
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:*:851592760101:storage-lens/*",
        "arn:aws:s3:*:851592760101:accesspoint/*",
        "arn:aws:s3:::cfst-3352-0420dac77a81904f3474ca99-appconfigprod1-8x31vcbk3f3w",
        "arn:aws:s3:::cfst-3352-0420dac77a81904f3474ca99-appconfigprod2-19s6selwyo5x3",
        "arn:aws:s3:*:851592760101:job/*",
        "arn:aws:s3:::*/*",
        "arn:aws:s3:us-west-2:851592760101:async-request/mrap/*/*",
        "arn:aws:s3-object-lambda:*:851592760101:accesspoint/*"
      ]
    }
  ]
}
```

### Step 2: Attach the Policy to a Role

Create an IAM role and attach the policy from Step 1 to it. Then attach the role to the lab user.

### Step 3: Verify Access

With the policy in place, the user can access the `appconfigprod1` and `appconfigprod2` buckets but is blocked from the customer-data buckets — exactly as intended. Developers get what they need; sensitive data stays protected.

---

## CloudFormation: IAM Baseline with MFA Enforcement

You can also provision groups, policies, and roles as code using CloudFormation. The template below creates a complete IAM baseline — including MFA-enforced admin roles, a read-only role, and CloudFormation deployment roles:

```yaml
Parameters:
  AllowRegion:
    Type: String
    Description: 'A single region that resources can be created in'
    Default: 'ap-southeast-2'
  BaselineNamePrefix:
    Type: String
    Description: 'The prefix for roles, groups and policies created by this stack'
    Default: 'Baseline'
  BaselineExportName:
    Type: String
    Description: 'The CloudFormation export name prefix'
    Default: 'Baseline'
    MinLength: '3'
    MaxLength: '32'
  IdentityManagementAccount:
    Type: String
    Description: AccountId trusted to assume all roles (blank for no cross-account trust)
    Default: ''
  ToolingManagementAccount:
    Type: String
    Description: AccountId trusted to assume ReadOnly and StackSet roles
    Default: ''
  OrganizationsRootAccount:
    Type: String
    Description: AccountId trusted to assume Organizations role
    Default: ''

Conditions:
  LinkToIdentityManagementAccount: !Not
    - !Equals
      - !Ref IdentityManagementAccount
      - ''
  LinkToToolingManagementAccount: !Not
    - !Equals
      - !Ref ToolingManagementAccount
      - ''
  LinkToOrganizationsRootAccount: !Not
    - !Equals
      - !Ref OrganizationsRootAccount
      - ''

Resources:
  ManageSelfIAMUserGroupPolicy:
    Type: 'AWS::IAM::ManagedPolicy'
    Properties:
      ManagedPolicyName: !Sub '${BaselineNamePrefix}-ManageSelfIAMUserGroupPolicy'
      Description: !Sub 'Policy for ${BaselineNamePrefix} managing own IAM user'
      Path: /
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Action: 'iam:GetAccountPasswordPolicy'
            Resource: '*'
          - Sid: AllowUsersToListMFADevicesandUsersForConsole
            Effect: Allow
            Action:
              - 'iam:ListMFADevices'
              - 'iam:ListVirtualMFADevices'
              - 'iam:ListUsers'
            Resource: '*'
          - Effect: Allow
            Action:
              - 'iam:ChangePassword'
            Resource:
              - !Sub 'arn:aws:iam::${AWS::AccountId}:user/${!aws:username}'
          - Sid: AllowUsersToDeactivateTheirOwnVirtualMFADevice
            Effect: Allow
            Action:
              - 'iam:DeactivateMFADevice'
              - 'iam:*LoginProfile'
              - 'iam:*AccessKey*'
              - 'iam:*SSHPublicKey*'
            Resource:
              - !Sub 'arn:aws:iam::${AWS::AccountId}:user/${!aws:username}'
              - !Sub 'arn:aws:iam::${AWS::AccountId}:mfa/${!aws:username}'
            Condition:
              Bool:
                'aws:MultiFactorAuthPresent': true
          - Sid: AllowUsersToCreateEnableResyncDeleteTheirOwnVirtualMFADevice
            Effect: Allow
            Action:
              - 'iam:CreateVirtualMFADevice'
              - 'iam:EnableMFADevice'
              - 'iam:ResyncMFADevice'
              - 'iam:DeleteVirtualMFADevice'
            Resource:
              - !Sub 'arn:aws:iam::${AWS::AccountId}:user/${!aws:username}'
              - !Sub 'arn:aws:iam::${AWS::AccountId}:mfa/${!aws:username}'

  PrivilegedAdminRole:
    Type: 'AWS::IAM::Role'
    Properties:
      RoleName: !Sub '${BaselineNamePrefix}-PrivilegedAdmin'
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/AdministratorAccess
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                - !Sub 'arn:aws:iam::${AWS::AccountId}:root'
            Action: 'sts:AssumeRole'
            Condition:
              Bool:
                'aws:MultiFactorAuthPresent': 'true'
          - !If
            - LinkToIdentityManagementAccount
            - Effect: Allow
              Principal:
                AWS:
                  !Sub 'arn:aws:iam::${IdentityManagementAccount}:root'
              Action: 'sts:AssumeRole'
              Condition:
                Bool:
                  'aws:MultiFactorAuthPresent': 'true'
            - !Ref 'AWS::NoValue'

  AccountWideReadOnlyRole:
    Type: 'AWS::IAM::Role'
    Properties:
      RoleName: !Sub '${BaselineNamePrefix}-AccountWideReadOnly'
      ManagedPolicyArns:
        - 'arn:aws:iam::aws:policy/ReadOnlyAccess'
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                - !Sub 'arn:aws:iam::${AWS::AccountId}:root'
            Action: 'sts:AssumeRole'
            Condition:
              Bool:
                'aws:MultiFactorAuthPresent': 'true'

  CloudFormationRole:
    Type: 'AWS::IAM::Role'
    Properties:
      RoleName: !Sub '${BaselineNamePrefix}-CloudFormation'
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              Service: cloudformation.amazonaws.com
            Action: 'sts:AssumeRole'
      Policies:
        - PolicyName: root
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action: '*'
                Resource: '*'
              - Effect: Deny
                Action:
                  - 'cloudformation:CreateStack'
                  - 'cloudformation:UpdateStack'
                Resource: '*'
                Condition:
                  'Null':
                    'cloudformation:TemplateURL': 'true'

  StackSetRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: AWSCloudFormationStackSetExecutionRole
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                - !Sub 'arn:aws:iam::${AWS::AccountId}:root'
            Action: 'sts:AssumeRole'
      Path: /
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/AdministratorAccess

Outputs:
  PrivilegedAdminRole:
    Description: Privileged Admin Role
    Value: !GetAtt PrivilegedAdminRole.Arn
    Export:
      Name: !Sub '${BaselineExportName}-PrivilegedAdminRole'
  AccountWideReadOnlyRole:
    Description: Account Wide Read Only Role
    Value: !GetAtt AccountWideReadOnlyRole.Arn
    Export:
      Name: !Sub '${BaselineExportName}-AccountWideReadOnlyRole'
  CloudFormationRole:
    Description: Baseline CloudFormation Role
    Value: !GetAtt CloudFormationRole.Arn
    Export:
      Name: !Sub '${BaselineExportName}-CloudFormationRole'
```

The template enforces **MFA as a condition** on all privileged role assumptions — meaning even if credentials are compromised, an attacker can't assume the admin role without a valid MFA token.

## Wrapping Up

IAM is not a set-it-and-forget-it service. The key principles to live by:

- **Least privilege** — grant only the permissions needed for the job, and no more
- **MFA everywhere** — especially for privileged roles
- **Infrastructure as Code** — define IAM in CloudFormation or Terraform so changes are reviewed and versioned
- **Audit regularly** — use IAM Access Analyzer and AWS Config rules to catch drift

Hope this was helpful and informative. Feel free to message me on LinkedIn with any questions — Artist out!