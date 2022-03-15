# demo-RBAC
This repository contains projects for implementation of RBAC in Azure Active Directory

## Structure:
- JS folder contains react project
- dotnet folder contains demo of claims and store application

## Configuration:
  ### Backend
User secrets are used to facilitate the Authentication to the WEB API:
```
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "2d18ed69-xxxx-4632-xxxx-30a56e1ea310",
    "ClientId": "eefa5a2d-xxxx-4e96-xxxx-fa1d49657569",
    "Audience": "api://eefa5a2d-xxxx-xxxx-8886-fa1d49657569"
  }
}
```
### Frontend
dev.env.local file in root folder of JS project has been added:
```
RBAC_TENANT_NAME=minutesmate
RBAC_CLIENT_ID=eefa5a2d-xxxx-xxxx-xxxx-fa1d49657569
RBAC_DIRECTORY_ID=2d18ed69-xxxx-xxxx-84f4-30a56e1ea310
RBAC_APP_ID_URI=https://localhost:44327
```
