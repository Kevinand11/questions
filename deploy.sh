#!/usr/bin/env sh

# abort on errors
set -e

# if you are deploying to a custom domain
# echo 'www.example.com' > dist/CNAME

git checkout gh-pages
git merge main

# build
yarn run build

git push origin --all

git checkout main