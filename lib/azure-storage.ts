import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from '@azure/storage-blob'

function getContainerClient() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!
  const client = BlobServiceClient.fromConnectionString(connectionString)
  return client.getContainerClient(containerName)
}

export async function uploadPdfToBlob(
  buffer: Buffer,
  filename: string,
  clinicId: string,
  patientId: string
): Promise<{ blobName: string }> {
  const container = getContainerClient()
  const timestamp = Date.now()
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  const blobName = `clinics/${clinicId}/patients/${patientId}/${timestamp}-${safeName}`

  const blockBlob = container.getBlockBlobClient(blobName)
  await blockBlob.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: 'application/pdf' },
  })

  return { blobName }
}

export async function downloadBlob(blobName: string): Promise<Buffer> {
  const container = getContainerClient()
  const blockBlob = container.getBlockBlobClient(blobName)
  const response = await blockBlob.downloadToBuffer()
  return response
}

export async function getBlobSasUrl(blobName: string, expiryMinutes = 60): Promise<string> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!

  // Parse account name and key from connection string
  const accountNameMatch = connectionString.match(/AccountName=([^;]+)/)
  const accountKeyMatch = connectionString.match(/AccountKey=([^;]+)/)

  if (!accountNameMatch || !accountKeyMatch) {
    throw new Error('Invalid Azure Storage connection string')
  }

  const accountName = accountNameMatch[1]
  const accountKey = accountKeyMatch[1]

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)

  const expiryDate = new Date()
  expiryDate.setMinutes(expiryDate.getMinutes() + expiryMinutes)

  const sasQueryParameters = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse('r'),
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  )

  return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasQueryParameters.toString()}`
}
