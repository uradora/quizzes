#!/bin/bash

RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "Checking code style..."
yarn prettier-check

rc=$?;
if [[ $rc != 0 ]]
then
  echo ""
  echo -e "${RED}Code style checking was not successful.${NC}"
  echo -e "Run '${BLUE}yarn prettier${NC}' and add the changes to git to fix the problem."
fi
exit $rc
