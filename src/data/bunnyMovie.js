export const getBunnyVideoUrl = (tmdbId) => {
  const movieMap = {
    299536: "https://your-bunny-cdn.net/videos/avengers.mp4",
    567189: "https://your-bunny-cdn.net/videos/superman.mp4",
    1426776: "https://curemindset.b-cdn.net/movies/Straw.mp4", // STRAW
    23705:"https://curemindset.b-cdn.net/movies/A%20BETTER%20WAY%20TO%20DIE%20-%20JOVAN.mp4",//better way to die
    1448938:"https://curemindset.b-cdn.net/movies/Abduct%20(2025)%20kevin.mp4",// Abduct
    416153:"https://curemindset.b-cdn.net/movies/Arctic%20Dogs%20by%20Vj%20Kevo.mp4", // Arctic Dogs
    159024:"https://curemindset.b-cdn.net/movies/ASS.BACKWARDS___VJ%20KRIS%20SWEET.mp4",//Ass backwards
    208242:"https://curemindset.b-cdn.net/movies/ASSASSINS%20TALE%20-%20.HD.mp4",//Assassins Tale
    115265: "https://curemindset.b-cdn.net/movies/AZAAD%202%20VJ%20JINGO%202025.mp4",//Azaad
    10045: "https://curemindset.b-cdn.net/movies/B.13.PART%2001.___KK.THE%20BEST.mp4",//B13
    482088:"https://curemindset.b-cdn.net/movies/BETTER%20START%20RUNNING___VJ%20KRIS%20SWEET.mp4",//Better start running
    1229730:"https://curemindset.b-cdn.net/movies/Carjackers%20ICE%20P.mp4",//car jackers
    713364:"https://curemindset.b-cdn.net/movies/CLOWN%20IN%20A%20CORNFIELD%20JR.mp4",//Clown in a Cornfield JR
    158426:"https://curemindset.b-cdn.net/movies/COLLISION%202022.___VJ%20KRIS%20SWEET.mp4",//Collision 2022
    1127110:"https://curemindset.b-cdn.net/movies/DIABLO%20JR.mp4",//Diablo JR
    302946:"https://curemindset.b-cdn.net/movies/THE%20ACCOUNTANT%202____VJ%20JR.2025.mp4",//Accountant 2

    // Add more mappings as you upload
  };
  return movieMap[tmdbId] || null;
};
