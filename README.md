# DOOM Fileless Cloud Deployment

An experimental volatile execution framework designed to initialize, decrypt, and execute the legacy *DOOM* engine inside transient system buffers via an hardware-level HID vector and an asynchronous cloud distribution infrastructure.

> **Disclaimer:** This repository is published strictly for academic research, reverse-engineering study, and operating system analysis within isolated, controlled testing environments.

---

## 1. System Pipeline

| Stage | Component | Operation |
| :--- | :--- | :--- |
| **1. Trigger** | Hardware Layer (HID) | Emulates high-frequency keystrokes to force-open an isolated terminal (`-noprofile`). |
| **2. Fetch** | Cloud Infrastructure | Pulls down the obfuscated engine payloads serialized into **Base64** text streams. |
| **3. Build** | In-Memory Engine | Decodes the incoming vectors directly within volatile memory buffers. |
| **4. Execute** | Volatile Target | Runs the engine via an ephemeral fallback or localized memory mapping. |

---

## 2. Execution Vectors

The framework architecture supports two distinct operational paths depending on host subsystem constraints:

### Vector A: Pure sRDI Pipeline (`.bin`)
* **Mechanism:** Uses a custom Python script to pack the compiled DOOM DLL with a position-independent bootstrap loader.
* **Logic:** The bootstrap acts as a manual PE Parser in RAM, mapping sections and resolving the Import Address Table (IAT) without native OS loaders.
* **Constraint:** Strict Data Execution Prevention (DEP) and graphic driver isolation often halt this layer for complex interactive software without root access.

### Vector B: Transient Subsystem Fallback (`.exe`)
* **Mechanism:** Dynamically assembles an ephemeral, standalone binary inside the transient `%TEMP%` or `/tmp` directory.
* **Logic:** Offloads heavy Win32, audio, and display driver hooks to the native Windows execution subsystem.
* **Footprint:** Partially fileless. Upon process termination or system reboot, the environment decays completely, leaving zero forensic artifacts.

---

## 3. Technology Stack

* **Hardware Layer:** Microcontroller HID Emulation Firmware
* **Orchestration:** PowerShell Core Pipeline (`-noprofile`)
* **Distribution:** Cloudflare Edge Infrastructure (Base64 Stream Hosting)
* **Target Application:** DOOM Source Engine (Personally compiled dynamic library)
  * *Core Package:* [Chocolate Doom](https://github.com/chocolate-doom/chocolate-doom)
  * *Game Assets:* [Fraggle's Miniwad](https://github.com/fragglet/miniwad.git)
  
> 🛠️ **Build Note:** The DOOM engine was **personally compiled from source** into a custom DLL(/mt), then serialized via Python into raw binary data.
---

## 4. Status

This framework is maintained exclusively as a **Conceptual Blueprint / Isolated Laboratory Module** documenting the boundaries of zero-disk-footprint execution chains.