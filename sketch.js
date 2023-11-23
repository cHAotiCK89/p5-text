let palette;
let offset;
let w;
let dir;
let str = "縺ｫ縺�ｽ厄ｽゑｼ幢ｽ厄ｽ�ｽゅ↓�";
let str2 = "縺｣縺ｿ縺帙≠�搾ｽ�ｼ啗ieo";
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  textFont("游明朝体");
  noSmooth();
  offset = 0;
  palette = random(colorScheme).colors.concat();
  dir = int(random(4));
  str = str2Array(str);
  str2 = str2Array(str2);
}

function str2Array(str) {
  arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str.substr(i, 1));
  }
  return arr;
}

function draw() {
  background(0);
  randomSeed(231025);
  w = sqrt(sq(width) + sq(height));
  push();
  translate(width / 2, height / 2);
  rotate(-45);
  translate(-w / 2, -w / 2);
  recursiveRect(0,0,w,w, 2);
  pop();

  let t = (frameCount / 150) % 1;
  if (t == 0) {
    dir = int(noise(frameCount) * 4);
  }
  t = easeInOutCirc(t);
    let g = get();
    blendMode(BLEND);
    background(0, 0, 0);
    // blendMode(ADD);

    if (dir == 0) {
      image(g, 0 + width * t, 0);
      image(g, -width + width * t, 0);
    } else if (dir == 1) {
      image(g, width - width * t, 0);
      image(g, 0 - width * t, 0);
    } else if (dir == 2) {
      image(g, 0, height - height * t);
      image(g, 0, 0 - height * t);
    } else if (dir == 3) {
      image(g, 0, 0 + height * t, 0);
      image(g, 0, -height + height * t, 0);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = sqrt(sq(width) + sq(height));
  offset = 0;
}

function recursiveRect(x, y, w, h, depth) {
  if (depth < 0) return;
  let rsx = random(10000);
  let rsy = random(10000);
  let t =
    (x + w / 2 - offset + (y - offset + h / 2) * (width - offset * 2)) /
    ((width - offset * 2) * (height - offset * 2));
  let nw = (sin(rsx + y / 10 + t * 360 + frameCount/3) / 2 + 0.5) * w;
  let nh = (cos(rsy + x / 10 + t * 360 + frameCount/2) / 2 + 0.5) * h;

  if (depth == 0) {
    drawRect(x, y, nw, nh, t);
    drawRect(x + nw, y, w - nw, nh, t);
    drawRect(x, y + nh, nw, h - nh, t);
    drawRect(x + nw, y + nh, w - nw, h - nh, t);
  } else {
    recursiveRect(x, y, nw, nh, depth - 1);
    recursiveRect(x + nw, y, w - nw, nh, depth - 1);
    recursiveRect(x, y + nh, nw, h - nh, depth - 1);
    recursiveRect(x + nw, y + nh, w - nw, h - nh, depth - 1);
  }
}

function drawRect(x, y, w, h, t) {
  let v = ((x + y * width) / (width * height) + t) % 1;
  v += min(w / h, h / w) % 1;
  v = map(sin(easeInOutCirc(v) * 180), -1, 1, 0, 1);
  push();
  translate(x + w / 2, y + h / 2);
  let colors = shuffle(palette.concat());
  let rotate_num = int(random(4));
  let scale_num = int(random(4));
  textStyle(random([BOLD, NORMAL, ITALIC, BOLDITALIC]));
  if (rotate_num % 2 == 1) {
    let tmp = w;
    w = h;
    h = tmp;
  }
  let ni = int(random(str.length));

  rotate_num *= 90;
  // scale(scale_num > 2 ? 1 : -1, scale_num % 2 == 0 ? 1 : -1);
  rotate(rotate_num);
  rectMode(CENTER);
  let black_white = random() > 0.5;
  let horizontal_vertical = random() > 0.5;
  if (min(w, h) > 5 && max(w, h) > 10) {
    push();
    fill(0, 0, black_white ? 0 : 100);
    noStroke();
    rect(0, 0, w - 2, h - 2);
    drawingContext.clip();
    translate(-w / 2, -h / 2);
    let n = 0;
    if (w < h) {
      while (n < h) {
        push();
        translate(w / 2, n + w / 2);
        textSize(w * 0.8);
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0, 0, black_white ? 100 : 0);        
        if (w > 10) text(str2[ni++ % str2.length], 0, 0);
        pop();
        n += w;
      }
    } else {
      while (n < w) {
        push();
        translate(n + h / 2, h / 2);
        textSize(h * 0.8);
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0, 0, black_white ? 100 : 0);        
        if (h > 10) text(str[ni++ % str.length], 0, 0);
        pop();
        n += h;
      }
    }
    pop();
  }else{
    
  }
  pop();
}

let colorScheme = [
  {
    name: "Benedictus",
    colors: ["#F27EA9", "#366CD9", "#5EADF2", "#636E73", "#F2E6D8"],
  },
  {
    name: "Cross",
    colors: ["#D962AF", "#58A6A6", "#8AA66F", "#F29F05", "#F26D6D"],
  },
  {
    name: "Demuth",
    colors: ["#222940", "#D98E04", "#F2A950", "#BF3E21", "#F2F2F2"],
  },
  {
    name: "Hiroshige",
    colors: ["#1B618C", "#55CCD9", "#F2BC57", "#F2DAAC", "#F24949"],
  },
  {
    name: "Hokusai",
    colors: ["#074A59", "#F2C166", "#F28241", "#F26B5E", "#F2F2F2"],
  },
  {
    name: "Hokusai Blue",
    colors: ["#023059", "#459DBF", "#87BF60", "#D9D16A", "#F2F2F2"],
  },
  {
    name: "Java",
    colors: ["#632973", "#02734A", "#F25C05", "#F29188", "#F2E0DF"],
  },
  {
    name: "Kandinsky",
    colors: ["#8D95A6", "#0A7360", "#F28705", "#D98825", "#F2F2F2"],
  },
  {
    name: "Monet",
    colors: ["#4146A6", "#063573", "#5EC8F2", "#8C4E03", "#D98A29"],
  },
  {
    name: "Nizami",
    colors: ["#034AA6", "#72B6F2", "#73BFB1", "#F2A30F", "#F26F63"],
  },
  {
    name: "Renoir",
    colors: ["#303E8C", "#F2AE2E", "#F28705", "#D91414", "#F2F2F2"],
  },
  {
    name: "VanGogh",
    colors: ["#424D8C", "#84A9BF", "#C1D9CE", "#F2B705", "#F25C05"],
  },
  {
    name: "Mono",
    colors: ["#D9D7D8", "#3B5159", "#5D848C", "#7CA2A6", "#262321"],
  },
  {
    name: "RiverSide",
    colors: ["#906FA6", "#025951", "#252625", "#D99191", "#F2F2F2"],
  },
];

function setGradientGraphics(c1, c2, c3, target, i) {
  let gradient = target.drawingContext.createLinearGradient(
    0,
    0,
    0,
    target.height
  );
  gradient.addColorStop(0, c1);
  gradient.addColorStop(1, c2);
  gradient.addColorStop(1 / 2, c3);
  target.drawingContext.fillStyle = gradient;
  target.noStroke();
  target.rect(i, 0, 1, target.height);
}

function easeInOutCirc(x) {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

function easeInOutElastic(x) {
  const c5 = (2 * Math.PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}
