# Audio Book Generator

A simple Python application that converts text from a file into spoken audio using the `pyttsx3` text-to-speech library.

## Requirements

Install the required dependency:

```bash
pip install pyttsx3
```

## Project Structure

```text
Audio_Book_Generator/
│
├── README.md
├── sample_text.txt
├── audio_book.py
│
└── Legacy/
    └── audio_book_v0.py
```

## Running the Program

```bash
python audio_book.py
```

The program will read the contents of `sample_text.txt` and speak them aloud using your system's default voice.

## Notes

- Works offline.
- Uses the `pyttsx3` text-to-speech engine.
- The text file can be modified to contain any content you want read aloud.

## Version History

### Version 0

Initial working prototype.

**Characteristics:**

- Uses a hardcoded file path
- Reads text line-by-line
- Calls the speech engine for each line
- Created while learning file handling and text-to-speech basics

### Version 1

Refactored implementation.

**Improvements:**

- Uses `pathlib` for improved portability
- Reads the entire file at once
- Cleaner code organization
- Improved comments and documentation
- Better project structure
