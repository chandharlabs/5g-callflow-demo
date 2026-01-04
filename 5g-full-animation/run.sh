#npm config set cache /tmp/npm-cache && npm install --legacy-peer-deps
npm run build -- --base ./
cd dist/
python3 -m http.server 3001

