chrome.runtime.sendMessage(['useCustom', 'color', 'greyRead'], function(response) {
    const opts = response.opts

    const observer = new window.MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const target = mutation.target;
            if (target.classList.contains("entry")
                && (!opts.greyRead || target.classList.contains("unread"))) {
                const title = target.querySelector("a.title").innerText.split(" ")[0];
                const color = (opts.useCustom) ? opts.color : stringToColor(title || "");

                target.querySelector(".visual.placeholder").style.setProperty("background-color", color);
            }
        });
    });

    observer.observe(document.getElementById('box'), { childList: true, subtree: true });
});

function stringToColor(str) {
    var hash = 0;
    var i = 0;
    for (i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
}
