#!/bin/bash

# Create a backup
git branch backup-before-cleanup

# Use git-filter-repo to replace sensitive information
git filter-repo --force --replace-text <(cat <<EOF
AKIAQZW4RHOXJARZL5NY===>
p9AcaXAO7CSqZetc/BsIlDp2NTrhHYnOnloqj+rn===>
EOF
)

echo "Git history has been cleaned. A backup branch 'backup-before-cleanup' has been created."
echo "You may now force push with: git push -f origin main" 