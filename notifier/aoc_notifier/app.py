"""
The idea is to run this in the background (launch on startup) 
and it will notify you when it's 12:00 AM EST (Advent of Code daily challenge time)
"""

import datetime
import platform
import time
from pathlib import Path

import pytz

if platform.system() == "Windows":
    from win11toast import toast
else:
    from plyer import notification

    toast = notification.notify

EST_TZ = pytz.timezone("US/Eastern")
image = str(Path("aoc.png").absolute())


def notify(current_time_est: datetime.datetime):
    if platform.system() == "Windows":
        toast(
            "Time for Advent of Code 🎄!",
            "Open day {} challenge".format(current_time_est.day),
            icon=image,
            on_click="https://adventofcode.com/{}/day/{}".format(
                current_time_est.year, current_time_est.day
            ),
            audio="ms-winsoundevent:Notification.Looping.Call7",
        )
    else:
        toast(
            title="Time for Advent of Code 🎄",
            message="Day {} challenge is out now!".format(current_time_est.day),
            app_name="AoC",
            app_icon=str(Path("aoc.ico").absolute()),
            timeout=10,
            ticker="AoC",
        )


def main():
    while True:
        if datetime.datetime.now().month != 12 or 26 < datetime.datetime.now().day < 1:
            time.sleep(60 * 60 * 24)  # next day
            continue

        current_time_est = datetime.datetime.now(EST_TZ)
        # 12:00 AM EST
        if (
            current_time_est.hour == 0
            and current_time_est.minute == 0
            and current_time_est.second == 0
        ):
            notify(current_time_est)
            time.sleep(60 * 60 * 24)  # next day
        else:
            time.sleep(30 * 60)  # 30 minutes


# pyinstaller -F -w -i "aoc.ico" --clean -n "AoC" --add-data "aoc.ico;." --add-data "aoc.png;." app.py
