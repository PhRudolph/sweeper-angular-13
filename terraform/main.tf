provider "azurerm" {
  skip_provider_registration = true
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "Minesweeper"
    storage_account_name = "pfrminesweeper"
    container_name       = "states"
    key                  = "tfstates"
  }
}

resource "azurerm_storage_container" "pfrcon" {
  name                  = var.spacon
  storage_account_name  = "pfrminesweeper"
  container_access_type = "private"
}