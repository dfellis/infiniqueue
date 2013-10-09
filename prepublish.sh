#!/usr/bin/env bash
set -e

npm test

docco ./lib/infiniqueue.js
git stash
git checkout gh-pages
rm -rf public/
mv docs/* .
mv infiniqueue.html index.html
rm -rf docs
git add --all
git commit -am "Automatic documentation for version $npm_package_version"

git checkout master
git stash pop
browserify ./lib/browserify.js | uglifyjs > ./lib/infiniqueue.min.js
git commit -am "Automatic minification for version $npm_package_version"

git tag $npm_package_version
git push
git push --tags