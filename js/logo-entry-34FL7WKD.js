import"./chunks/chunk-6DHFEWGX.js";var H={tileSize:256,logoScale:.7,finalScale:.69,logoOffset:[0,0],iconPlate:!1,keepPlate:!1,originalColors:!1,opticalDepth:1.1,dispersion:1.7,colorBleed:1.25,doubleBevel:1,bevelWidth:.14,corner:4.8,cornerPull:2.1,cornerWidth:2.2,cornerFocus:.58,edgeSmear:2.85,stretch:0,tilt:.35,bulge:1,specular:1,halo:0,shadow:1,ripple:1,bounce:0,response:.42,startSize:.2,startZoom:2.6,glide:2.3,present:2.4,drift:.12,swell:.5,focus:1,sheen:1,lightTurn:.9,hold:1,background:"#e9e9eb",plateColor:"#ffffff",logoColor:"#0e1428"},re={light:H,dark:{...H,logoScale:.72,finalScale:1,iconPlate:!0,halo:1,shadow:0,ripple:.5,startZoom:1.6,drift:.05,opticalDepth:.75,bevelWidth:.22,dispersion:.9,colorBleed:.45,corner:5,cornerPull:1.4,edgeSmear:1.2,tilt:0,cornerWidth:1.2,cornerFocus:.4,background:"#000000",plateColor:"#05070b",logoColor:"#ffffff"}},u=512,j=.75;function ne(t){return new Promise((e,a)=>{let o=new Image;t.startsWith("data:")||(o.crossOrigin="anonymous"),o.onload=()=>e(o),o.onerror=()=>a(new Error("GlassIconReveal: the logo could not be loaded")),o.src=t})}function le(t){return t.trimStart().startsWith("<")}function se(t){let e=new DOMParser().parseFromString(t,"image/svg+xml").documentElement;if(!e||e.nodeName.toLowerCase()!=="svg")throw new Error("GlassIconReveal: the SVG could not be read");let a=parseFloat(e.getAttribute("width")||""),o=parseFloat(e.getAttribute("height")||""),n=(e.getAttribute("viewBox")||"").split(/[\s,]+/).map(Number);n.length===4&&n[2]>0&&n[3]>0&&([a,o]=[n[2],n[3]]),a>0&&o>0||(a=o=100);let r=u/Math.max(a,o);e.setAttribute("width",String(Math.round(a*r))),e.setAttribute("height",String(Math.round(o*r)));let c=new XMLSerializer().serializeToString(e).replace(/currentColor/g,"#ffffff");return"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(c)}var ie=t=>le(t)?se(t):t;function ue(t,e,a){let o=document.createElement("canvas");o.width=o.height=u;let n=o.getContext("2d",{willReadFrequently:!0}),r=Math.min(u/e,u/a),c=(u-e*r)/2,i=(u-a*r)/2;n.drawImage(t,c,i,e*r,a*r);let s=n.getImageData(0,0,u,u).data,f=!0;for(let p=3;p<s.length;p+=388)if(s[p]<250){f=!1;break}let l=[s[0],s[1],s[2]],b=(p,x,d)=>Math.min(1,Math.max(0,(Math.hypot(p-l[0],x-l[1],d-l[2])/441-.08)/.2)),v=u,h=u,m=-1,w=-1;for(let p=0;p<u;p++)for(let x=0;x<u;x++){let d=(p*u+x)*4;(f?b(s[d],s[d+1],s[d+2])*255:s[d+3])>8&&(x<v&&(v=x),x>m&&(m=x),p<h&&(h=p),p>w&&(w=p))}if(m<0)throw new Error("GlassIconReveal: the logo is empty");let g=m-v+1,A=w-h+1,L=u*j/Math.max(g,A),y=document.createElement("canvas");y.width=y.height=u;let E=y.getContext("2d",{willReadFrequently:!0});if(E.imageSmoothingQuality="high",E.drawImage(t,u/2-(v+g/2-c)*L,u/2-(h+A/2-i)*L,e*r*L,a*r*L),f){let p=E.getImageData(0,0,u,u),x=p.data;for(let d=0;d<x.length;d+=4)x[d+3]=Math.round(x[d+3]*b(x[d],x[d+1],x[d+2]));E.putImageData(p,0,0)}return y}function ce(t){let e=u*u,a=t.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,u,u).data,o=1e20,n=new Float64Array(e),r=new Float64Array(e);for(let l=0;l<e;l++){let b=a[l*4+3]/255;if(b>=1)n[l]=0,r[l]=o;else if(b<=0)n[l]=o,r[l]=0;else{let v=.5-b;n[l]=v>0?v*v:0,r[l]=v<0?v*v:0}}let c=new Float64Array(u),i=new Float64Array(u+1),s=new Uint16Array(u);X(n,c,s,i,o),X(r,c,s,i,o);let f=new Float32Array(e);for(let l=0;l<e;l++)f[l]=(Math.sqrt(n[l])-Math.sqrt(r[l]))/u;return f}function X(t,e,a,o,n){for(let r=0;r<u;r++)K(t,r,u,e,a,o,n);for(let r=0;r<u;r++)K(t,r*u,1,e,a,o,n)}function K(t,e,a,o,n,r,c){n[0]=0,r[0]=-c,r[1]=c,o[0]=t[e];for(let i=1,s=0,f=0;i<u;i++){o[i]=t[e+i*a];let l=i*i;do{let b=n[s];f=(o[i]-o[b]+l-b*b)/(i-b)/2}while(f<=r[s]&&--s>-1);s++,n[s]=i,r[s]=f,r[s+1]=c}for(let i=0,s=0;i<u;i++){for(;r[s+1]<i;)s++;let f=n[s],l=i-f;t[e+i*a]=o[f]+l*l}}var I=new Map;function Q(t){let e=I.get(t);return e||(e=ne(ie(t)).then(a=>{let o=ue(a,a.naturalWidth||u,a.naturalHeight||u);return{canvas:o,sdf:ce(o)}}),I.set(t,e),e.catch(()=>I.delete(t))),e}var fe=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,me=`#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uCenter;      // device px, GL coords
uniform float uTile;       // tile size, device px
uniform sampler2D uSdf;    // signed distance, texture units, + outside
uniform sampler2D uCol;    // premultiplied colour, mipmapped
uniform float uTexSize;
uniform float uBoxFrac;

uniform float uPlateScale; // plate size relative to the tile
uniform float uShapeN;     // superellipse exponent: 2 = circle
uniform float uCornerN;    // final exponent, used by the ghost
uniform float uOptics;     // 1 = full refraction, 0 = flat
uniform float uPlateAlpha; // 1 = glass shown, 0 = bare logo
uniform float uLogoHalf;   // logo half size in plate units (zoom included)
uniform vec2 uLogoOff;     // logo centre, plate units
uniform float uBold;       // stroke swell, in logo half-size units
uniform float uBlur;       // edge softness, plate units
uniform float uFrost;      // milky lift inside a young bubble
uniform float uDome;       // lens bulge height
uniform float uDrop;       // 1 while the glass is a round droplet, 0 once it has spread into the tile
uniform float uPinch;      // the face's stretch toward its corners, at the rim
uniform float uTilt;       // extra stretch of the rising diagonal's corners (0\u20131)
uniform float uRim;
uniform float uHalo;
uniform float uShadow;
uniform float uGhost;
uniform float uRipR;       // ripple radius, plate sizes
uniform float uRipA;
uniform float uBare;       // 1 once the logo may show without glass (the ending)
uniform float uReach;      // the rim band's full width, plate units
uniform float uCornerPull; // how much harder the corners pull than the sides
uniform float uStreak;     // how far a corner smears content along the rim, in band widths
uniform float uWiden;      // how much wider the folding band grows toward the corners
uniform float uSlab;       // how far the slab stands above the logo, plate units
uniform float uEtaSpread;  // index spread across the spectrum (red highest)
uniform float uFocus;      // how far in along the diagonal a corner focuses, plate units
uniform float uFocusK;     // how quickly the view slides back from the focus across the band
uniform float uFocusSplit; // how much further in red meets than violet, plate units
uniform float uRimLine;    // how far across the band the sight line takes to turn in to the focus
uniform float uCornerOn;   // 0 while the glass is round, 1 once it has spread into the tile
uniform float uDissolve;   // 0 \u2192 1 as the glass lets go of the logo
uniform float uGlow;       // colour bleed in the rim, plate units on screen
uniform float uFaceDisp;   // lateral colour across the face
uniform float uVivid;      // chroma lift of the dispersed light

uniform float uDisp;
uniform float uDouble;
uniform float uBevelW;
uniform float uSpec;
uniform float uIconPlate;
uniform float uUseColor;
uniform float uLightScene; // 1 = light backdrop, 0 = dark
uniform float uLightGlass; // the same for what the glass sits on (the plate, when there is one)
uniform float uKeep;       // 1 = the glass settles into a flat plate instead of letting go of it
uniform float uSheen;      // strength of the light band crossing the face
uniform float uSweep;      // where that band is, plate sizes along its diagonal
uniform float uLightAng;   // how far the rim light has turned, radians

uniform vec3 uBg;
uniform vec3 uPlateCol;
uniform vec3 uLogoCol;

float px; // one device pixel in plate units

vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }

// aa: footprint of one screen pixel at q, plate units.
vec4 logoAt(vec2 q, float blur, float aa) {
  float L = uLogoHalf;
  float k = 0.5 * uBoxFrac / L;
  vec2 uv = vec2(0.5 + (q.x - uLogoOff.x) * k, 0.5 - (q.y - uLogoOff.y) * k);
  float d = texture(uSdf, uv).r / k;
  float w = 0.75 * aa + blur;
  float a = 1.0 - smoothstep(-w, w, d - uBold * L);
  vec3 c = uLogoCol;
  if (uUseColor > 0.5) {
    float lod = log2(max(1.0, w * k * uTexSize));
    vec4 c0 = textureLod(uCol, uv, lod);
    vec4 c1 = textureLod(uCol, uv, lod + 3.0);
    vec4 c2 = textureLod(uCol, uv, 7.0);
    c = c2.rgb / max(c2.a, 1e-4);
    c = mix(c, c1.rgb / max(c1.a, 1e-4), smoothstep(0.0, 0.06, c1.a));
    c = mix(c, c0.rgb / max(c0.a, 1e-4), smoothstep(0.02, 0.3, c0.a));
  }
  return vec4(c, a);
}

// Superellipse field. Returns signed distance (plate units, \u2212 inside); g = 1 on the rim.
float shape(vec2 p, float scale, float n, out vec2 nOut, out float g, out vec2 dg) {
  vec2 pp = p / scale;
  vec2 a = max(abs(pp), vec2(1e-6));
  g = pow(pow(a.x, n) + pow(a.y, n), 1.0 / n);
  dg = sign(pp) * pow(a, vec2(n - 1.0)) * pow(max(g, 1e-6), 1.0 - n);
  float dgl = max(length(dg), 1e-6);
  nOut = dg / dgl;
  return (g - 1.0) / dgl * scale;
}

// Curvature radius (plate units) of the shape's contour through p.
float contourRadius(vec2 p, float scale, float n) {
  vec2 a = max(abs(p / scale), vec2(1e-4));
  vec2 a1 = pow(a, vec2(n - 1.0));
  vec2 a2 = pow(a, vec2(n - 2.0));
  float k = (n - 1.0) * (a2.x * a1.y * a1.y + a2.y * a1.x * a1.x) / pow(max(dot(a1, a1), 1e-30), 1.5);
  return scale / max(k, 1e-3);
}

// Where the glass at x = s / bwF across its rounded edge looks: a slab uSlab above the logo with a
// quarter-round edge of radius bwF. A straight-down sight line bends inward by Snell's law, so the
// outer rim looks deepest and the view eases back to the face across the edge.
vec2 refractSample(float x, float bwF, float eta, float R, vec2 dirOut, vec2 p, float dome, float offMul) {
  float u = clamp(1.0 - x, 0.0, 0.995);
  float th = asin(u), thr = asin(u / eta);
  float z = uSlab + bwF * sqrt(1.0 - u * u);
  float off = offMul * z * tan(th - thr);
  off = off / (1.0 + off / (6.0 * R));
  return p - (dirOut * off + p * dome) * uOptics;
}

float gauss(float x, float c, float w) { float d = (x - c) / w; return exp(-0.5 * d * d); }
float band(float x, float a, float b, float w) { return smoothstep(a - w, a, x) * (1.0 - smoothstep(b, b + w, x)); }

// Visible spectrum, red (0) to violet (1).
float bump(float x, float c, float w) { float d = (x - c) / w; return exp(-0.5 * d * d); }
vec3 spectrum(float x) {
  return vec3(bump(x, 0.34, 0.2) + 0.08 * bump(x, 0.93, 0.05), bump(x, 0.58, 0.1), bump(x, 0.8, 0.11));
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  px = 2.0 / uTile;
  vec2 p = (gl_FragCoord.xy - uCenter) * px;

  vec4 lg = logoAt(p, uBlur, px);
  vec3 plain = mix(uBg, lg.rgb, lg.a * uBare);

  vec2 nOut, dg; float g;
  float sd = shape(p, uPlateScale, uShapeN, nOut, g, dg);
  float s = -sd;
  float bw = max(uBevelW, 0.004) * uPlateScale;
  float x = clamp(s / bw, 0.0, 1.0);
  float R = contourRadius(p, uPlateScale, uShapeN);
  vec2 pq = p * p;
  float diag = 4.0 * pq.x * pq.y / max((pq.x + pq.y) * (pq.x + pq.y), 1e-6);
  float tilt = mix(1.0 - uTilt, 1.0, smoothstep(-0.02, 0.02, p.x * p.y));
  float pinchPart = uPinch * min(g * g, 1.0) * diag * diag * tilt;
  float dome = uDome * (1.0 - min(g * g, 1.0)) + pinchPart;
  vec2 dirOut = normalize(mix(nOut, p / max(length(p), 1e-4), 0.2));
  // Rounded corners curve both ways, so they draw content in from deeper than the sides.
  float cornerness = max(smoothstep(0.1, 0.9, 4.0 * nOut.x * nOut.x * nOut.y * nOut.y), smoothstep(0.15, 0.75, diag));
  float offMul = 1.0 + 0.4 * max(uCornerPull - 1.0, 0.0) * tilt * cornerness * uCornerOn;
  // Around a corner every sight line meets at one focus a little way in along the diagonal.
  vec2 focus = sign(p) * (pow(0.5, 1.0 / uShapeN) - uFocus * 0.70710678) * uPlateScale;
  float focusW = tilt * cornerness * uOptics * uCornerOn;
  float bwF = max(uReach, 0.004) * (1.0 + uWiden * tilt * cornerness * uCornerOn);
  float xf = clamp(s / bwF, 0.0, 1.0);
  // Footprint of one pixel after refraction, measured in uniform control flow.
  vec2 qc = refractSample(xf, bwF, 1.5, R, dirOut, p, dome, offMul);
  float foot = max(max(length(dFdx(qc)), length(dFdy(qc))), 0.25 * px);

  // Backdrop: anticipation ghost, ripple, soft lift shadow and glow.
  vec3 bg = uBg;
  vec3 lift = mix(uBg + vec3(0.06), mix(uBg, vec3(1.0), 0.55), uLightScene);
  if (uGhost > 0.001) {
    vec2 gn, gdg; float gg;
    float gsd = shape(p, 1.0, uCornerN, gn, gg, gdg);
    bg = mix(bg, lift, uGhost * 0.12 * (1.0 - smoothstep(-0.16, 0.14, gsd)));
    bg *= 1.0 - uGhost * 0.03 * uLightScene * exp(-max(gsd, 0.0) / 0.12) * step(0.0, gsd);
  }
  float outside = max(sd, 0.0);
  if (uRipA > 0.001) {
    float d0 = (uRipR - 1.0) * uPlateScale;
    float rx = (sd - d0) / 0.022;
    float ring = exp(-rx * rx);
    bg += uRipA * ring * (0.04 * (0.55 + 0.45 * dot(nOut, normalize(vec2(-0.5, 0.8))))) * mix(0.5, 1.0, uLightScene);
    bg -= uRipA * 0.016 * uLightScene * exp(-(rx - 1.6) * (rx - 1.6));
  }
  float shadowFall = max(sd, 0.0) / (0.9 * uPlateScale);
  bg *= 1.0 - uShadow * 0.03 * exp(-shadowFall * shadowFall) * step(0.0, sd);
  vec3 haloCol = mix(vec3(0.62, 0.69, 0.80), vec3(1.0), uLightScene);
  bg = mix(bg, haloCol, clamp(uHalo * (0.30 * exp(-outside / (0.025 * uPlateScale)) + 0.07 * exp(-outside / (0.12 * uPlateScale))), 0.0, 1.0) * step(0.0, sd));

  vec3 col = bg;
  float soft = px + uBlur * 0.8 + 0.06 * uDissolve * (1.0 - uKeep) * uPlateScale;
  if (sd < soft) {
    // Lighting surface: a superellipse quarter, flat toward the face and steep at the rim.
    float y1 = 1.0 - x;
    const float K = 2.6;
    float base1 = max(1.0 - pow(y1, K), 1e-4);
    float db = min(pow(y1, K - 1.0) * pow(base1, 1.0 / K - 1.0), 25.0);
    // A second, lower step just inside the first draws the faint inner line.
    float s1 = bw * 0.62;
    float w2 = bw * 0.22;
    float t2 = clamp((s - s1) / w2, -1.0, 1.0);
    float dh2 = uDouble * bw * 0.16;
    float dd = dh2 * 0.5 * cos(t2 * 1.5707963) * 1.5707963 / w2 * step(abs(t2), 0.999);
    vec2 gDome = -uDome * 2.0 * g * dg * step(g, 1.0);
    vec2 grad = -(db + dd) * nOut + gDome;

    vec3 back = mix(uBg, uPlateCol, uIconPlate);
    vec3 liftG = mix(back + vec3(0.06), mix(back, vec3(1.0), 0.55), uLightGlass);
    float rblur = uBlur + 0.05 * length(qc - p) + min(uGlow * uOptics * (1.0 - xf) * foot / px, 0.04);

    // Each wavelength refracts by its own index, so everything the edge draws in fans into colour
    // while the face stays crisp. Around a corner the samples also smear along the rim.
    float cornerW = smoothstep(0.1, 0.9, 4.0 * nOut.x * nOut.x * nOut.y * nOut.y);
    float streak = 0.35 * uStreak * bw * mix(0.15, 1.0, cornerW) * pow(1.0 - xf, 1.5) * uOptics;
    vec2 tangent = vec2(-nOut.y, nOut.x);
    vec3 acc = vec3(0.0), wsum = vec3(0.0);
    for (int i = 0; i < 20; i++) {
      float lam = (float(i) + 0.5) / 20.0;
      float c = uDisp * (1.0 - 2.0 * lam);
      vec2 along = tangent * (streak * 2.0 * (fract(float(i) * 0.618034 + 0.31) - 0.5));
      float cf = uDisp * (1.0 - 2.0 * lam) * (lam > 0.5 ? 1.0 : 0.5);
      vec2 sp = refractSample(xf, bwF, 1.5 + uEtaSpread * c, R, dirOut, p + along,
                              dome + pinchPart * 0.3 * c, offMul);
      vec2 focusL = focus - sign(p) * (0.70710678 * uFocusSplit * c * uPlateScale);
      float wFocus = pow(1.0 - xf, uFocusK) * smoothstep(0.0, uRimLine * (1.0 + 0.6 * c), xf);
      sp = mix(sp, mix(p + along, focusL, wFocus), focusW);
      float faceOnly = smoothstep(0.7, 1.0, xf) * uOptics;
      sp *= 1.0 + uFaceDisp * cf * faceOnly;
      vec4 l = logoAt(sp, rblur + 0.12 * streak + uFaceDisp * 0.5 * max(c, 0.0) * faceOnly, foot);
      vec3 w = spectrum(lam);
      acc += mix(back, l.rgb, l.a) * w;
      wsum += w;
    }
    vec3 trans = acc / wsum;
    float tl = dot(trans, vec3(0.2126, 0.7152, 0.0722));
    trans = clamp(tl + (trans - tl) * (1.0 + uVivid * uOptics), 0.0, 1.0);
    // A young droplet is milky; the haze only ever lightens.
    float hazeLum = dot(trans, vec3(0.2126, 0.7152, 0.0722));
    float hazeGate = mix(1.0 - smoothstep(0.25, 0.75, hazeLum), smoothstep(0.25, 0.75, hazeLum), uLightGlass);
    trans = mix(trans, liftG, uFrost * 0.45 * hazeGate);

    float glassAmt = pow(1.0 - uDissolve, 1.5);
    float lit = uSpec * glassAmt;
    vec3 rimCol = mix(vec3(0.80, 0.87, 0.97), vec3(1.0), uLightGlass);

    // Light backdrop: the thick edge glows softly white over a clear face, with a hairline that is
    // bright along the top and right and a thin dark silhouette down the left and bottom.
    float sc = uPlateScale;
    float tLum = dot(trans, vec3(0.2126, 0.7152, 0.0722));
    float lightOnly = smoothstep(0.35, 0.85, tLum);
    float hw = smoothstep(-0.85, 0.5, dot(nOut, rot(vec2(0.5, 0.866), uLightAng)));
    float tileBand = band(s, 0.016 * sc, 0.075 * sc, 0.022 * sc);
    float dropBand = (1.0 - smoothstep(0.06 * sc, 0.13 * sc, s)) * smoothstep(0.0, 0.004 * sc, s);
    float glow = mix(0.32 * tileBand, 0.75 * dropBand, uDrop) * lightOnly;
    float edgeLine = gauss(s, 0.005 * sc, 0.0045 * sc);
    float lip = gauss(s, 0.15 * sc, 0.007 * sc) * uDouble * (1.0 - uDrop);
    vec3 lightGlass = mix(trans, vec3(1.0), glow * glassAmt);
    lightGlass += (0.075 * hw * edgeLine + 0.06 * (0.4 + 0.6 * hw) * lip) * lit;
    lightGlass *= 1.0 - 0.05 * (1.0 - hw) * edgeLine * glassAmt * (1.0 - uDrop);
    lightGlass = mix(lightGlass, vec3(1.0), 0.55 * uDrop * glassAmt * edgeLine);

    // Dark backdrop: a cool rim light that grows toward the steep edge, and a small key highlight.
    vec3 Nl = normalize(vec3(-grad, 1.0));
    float edge = 1.0 - Nl.z;
    vec2 ldir = rot(normalize(vec2(-0.62, 0.78)), uLightAng);
    float side = dot(nOut, ldir);
    float fres = pow(edge, 1.5);
    vec3 rim = rimCol * fres * (0.35 + 0.65 * max(side, -side * 0.8)) * uRim * 0.65;
    vec3 Hv = normalize(normalize(vec3(-0.45, 0.6, 0.66)) + vec3(0.0, 0.0, 1.0));
    float spc = pow(max(dot(Nl, Hv), 0.0), 140.0) * 0.8 * smoothstep(0.0, 0.25, y1);
    vec3 darkGlass = trans * (1.0 - 0.25 * fres) + (rim + vec3(spc)) * lit;
    darkGlass = mix(darkGlass, rimCol, uDrop * 0.4 * uSpec * (1.0 - smoothstep(0.0, 0.1 * uPlateScale, s)));
    vec3 glass = mix(darkGlass, lightGlass, uLightGlass);

    // While the glass holds the logo a soft band of light crosses the face, brightest near the rim.
    float sweepD = dot(p / uPlateScale, normalize(vec2(0.8, 0.6))) - uSweep;
    float sheen = uSheen * glassAmt * exp(-sweepD * sweepD / 0.03) * (0.55 + 0.45 * (1.0 - x));
    glass = mix(glass, vec3(1.0), sheen * mix(0.22, 0.42, uLightGlass));

    float cov = clamp(0.5 - sd / soft, 0.0, 1.0);
    col = mix(bg, glass, cov);
  }

  vec3 outc = mix(plain, col, uPlateAlpha);
  outc += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  outColor = vec4(outc, 1.0);
}`;function V(t){let e=t.getContext("webgl2",{antialias:!1,premultipliedAlpha:!1});if(!e)return null;let a=(m,w)=>{let g=e.createShader(m);if(e.shaderSource(g,w),e.compileShader(g),!e.getShaderParameter(g,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(g)||"shader");return g},o=e.createProgram();if(e.attachShader(o,a(e.VERTEX_SHADER,fe)),e.attachShader(o,a(e.FRAGMENT_SHADER,me)),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(o)||"program");e.useProgram(o),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let n=e.getAttribLocation(o,"aPos");e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0);let r={},c=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let m=0;m<c;m++){let w=e.getActiveUniform(o,m);r[w.name]=e.getUniformLocation(o,w.name)}let i=e.createTexture(),s=e.createTexture();e.uniform1i(r.uSdf,0),e.uniform1i(r.uCol,1);let f=!1,l=m=>{e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,m),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)};function b(m){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.R16F,u,u,0,e.RED,e.FLOAT,m.sdf),l(e.LINEAR),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,s),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,m.canvas),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.generateMipmap(e.TEXTURE_2D),l(e.LINEAR_MIPMAP_LINEAR),f=!0}function v(m,w,g,A){if(f){e.viewport(0,0,w,g),e.uniform2f(r.uCenter,w/2,g/2),e.uniform1f(r.uTile,A),e.uniform1f(r.uTexSize,u),e.uniform1f(r.uBoxFrac,j);for(let L in m){let y=m[L];typeof y=="number"&&r[L]&&e.uniform1f(r[L],y)}e.uniform3fv(r.uBg,m.uBg),e.uniform3fv(r.uPlateCol,m.uPlateCol),e.uniform3fv(r.uLogoCol,m.uLogoCol),e.uniform2fv(r.uLogoOff,m.uLogoOff),e.drawArrays(e.TRIANGLES,0,3)}}function h(){e.getExtension("WEBGL_lose_context")?.loseContext()}return{setLogo:b,render:v,dispose:h}}var de=1.1,P=.5,he=t=>t.present+de,O=t=>t<0?0:t>1?1:t,T=(t,e,a)=>t+(e-t)*a,S=(t,e,a)=>{let o=O((a-t)/(e-t));return o*o*(3-2*o)},U=(t,e,a)=>{let o=O((a-t)/(e-t));return o*o*o*(o*(o*6-15)+10)};function D(t){let e=t.replace("#","");e.length===3&&(e=e.replace(/./g,"$&$&"));let a=parseInt(e.slice(0,6),16)||0;return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}var Y=([t,e,a])=>.2126*t+.7152*e+.0722*a;function R(t,e,a){if(t<=0)return 0;let o=2*Math.PI/e;if(a>=1)return 1-Math.exp(-o*t)*(1+o*t);let n=o*Math.sqrt(1-a*a);return 1-Math.exp(-a*o*t)*(Math.cos(n*t)+a*o/n*Math.sin(n*t))}var Z=new Map;function $(t,e,a){let o=`${t}/${e}/${a}`,n=Z.get(o);if(n===void 0){let r=0,c=3;for(let i=0;i<40;i++){let s=(r+c)/2;R(s,e,a)<t?r=s:c=s}Z.set(o,n=c)}return n}function ge(t,e,a=0){let o=e.present,n=e.keepPlate?1:0,r=1-e.bounce,c=R(t+.01,e.response,r),i=$(.85,e.response,r)-.01,s=$(.92,e.response,r)-.01,f=R(t-s,.4,1),l=1-S(.05,1,f),b=S(0,.08,t),v=e.drift*R(t-.3,2.2,1),h=.25*R(t,.7,1)+.75*U(0,e.glide,t),m=R(t-.5,2.4,1),w=R(t-o,.95,1),g=R(t-o-.05,.65,1),A=.15*e.bulge*(1-S(.4,.95,c)),L=(1+(e.startZoom-1)*(1-h))*(1-.045*m)*T(1,e.finalScale,w)*(1-.06*a),y=T(e.bevelWidth,Math.max(e.bevelWidth,.4),l),E=T(e.startSize,1,c)*(1+v)*(1+.14*g*(1-n))*(1-n*(.03*g+.06*a)),p=D(e.background);return{uPlateScale:E,uShapeN:T(2,e.corner,f),uCornerN:e.corner,uOptics:1-S(.55,1,g),uPlateAlpha:n?b*(1-a):b*(1-S(.45,1,g)),uLogoHalf:e.logoScale*L,uLogoOff:[e.logoOffset[0]*L,e.logoOffset[1]*L],uKeep:n,uSheen:e.sheen,uSweep:T(-1.6,1.6,U(.9,o-.1,t)),uLightAng:e.lightTurn*U(.4,o+.4,t),uBold:e.swell*.03*(1-h),uBlur:e.focus*.05*(1-S(.3,.95,c))+.03*a,uFrost:e.focus*(1-S(.5,.95,c)),uPinch:.38*e.stretch*S(.1,.9,f)*S(.75,.97,h),uTilt:e.tilt,uDome:A,uDrop:l,uRim:1+.8*l,uHalo:e.halo*(.5+.5*l)*(1-n*g),uShadow:Math.max(e.shadow*S(.45,.8,c)*(1-S(0,.6,f)),.8*e.shadow*n*g),uGhost:S(0,.03,t)*(1-S(.04,.08,t)),uRipR:1+.9*Math.max(0,t-i),uRipA:e.ripple*S(i,i+.06,t)*Math.exp(-Math.max(0,t-i)/.6),uBare:(1-n)*S(o-.25,o,t)*(1-a),uReach:y*E,uCornerPull:e.cornerPull,uStreak:e.edgeSmear,uWiden:e.cornerWidth,uSlab:.3*e.opticalDepth,uEtaSpread:.06,uFocus:e.cornerFocus,uFocusK:1,uFocusSplit:.056*e.colorBleed,uRimLine:.09,uCornerOn:S(.35,1,f),uGlow:.012*e.colorBleed,uFaceDisp:.012*e.dispersion,uVivid:.85,uDissolve:g,uDisp:e.dispersion,uDouble:e.doubleBevel,uBevelW:y*(1-g),uSpec:e.specular,uIconPlate:e.iconPlate?1:0,uUseColor:e.originalColors?1:0,uLightScene:Y(p)>.5?1:0,uLightGlass:Y(e.iconPlate?D(e.plateColor):p)>.5?1:0,uBg:p,uPlateCol:D(e.plateColor),uLogoCol:D(e.logoColor)}}function J(t,e){let a=document.createElement("canvas");a.setAttribute("aria-hidden","true"),a.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block",t.appendChild(a);let o=null;try{o=V(a)}catch(d){console.error(d)}if(!o)return a.remove(),null;let n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=null,c=n?1.4:0,i=!n,s=0,f=0,l=!0,b=!1,v=!1,h=0,m=0,w=!1;function g(d){h=0;let M=Math.min(.1,(d-m)/1e3);m=d;let{settings:F,loop:te,speed:oe,time:B}=e.current,k=he(F);if(B!==void 0)i=!1,c=B,f=O((B-k-Math.max(.05,F.hold))/P);else if(i&&r)if(s>0){s-=M;let C=f;f=O(1-s/P),s<=0&&(s=0,f=0,c=0),(f!==C||c===0)&&(l=!0)}else c+=M*oe,c>=k&&(c=k,te?s=Math.max(.05,F.hold)+P:i=!1),l=!0;if(l&&r&&o&&!v){let C=Math.min(window.devicePixelRatio||1,1.5),z=a.clientWidth,N=a.clientHeight,G=Math.max(1,Math.round(z*C)),_=Math.max(1,Math.round(N*C));(a.width!==G||a.height!==_)&&(a.width=G,a.height=_);let ae=Math.min(F.tileSize,Math.min(z,N)/1.75);o.render(ge(Math.min(c,k),F,f),G,_,ae*C),t.setAttribute("data-rendered",""),l=!1}b&&i&&r&&!v&&(h=requestAnimationFrame(g))}function A(){h||!b||v||document.hidden||(m=performance.now(),h=requestAnimationFrame(g))}let L=new IntersectionObserver(([d])=>{b=d.isIntersecting,b?A():h&&(cancelAnimationFrame(h),h=0)});L.observe(t);let y=new ResizeObserver(()=>{l=!0,A()});y.observe(t);let E=d=>{d.preventDefault(),v=!0,t.removeAttribute("data-rendered"),h&&(cancelAnimationFrame(h),h=0)},p=()=>{v=!1;try{o=V(a),o&&r&&o.setLogo(r)}catch(d){console.error(d)}l=!0,A()},x=()=>{document.hidden?(cancelAnimationFrame(h),h=0):A()};return document.addEventListener("visibilitychange",x),a.addEventListener("webglcontextlost",E),a.addEventListener("webglcontextrestored",p),{setLogo(d){r=d,o?.setLogo(d),n||(c=0,i=!0,s=0,f=0),l=!0,A()},replay(){c=0,i=!0,s=0,f=0,l=!0,A()},invalidate(){l=!0,A()},dispose(){w||(w=!0,h&&cancelAnimationFrame(h),document.removeEventListener("visibilitychange",x),L.disconnect(),y.disconnect(),a.removeEventListener("webglcontextlost",E),a.removeEventListener("webglcontextrestored",p),o?.dispose(),a.remove())}}}var ee=re.dark;var W=document.getElementById("logo-reveal"),q=matchMedia("(prefers-reduced-motion: reduce)");if(W&&!q.matches){let t=document.createElement("div");t.className="glass-logo-reveal",t.setAttribute("role","img"),t.setAttribute("aria-label","SAN / 0xsan7, Security and Blockchain");let e=W.querySelector("img");e&&(e.alt="",e.setAttribute("aria-hidden","true"),t.append(e)),W.append(t);let a={current:{settings:{...ee,background:"#000000",originalColors:!0,iconPlate:!1,tileSize:240,logoScale:1.1,finalScale:1.15,dispersion:.6,colorBleed:.25,halo:.25,startZoom:1.5,present:2.4},loop:!1,speed:1}},o=J(t,a),n=!1,r=()=>{n=!0,o?.dispose(),t.removeAttribute("data-rendered")};o&&(Q("assets/brand/san-logo.webp").then(c=>{n||o.setLogo(c)}).catch(r),q.addEventListener("change",()=>{q.matches&&r()},{once:!0}),addEventListener("pagehide",c=>{c.persisted||r()},{once:!0}))}
