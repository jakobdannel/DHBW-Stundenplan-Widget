# DHBW-Stundenplan-Widget
A script for the iOS app Scriptable, that displays a timetable for the lectures at the DHBW.

## Disclaimer

The script fetches the data from the api of the stuv.app. 
Therefore, I have no control over the correctness of any of the values shown in the widget.
Anything in the widget might be completely wrong. Always double check with the official timetable.

That being said, here's how you install the widget correctly!

## Installation Guide

1. **Download Scriptable**  
  * Go to the App Store and search for scriptable or
  * follow this link: https://apps.apple.com/de/app/scriptable/id1405459188
  * Install the app.
2. **Adding the script to Scriptable**  
  * Add a new script by clicking the (+) icon in the top right corner. 
  * Add a name for the script to easily find it later when configuring the widget.
  * Copy the contents of the DHBW-Stundenplan.js file in this repository into the editor in Scriptable.
3. **IMPORTANT: Setting your correct class**  
  * In the very first line of the script, the API URL is defined. Here, enter the same key as the one on the stuv.app webpage. 
  For example: MOS-TET20B  
  This will make sure you'll only see the classes you want.  
  * You can test the script by pressing the play button on the bottom
  right.
4. **Adding the widget**  
  * Go into the edit mode on your Home Screen.
  * Add a new Scriptable widget and select the biggest option.
  * Tap on it to bring up the options, and here, select the script you've just created in the app.  
  * Congratulations! You've successfully installed the widget.

If there are any issues or problems with the widget, please let me know, and I will try to find a fix!
