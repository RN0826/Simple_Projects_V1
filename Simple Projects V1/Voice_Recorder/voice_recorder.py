import sounddevice as sd
import vlc
from scipy.io.wavfile import write as swrite


def play_audio(mp3_file):
    audio_file = vlc.MediaPlayer(mp3_file)

    stop = False
    while stop is False:
        player_response = int(input('Enter 0 to play the audio file\n1 to stop'))
        if player_response == '0':
            audio_file.play()
        if player_response == '1':
            stop = True


fs = 44100  # sample_rate

time_second = int(input('Enter time duration in second(s):\n>'))  # enter required recording time
print("Recording....\n")
record_voice = sd.rec(int(time_second * fs), samplerate=fs, channels=2)
sd.wait()
swrite("out.mp3", fs, record_voice)

print("Completed....\nPlease Check your recording...")
play_audio("out.mp3")