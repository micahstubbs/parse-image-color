// $ la *.{png,jpeg}
const imageFiles = [
  'forest-fire.png',
  'jungle-roots.png',
  'snowy-field.png',
  'tropical-island.png',
  'vladi-private-island.jpeg'
]

imageFiles.forEach((imageFile, i) => {
  const img = document.createElement('img')
  img.setAttribute('id', 'i')
  img.setAttribute('class', `image${i}`)
  img.setAttribute('src', imageFile)

  const colorDiv = document.createElement('div')
  colorDiv.setAttribute('id', 'colorDiv')
  colorDiv.setAttribute('class', `image${i}`)

  const grayScaleDiv = document.createElement('div')
  grayScaleDiv.setAttribute('id', 'grayScaleDiv')
  grayScaleDiv.setAttribute('class', `image${i}`)

  const div = document.createElement('div')
  div.setAttribute("style", "display: flex; flex-direction: row")
  div.appendChild(img)
  div.appendChild(colorDiv)
  div.appendChild(grayScaleDiv)

  document.body.appendChild(div)
})

    // <div style="display: flex; flex-direction: row">
    //   <img id="i" class="ice" src="snowy-field.png"/>
    //   <div id="colorDiv" class="ice"></div>
    //   <div id="grayScaleDiv" class="ice"></div> 
    // </div>