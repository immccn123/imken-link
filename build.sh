git clone https://github.com/immccn123/imken-link-web
cd imken-link-web
pnpm install
pnpm build
cp -r dist/* ../static/
cd ..
rm -r imken-link-web
cd ..
