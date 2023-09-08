terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.80.0"
    }
  }
}

variable "gcp_projects" {}

variable "id" {
  type = string
}

variable "include_local" {
  type = bool
  default = false
}

resource "google_secret_manager_secret" "local" {
  count = var.include_local ? 1 : 0

  secret_id = var.id

  replication {
    automatic = true
  }

  project = var.gcp_projects.local
}

resource "google_secret_manager_secret" "preview" {
  secret_id = var.id

  replication {
    automatic = true
  }

  project = var.gcp_projects.preview
}

resource "google_secret_manager_secret" "prod" {
  secret_id = var.id

  replication {
    automatic = true
  }

  project = var.gcp_projects.prod
}