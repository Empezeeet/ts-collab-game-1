


export function updateEnergyBar(energy: number): void {
    const energyBar: HTMLElement | null = document.getElementById("energybar");
    if (energyBar === null) return;

    if (energy < 0) return;
    if (energy > 10) return;
    // remove energry points from bar (clear the bar);
    energyBar.textContent = "";
    let energryPoint = document.createElement("div");
    energryPoint.className = "energypoint";
    for (let i = 0; i< energy; i++) {
        energyBar.appendChild(energryPoint);
    }



}