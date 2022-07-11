const onClickHandler = () => {
    console.log("CLICK");
};

const c = document.getElementById("controls");

let htmlString = "";

players.forEach((p, i) => {
    if (i === 3) {
        htmlString += `
        <ul class="created">
            <li>P${i + 1}<li>
            <li>&nbsp;&nbsp;&nbsp;UP: UP</li>
            <li>&nbsp;DOWN: DOWN</li>
            <li>&nbsp;LEFT: LEFT</li>
            <li>RIGHT: RIGHT</li>
            <li>&nbsp;FAST: END</li>
            <li>&nbsp;JUMP: PAGEDOWN</li>
        </ul>`;
    } else {
        htmlString += `
    <ul class="created">
    <li>P${i + 1}<li>
    <li>&nbsp;&nbsp;&nbsp;UP: ${String.fromCharCode(p.keyboard.up)}</li>
    <li>&nbsp;DOWN: ${String.fromCharCode(p.keyboard.down)}</li>
    <li>&nbsp;LEFT: ${String.fromCharCode(p.keyboard.left)}</li>
    <li>RIGHT: ${String.fromCharCode(p.keyboard.right)}</li>
        <li>&nbsp;FAST: ${String.fromCharCode(p.keyboard.fast)}</li>
        <li>&nbsp;JUMP: ${String.fromCharCode(p.keyboard.jump)}</li>
    </ul>
    `;
    }
});

c.innerHTML = htmlString;
