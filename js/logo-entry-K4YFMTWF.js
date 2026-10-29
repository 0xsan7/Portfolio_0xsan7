var V={tileSize:256,logoScale:.7,finalScale:.69,logoOffset:[0,0],iconPlate:!1,keepPlate:!1,originalColors:!1,opticalDepth:1.1,dispersion:1.7,colorBleed:1.25,doubleBevel:1,bevelWidth:.14,corner:4.8,cornerPull:2.1,cornerWidth:2.2,cornerFocus:.58,edgeSmear:2.85,stretch:0,tilt:.35,bulge:1,specular:1,halo:0,shadow:1,ripple:1,bounce:0,response:.42,startSize:.2,startZoom:2.6,glide:2.3,present:2.4,drift:.12,swell:.5,focus:1,sheen:1,lightTurn:.9,hold:1,background:"#e9e9eb",plateColor:"#ffffff",logoColor:"#0e1428"},le={light:V,dark:{...V,logoScale:.72,finalScale:1,iconPlate:!0,halo:1,shadow:0,ripple:.5,startZoom:1.6,drift:.05,opticalDepth:.75,bevelWidth:.22,dispersion:.9,colorBleed:.45,corner:5,cornerPull:1.4,edgeSmear:1.2,tilt:0,cornerWidth:1.2,cornerFocus:.4,background:"#000000",plateColor:"#05070b",logoColor:"#ffffff"}},c=512,J=.75;function se(t){return new Promise((e,o)=>{let a=new Image;new URL(t,document.baseURI).origin!==location.origin&&(a.crossOrigin="anonymous"),a.onload=()=>e(a),a.onerror=()=>o(new Error("GlassIconReveal: the logo could not be loaded")),a.src=t})}function ie(t){return t.trimStart().startsWith("<")}function ue(t){let e=new DOMParser().parseFromString(t,"image/svg+xml").documentElement;if(!e||e.nodeName.toLowerCase()!=="svg")throw new Error("GlassIconReveal: the SVG could not be read");let o=parseFloat(e.getAttribute("width")||""),a=parseFloat(e.getAttribute("height")||""),n=(e.getAttribute("viewBox")||"").split(/[\s,]+/).map(Number);n.length===4&&n[2]>0&&n[3]>0&&([o,a]=[n[2],n[3]]),o>0&&a>0||(o=a=100);let r=c/Math.max(o,a);e.setAttribute("width",String(Math.round(o*r))),e.setAttribute("height",String(Math.round(a*r)));let l=new XMLSerializer().serializeToString(e).replace(/currentColor/g,"#ffffff");return"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(l)}var ce=t=>ie(t)?ue(t):t;function fe(t,e,o){let a=document.createElement("canvas");a.width=a.height=c;let n=a.getContext("2d",{willReadFrequently:!0}),r=Math.min(c/e,c/o),l=(c-e*r)/2,i=(c-o*r)/2;n.drawImage(t,l,i,e*r,o*r);let u=n.getImageData(0,0,c,c).data,d=!0;for(let g=3;g<u.length;g+=388)if(u[g]<250){d=!1;break}let s=[u[0],u[1],u[2]],p=(g,v,w)=>Math.min(1,Math.max(0,(Math.hypot(g-s[0],v-s[1],w-s[2])/441-.08)/.2)),x=c,f=c,R=-1,m=-1;for(let g=0;g<c;g++)for(let v=0;v<c;v++){let w=(g*c+v)*4;(d?p(u[w],u[w+1],u[w+2])*255:u[w+3])>8&&(v<x&&(x=v),v>R&&(R=v),g<f&&(f=g),g>m&&(m=g))}if(R<0)throw new Error("GlassIconReveal: the logo is empty");let h=R-x+1,A=m-f+1,y=c*J/Math.max(h,A),b=document.createElement("canvas");b.width=b.height=c;let E=b.getContext("2d",{willReadFrequently:!0});if(E.imageSmoothingQuality="high",E.drawImage(t,c/2-(x+h/2-l)*y,c/2-(f+A/2-i)*y,e*r*y,o*r*y),d){let g=E.getImageData(0,0,c,c),v=g.data;for(let w=0;w<v.length;w+=4)v[w+3]=Math.round(v[w+3]*p(v[w],v[w+1],v[w+2]));E.putImageData(g,0,0)}return b}function me(t){let e=c*c,o=t.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,c,c).data,a=1e20,n=new Float64Array(e),r=new Float64Array(e);for(let s=0;s<e;s++){let p=o[s*4+3],x=p>=250?1:p<=5?0:p/255;if(x>=1)n[s]=0,r[s]=a;else if(x<=0)n[s]=a,r[s]=0;else{let f=.5-x;n[s]=f>0?f*f:0,r[s]=f<0?f*f:0}}let l=new Float64Array(c),i=new Float64Array(c+1),u=new Uint16Array(c);Y(n,l,u,i,a),Y(r,l,u,i,a);let d=new Float32Array(e);for(let s=0;s<e;s++)d[s]=(Math.sqrt(n[s])-Math.sqrt(r[s]))/c;return d}function Y(t,e,o,a,n){for(let r=0;r<c;r++)Z(t,r,c,e,o,a,n);for(let r=0;r<c;r++)Z(t,r*c,1,e,o,a,n)}function Z(t,e,o,a,n,r,l){n[0]=0,r[0]=-l,r[1]=l,a[0]=t[e];for(let i=1,u=0,d=0;i<c;i++){a[i]=t[e+i*o];let s=i*i;do{let p=n[u];d=(a[i]-a[p]+s-p*p)/(i-p)/2}while(d<=r[u]&&--u>-1);u++,n[u]=i,r[u]=d,r[u+1]=l}for(let i=0,u=0;i<c;i++){for(;r[u+1]<i;)u++;let d=n[u],s=i-d;t[e+i*o]=a[d]+s*s}}var I=new Map;function ee(t,e){let o=I.get(t);return o||(o=(e?e.complete&&e.naturalWidth?Promise.resolve(e):e.decode().then(()=>e):se(ce(t))).then(n=>{let r=fe(n,n.naturalWidth||c,n.naturalHeight||c);return{canvas:r,sdf:me(r)}}),I.set(t,o),o.catch(()=>I.delete(t))),o}var de=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,he=`#version 300 es
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
    for (int i = 0; i < 10; i++) {
      float lam = (float(i) + 0.5) / 10.0;
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
}`;async function ge(t){let e=t.getContext("webgl2",{antialias:!1,premultipliedAlpha:!1});if(!e)return null;let o=e.getExtension("KHR_parallel_shader_compile"),a=(m,h)=>{let A=e.createShader(m);return e.shaderSource(A,h),e.compileShader(A),A},n=e.createProgram();if(e.attachShader(n,a(e.VERTEX_SHADER,de)),e.attachShader(n,a(e.FRAGMENT_SHADER,he)),e.linkProgram(n),o?await new Promise(m=>{let h=()=>{e.isContextLost()||e.getProgramParameter(n,o.COMPLETION_STATUS_KHR)?m():setTimeout(h,8)};h()}):await new Promise(m=>setTimeout(m,0)),e.isContextLost())return null;if(!e.getProgramParameter(n,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(n)||"program");e.useProgram(n),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let r=e.getAttribLocation(n,"aPos");e.enableVertexAttribArray(r),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0);let l={},i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let m=0;m<i;m++){let h=e.getActiveUniform(n,m);l[h.name]=e.getUniformLocation(n,h.name)}let u=e.createTexture(),d=e.createTexture();e.uniform1i(l.uSdf,0),e.uniform1i(l.uCol,1);let s=!1,p=m=>{e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,m),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)};function x(m){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,u),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.R16F,c,c,0,e.RED,e.FLOAT,m.sdf),p(e.LINEAR),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,d),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,m.canvas),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.generateMipmap(e.TEXTURE_2D),p(e.LINEAR_MIPMAP_LINEAR),s=!0}function f(m,h,A,y){if(s){e.viewport(0,0,h,A),e.uniform2f(l.uCenter,h/2,A/2),e.uniform1f(l.uTile,y),e.uniform1f(l.uTexSize,c),e.uniform1f(l.uBoxFrac,J);for(let b in m){let E=m[b];typeof E=="number"&&l[b]&&e.uniform1f(l[b],E)}e.uniform3fv(l.uBg,m.uBg),e.uniform3fv(l.uPlateCol,m.uPlateCol),e.uniform3fv(l.uLogoCol,m.uLogoCol),e.uniform2fv(l.uLogoOff,m.uLogoOff),e.drawArrays(e.TRIANGLES,0,3)}}function R(){e.getExtension("WEBGL_lose_context")?.loseContext()}return{setLogo:x,render:f,dispose:R}}var pe=1.1,q=.5,be=t=>t.present+pe,M=t=>t<0?0:t>1?1:t,k=(t,e,o)=>t+(e-t)*o,S=(t,e,o)=>{let a=M((o-t)/(e-t));return a*a*(3-2*a)},W=(t,e,o)=>{let a=M((o-t)/(e-t));return a*a*a*(a*(a*6-15)+10)};function O(t){let e=t.replace("#","");e.length===3&&(e=e.replace(/./g,"$&$&"));let o=parseInt(e.slice(0,6),16)||0;return[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}var $=([t,e,o])=>.2126*t+.7152*e+.0722*o;function T(t,e,o){if(t<=0)return 0;let a=2*Math.PI/e;if(o>=1)return 1-Math.exp(-a*t)*(1+a*t);let n=a*Math.sqrt(1-o*o);return 1-Math.exp(-o*a*t)*(Math.cos(n*t)+o*a/n*Math.sin(n*t))}var j=new Map;function Q(t,e,o){let a=`${t}/${e}/${o}`,n=j.get(a);if(n===void 0){let r=0,l=3;for(let i=0;i<40;i++){let u=(r+l)/2;T(u,e,o)<t?r=u:l=u}j.set(a,n=l)}return n}function ve(t,e,o=0){let a=e.present,n=e.keepPlate?1:0,r=1-e.bounce,l=T(t+.01,e.response,r),i=Q(.85,e.response,r)-.01,u=Q(.92,e.response,r)-.01,d=T(t-u,.4,1),s=1-S(.05,1,d),p=S(0,.08,t),x=e.drift*T(t-.3,2.2,1),f=.25*T(t,.7,1)+.75*W(0,e.glide,t),R=T(t-.5,2.4,1),m=T(t-a,.95,1),h=T(t-a-.05,.65,1),A=.15*e.bulge*(1-S(.4,.95,l)),y=(1+(e.startZoom-1)*(1-f))*(1-.045*R)*k(1,e.finalScale,m)*(1-.06*o),b=k(e.bevelWidth,Math.max(e.bevelWidth,.4),s),E=k(e.startSize,1,l)*(1+x)*(1+.14*h*(1-n))*(1-n*(.03*h+.06*o)),g=O(e.background);return{uPlateScale:E,uShapeN:k(2,e.corner,d),uCornerN:e.corner,uOptics:1-S(.55,1,h),uPlateAlpha:n?p*(1-o):p*(1-S(.45,1,h)),uLogoHalf:e.logoScale*y,uLogoOff:[e.logoOffset[0]*y,e.logoOffset[1]*y],uKeep:n,uSheen:e.sheen,uSweep:k(-1.6,1.6,W(.9,a-.1,t)),uLightAng:e.lightTurn*W(.4,a+.4,t),uBold:e.swell*.03*(1-f),uBlur:e.focus*.05*(1-S(.3,.95,l))+.03*o,uFrost:e.focus*(1-S(.5,.95,l)),uPinch:.38*e.stretch*S(.1,.9,d)*S(.75,.97,f),uTilt:e.tilt,uDome:A,uDrop:s,uRim:1+.8*s,uHalo:e.halo*(.5+.5*s)*(1-n*h),uShadow:Math.max(e.shadow*S(.45,.8,l)*(1-S(0,.6,d)),.8*e.shadow*n*h),uGhost:S(0,.03,t)*(1-S(.04,.08,t)),uRipR:1+.9*Math.max(0,t-i),uRipA:e.ripple*S(i,i+.06,t)*Math.exp(-Math.max(0,t-i)/.6),uBare:(1-n)*S(a-.25,a,t)*(1-o),uReach:b*E,uCornerPull:e.cornerPull,uStreak:e.edgeSmear,uWiden:e.cornerWidth,uSlab:.3*e.opticalDepth,uEtaSpread:.06,uFocus:e.cornerFocus,uFocusK:1,uFocusSplit:.056*e.colorBleed,uRimLine:.09,uCornerOn:S(.35,1,d),uGlow:.012*e.colorBleed,uFaceDisp:.012*e.dispersion,uVivid:.85,uDissolve:h,uDisp:e.dispersion,uDouble:e.doubleBevel,uBevelW:b*(1-h),uSpec:e.specular,uIconPlate:e.iconPlate?1:0,uUseColor:e.originalColors?1:0,uLightScene:$(g)>.5?1:0,uLightGlass:$(e.iconPlate?O(e.plateColor):g)>.5?1:0,uBg:g,uPlateCol:O(e.plateColor),uLogoCol:O(e.logoColor)}}function te(t,e){let o=document.createElement("canvas");o.setAttribute("aria-hidden","true"),o.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block",t.appendChild(o);let a=null,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=null,l=n?1.4:0,i=!n,u=0,d=0,s=!0,p=!1,x=!1,f=0,R=0,m=!1,h=1,A=1;function y(L){if(f=0,i&&L-R<1e3/30-1){f=requestAnimationFrame(y);return}let H=Math.min(.1,(L-R)/1e3);R=L;let{settings:C,loop:ae,speed:ne,time:_}=e.current,D=be(C);if(_!==void 0)i=!1,l=_,d=M((_-D-Math.max(.05,C.hold))/q);else if(i&&r)if(u>0){u-=H;let F=d;d=M(1-u/q),u<=0&&(u=0,d=0,l=0),(d!==F||l===0)&&(s=!0)}else l+=H*ne,l>=D&&(l=D,ae?u=Math.max(.05,C.hold)+q:i=!1),s=!0;if(s&&r&&a&&!x){let F=Math.min(window.devicePixelRatio||1,1.5),X=h,K=A,P=Math.max(1,Math.round(X*F)),U=Math.max(1,Math.round(K*F));(o.width!==P||o.height!==U)&&(o.width=P,o.height=U);let re=Math.min(C.tileSize,Math.min(X,K)/1.75);a.render(ve(Math.min(l,D),C,d),P,U,re*F),t.hasAttribute("data-rendered")||t.setAttribute("data-rendered",""),s=!1}p&&i&&r&&!x&&(f=requestAnimationFrame(y))}function b(){f||!p||x||document.hidden||(R=performance.now(),f=requestAnimationFrame(y))}let E=new IntersectionObserver(([L])=>{p=L.isIntersecting,p?b():f&&(cancelAnimationFrame(f),f=0)});E.observe(t);let g=new ResizeObserver(([L])=>{h=L.contentRect.width,A=L.contentRect.height,s=!0,b()});g.observe(t);let v=L=>{L.preventDefault(),x=!0,t.removeAttribute("data-rendered"),f&&(cancelAnimationFrame(f),f=0)},w=async()=>{try{let L=await ge(o);return m?(L?.dispose(),!1):(a=L,a?(r&&a.setLogo(r),s=!0,b(),!0):(o.remove(),!1))}catch{return o.remove(),t.removeAttribute("data-rendered"),!1}},G=()=>{x=!1,w()},N=()=>{document.hidden?(cancelAnimationFrame(f),f=0):b()};return document.addEventListener("visibilitychange",N),o.addEventListener("webglcontextlost",v),o.addEventListener("webglcontextrestored",G),{ready:w(),setLogo(L){r=L,a?.setLogo(L),n||(l=0,i=!0,u=0,d=0),s=!0,b()},replay(){l=0,i=!0,u=0,d=0,s=!0,b()},invalidate(){s=!0,b()},dispose(){m||(m=!0,f&&cancelAnimationFrame(f),document.removeEventListener("visibilitychange",N),E.disconnect(),g.disconnect(),o.removeEventListener("webglcontextlost",v),o.removeEventListener("webglcontextrestored",G),a?.dispose(),o.remove())}}}var oe=le.dark;var B=document.getElementById("logo-reveal"),z=matchMedia("(prefers-reduced-motion: reduce)");if(B&&!z.matches){let t=document.createElement("div");t.className="glass-logo-reveal",t.setAttribute("role","img"),t.setAttribute("aria-label","SAN / 0xsan7, Security and Blockchain");let e=B.querySelector("img");e&&(e.alt="",e.setAttribute("aria-hidden","true")),t.append(...B.childNodes),B.append(t);let o={current:{settings:{...oe,background:"#000000",originalColors:!0,iconPlate:!1,tileSize:240,logoScale:1.1,finalScale:1.15,dispersion:.6,colorBleed:.25,halo:.25,startZoom:1.5,present:2.4},loop:!1,speed:1}},a=te(t,o),n=!1,r=()=>{n=!0,a?.dispose(),t.removeAttribute("data-rendered")};a&&(a.ready.then(async l=>{if(!l){r();return}if(n)return;let i=await ee("assets/brand/san-logo-420.webp",e??void 0);n||a.setLogo(i)}).catch(r),z.addEventListener("change",()=>{z.matches&&r()},{once:!0}),addEventListener("pagehide",l=>{l.persisted||r()},{once:!0}))}
