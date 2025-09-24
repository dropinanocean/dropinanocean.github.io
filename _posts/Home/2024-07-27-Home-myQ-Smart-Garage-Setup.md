---
layout: post
title:  "myQ Smart Garage Set-up"
image: /assets/images/myq.jpg
categories: home
---

## myQ Smart Garage Set-up

---

**In my home, I have a LiftMaster garage door opener labeled with *myQ*. This opener has smart home capabilities, but it doesn’t have a built-in Wi-Fi module. Only models labeled *myQ Wi-Fi* can connect directly to the myQ app by Chamberlain. I needed an ad-hoc solution to add smart control to my garage door.**

To achieve that, I bought a [Chamberlain MYQ-G0401 Wireless Smart Garage Hub](https://www.amazon.ca/dp/B08GD3D9YJ?ref=ppx_yo2ov_dt_b_product_details&th=1). It cost me $42.98 CAD before tax and $45.13 CAD after tax.

### The package included
- Smart Garage Hub, power adapter, and mounting hardware
- Garage Door Sensor

---

### Installation
First, I found a spot with an electrical outlet in my garage. I drilled a couple of holes using my [Dewalt drill](https://www.amazon.ca/gp/product/B01KZNDYT0/ref=ppx_od_dt_b_asin_title_s01?ie=UTF8&th=1) and mounted the hub bracket.

Chamberlain support once told me that a door sensor wasn’t required for *myQ-labeled* garage door openers, since they can communicate directly with the hub.

From this [Reddit post](https://www.reddit.com/r/homeautomation/comments/1dvzoow/what_does_a_chamberlain_garage_door_sensor_do/), here’s the technical explanation:

> The MyQ hub has two RF communication links with the garage door opener (GDO). One is the basic RF control interface around 315 MHz, the other is a dedicated 900 MHz two-way data link.
>
> On older GDOs (without the MyQ logo), the hub only uses the 315 MHz command link—like an old-school remote. That’s one-way only, so it has no idea of the door state. The sensor is needed to detect open/close status.
>
> On newer GDOs (with the MyQ logo), the hub and opener use the 900 MHz two-way link. The opener reports its status (open/closed/opening/closing), so the sensor isn’t needed.

However, after powering up the Smart Hub and connecting it to Wi-Fi, the myQ app would not let me skip pairing the door sensor. I gave up on trying to bypass it and simply attached the door sensor with the included 3M strips. I also removed the battery tab to activate it.

---

### Syncing the Opener
With the hub and sensor set up, the final step was pairing the garage door opener.

My LiftMaster opener (ceiling-mounted) has a **yellow Learn button**. I grabbed a ladder, pressed the button once (a short press—holding it clears all codes), and the light began blinking. Then I followed the in-app steps to complete synchronization. They connected successfully.

---

### Features After Setup
After a week of use, here’s what the myQ app can do:

1. Report how long the garage door has been open or closed
2. Send notifications whenever the door is opened or closed
3. Open or close the garage door remotely
4. Custom notifications (e.g., I set one to email me if the door is open longer than 5 minutes)
5. App-only access (no web portal, iOS/Android only)
6. Add co-owners, so actions are logged under their names
7. Guest access with timed permissions (not tested yet)
8. No Alexa or Google Assistant support
9. Integration with Amazon Key for in-garage deliveries (I don’t use this feature)

---

**Verdict:**
So far, I like it. The peace of mind alone is worth it—if I ever forget to close the garage door, I can simply check the app and close it remotely.
