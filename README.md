# OS Process Visualizer — Nothing Design Edition

An interactive educational suite for visualizing Operating System concepts, specifically focusing on why multiple processes can execute the same program and how isolation is maintained.

##  How to Run
This project is now composed of standalone HTML files for maximum portability and zero dependencies. No installation is required.

Simply open any of the following files in a modern web browser:

- **`visualizer.html`**: Interactive simulation of CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin).
- **`isolation_visualizer.html`**: Visualizes the creation of separate virtual address spaces for multiple instances of the same program.
- **`explanation_visuals.html`**: A structured deep-dive into the "Program vs. Process" theory and the "Wall of Isolation."
- **`master_view.html`**: A high-level architectural map showing the full flow from User Space $\rightarrow$ Kernel $\rightarrow$ Hardware.


##  Note
These are visual simulations designed to model OS behavior in a browser for educational purposes. They demonstrate the logic of an Operating System without requiring a real kernel environment.
