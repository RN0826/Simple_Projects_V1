import pyttsx3 as tts
# pyttsx3 is a text-to-speech conversion library in Python. Unlike alternative libraries, it works offline, and is compatible with both Python 2 and 3.
# pyttsx3 -> text to speech conversion library.

book = open(r"D:\Pycharm\Simple Projects V1\random_text")


# checking if file can be accessed
# if book:
#     print('success')
#

# reading the lines from given file
# readlines() returns a list of any data type,
# in this case list of string(s),
# which is stored in book_readLines
book_readLines = book.readlines()
# text-to-speech initialization
tts_start = tts.init()
# loop to read each word in the file
for words in book_readLines:
    tts_start.say(words)
    tts_start.runAndWait()
