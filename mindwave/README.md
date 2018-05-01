# MindWave Demo

The MindWave demo uses a NeuroSky MindWave device and a Raspberry Pi as a Internet of Things device.


## Requirements:

 * [Raspberry Pi 3](http://www.newark.com/raspberry-pi/2773729/sbc-arm-cortex-a53-1gb-sdram/dp/49AC7637)/[Raspberry Pi Zero W](https://www.adafruit.com/product/3400) - Bluetooth support is required to communicate with the MindWave
 * [NeuroSky MindWave Mobile](https://www.amazon.com/NeuroSky-80013-001-MindWave-Headset/dp/B00A2UQUXY/)
 * 8GiB SD card for [Raspbian OS](https://www.raspberrypi.org/downloads/raspbian/) - Your decision on desktop support vs no desktop, no desktop recommended for Raspberry Pi Zero W

## Directions:

The author is using a Raspberry Pi Zero W without the desktop for documentation purposes

 1. Download [Raspbian Stretch Lite](https://downloads.raspberrypi.org/raspbian_lite_latest) to your machine
 2. [Flash the image](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) using Etcher
    * Note: You don't have to unzip the image to use Etcher. Just drag and drop the zip file into Etcher
 3. Setup WiFi for headless operation:
    * Unplug and plug back in the SD card so your machine recoginzes the new file system
    * There should be a boot partition that we can place a wpa_supplicant.conf file
    * Sample config:
      ```
      ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
       update_config=1
       country=«your_ISO-3166-1_two-letter_country_code»
       network={
         ssid="«your_SSID»"
         psk="«your_PSK»"
         key_mgmt=WPA-PSK
       }
       ```
 4. Setup SSH to access the Pi remotely:
    * Create a new file on the boot partition named ssh. There doesn't have to be any content in the file for it to work
 5. Unmount the SD card and insert it into the Pi Zero and power the Pi Zero
 6. Look at your DHCP leases to identify what IP address the Pi Zero was assigned
 7. Login via SSH:
    * Username: pi
    * Password: raspberry
 8. Change the password:
    * Type: `passwd`
    * Type: `raspberry`
    * Type in a new password the same way twice
 9. Update the Pi:
    * Type: `sudo apt-get update`
    * Type: `sudo apt-get upgrade -y`
 10. Reboot the pi to make sure that any updated kernel is in use
     * Type: `sudo reboot`
 11. Login via SSH:
     * Username: pi
     * Password: «Your new password»
 12. Install YottaDB (backend & frontend)
     * Type: `curl -s -L https://raw.githubusercontent.com/YottaDB/YottaDB/master/sr_unix/ydbinstall.sh -o ydbinstall`
     * Type: `chmod +x ydbinstall`
     * Type: `sudo ./ydbinstall --utf8 default`
     * Type: `sudo ln -s $(ls -1 /usr/local/lib/yottadb) /usr/local/lib/yottadb/current`
     * Type: `sudo ln -s /usr/local/lib/yottadb/current/libyottadb.so /usr/local/lib`
     * Type: `sudo ldconfig`
 13. Retrieve MindWave demo source code (backend & frontend)
     * Type: `sudo apt-get install git -y`
     * Type: `mkdir -p ~/Projects`
     * Type: `cd Projects`
     * Type: `git clone https://github.com/YottaDB/YottaDBDemos.git`
 14. Install node.js (backend & frontend)
     * Type: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
     * Type: `export NVM_DIR="$HOME/.nvm"`
     * Type: `source "$NVM_DIR/nvm.sh"`
     * Type: `nvm install --lts`
 15. Setup MindWave IoT database (backend)
     * Type: `cd YottaDBDemos/mindwave/backend`
     * Type: `source ydbenv`
     * Type: `mumps -run GDE < gde`
     * Type: `mupip create`
 16. Pair MindWave device (backend)
     * Type: `sudo bluetoothctl`
     * Type: `agent on`
     * Type: `default-agent`
     * Type: `scan on`
     * You should see a line like:
       ```
       [NEW] Device 24:71:89:E9:51:48 MindWave Mobile
       ```
     * Type: `pair «your MindWave MAC address»`
     * Type: `exit`
     * Type: `sudo rfcomm bind /dev/rfcomm0 «your MindWave MAC address» 1`
 17. Install & Start the MindWave process (backend)
     * Type: `cd ~/Projects/YottaDBDemos/mindwave/backend`
     * Type: `npm install`
     * Type: `node index.js`
 18. Install QEWD (frontend)
     * Note: This can be done on either the same machine or a different one depending on your configuration
     * Type: `cd ~/Projects/YottaDBDemos/mindwave/frontend`
     * Type: `npm install`
     * Type: `cp node_modules/qewd-monitor/www/{bundle.js,*.html,*.css} www/qewd-monitor`
     * Type: `cp node_modules/ewd-client/lib/proto/ewd-client.js www`
 19. Setup MindWave IoT database (frontend)
     * Type: `cd ~/Projects/YottaDBDemos/mindwave/frontend`
     * Type: `source ydbenv`
     * Type: `mumps -run GDE < gde`
     * Type: `mupip create`
 20. Start QEWD
     * Type: `cd ~/Projects/YottaDBDemos/mindwave/frontend`
     * Type: `node qewd-ydb.js`
     * Make sure that the QEWD-Monitor application and API calls return no errors:
       * In a web browser open: «your Pi Zero IP address»:8080/qewd-monitor/ Password: keepThisSecret! You should be able to login to the application successfully
       * In a web browser open: «your Pi Zero IP address»:8080/api/db/MindWave/list You should see "No MindWave Documents exist".
 20. Run full application
     In one terminal window (backend):
     * Turn on and put on the MindWave device
     * Type: `sudo rfcomm bind /dev/rfcomm0 «your MindWave MAC address» 1`
     * Type: `cd ~/Projects/YottaDBDemos/mindwave/backend`
     * Type: `source ydbenv`
     * Type: `./replication_start`
     * Type: `node index.js`

     In another terminal window (frontend):
     * Type: `cd ~/Projects/YottaDBDemos/mindwave/frontend`
     * Type: `source ydbenv`
     * Type: `./replication_start`
     * Type: `node qewd-ydb.js`
     Open http://«your Pi Zero IP address»:8080/mindwave/ in your web browser

# Self Contained Demo

The entire demo can be put on a Raspberry Pi Zero (both front and backend) with a 2.8" LCD screen attached to the header pins and configured as an access point to be used at conferences, etc.

This requires the normal rapbian image with a gui vs stretch lite.

## Additional item

 * [iUniker 2.8" Raspberry Pi Zero Touchscreen](https://www.amazon.com/Raspberry-iUniker-2-8-inch-Resolution-Touchscreen/dp/B07567M2NW)

## Directions

 * Follow main directions above to get the demo working
 * Add the following to `/etc/rc.local`
   ```
   # Start mindwave backend
   cd /home/pi/Projects/YottaDBDemos/mindwave/backend/
   su pi -c ./mindwave_start
   cd /home/pi/Projects/YottaDBDemos/mindwave/frontend/
   su pi -c ./mindwave_start
   ```
 * Add the following to `/home/pi/.config/lxsession/LXDE-pi/autostart`
   ```
   @chromium-browser --kiosk http://localhost:8080/mindwave/chernoff.html
   ```
 * Move wifi configuration to a backup file as it can't be used when running as an access point
   * Type: `sudo mv /etc/wpa_supplicant/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf.old`
 * [Setup the Raspberry Pi Zero as an access point](https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md)
 * Modify chrome preferences so that it doesn't want to restore pages on starup:
   * Type: `vi ~/.config/chromium/Default/Preferences`
   * Search for: `exit_type`
   * Make sure that the value (in JSON format) for `exit_type` is `none`
   * Make sure that the value for `exited_cleanly` is `true`
   * Save and quit
 