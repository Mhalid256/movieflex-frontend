// bunnyMovie.js
export const movieMap = {
  299536: "https://your-bunny-cdn.net/videos/avengers.mp4",
  567189: "https://your-bunny-cdn.net/videos/superman.mp4",
  1426776: "https://curemindset.b-cdn.net/movies/STRAW%20___VJ%20JR.2025.mp4",
  23705: "https://curemindset.b-cdn.net/movies/A%20BETTER%20WAY%20TO%20DIE%20-%20JOVAN.mp4",
  1448938: "https://curemindset.b-cdn.net/movies/Abduct%20(2025)%20kevin.mp4",
  416153: "https://curemindset.b-cdn.net/movies/Arctic%20Dogs%20by%20Vj%20Kevo.mp4",
  159024: "https://curemindset.b-cdn.net/movies/ASS.BACKWARDS___VJ%20KRIS%20SWEET.mp4",
  208242: "https://curemindset.b-cdn.net/movies/ASSASSINS%20TALE%20-%20.HD.mp4",
  115265: "https://curemindset.b-cdn.net/movies/AZAAD%202%20VJ%20JINGO%202025.mp4",
  10045: "https://curemindset.b-cdn.net/movies/B.13.PART%2001.___KK.THE%20BEST.mp4",
  482088: "https://curemindset.b-cdn.net/movies/BETTER%20START%20RUNNING___VJ%20KRIS%20SWEET.mp4",
  1229730: "https://curemindset.b-cdn.net/movies/Carjackers%20ICE%20P.mp4",
  713364: "https://curemindset.b-cdn.net/movies/CLOWN%20IN%20A%20CORNFIELD%20JR.mp4",
  158426: "https://curemindset.b-cdn.net/movies/COLLISION%202022.___VJ%20KRIS%20SWEET.mp4",
  1127110: "https://curemindset.b-cdn.net/movies/DIABLO%20JR.mp4",
  1416745: "https://curemindset.b-cdn.net/movies/THE%20ACCOUNTANT%202____VJ%20JR.2025.mp4",
  1061474: "https://curemindset.b-cdn.net/movies/SUPERMAN.MAN%20OF%20TOMORROW%20___VJ%20KEVO.mp4",
  1087891: "https://curemindset.b-cdn.net/movies/THE%20AMATEUR%20JR.mp4",
  132284: "https://curemindset.b-cdn.net/movies/LADY%20CHATTERLEY'S%20LOVER%20JR.mp4",
  580077: "https://curemindset.b-cdn.net/movies/NOTHING%20TO%20LOSE%20JR.mp4",
  441288: "https://curemindset.b-cdn.net/movies/SECRET%20OFTHE%20UNICORN%202025%20HD%20%20VJ%20NEIL.mp4",
  1233413: "https://curemindset.b-cdn.net/movies/SINNERS%20JR.mp4",
  1261050: "https://curemindset.b-cdn.net/movies/The.Quiet.Ones%20ICE%20P.mp4",
  628900: "https://curemindset.b-cdn.net/movies/THE%20CONTRACTOR%20.2010%20-%20JINGO.mp4",
  131631: "https://curemindset.b-cdn.net/movies/THE%20HUNGER%20GAMES%20MOCKINGJAY%2002.___VJ%20ICE%20P.mp4",
  11459: "https://curemindset.b-cdn.net/movies/Sky-High_720p%20VJ%20SOUL.mp4",
  
};

export const getBunnyVideoUrl = (tmdbId) => {
  return movieMap[tmdbId] || null;
};

export const hasBunnyVideo = (tmdbId) => {
  return movieMap.hasOwnProperty(tmdbId);
};
