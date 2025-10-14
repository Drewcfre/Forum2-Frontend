let hue = document.getElementById("hue_slider")

hue.oninput = function() {
    document.getElementById("current_hue").innerHTML = "Hue: " + (hue.value - 240)
    document.documentElement.style.setProperty("--hue", hue.value)
}

function resetHue() {
    document.getElementById("hue_slider").value = 240;
    document.getElementById("current_hue").innerHTML = "Hue: 0";
    document.documentElement.style.setProperty("--hue", 240);
}