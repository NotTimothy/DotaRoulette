interface Hero {
  name: string;
  value: number;
}

interface HeroDetails {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  legs: number;
  image_url: string;
}

interface HeroStats {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  base_attack_time: number;
  attack_point: number;
  move_speed: number;
  // turn_rate:f32,
  cm_enabled: boolean;
  // legs: i32,
  day_vision: number;
  night_vision: number;
  //hero_id: i32,
  turbo_picks: number;
  turbo_wins: number;
  pro_ban: number;
  pro_win: number;
  pro_pick: number;
}

export {
  Hero,
  HeroDetails,
  HeroStats,
}
