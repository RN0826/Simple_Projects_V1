"""
Audio Book Generator

Reads text from a file and converts it to speech using the
pyttsx3 text-to-speech engine.

Requirements:
    pip install pyttsx3
"""

from pathlib import Path

import pyttsx3


# Locate the text file stored alongside this script.
TEXT_FILE = Path(__file__).parent / "sample_text.txt"


# Initialize the text-to-speech engine.
engine = pyttsx3.init()


# Read the entire contents of the text file.
with open(TEXT_FILE, "r", encoding="utf-8") as book:
    content = book.read()


# Convert the text into speech.
engine.say(content)
engine.runAndWait()

