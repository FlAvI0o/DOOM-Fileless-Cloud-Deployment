import storage
import board
import digitalio

# GP0 TO GDN = SAFE MODE (Pin 1)
switch = digitalio.DigitalInOut(board.GP0)
switch.direction = digitalio.Direction.INPUT
switch.pull = digitalio.Pull.UP

# LOGICA:
# Se la graffetta C'È (GP0 collegato a GND), switch.value è False.
# Se la graffetta NON c'è, switch.value è True.

if switch.value:
    # MODALITÀ ATTACCO: Nessuna graffetta
    # Nasconde il disco CIRCUITPY al PC
    storage.disable_usb_drive()
    print("Modalità Attacco: Disco nascosto")
else:
    # MODALITÀ MODIFICA: Graffetta inserita
    # Il disco CIRCUITPY appare normalmente sul PC
    storage.enable_usb_drive()
    print("Modalità Modifica: Disco visibile")