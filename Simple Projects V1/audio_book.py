import pyttsx3 as tts

book = open(r"D:\Pycharm\Simple Projects V1\random_text")


#
# if book:
#     print('success')
#

book_readLines = book.readlines()
# text-to-speech initialization
tts_start = tts.init()
for words in book_readLines:
    tts_start.say(words)
    tts_start.runAndWait()