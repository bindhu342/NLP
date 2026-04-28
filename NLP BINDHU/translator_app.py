import tkinter as tk
from tkinter import ttk, messagebox
import threading
import os
import tempfile
import speech_recognition as sr
from googletrans import Translator
from gtts import gTTS
import pygame
import time

# Initialize Translator and Mixer
# Note: googletrans==4.0.0-rc1 is usually the most stable version
translator = Translator()
pygame.mixer.init()

LANGUAGES = {"English": "en", "Tamil": "ta"}

def translate_text(text, src, dest):
    try:
        # result.text is the correct way to access the translated string
        result = translator.translate(text, src=src, dest=dest)
        return result.text
    except Exception as e:
        return f"Error: {str(e)}"

def speak_text(text, lang_code):
    def _speak():
        try:
            tts = gTTS(text=text, lang=lang_code)
            
            # Using a suffix ensures pygame can identify the file type
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as f:
                tmp_path = f.name

            tts.save(tmp_path)

            pygame.mixer.music.load(tmp_path)
            pygame.mixer.music.play()

            while pygame.mixer.music.get_busy():
                pygame.time.Clock().tick(10)

            # Essential cleanup for Windows to allow file deletion
            pygame.mixer.music.stop()
            pygame.mixer.music.unload() 
            
            time.sleep(0.5) # Short buffer for the OS to release the file
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

        except Exception as e:
            messagebox.showerror("Speech Error", f"Could not play audio: {e}")

    threading.Thread(target=_speak, daemon=True).start()

def recognize_speech(lang_code):
    recognizer = sr.Recognizer()
    # Mapping for Google Speech Recognition codes
    lang_map = {"en": "en-US", "ta": "ta-IN"}
    
    with sr.Microphone() as source:
        status_var.set("Listening...")
        root.update()
        try:
            # Adjust for ambient noise for better accuracy
            recognizer.adjust_for_ambient_noise(source, duration=1)
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=10)
            
            status_var.set("Processing speech...")
            root.update()
            
            text = recognizer.recognize_google(audio, language=lang_map[lang_code])
            status_var.set("Ready")
            return text
        except sr.WaitTimeoutError:
            status_var.set("Ready")
            messagebox.showwarning("Timeout", "No speech detected.")
        except sr.UnknownValueError:
            status_var.set("Ready")
            messagebox.showwarning("Error", "Could not understand audio.")
        except Exception as e:
            status_var.set("Ready")
            messagebox.showerror("Mic Error", str(e))
    return ""

def on_translate():
    text = input_text.get("1.0", tk.END).strip()
    if not text:
        messagebox.showwarning("Input", "Please enter text to translate.")
        return
    
    src = LANGUAGES[src_lang.get()]
    dest = LANGUAGES[dest_lang.get()]
    
    if src == dest:
        messagebox.showwarning("Language", "Source and destination must differ.")
        return

    def _run_translation():
        try:
            status_var.set("Translating...")
            result = translate_text(text, src, dest)
            
            output_text.config(state=tk.NORMAL)
            output_text.delete("1.0", tk.END)
            output_text.insert(tk.END, result)
            output_text.config(state=tk.DISABLED)
            status_var.set("Translation complete.")
        except Exception as e:
            messagebox.showerror("Translation Error", str(e))
            status_var.set("Ready")

    # Run translation in thread to keep UI responsive
    threading.Thread(target=_run_translation, daemon=True).start()

def on_speak_input():
    text = input_text.get("1.0", tk.END).strip()
    if text:
        speak_text(text, LANGUAGES[src_lang.get()])

def on_speak_output():
    text = output_text.get("1.0", tk.END).strip()
    if text:
        speak_text(text, LANGUAGES[dest_lang.get()])

def on_mic_input():
    def _listen():
        text = recognize_speech(LANGUAGES[src_lang.get()])
        if text:
            input_text.delete("1.0", tk.END)
            input_text.insert(tk.END, text)
    threading.Thread(target=_listen, daemon=True).start()

def swap_languages():
    src, dest = src_lang.get(), dest_lang.get()
    src_lang.set(dest)
    dest_lang.set(src)
    
    in_text = input_text.get("1.0", tk.END).strip()
    out_text = output_text.get("1.0", tk.END).strip()
    
    input_text.delete("1.0", tk.END)
    input_text.insert(tk.END, out_text)
    
    output_text.config(state=tk.NORMAL)
    output_text.delete("1.0", tk.END)
    output_text.insert(tk.END, in_text)
    output_text.config(state=tk.DISABLED)

# --- GUI Setup ---
root = tk.Tk()
root.title("English ↔ Tamil Translator")
root.resizable(False, False)
root.configure(bg="#f0f4f8")

FONT = ("Segoe UI", 11)
BTN_STYLE = {"font": FONT, "bg": "#4a90d9", "fg": "white", "relief": tk.FLAT, "padx": 8, "pady": 4, "cursor": "hand2"}

lang_options = list(LANGUAGES.keys())
src_lang = tk.StringVar(value="English")
dest_lang = tk.StringVar(value="Tamil")
status_var = tk.StringVar(value="Ready")

# UI Layout
top_frame = tk.Frame(root, bg="#f0f4f8")
top_frame.pack(pady=10, padx=20, fill=tk.X)

tk.Label(top_frame, text="From:", font=FONT, bg="#f0f4f8").pack(side=tk.LEFT)
ttk.Combobox(top_frame, textvariable=src_lang, values=lang_options, state="readonly", width=10, font=FONT).pack(side=tk.LEFT, padx=5)
tk.Button(top_frame, text="⇄ Swap", command=swap_languages, **BTN_STYLE).pack(side=tk.LEFT, padx=10)
tk.Label(top_frame, text="To:", font=FONT, bg="#f0f4f8").pack(side=tk.LEFT)
ttk.Combobox(top_frame, textvariable=dest_lang, values=lang_options, state="readonly", width=10, font=FONT).pack(side=tk.LEFT, padx=5)

text_frame = tk.Frame(root, bg="#f0f4f8")
text_frame.pack(padx=20, pady=5)

# Input Section
in_frame = tk.LabelFrame(text_frame, text="Input", font=FONT, bg="#f0f4f8", padx=5, pady=5)
in_frame.grid(row=0, column=0, padx=10)
input_text = tk.Text(in_frame, width=35, height=10, font=FONT, wrap=tk.WORD)
input_text.pack()
in_btn_frame = tk.Frame(in_frame, bg="#f0f4f8")
in_btn_frame.pack(pady=4)
tk.Button(in_btn_frame, text="🎤 Speak", command=on_mic_input, **BTN_STYLE).pack(side=tk.LEFT, padx=4)
tk.Button(in_btn_frame, text="🔊 Play", command=on_speak_input, **BTN_STYLE).pack(side=tk.LEFT, padx=4)

# Output Section
out_frame = tk.LabelFrame(text_frame, text="Output", font=FONT, bg="#f0f4f8", padx=5, pady=5)
out_frame.grid(row=0, column=1, padx=10)
output_text = tk.Text(out_frame, width=35, height=10, font=FONT, wrap=tk.WORD, state=tk.DISABLED, bg="#eaf4ea")
output_text.pack()
out_btn_frame = tk.Frame(out_frame, bg="#f0f4f8")
out_btn_frame.pack(pady=4)
tk.Button(out_btn_frame, text="🔊 Play", command=on_speak_output, **BTN_STYLE).pack(padx=4)

# Action Button
tk.Button(root, text="Translate", command=on_translate, font=("Segoe UI", 12, "bold"),
          bg="#27ae60", fg="white", relief=tk.FLAT, padx=20, pady=6, cursor="hand2").pack(pady=8)

# Footer
tk.Label(root, textvariable=status_var, font=("Segoe UI", 9), bg="#d0dce8", anchor=tk.W).pack(fill=tk.X, side=tk.BOTTOM)

root.mainloop()