export interface RadarData {
  name: string;
  score: number;
}

export interface Agent {
  name: string;
  code: string;
  category: string;
  level: string;
  industry: string;
  title: string;
  data_source: string;
  mbti: string;
  tools: string;
  skills: string;
  description: string;
  welcome: string;
  background: string;
  top_card?: string;
  top_avatar?: string;
  card: string;
  avatar: string;
  pop_up_card?: string;
  popularity?: number;
  radarData: RadarData[];
}

export interface TeamMember extends Agent {
  // 团队成员继承Agent的所有属性
}

export interface Team {
  team_name: string;
  code: string;
  team_description: string;
  team_level: string;
  team_category: string;
  team_avatar: string;
  welcome: string;
  popularity: number;
  team_members: TeamMember[];
}

export interface AgentData {
  solo: Agent[];
  team: {
    [key: string]: Team;
  };
}

