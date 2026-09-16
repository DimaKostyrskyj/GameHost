CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (LOWER(email));
CREATE INDEX IF NOT EXISTS users_username_idx ON users (LOWER(username));

-- Future GameHost tables can be added here:
-- servers, nodes, games, plans, subscriptions, payments, backups, etc.

CREATE TABLE IF NOT EXISTS game_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(64) NOT NULL,
  game VARCHAR(32) NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'provisioning' CHECK (status IN ('provisioning','running','stopped','restarting','error')),
  region VARCHAR(32) NOT NULL DEFAULT 'eu-central',
  ram_mb INTEGER NOT NULL DEFAULT 2048,
  cpu_cores INTEGER NOT NULL DEFAULT 2,
  disk_gb INTEGER NOT NULL DEFAULT 20,
  port INTEGER,
  node_id UUID,
  container_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS game_servers_user_idx ON game_servers(user_id);
CREATE INDEX IF NOT EXISTS game_servers_status_idx ON game_servers(status);
