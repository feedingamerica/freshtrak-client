#!/usr/bin/env bash

set -e

readonly STAGE=$1

function main {
  verify_args
  build
  if [ $STAGE == 'beta' ]; then
    deploy 'freshtrak-ui-beta-s3websitebucket-190zpkapk341b' 'E2G2PXSOKK1LMM'
  fi
  if [ $STAGE == 'production' ]; then
    deploy 'freshtrak-ui-s3websitebucket-5x5bno31jql4' 'E2XH4UYXPUQSS0'
  fi
}

function verify_args {
  [ "$STAGE" == 'beta' ] \
    || [ "$STAGE" == 'production' ] \
    || (usage && exit 1)
}

function usage {
cat << MSG
  Builds and deploys to this project to AWS
  usage: deploy.sh <stage>
  requires: yarn, aws cli
MSG
}

function build {
  rm -rf build
  yarn install
  yarn run build:$STAGE
}

function deploy {
  s3_bucket=$1
  distribution_id=$2

  aws s3 cp build/ "s3://$s3_bucket" --sse --recursive --acl public-read
  aws cloudfront create-invalidation --distribution-id "$distribution_id" --paths "/index.html"
}

main
