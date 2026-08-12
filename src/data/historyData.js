export const historyData = {
  2024: {
    world: "Total solar eclipse crossed North America",
    culture: "Inside Out 2 became the highest-grossing animated film"
  },
  2023: {
    world: "India became the 4th country to land on the Moon with Chandrayaan-3",
    culture: "Barbenheimer phenomenon took global box office by storm"
  },
  2022: {
    world: "James Webb Space Telescope released its first deep space images",
    culture: "Avatar: The Way of Water premiered worldwide"
  },
  2021: {
    world: "NASA's Perseverance rover successfully landed on Mars",
    culture: "Spider-Man: No Way Home broke global pandemic box office records"
  },
  2020: {
    world: "Global shift to remote living & working reshaping technology",
    culture: "Parasite won Best Picture at the 92nd Academy Awards"
  },
  2019: {
    world: "First-ever image of a black hole captured by Event Horizon Telescope",
    culture: "Avengers: Endgame became the highest-grossing film of all time"
  },
  2018: {
    world: "SpaceX launched Falcon Heavy carrying Elon Musk's Tesla Roadster",
    culture: "Black Panther revolutionized superhero cinema"
  },
  2017: {
    world: "Total solar eclipse visible across the entire continental United States",
    culture: "Nintendo Switch was released globally to massive acclaim"
  },
  2016: {
    world: "LIGO detected gravitational waves confirming Einstein's general relativity",
    culture: "Pokémon GO became a unprecedented worldwide mobile gaming craze"
  },
  2015: {
    world: "Paris Climate Agreement was adopted by 196 nations",
    culture: "Star Wars: The Force Awakens returned to theatres"
  },
  2014: {
    world: "ESA's Rosetta spacecraft landed the Philae probe on comet 67P",
    culture: "Frozen's 'Let It Go' became a global pop culture sensation"
  },
  2013: {
    world: "Voyager 1 officially became the first human-made object to enter interstellar space",
    culture: "GTA V released, becoming the fastest-selling entertainment product in history"
  },
  2012: {
    world: "CERN scientists discovered the Higgs Boson particle",
    culture: "Gangnam Style became the first YouTube video to hit 1 billion views"
  },
  2011: {
    world: "Curiosity Rover launched towards Mars",
    culture: "Minecraft was officially released out of beta"
  },
  2010: {
    world: "Apple introduced the first iPad",
    culture: "Inception captivated moviegoers worldwide"
  },
  2009: {
    world: "Kepler Space Telescope launched to search for Earth-size exoplanets",
    culture: "Avatar shattered global box office records with 3D technology"
  },
  2008: {
    world: "Large Hadron Collider at CERN turned on for the first time",
    culture: "The Dark Knight redefined modern cinema"
  },
  2007: {
    world: "Steve Jobs introduced the first iPhone to the world",
    culture: "Harry Potter and the Deathly Hallows book released"
  },
  2006: {
    world: "Pluto was reclassified as a dwarf planet by the IAU",
    culture: "YouTube was acquired by Google for $1.65 billion"
  },
  2005: {
    world: "YouTube was founded by three former PayPal employees",
    culture: "Xbox 360 released launching the next generation of console gaming"
  },
  2004: {
    world: "Facebook was launched from a Harvard dorm room",
    culture: "The Incredibles was released in theatres"
  },
  2003: {
    world: "Human Genome Project was officially completed",
    culture: "Finding Nemo won the hearts of audiences worldwide"
  },
  2002: {
    world: "The Euro currency was introduced into physical circulation in Europe",
    culture: "Spider-Man featuring Tobey Maguire premiered"
  },
  2001: {
    world: "Wikipedia was officially launched to the public",
    culture: "The Lord of the Rings: The Fellowship of the Ring hit theatres"
  },
  2000: {
    world: "International Space Station welcomed its first long-term crew",
    culture: "PlayStation 2 was released becoming the best-selling console ever"
  },
  1999: {
    world: "World population officially surpassed 6 billion people",
    culture: "The Matrix hit theatres changing cinema visual effects forever"
  },
  1998: {
    world: "Google was incorporated as a private company by Larry Page and Sergey Brin",
    culture: "Titanic won 11 Academy Awards"
  },
  1997: {
    world: "Mars Pathfinder landed on Mars and deployed the Sojourner rover",
    culture: "Harry Potter and the Philosopher's Stone was published"
  },
  1996: {
    world: "Dolly the Sheep became the first mammal cloned from an adult somatic cell",
    culture: "Nintendo 64 launched with Super Mario 64"
  },
  1995: {
    world: "eBay and Amazon began transforming global e-commerce",
    culture: "Toy Story released as the first full-length computer-animated feature"
  },
  1994: {
    world: "Netscape Navigator web browser was released ushering in the web era",
    culture: "The Lion King became a global animated classic"
  },
  1993: {
    world: "European Union was formally established with the Maastricht Treaty",
    culture: "Jurassic Park broke all box office records"
  },
  1992: {
    world: "The first SMS text message was sent: 'Merry Christmas'",
    culture: "Aladdin debuted with Robin Williams as the Genie"
  },
  1991: {
    world: "The World Wide Web became publicly available on the Internet",
    culture: "Nirvana released 'Nevermind' redefining rock music"
  },
  1990: {
    world: "Hubble Space Telescope was launched into low Earth orbit",
    culture: "Home Alone captivated holiday audiences worldwide"
  }
};

export const getHistoryForYear = (year) => {
  if (historyData[year]) return historyData[year];
  
  // Default fallback for historical context
  return {
    world: `Humanity expanded its scientific, technological, and cultural frontiers in ${year}.`,
    culture: `Artists, innovators, and creators shaped the landmark events of ${year}.`
  };
};
