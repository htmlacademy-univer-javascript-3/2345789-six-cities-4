#!/bin/bash

npm run deploy-test

if [ $? -ne 0 ]; then
  echo "Tests failed. Exiting."
else
  echo "All tests passed!"
  echo "Running build"
  npm run build
  echo "Creating prod archive!"
  rm dist.tar.gz
  tar -czf dist.tar.gz dist
  echo "Running Ansible Playbook"
  ansible-playbook -i ./deploy/ansible/hosts ./deploy/ansible/deploy.yml 
fi
