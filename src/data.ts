const C = "https://cdn.prod.website-files.com/6aac3de75c3080e8a5e2e348/";
export const img = (f: string, w?: number) =>
  C + (w ? f.replace(/\.(jpg|png)$/, `-p-${w}.$1`) : f);

export const LOGO_DARK = C + "6ab2e8bfaf6a147032a634d4_Untitled%20design%20(2).png";
export const LOGO_LIGHT = C + "6ab2d35901e2aa83dfd762d8_Untitled%20design%20(3).png";
export const FEATURE = C + "6ab44b60a0c4c08cfa71e2a8_Untitled%20design%20(5).png";
export const ESTIMATE_URL = "https://trimlight.com/get-a-quote";
export const PHONE = "(501) 722-2336";
export const EMAIL = "info@diamondstatetrimlight.com";
export const FB = "https://www.facebook.com/p/Diamond-State-Trimlight-61594132567919/";
export const IG = "https://www.instagram.com/diamondstatetrimlight/";

export type Shot = { src: string; full: string; title: string; tag: string };
const mk = (f: string, title: string, tag: string, big = true): Shot => ({
  src: big ? img(f, 1600) : C + f,
  full: big ? img(f, 2000) : C + f,
  title,
  tag,
});

export const shots: Shot[] = [
  mk("6ac0091fc36a7a3c95dc2bc7_final%20try-7.jpg", "Evening Glow", "Residential"),
  mk("6ac0091d967d1baba44747ef_final%20try-9.jpg", "Roofline Accent", "Residential"),
  mk("6ac0091e349a8e538f30bed8_final%20try.jpg", "Warm White Welcome", "Everyday"),
  mk("6ac0091f21f225eab896c2e3_final%20try-6.jpg", "Peak & Gable", "Residential"),
  mk("6ac0091efbee7f2ecb29da24_final%20try-11.jpg", "Color Story", "Holiday"),
  mk("6ac006e6dbbe2166bfa4e8cb_18.jpg", "Lakeside Lines", "Residential"),
  mk("6ac0091f7f7bcb080fc4cec0_final%20try-3.jpg", "Festive Patterns", "Holiday"),
  mk("6ac0091f4fb285b018a50178_final%20try-2.jpg", "Night Showstopper", "Everyday"),
  mk("6ac00b1963b91403ef36cad8_main%20page%20-%20fall.jpg", "Autumn Hues", "Seasonal", false),
  mk("6ac0091dfbee7f2ecb29d9f3_final%20try-10.jpg", "Clean Architecture", "Residential", false),
  mk("6ac0091e31a7b316e22b63b5_final%20try-15.jpg", "Security Lighting", "Everyday", false),
  mk("6ac0091d26c95142f9632d2c_final%20try-14.jpg", "Panoramic Trim", "Residential", false),
  mk("6ac0091e941780ec88b28b8a_final%20try-8.jpg", "Game Day Colors", "Events", false),
  mk("6ac01b81a1ab8e9f87672647_Snowy.jpg", "Snowy Night", "Holiday", false),
];
