# LOAPI
LOAPI (pronounced 'Lope-ey' and short for 'Luke Oxley's Application Programming Interface') is a light weight HTTP based API used for executing backend commands/scripts on Linux operating systems (developed and tested on Ubuntu 18.04). As the project progresses, we would like this to be a fully compliant RESTful API.
# Instructions (Ubuntu)
1) Create a directory for your new project, and move to it.
   
   `sudo mkdir /home/user/myproject/`
   
   `cd /home/user/myproject/`

2) Update/upgrade, and install all required packages/modules.
   
   `sudo apt-get update`
   
   `sudo apt-get upgrade`
   
   `sudo apt-get install npm`
   
   `sudo npm install node`
   
   `sudo npm install exec`
   
   `sudo npm install url`

   `sudo npm install http`

4) Create LOAPI server run file, give it executable permissions, and start it running.

   `sudo vi loapi_server.js` --> input loapi_server code from this repo, remembering to change the `host`, `port` and `command` variables as well as the `keys` array. Note, the `host` and `port` are the local IP and port the server will bind to, the `command` is the bash command that will be run locally when `action1` is called, and the `keys` array is a list of permitted API keys for authentication purposes.
   
   `sudo chmod +x loapi_server.js`
   
   `sudo node loapi_server.js`

5) Test & Play

    - Make a call to your server with `http://<ip>:<port>/loapi?api_key=<key>&call=action1`.

    - If the API key was correct, you should receive a "200 OK - Authenticated Successfully" message in JSON, and, if the call was recognised, confirmation that triggering it was a success.
    - If the API key was incorrect and authentication fails you will receive a "401 Unauthorised", again, in JSON. Likewise, if the call is not recognised, the status of the call will not return back as a success.
   
⚠️ WARNING: Not for production use due to limited security measures. Be sure to implement TLS at a minimum.

# Notes
There was tons of :duck:, trust me. #NotADeveloper.
