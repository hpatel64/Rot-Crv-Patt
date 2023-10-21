
// This Animation Program created by Hemant Patel, is demostration of functioning of CSS , js and HTML together.
// simple concepts from W3 school can be turned into cool, eye catching animations using basic functions.

var mainSvg = document.getElementById("mainSvg");
var mainXAxis = document.getElementById("mainXAxis");
var mainYAxis = document.getElementById("mainYAxis");
var rsTglBtn = document.getElementById("rsTglBtn");
var brdrClrInp = document.getElementById("brdrClrInp");
var fillClrInp = document.getElementById("fillClrInp");
//svg parameters
const svgSize = 450;
mainSvg.style.backgroundColor = "#ffffff";
mainSvg.style.position = "absolute";
mainSvg.style.left = 0;
mainSvg.style.top = 0;
mainSvg.style.width = svgSize;
mainSvg.style.height = svgSize;
let noOfProfiles = 12;

let aAng = 15; // deg
let r1 = 145; // base radius
let r12 = 83; // profile length
let r13 = 27; // profile crv.offset position
let h3 = 30; // profile thickness
let bAng = 0; // deg

let myInterval = setInterval(myTimerFunc, 25);
// clearInterval(myInterval);
let th = 0;
let runStopToggleBit = false;

function updateColor() {
  for (var i = 0; i < noOfProfiles * 2; i++) {
    // document.getElementById(`pathID${i}`).setAttributeNS(null, "stroke", `${brdrClrInp.value}`);
    // document.getElementById(`pathID${i}`).setAttributeNS(null, "fill", `${fillClrInp.value}`);
    document.getElementById(`pathID${i}`).setAttributeNS(null, "stroke", `#000000`);
    document.getElementById(`pathID${i}`).setAttributeNS(null, "fill", "none");

  }
}

function createnoOfProfiles(noOfProfiles) {
  for (var i = 0; i < noOfProfiles * 2; i++) {
    let newCurvePath = document.createElementNS('http://www.w3.org/2000/svg', "path");
    newCurvePath.setAttributeNS(null, "id", `pathID${i}`);
    newCurvePath.setAttributeNS(null, "stroke-width", 2);
    newCurvePath.setAttributeNS(null, "opacity", 1);
    document.getElementById("mainSvg").appendChild(newCurvePath);
  }
}
createnoOfProfiles(noOfProfiles);
updateColor();

function xCorr(x) {
  return svgSize / 2 + x;
}
function yCorr(y) {
  return svgSize / 2 - y;
}
function toRad(th) {
  return th * Math.PI / 180;
}
function drawCurve(arr, crntPath) {
  crntPath.setAttributeNS(null, "d", `M${xCorr(arr[0])} ${yCorr(arr[1])} Q${xCorr(arr[4])} ${yCorr(arr[5])} ${xCorr(arr[2])} ${yCorr(arr[3])}`);
}

function myTimerFunc() {
  if (runStopToggleBit) {
    th += 1;
  }
  if (th > 359) {
    th = 0;
  }

  //curve caculation and rendering
  for (var i = 0; i < noOfProfiles; i++) {
    aAng = parseInt(360 / noOfProfiles) * i + th;
    bAng = aAng + 90;
    // bAng = 4 * th;
    // bAng = aAng;

    let x1 = r1 * Math.cos(toRad(aAng));
    let y1 = r1 * Math.sin(toRad(aAng));
    let x2 = x1 + r12 * Math.cos(toRad(bAng));
    let y2 = y1 + r12 * Math.sin(toRad(bAng));
    let x3 = x1 + r13 * Math.cos(toRad(bAng)) - h3 * Math.sin(toRad(bAng));
    let y3 = y1 + r13 * Math.sin(toRad(bAng)) + h3 * Math.cos(toRad(bAng));
    var crntPath = document.getElementById(`pathID${(i * 2)}`);
    drawCurve([x1, y1, x2, y2, x3, y3], crntPath);
    x3 = x1 + r13 * Math.cos(toRad(bAng)) + h3 * Math.sin(toRad(bAng));
    y3 = y1 + r13 * Math.sin(toRad(bAng)) - h3 * Math.cos(toRad(bAng));
    crntPath = document.getElementById(`pathID${(i * 2) + 1}`);
    drawCurve([x1, y1, x2, y2, x3, y3], crntPath);
  }
}
function strtStopTglFunc() {
  runStopToggleBit = !runStopToggleBit;
  if (runStopToggleBit) {
    rsTglBtn.innerHTML = "Stop";
    rsTglBtn.classList.remove("btn-success");
    rsTglBtn.classList.add("btn-danger");
  } else {
    rsTglBtn.innerHTML = "Start";
    rsTglBtn.classList.remove("btn-danger");
    rsTglBtn.classList.add("btn-success");
  }
}

var baseRadInpID = document.getElementById("baseRadInpID");
var baseRadOpID = document.getElementById("baseRadOpID");
var profLngthInpID = document.getElementById("profLngthInpID");
var profLngthOpID = document.getElementById("profLngthOpID");

// BaseRadius slider value change handle logic
baseRadOpID.innerHTML = baseRadInpID.value;
baseRadInpID.oninput = function () {
  baseRadOpID.innerHTML = this.value;
  r1 = this.value;;
}

// Profile-Length Slider value change handle logic
profLngthOpID.innerHTML = profLngthInpID.value;
profLngthInpID.oninput = function () {
  profLngthOpID.innerHTML = this.value;
  r12 = this.value;
}

// Profile-Curve Offset Position Slider value change handle logic
profCrvOfstOpID.innerHTML = profCrvOfstInpID.value;
profCrvOfstInpID.oninput = function () {
  profCrvOfstOpID.innerHTML = this.value;
  r13 = this.value;;
}

// Profile-Thickness Slider value change handle logic
profThckOpID.innerHTML = profThckInpID.value;
profThckInpID.oninput = function () {
  profThckOpID.innerHTML = this.value;
  h3 = this.value;
}