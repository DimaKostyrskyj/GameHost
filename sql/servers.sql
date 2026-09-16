CREATE TABLE IF NOT EXISTS game_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(64) NOT NULL,
  game VARCHAR(32) NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'stopped' CHECK (status IN ('provisioning','running','stopped','restarting','error')),
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
