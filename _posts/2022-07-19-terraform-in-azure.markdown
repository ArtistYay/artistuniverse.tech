---
layout: post
title: "Terraform in Azure"
date: 2022-07-19 00:42:42 +0000
categories: Software Development
tags: [azure,cloud]
author: admin
---

Infrastructure as Code is one of those skills that looks intimidating at first but clicks quickly once you start using it. In this post, I walk through the core Terraform workflow `init`, `fmt`, `validate`, `plan`, `apply`, and `destroy` using Azure as the target provider. I ran all of this from Azure Cloud Shell, which makes it dead simple to get started without installing anything locally. Nothing too extravagant just a solid refresher on the fundamentals.

## Setting Up the Environment

I used **Azure Cloud Shell** for this lab. First, I created a dedicated directory for the Terraform project:

```bash
mkdir terraform-lab && cd terraform-lab
```

Then I created a `provider.tf` file using the Cloud Shell editor (`code provider.tf`) and pasted in the Azure provider configuration from the Terraform registry:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.14.0"
    }
  }
}

provider "azurerm" {
  features {}

  storage_use_azuread = true
}
```

## terraform init

The first command to run in any Terraform project:

```bash
terraform init
```

`terraform init` initializes the working directory by downloading the required provider plugins (in this case, the `azurerm` provider) and setting up the backend. You always run this first, it's what makes the other commands work.

## terraform fmt

Next, I created `variables.tf` and `main.tf`:

```bash
touch variables.tf main.tf
code .
```

Before validating or planning, run:

```bash
terraform fmt
```

`terraform fmt` automatically formats your `.tf` files to the canonical style, consistent indentation, spacing, and alignment. It's a good habit to run this before committing any Terraform code.

## Writing the Configuration

I started with a resource group in `main.tf`, referencing variables for the name and location:

```hcl
resource "azurerm_resource_group" "basics" {
  name     = var.resource_group_name
  location = var.location
}
```

Then added a container group running a public Docker image:

```hcl
resource "azurerm_container_group" "example" {
  name                = var.container_group_name
  location            = azurerm_resource_group.basics.location
  resource_group_name = azurerm_resource_group.basics.name
  ip_address_type     = "Public"
  dns_name_label      = "${var.prefix}-${var.container_group_name}"
  os_type             = "Linux"

  container {
    name   = "inspectorgadget"
    image  = "jelledruyts/inspectorgadget:latest"
    cpu    = "0.5"
    memory = "1.0"

    ports {
      port     = 80
      protocol = "TCP"
    }
  }
}
```

The `azurerm_resource_group.basics.location` reference tells Terraform: *go look at the resource named `basics` of type `azurerm_resource_group` and grab its `location` attribute*. This is how Terraform understands dependencies between resources.

In `variables.tf`:

```hcl
variable "resource_group_name" {
  description = "Name for the resource group"
  type        = string
  default     = "terraform-basics"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
}

variable "container_group_name" {
  description = "Name of the container group"
  type        = string
  default     = "terraform-basics"
}

variable "prefix" {
  description = "Prefix string to ensure FQDNs are globally unique"
  type        = string
}
```

And a `terraform.tfvars` file to set specific values:

```hcl
location = "eastus"
prefix   = "Artist"
```

## terraform validate

Before planning, check that your configuration is syntactically and logically valid:

```bash
terraform validate
```

This catches things like missing required arguments, invalid resource types, or circular dependencies without making any API calls.

## terraform plan

Preview the changes Terraform will make before applying them:

```bash
terraform plan
```

The output shows which resources will be **created**, **updated**, or **destroyed**. It's the "measure twice, cut once" step, always review the plan before applying.

## terraform apply

Deploy the resources to Azure:

```bash
terraform apply
```

Terraform will show the plan one more time and prompt for confirmation. Type `yes` to proceed. Once complete, the resource group and container group will be live in your Azure subscription.

## terraform destroy

When you're done with the resources, tear everything down:

```bash
terraform destroy
```

This removes all resources defined in the configuration from your Azure account. Type `yes` to confirm.

---

## Wrapping Up

Nothing too advanced here just wanted to brush up on the Terraform workflow in Azure. What I've found is that Azure has more concepts to internalize than AWS (Cloud Shell was something I didn't even know existed until recently), but once you start using the tools the pieces start fitting together. Learning by doing different things and seeing how they connect is just how I work.

That's all for today just keeping you updated on the journey!