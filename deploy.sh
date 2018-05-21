# dong
cd ../iknow-question-build
git checkout dong

# back
cd ../iknowhust-question
npm run build
cp -r build/* ../iknow-question-build

cd ../iknow-question-build
git add .
git commit -m 'deploy'
git push origin dong
