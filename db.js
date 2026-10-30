
const Database=require('better-sqlite3'),path=require('path'),fs=require('fs');
const dir=path.join(__dirname,'data');fs.mkdirSync(dir,{recursive:true});
const db=new Database(path.join(dir,'gbs.sqlite'));db.pragma('journal_mode=WAL');db.pragma('foreign_keys=ON');
db.exec(`
CREATE TABLE IF NOT EXISTS teams(id INTEGER PRIMARY KEY,name TEXT NOT NULL,slug TEXT UNIQUE NOT NULL,logo_url TEXT,captain TEXT NOT NULL,discord_id TEXT NOT NULL,region TEXT NOT NULL,mode TEXT NOT NULL,roster_json TEXT NOT NULL DEFAULT '[]',contact TEXT,status TEXT NOT NULL DEFAULT 'pending',created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS tournaments(id INTEGER PRIMARY KEY,name TEXT NOT NULL,slug TEXT UNIQUE NOT NULL,description TEXT,status TEXT DEFAULT 'upcoming',scoring_json TEXT NOT NULL,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS match_results(id INTEGER PRIMARY KEY,tournament_id INTEGER NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,team_id INTEGER NOT NULL REFERENCES teams(id),match_label TEXT NOT NULL,placement INTEGER NOT NULL,kills INTEGER NOT NULL,placement_points INTEGER NOT NULL,kill_points INTEGER NOT NULL,total_points INTEGER NOT NULL,is_manual INTEGER DEFAULT 0,note TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP,updated_at TEXT DEFAULT CURRENT_TIMESTAMP,UNIQUE(tournament_id,team_id,match_label));
CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY,actor TEXT,action TEXT,entity_type TEXT,entity_id INTEGER,before_json TEXT,after_json TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
`);
const defaultScoring={placementPoints:{1:25,2:23,3:20,4:18,5:16,6:14},killPoints:1,killsEligiblePlacements:[1,2,3,4,5,6],noPointsPlacements:[7,8,9,10,11,12]};
if(!db.prepare('SELECT COUNT(*) n FROM tournaments').get().n)db.prepare('INSERT INTO tournaments(name,slug,description,status,scoring_json) VALUES(?,?,?,?,?)').run('GBS Season 1','gbs-season-1','Torneo inicial','upcoming',JSON.stringify(defaultScoring));
module.exports={db,defaultScoring};
