#!/bin/sh

echo "Starting THERMALGRAM..."

# setting up serial port
echo ""
echo "Set up serial port with baud rate 19200..."
sudo stty -F /dev/serial0 19200

echo "Perform a test print..."
sudo echo -e "THERMALGRAM test print\\n\\n\\n" > /dev/serial0

# forward port 80 to 4321
echo ""
echo "Set up port forwarding :80 --> :4321..."
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 4321

# start our server
echo ""
echo "Start server..."
npm run start
