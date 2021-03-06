// check if all images are loaded before parsing colors
// https://stackoverflow.com/a/11071687/1732222
const imgs = document.images
const len = imgs.length
let counter = 0
const colorHash = {}

Array.prototype.forEach.call(imgs, function(img) {
  img.addEventListener('load', incrementCounter, false)
})

const grayScaleValues = []

function incrementCounter() {
  counter++
  if (counter === len) {
    console.log('All images loaded!')
    parseImages()
  }
}

function parseImages() {
  // select all img tags on the page
  // convert the results from a nodelist to an array
  const imgTags = Array.prototype.slice.call(document.querySelectorAll('img'))
  console.log('imgTags', imgTags)

  imgTags.forEach(imgTag => drawColorBoxes(imgTag))

  // determine average gray scale color
  function add(a, b) {
    return a + b
  }
  const averageGrayScaleValue = Math.round(grayScaleValues.reduce(add, 0) / grayScaleValues.length)
  const averageGrayScaleRGB = `rgb(${averageGrayScaleValue},${averageGrayScaleValue},${averageGrayScaleValue})`
  console.log('averageGrayScaleRGB', averageGrayScaleRGB)

  // set background color
  document.body.style.backgroundColor = averageGrayScaleRGB

  console.log('colorHash', colorHash)
}

function drawColorBoxes(imgEl) {
  const rgb = getAverageRGB(imgEl)
  const grayRGB = getGrayscaleColor(rgb)
  const matchArray = imgEl.src.split('/')
  const imageFile = matchArray[matchArray.length - 1]

  //
  // watch out, side effects
  //
  
  // store the gray scale value
  grayScaleValues.push(grayRGB.r)

  // store the color data
  colorHash[imageFile] = {
    averageColor: rgb,
    averageColorGrayScale: grayRGB,
    imageFile
  }

  const imgClass = imgEl.className
  console.log('imgClass', imgClass)
  console.log('imgEl from drawColorBoxes', imgEl)

  // set the color of the first box to the average color of the image
  const colorRGBString = `rgb(${rgb.r},${rgb.g},${rgb.b})`
  document.querySelector(
    `#colorDiv.${imgClass} `
  ).style.backgroundColor = colorRGBString

  // set the color of the second box to the grayscale value of that average image color
  const grayRGBString = `rgb(${grayRGB.r},${grayRGB.g},${grayRGB.b})`
  console.log('grayRGBString', grayRGBString)

  const grayScaleDiv = document.querySelector(`#grayScaleDiv.${imgClass} `)
  grayScaleDiv.style.backgroundColor = `rgb(${grayRGB.r},${grayRGB.g},${
    grayRGB.b
  })`
}

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
  // the original ITU-R recommendation (BT.709, specifically) which is the historical precedent.
  // This formula, sometimes called Luma, looks like this:
  const grayValue = Math.round(rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722)
  const grayRGB = {
    r: grayValue,
    g: grayValue,
    b: grayValue
  }
  console.log('grayRGB', grayRGB)
  return grayRGB
}
