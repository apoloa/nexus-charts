#!/bin/bash

## Extract the running script from the GH Repo
## https://mojo2600.github.io/pihole-kubernetes/

helm repo add mojo2600 https://mojo2600.github.io/pihole-kubernetes/
helm upgrade -i pihole mojo2600/pihole -f values-pihole.yaml
