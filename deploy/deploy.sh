#!/bin/bash

npm run deploy-test

if [ $? -ne 0 ]; then
  echo "Tests failed. Exiting."
  exit 1
else
  echo "All tests passed!"
fi
