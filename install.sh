cd front/ 
echo "---- INSTALL FRONT ----"
npm install --force

echo "---- BUILD FRONT ----"
REACT_APP_HOST="${PROTOCOLE}${IP}" npx react-scripts build

cd .. 
echo "---- INSTALL BACK ----"
npm install --force

echo "---- NODE SERVER ----"
production='true' node src/index.js
