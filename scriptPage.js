const onClickHandler = () => {
    console.log("CLICK");
};

const c = document.getElementById("controls");

let htmlString = "";

for (let i = 0; i < numPlayers; i++) {
    if (i === 3) {
        htmlString += `
        <ul class="created">
            <li>P${i + 1}<li>
            <li>&nbsp;&nbsp;&nbsp;↑: ↑</li>
            <li>&nbsp;&nbsp;&nbsp;↓: ↓</li>
            <li>&nbsp;&nbsp;&nbsp;←: ←</li>
            <li>&nbsp;&nbsp;&nbsp;→: →</li>
            <li>FAST: END</li>
            <li>JUMP: PAGE ↓</li>
        </ul>`

    } else {
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
    }
}

c.innerHTML = htmlString;
