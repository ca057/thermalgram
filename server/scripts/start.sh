#!/bin/sh

echo "Starting THERMALGRAM..."

# forward port 80 to 4321
echo "Set up port forwarding :80 --> :4321..."
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 4321

# start our server
echo "Start server..."
npm run start
