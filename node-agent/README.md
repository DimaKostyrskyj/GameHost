# GameHost Node Agent

This small service runs on a VPS/node next to Docker. Vercel must NOT run game containers itself.

## Install

```bash
cd /opt/gamehost-node-agent
npm install
export NODE_AGENT_TOKEN='change-me-to-a-long-random-secret'
export NODE_NAME='node-eu-01'
export GAMEHOST_DATA_DIR='/opt/gamehost/servers'
npm start
```

Open only the agent port to the GameHost web app (preferably behind HTTPS/reverse proxy or a private network). Put the same URL/token in the web app as `NODE_AGENT_URL` and `NODE_AGENT_TOKEN`.

Supported templates in this first version: Valheim, Minecraft and Rust. The Docker images are configurable in `server.mjs`.
