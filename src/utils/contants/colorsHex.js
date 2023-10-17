export const PATH_BG_COLOR = '/src/assets/bgImages/'

export const LIST_COLORS_HEX = {
  skyBlueColor:"#228cd5",
  blueColor:"#0b50af",
  purpleColor:"#674284",
  violetColor:"#a869c1",
  orangeColor:"#ef763a",
  pinkColor:"#f488a6",
  greenColor:"#3fa495",
  brownBlueColor:"#762a14",
  darkBlueColor:"#374866",
  mustardColor:"#d29034",
  limeGreenColor:"#4bbf6b",
  turquoiseColor:"#00aecc",
  grayColor:"#838c91",
  pinkDarkColor:"#cd5a91",
  brownColor:"#b04632"
}

export const LIST_COLORS_STAGES = {
  grayColor:"#656f7d",
  brownColor:"#aa8d80",
  violetColor:"#b660e0",
  pinkColor:"#ee5e99",
  redColor:"#d33d44",
  orangeColor:"#e16b16",
  yellowColor:"#f8ae00",
  greenColor:"#008844",
  minColor:"#64c6a2",
  tailColor:"#0f9d9f",
  azureBlueColor:"#1090e0",
  blueColor:"#4466ff",
  purpleColor:"#5f55ee"
}

export const DEFAULT_COLORS_LAYOUT = {
  siderbar:{
    backgroundColor:"#fff",
    color:"#44546f"
  },
  header:{
    backgroundColor:"#353B48",
    color:"#f3f3f3"
  },
  content:{
    backgroundColor:"#f3f3f3"
  },
  board:{
    header:{
      backgroundColor:"#fff",
      color:"#44546f"
    }
  },
}

const IDS_LIST_TOPICS = {
  BG_BLUE_GRADIENT:"BG_BLUE_GRADIENT",
  BG_PINK_GRADIENT:"BG_PINK_GRADIENT",
  BG_BLUEPURPLE_GRADIENT:"BG_BLUEPURPLE_GRADIENT",
  BG_ORANGE_GRADIENT:"BG_ORANGE_GRADIENT",
  BG_BROWN_GRADIENT:"BG_BROWN_GRADIENT",
  BG_DARKBLUE_GRADIENT:"BG_DARKBLUE_GRADIENT",
  BG_GREEN_GRADIENT:"BG_GREEN_GRADIENT",
  BG_SKYBLUE_GRADIENT:"BG_SKYBLUE_GRADIENT",
  BG_VIOLET_GRADIENT:"BG_VIOLET_GRADIENT",
  BG_COLOR_VIOLET:"BG_COLOR_VIOLET",
  BG_COLOR_PINK:"BG_COLOR_PINK",
  BG_COLOR_LIMEGREEN:"BG_COLOR_LIMEGREEN",
  BG_COLOR_MUSTARD:"BG_COLOR_MUSTARD",
  BG_COLOR_TURQUOISE:"BG_COLOR_TURQUOISE",
  BG_COLOR_GRAY:"BG_COLOR_GRAY",
  BG_COLOR_PINKDARK:"BG_COLOR_PINKDARK",
  BG_COLOR_BROWN:"BG_COLOR_BROWN",
  BG_COLOR_ORANGE:"BG_COLOR_ORANGE",
}

export const LIST_MANE_GRADIENTS_COLORS_ITEMS = [
  {
    id:IDS_LIST_TOPICS.BG_BLUE_GRADIENT,
    nameBackgroundImage:'bg-blue.svg',
    backgroundColor:LIST_COLORS_HEX.blueColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#0C66E4;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#09326C;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
  {
    id:IDS_LIST_TOPICS.BG_PINK_GRADIENT,
    nameBackgroundImage:'bg-pink.svg',
    backgroundColor:LIST_COLORS_HEX.pinkColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#E774BB;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#F87462;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
  {
    id:IDS_LIST_TOPICS.BG_BLUEPURPLE_GRADIENT,
    nameBackgroundImage:'bg-bluePurple.svg',
    backgroundColor:LIST_COLORS_HEX.purpleColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#09326C;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#CD519D;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
  {
    id:IDS_LIST_TOPICS.BG_ORANGE_GRADIENT,
    nameBackgroundImage:'bg-orange.svg',
    backgroundColor:LIST_COLORS_HEX.orangeColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#E34935;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#FAA53D;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
  {
    id:IDS_LIST_TOPICS.BG_BROWN_GRADIENT,
    nameBackgroundImage:'bg-brown.svg',
    backgroundColor:LIST_COLORS_HEX.brownBlueColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#43290F;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#AE2A19;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
  {
    id:IDS_LIST_TOPICS.BG_DARKBLUE_GRADIENT,
    nameBackgroundImage:'bg-darkBlue.svg',
    backgroundColor:LIST_COLORS_HEX.darkBlueColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#505F79;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#172B4D;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
  {
    id:IDS_LIST_TOPICS.BG_GREEN_GRADIENT,
    nameBackgroundImage:'bg-green.svg',
    backgroundColor:LIST_COLORS_HEX.greenColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#1F845A;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#60C6D2;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
  {
    id:IDS_LIST_TOPICS.BG_SKYBLUE_GRADIENT,
    nameBackgroundImage:'bg-img-skyBlue.svg',
    backgroundColor:LIST_COLORS_HEX.skyBlueColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#0C66E4;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#37B4C3;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },

  {
    id:IDS_LIST_TOPICS.BG_VIOLET_GRADIENT,
    nameBackgroundImage:'bg-violet.svg',
    backgroundColor:LIST_COLORS_HEX.violetColor,
    svgBackgroundImage:`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="gradient"
          x1="0%"
          y1="0%"
          x2="80%"
          y2="116%"
        >
          <stop offset="2%" style="stop-color:#6E5DC6;stop-opacity:1;" />
          <stop offset="100%" style="stop-color:#E774BB;stop-opacity:1;" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" y="0" x="0" fill="url(#gradient)" />
    </svg>
  `
  },
]

export const LIST_MANE_BG_COLORS_ITEMS = [
  {
    id:IDS_LIST_TOPICS.BG_COLOR_VIOLET,
    backgroundColor:LIST_COLORS_HEX.violetColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_PINK,
    backgroundColor:LIST_COLORS_HEX.pinkColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_LIMEGREEN,
    backgroundColor:LIST_COLORS_HEX.limeGreenColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_MUSTARD,
    backgroundColor:LIST_COLORS_HEX.mustardColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_TURQUOISE,
    backgroundColor:LIST_COLORS_HEX.turquoiseColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_GRAY,
    backgroundColor:LIST_COLORS_HEX.grayColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_PINKDARK,
    backgroundColor:LIST_COLORS_HEX.pinkDarkColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_BROWN,
    backgroundColor:LIST_COLORS_HEX.brownColor
  },
  {
    id:IDS_LIST_TOPICS.BG_COLOR_ORANGE,
    backgroundColor:LIST_COLORS_HEX.orangeColor
  },
]
