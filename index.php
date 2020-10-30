<html>
<head>
    <link rel="stylesheet" href="./assets/css/style.css">
    <script src="./assets/js/main.js"></script>
    <link rel="shortcut icon" href="https://caltrop.dev/favicon.png" type="image/png">
<?php
$type = $_GET["type"];
function addTag($name, $prefix = "", $prop = "property", $val = null) {
    if($val == null) $val = $_GET[$name];
    if($val) echo '<meta ' . $prop . '="' . $prefix . $name . '" content="' . htmlspecialchars($val) . '"/>';
};
if($type) {
    addTag("theme-color", null, "name");
    addTag("url", "og:", "property", "https://caltrop.dev/");
    echo '<meta charset="UTF-8" />';

    $img = $_GET["url"];
    echo '<meta content="' . ($img != null ? htmlspecialchars($img) : "https://caltrop.dev/embed/1x1trans.png") . '" property="og:image" />';
    
    if($type == "oembed") {
        echo '<link type="application/json+oembed" href="https://caltrop.dev/embed/oembed?' . $_SERVER['QUERY_STRING'] .'" />';
    } else if($type == "meta") {
        foreach(array("title", "site_name", "image", "description") as $_type) {
            addTag($_type, "og:", "property");
        };
    }
} else {
    addTag('title', 'og:', 'property', 'Discord Embed Generator');
    addTag('site_name', 'og:', 'property', 'Caltrop');
    addTag('description', 'og:', 'property', 'Easily create ToS-friendly Discord Embeds!');
    addTag("theme-color", null, "name", "#ff0093");
    echo '<title>Discord Embed Generator</title>';
}
?>
</head>
<body>
    <noscript>Please enable javascript!</noscript>
    <header class="unselectable">
        <h2>Discord Embed Generator</h2>
        <p>Easily create ToS-friendly Discord Embeds! Simply copy the link below into any channel.</p>
        <p>All source code is available on <a href="https://github.com/CaltropUwU/Discord-Embed-Generator">GitHub</a>.</p>
    </header>
    <form id="inputForm"></form>
    <div class="output">
        <h1 class="unselectable">Link</h1>
        <div>
            <button id="copyText" class="unselectable">Copy</button>
            <input id="outputSection" type="text">
        </div>
    </div>
</body>
</html>