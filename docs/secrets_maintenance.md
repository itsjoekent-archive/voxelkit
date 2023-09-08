# Secrets

All application secrets are stored in [Google Cloud Secrets Manager](https://cloud.google.com/secret-manager) under the 'Global' GCP project and are managed by Terraform.

## Creating new secrets

First, add your new secret(s) in each Terraform environment file (`infrastructure/(local/preview/prod)/secrets.tf`) using the following example as a guide,

```hcl
module "voxelkit_service_secret" "my-secret-name" {
  gcp_projects = var.gcp_projects
  source = "../helpers/service_secret"
  secret_id = "my-secret-name"
}
```

If you're adding a secret that can't be committed even for the local development environment, add `include_local = true` to the `voxelkit_service_secret` module. Otherwise, add this secret to `.env.local`.

Reference the Terraform documentation [here](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/secret_manager_secret) if you need to create a custom implementation.

<!-- TODO: Adding to Cloud Run services -->

Next, add the secret name and a quick description to `docs/secrets.md`, and add a function to `services/lib/secrets.ts`.

Make sure across all of these files you're keeping everything alphabetically sorted so the secrets are easy to locate later.

Finally, create a pull request with all of these changes. Once merged and the Terraform changes are applied, you can go into each GCP project and fill out the value of the secret.

Restart your local development environment to see the new environment variable, redeploy preview or prod services to apply the new variable.

## Updating secrets

## Local development overrides

The `.env.local` file supplies default non-sensitive values to be used in the local environment. While it can also override secrets retrieved from GCP, it's recommended to make a new `.env` file so your local changes don't get accidentally committed to `.env.local`.
