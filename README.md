# OS Process Visualizer — Nothing Design Edition

An interactive educational suite for visualizing Operating System concepts, specifically focusing on why multiple processes can execute the same program and how isolation is maintained.

## 🚀 How to Run
This project is now composed of standalone HTML files for maximum portability and zero dependencies. No installation is required.

Simply open any of the following files in a modern web browser:

- **`visualizer.html`**: Interactive simulation of CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin).
- **`isolation_visualizer.html`**: Visualizes the creation of separate virtual address spaces for multiple instances of the same program.
- **`explanation_visuals.html`**: A structured deep-dive into the "Program vs. Process" theory and the "Wall of Isolation."
- **`master_view.html`**: A high-level architectural map showing the full flow from User Space $\rightarrow$ Kernel $\rightarrow$ Hardware.

## 🎓 Presentation Flow
For the best educational impact, present the files in this order:

1. **`explanation_visuals.html`**: Start with the theory. Explain that a program is a "blueprint" and a process is a "building."
2. **`isolation_visualizer.html`**: Show the "Private World" illusion. Demonstrate how launching Word twice creates two separate address spaces.
3. **`visualizer.html`**: Move to the "Execution" phase. Show how the OS manages these processes using different scheduling algorithms.
4. **`master_view.html`**: Close the presentation by showing the full architectural flow from the user's click to the physical hardware.

## 🎨 Design Philosophy
The project uses a **"Nothing Phone"** inspired aesthetic:
- **Monochrome Palette**: Stark black and white for a clean, industrial look.
- **Nothing Typography**: Bold, geometric headers and monospaced system data.
- **Dot Matrix**: Subtle background patterns mimicking the Nothing OS interface.
- **Red Accents**: High-visibility red used strictly for critical system events (like crashes and isolation walls).

## ⚠️ Note
These are visual simulations designed to model OS behavior in a browser for educational purposes. They demonstrate the logic of an Operating System without requiring a real kernel environment.
