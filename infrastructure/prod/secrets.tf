module "voxelkit_service_secret" "SERVICES_MONGODB_URI" {
  gcp_projects = var.gcp_projects
  source = "../helpers/service_secret" 
  secret_id = "SERVICES_MONGODB_URI"
}