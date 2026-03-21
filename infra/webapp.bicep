@description('Location for all resources')
param location string = 'Southeast Asia'

@description('App Service Plan SKU')
param appServicePlanSku string = 'B2'

@description('Web App name')
param webAppName string = 'functmed-dashboard'

@description('PostgreSQL server name')
param postgresServerName string = 'functmed-postgres'

@description('PostgreSQL admin login')
param postgresAdminLogin string

@secure()
@description('PostgreSQL admin password')
param postgresAdminPassword string

@description('NextAuth secret')
@secure()
param nextauthSecret string

@description('Anthropic API key')
@secure()
param anthropicApiKey string

@description('Azure Storage connection string')
@secure()
param azureStorageConnectionString string

// ─── App Service Plan ─────────────────────────────────────────────────────────
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: '${webAppName}-plan'
  location: location
  sku: {
    name: appServicePlanSku
    tier: 'Basic'
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

// ─── Web App ──────────────────────────────────────────────────────────────────
resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'NODE|20-lts'
      appCommandLine: 'node server.js'
      alwaysOn: true
      ftpsState: 'Disabled'
      minTlsVersion: '1.2'
      appSettings: [
        { name: 'NODE_ENV', value: 'production' }
        { name: 'NEXTAUTH_URL', value: 'https://${webAppName}.azurewebsites.net' }
        { name: 'NEXTAUTH_SECRET', value: nextauthSecret }
        { name: 'ANTHROPIC_API_KEY', value: anthropicApiKey }
        { name: 'AZURE_STORAGE_CONNECTION_STRING', value: azureStorageConnectionString }
        { name: 'AZURE_STORAGE_CONTAINER_NAME', value: 'lab-reports' }
        {
          name: 'DATABASE_URL'
          value: 'postgresql://${postgresAdminLogin}:${postgresAdminPassword}@${postgresServerName}.postgres.database.azure.com:5432/functmed?sslmode=require'
        }
        { name: 'WEBSITE_NODE_DEFAULT_VERSION', value: '~20' }
        { name: 'SCM_DO_BUILD_DURING_DEPLOYMENT', value: 'false' }
      ]
    }
  }
}

// ─── PostgreSQL Flexible Server ───────────────────────────────────────────────
resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' = {
  name: postgresServerName
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    version: '16'
    administratorLogin: postgresAdminLogin
    administratorLoginPassword: postgresAdminPassword
    storage: {
      storageSizeGB: 32
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    highAvailability: {
      mode: 'Disabled'
    }
  }
}

resource postgresDatabase 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2022-12-01' = {
  name: 'functmed'
  parent: postgresServer
  properties: {
    charset: 'UTF8'
    collation: 'en_US.utf8'
  }
}

// Allow Azure services to connect to Postgres
resource postgresFirewallRule 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2022-12-01' = {
  name: 'AllowAzureServices'
  parent: postgresServer
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

// ─── Storage Account ──────────────────────────────────────────────────────────
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: replace('${webAppName}storage', '-', '')
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  name: 'default'
  parent: storageAccount
}

resource labReportsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: 'lab-reports'
  parent: blobService
  properties: {
    publicAccess: 'None'
  }
}

// ─── Outputs ──────────────────────────────────────────────────────────────────
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output postgresHost string = postgresServer.properties.fullyQualifiedDomainName
