#!/usr/bin/env bash

cd dist;
git init;
git remote remove origin;
git remote add origin git@github.com:codedXX/Cloud-Notes.git
git add .;
git commit -am "modify";
git branch -M main;
git push -f origin main &&
exit 0
