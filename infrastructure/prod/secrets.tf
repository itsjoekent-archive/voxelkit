module "voxelkit_service_secret" "MONGODB_URI" {
  gcp_projects = var.gcp_projects
  source = "../helpers/service_secret" 
  secret_id = "MONGODB_URI"
}