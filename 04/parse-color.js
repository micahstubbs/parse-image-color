const rgb = getAverageRGB(document.getElementById('i'))
const grayRGB = getGrayscaleColor(rgb)

// set the color of the first box to the average color of the image
document.querySelector('#colorDiv').style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`

// set the color of the second box to the grayscale value of that average image color
const grayRGBString = `rgb(${grayRGB.r},${grayRGB.g},${grayRGB.b})`;
console.log('grayRGBString', grayRGBString)
const grayScaleDiv = document.querySelector('#grayScaleDiv')
grayScaleDiv.style.backgroundColor = `rgb(${grayRGB.r},${grayRGB.g},${grayRGB.b})`

//
// function defs
//
function getAverageRGB(imgEl) {
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = {
      r: 0,
      g: 0,
      b: 0
    }, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = {
      r: 0,
      g: 0,
      b: 0
    },
    count = 0

  if (!context) {
    return defaultRGB
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width

  context.drawImage(imgEl, 0, 0)

  try {
    data = context.getImageData(0, 0, width, height)
  } catch (e) {
    /* security error, img on diff domain */
    alert('x')
    return defaultRGB
  }

  length = data.data.length

  while ((i += blockSize * 4) < length) {
    ++count
    rgb.r += data.data[i]
    rgb.g += data.data[i + 1]
    rgb.b += data.data[i + 2]
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count)
  rgb.g = ~~(rgb.g / count)
  rgb.b = ~~(rgb.b / count)

  console.log('average color', rgb)
  return rgb
}

function getGrayscaleColor(rgb) {
  const grayValue = Math.round(rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722)
  const grayRGB = {
    r: grayValue,
    g: grayValue,
    b: grayValue
  }
  console.log('grayRGB', grayRGB)
  return grayRGB
}
