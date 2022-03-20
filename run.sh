cd front/ 
echo "---- BUILD FRONT ----"
REACT_APP_HOST="${PROTOCOLE}${IP}" npx react-scripts build

cd .. 
echo "---- NODE SERVER ----"
production='true' node src/index.js
