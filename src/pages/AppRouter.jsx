import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const { getGlobal } = window.require("@electron/remote");
var ReadProperties = getGlobal('ReadProperties');
var GetServerFile = getGlobal('GetServerFile');
var GlobalEvent = getGlobal('events');

GlobalEvent.on("downloading", (event) => {
    console.log(event);
});

console.log(new GetServerFile("1.9").getServerFile());

var rpt = new ReadProperties();
var str = "#Minecraft server properties\n#Thu Jul 01 16:21:07 CST 2021\nbroadcast-rcon-to-ops=true\nview-distance=10\nenable-jmx-monitoring=false\nserver-ip=\nresource-pack-prompt=\nrcon.port=25575\ngamemode=survival\nserver-port=25565\nallow-nether=true\nenable-command-block=true\nenable-rcon=false\nsync-chunk-writes=true\nenable-query=false\nop-permission-level=4\nprevent-proxy-connections=false\nresource-pack=\nentity-broadcast-range-percentage=100\nlevel-name=world\nrcon.password=\nplayer-idle-timeout=0\nmotd=3ZH-Studio SMP\nquery.port=25565\nforce-gamemode=false\nrate-limit=0\nhardcore=false\nwhite-list=false\nbroadcast-console-to-ops=true\npvp=true\nspawn-npcs=true\nspawn-animals=true\nsnooper-enabled=true\ndifficulty=hard\nfunction-permission-level=2\nnetwork-compression-threshold=256\ntext-filtering-config=\nrequire-resource-pack=false\nspawn-monsters=true\nmax-tick-time=60000\nenforce-whitelist=false\nuse-native-transport=true\nmax-players=20\nresource-pack-sha1=\nspawn-protection=0\nonline-mode=true\nenable-status=true\nallow-flight=false\nmax-world-size=29999984";
console.log(rpt.parse(str), rpt.stringify(rpt.parse(str)));

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;