# DOOM Fileless Cloud Deployment

An experimental volatile execution framework designed to initialize, decrypt, and dynamically compile the legacy *DOOM* engine inside system buffers via an hardware-level HID vector and an asynchronous cloud distribution infrastructure.

> **Disclaimer:** This repository is published strictly for academic research, reverse-engineering study, and operating system analysis within isolated, controlled testing environments.

---

## 1. System Architecture

The architecture bypasses persistent storage constraints and evades standard disk allocation monitoring by never staging static binaries on the host system. The runtime relies entirely on a remote cloud distribution pipeline coupled with local in-memory compilation.

[ Hardware Trigger (HID) ]
│
▼
[ Volatile Terminal (PowerShell) ] ───( Fetch Base64 )───> [ Cloudflare Infrastructure ]
│
▼
[ Dynamic C# Compiler ] ───( Decrypt & Build )───> [ System RAM / %TEMP% ] ───> Run DOOM


---

## 2. Execution Chain Mechanics

The runtime lifecycle executes through four discrete, consecutive logical stages:

### A. Hardware Injection Trigger
The execution chain is initiated via a physical impulse at the hardware layer. Utilizing a microcontroller configured as an absolute HID (Human Interface Device), the system emulates a high-frequency keystroke injector to force-open an isolated PowerShell instance, bypassing standard user environments (`-noprofile`).

### B. Cloud-Agnostic Payload Fetching
The localized terminal contains zero pre-allocated exploit code. It establishes an asynchronous request to a remote serverless runtime infrastructure (Cloudflare) acting as a decentralized data store, pulling down the target binary payloads previously obfuscated and serialized into **Base64** text streams.

### C. sRDI & In-Memory Logic (The Assembly Bottleneck)
The framework attempts a pure **sRDI (Shellcode Reflective DLL Injection)** pipeline. Using a custom Python conversion script, the custom-compiled DOOM DLL is decoupled and packed alongside a position-independent bootstrap loader into a raw binary vector (`.bin`). 

* **The Operational Blueprint:** The staging script is architected to execute this `.bin` straight into the host's volatile memory. The embedded bootstrap acts as a manual PE Parser, designed to map sections, resolve the Import Address Table (IAT), and jump directly to the target exported function without triggering standard OS library loaders.
* **The Privilege & Architectural Wall:** In native execution environments, this pure fileless layer faced runtime halts due to strict memory permissions (DEP) and missing administrative elevation required to partition RAM for an entire graphic engine context. 
* **The Volatile EXE Fallback:** To bypass these active host restrictions without dropping the non-persistent design, the framework can fallback to generating an ephemeral standalone `.exe` inside the transient `%TEMP%` directory, offloading the heavy PE parsing and graphic library dependencies to the native Windows subsystem.

### D. Transient Execution Sandbox
Writing final binary segments to the `%TEMP%` or `/tmp` directories makes this execution technically partially fileless. 

While an sRDI bootstrap loader is already embedded within the compiled `.bin`, a fully fileless execution remains restricted. This is because the generic loader stub lacks the advanced implementation required to map complex Win32/graphic subsystem dependencies and handle the strict memory permissions (DEP) enforced on non-privileged user threads. 

To achieve a 100% fileless state, the existing PE loader stub must be customized to resolve these specific engine runtime requirements straight into RAM. In its current state, the project falls back to an ephemeral `.exe` inside `%TEMP%`, ensuring the OS handles the graphic subsystem naturally.

---

## 3. Core Technology Stack

* **Hardware Layer:** Microcontroller HID Emulation Firmware
* **Orchestration / Scripting:** PowerShell Core Pipeline (`-noprofile` mode)
* **Compilation Engine:** C# / .NET Native In-Memory Compiler
* **Distribution Layer:** Cloudflare Edge Infrastructure (Base64 Stream Hosting)
* **Target Application:** DOOM Source Engine, personally compiled into a dynamic library (DLL) and converted to a raw binary (`.bin`) payload. Built using:
  * Core package: [Chocolate Doom Source](https://github.com/chocolate-doom/chocolate-doom)
  * Game assets (IWAD): [Fraggle's Miniwad Engine Assets](https://github.com/fragglet/miniwad.git)

---

## 4. Repository Status & Post-Mortem

This framework is currently maintained as a **Conceptual Blueprint / Isolated Laboratory Module**. The code stands as a proof-of-concept demonstrating the theoretical efficacy of zero-disk-footprint asynchronous execution chains, serving as technical documentation for advanced explorations into volatile runtime systems.
