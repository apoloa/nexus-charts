# Root folder for the charts
CHARTS_DIR := src

OUTPUT_DIR := .

# Url of the github pages
GITHUB_URL := https://apoloa.github.io/nexus-charts/

# Search all the charts in a subfolder
SUBDIRS := $(wildcard $(CHARTS_DIR)/*)

# Default 
all: package index

# Package all the helm charts
package: $(SUBDIRS)
$(SUBDIRS):
	@echo "Packing chart $@"
	@helm package $@

index:
	@echo "Generating index file"
	@helm repo index $(OUTPUT_DIR) --url $(GITHUB_URL)

clean:
	@echo "Cleaning up Helm packages"
	@rm -rf index.yaml
	@rm -rf $(wildcard ./*.tgz)


.PHONY: all package clean $(SUBDIRS)
