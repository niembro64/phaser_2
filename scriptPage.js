const onClickHandler = () => {
    console.log("CLICK");
};

const c = document.getElementById("controls");

let htmlString = "";

for (let i = 0; i < numPlayers; i++) {
    htmlString += `
    <ul class="created">
        <li>P${i + 1}<li>
        <li>&nbsp;&nbsp;&nbsp;↑: ${String.fromCharCode(p[i].keyboard.up)}</li>
        <li>&nbsp;&nbsp;&nbsp;↓: ${String.fromCharCode(p[i].keyboard.down)}</li>
        <li>&nbsp;&nbsp;&nbsp;←: ${String.fromCharCode(p[i].keyboard.left)}</li>
        <li>&nbsp;&nbsp;&nbsp;→: ${String.fromCharCode(
            p[i].keyboard.right
        )}</li>
        <li>FAST: ${String.fromCharCode(p[i].keyboard.fast)}</li>
        <li>JUMP: ${String.fromCharCode(p[i].keyboard.jump)}</li>
    </ul>
    `;
    console.log(i);
}

c.innerHTML = htmlString;
