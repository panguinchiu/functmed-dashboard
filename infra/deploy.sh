#!/bin/bash
# Azure deployment script
# Run: chmod +x infra/deploy.sh && ./infra/deploy.sh

set -e

RESOURCE_GROUP="functmed-rg"
LOCATION="southeastasia"
DEPLOYMENT_NAME="functmed-deploy-$(date +%s)"

echo "==> Creating resource group: $RESOURCE_GROUP"
az group create --name $RESOURCE_GROUP --location $LOCATION

echo "==> Prompting for secrets..."
read -sp "PostgreSQL admin password: " PG_PASSWORD; echo
read -sp "NextAuth secret (openssl rand -base64 32): " NEXTAUTH_SECRET; echo
read -sp "Anthropic API key: " ANTHROPIC_KEY; echo
read -sp "Azure Storage connection string: " STORAGE_CONN; echo

echo "==> Deploying Bicep template..."
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --name $DEPLOYMENT_NAME \
  --template-file infra/webapp.bicep \
  --parameters \
    postgresAdminLogin=functmedadmin \
    postgresAdminPassword="$PG_PASSWORD" \
    nextauthSecret="$NEXTAUTH_SECRET" \
    anthropicApiKey="$ANTHROPIC_KEY" \
    azureStorageConnectionString="$STORAGE_CONN"

echo "==> Deployment complete!"
az deployment group show \
  --resource-group $RESOURCE_GROUP \
  --name $DEPLOYMENT_NAME \
  --query properties.outputs
