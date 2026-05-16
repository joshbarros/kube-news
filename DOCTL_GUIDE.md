# DigitalOcean CLI (doctl) Guide

This guide explains how to install, authenticate, and use the DigitalOcean CLI (`doctl`) safely for day-to-day infrastructure tasks.

## What is doctl?

`doctl` is the official command-line interface for DigitalOcean. You can use it to manage:

- Droplets (VMs)
- Kubernetes clusters (DOKS)
- Managed databases
- Container Registry
- App Platform
- VPC, firewalls, load balancers, volumes, DNS, and more

## Install doctl

### macOS (Homebrew)

```bash
brew update
brew install doctl
```

### Linux (official script)

```bash
cd ~
wget https://github.com/digitalocean/doctl/releases/download/v1.159.0/doctl-1.159.0-linux-amd64.tar.gz
tar xf ~/doctl-1.159.0-linux-amd64.tar.gz
sudo mv ~/doctl /usr/local/bin
```

### Verify installation

```bash
doctl version
```

## Authentication (Safe)

### 1. Create a Personal Access Token

In DigitalOcean Control Panel:

- Go to API -> Tokens/Keys
- Create a Personal Access Token
- Use minimum required scopes
- Prefer short-lived tokens when possible

### 2. Initialize auth

```bash
doctl auth init
```

Paste your token when prompted.

### 3. Validate access

```bash
doctl auth list
doctl account get
```

## Security Best Practices

- Never commit tokens to Git.
- Never paste tokens into README, scripts, issues, or chat logs.
- Do not hardcode tokens in shell history.
- Prefer interactive `doctl auth init` over `--access-token` in plain commands.
- Rotate tokens periodically.
- Revoke tokens immediately if exposed.

## Useful Reference Commands

### Account and context

```bash
doctl auth list
doctl auth switch --context default
doctl account get
```

### Regions and VM sizes

```bash
doctl compute region list
doctl compute size list
```

### Droplets (VMs)

```bash
# Create
doctl compute droplet create my-vm \
  --region nyc1 \
  --size s-1vcpu-1gb \
  --image ubuntu-24-04-x64 \
  --ssh-keys <SSH_KEY_ID>

# List
doctl compute droplet list

# Delete
doctl compute droplet delete <DROPLET_ID>
```

### Kubernetes (DOKS)

```bash
# List available versions
doctl kubernetes options versions

# Create cluster
doctl kubernetes cluster create my-cluster \
  --region nyc1 \
  --version 1.35.1-do.6 \
  --count 3 \
  --size s-2vcpu-4gb

# Save kubeconfig
doctl kubernetes cluster kubeconfig save my-cluster

# List clusters
doctl kubernetes cluster list
```

### Managed Databases

```bash
# Create PostgreSQL
doctl databases create my-postgres \
  --engine pg \
  --region nyc1 \
  --size db-s-1vcpu-1gb \
  --num-nodes 1

# List DB clusters
doctl databases list
```

### Container Registry

```bash
# Create registry
doctl registry create my-registry

# Get Docker login helper
doctl registry login
```

### Networking and security

```bash
# Create VPC
doctl vpcs create my-vpc --region nyc1 --ip-range 10.10.0.0/16

# List firewalls
doctl compute firewall list

# List load balancers
doctl compute load-balancer list
```

### App Platform

```bash
# List apps
doctl apps list

# Create app from spec file
doctl apps create --spec app.yaml
```

## Safe Automation Pattern

If you automate with shell scripts:

1. Do not echo secrets.
2. Keep scripts idempotent where possible.
3. Validate command success with exit codes.
4. Add explicit cleanup for temporary resources.
5. Restrict scope with projects/tags.

## Troubleshooting

### Error: access token is required

```bash
doctl auth init
```

### API command not authorized

- Confirm token scopes
- Confirm active context with `doctl auth list`
- Rotate token and re-authenticate

### Wrong account/context

```bash
doctl auth list
doctl auth switch --context <CONTEXT_NAME>
```

## Cleanup Checklist (After Testing)

When testing infrastructure from CLI, remove unused resources to avoid cost:

- Delete test droplets
- Delete unused DB clusters
- Delete test Kubernetes clusters
- Remove unused load balancers and volumes
- Revoke temporary tokens

## Notes for Team Use

- Keep this guide versioned.
- Keep examples generic (no real IDs or secrets).
- Use environment-specific naming conventions (dev/stage/prod).
- Review costs before creating production-sized resources.
