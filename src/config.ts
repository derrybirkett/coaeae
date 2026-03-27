export const SITE = {
  website: "https://coaeae.vercel.app/", // replace with your deployed domain
  author: "Derry Birkett",
  profile: "https://github.com/derrybirkett",
  desc: "Confessions of an English API Eater — developer writing by Derry Birkett.",
  title: "Confessions of an English API Eater",
  ogImage: "og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/derrybirkett/coaeae/edit/main/src/data/blog/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Europe/London",
} as const;
