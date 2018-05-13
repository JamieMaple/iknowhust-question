npm run build
cp -r build/* ../iknow-question-build

cd ../iknow-question-build
git add .
git commit -m 'deploy'
git push origin master
