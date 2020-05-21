document.addEventListener("DOMContentLoaded", start)
let data = ["One", "Two", "Three", "Four", "Five"]

function start() {
  preventFormSubmit()
  updateList(data)
  document.getElementById("name").addEventListener("change", createUpdateElement)
}

function preventFormSubmit() {
  const form = document.querySelector("form")
  form.addEventListener("submit", function (event) {
    event.preventDefault()
  })
}

function createLi(name, id) {
  const liElement = document.createElement("li")

  let attLiElement = document.createAttribute("id");
  attLiElement.value = id;
  liElement.setAttributeNode(attLiElement);

  liElement.append(createDeleteButton())
  liElement.append(creatSpanText(name))

  return liElement
}

function creatSpanText(name) {
  const spanElement = document.createElement("span")
  spanElement.textContent = name
  spanElement.addEventListener("click", setUpdateElement)
  return spanElement
}

function createDeleteButton() {
  const imgElement = document.createElement("img")

  let attImgElement = document.createAttribute("src");
  attImgElement.value = `./assets/img/delete.svg`;
  imgElement.setAttributeNode(attImgElement);

  attImgElement = document.createAttribute("class");
  attImgElement.value = `delete`;
  imgElement.setAttributeNode(attImgElement);

  imgElement.addEventListener("click", deleteElement)

  return imgElement
}

function updateList(list) {

  const listElement = document.getElementById("list")
  clearList(listElement)

  for (let i = 0; i < list.length; i++) {
    listElement.append(createLi(list[i], i))
  }
}

function createUpdateElement() {

  const elementValue = event.target.value
  const elementDataId = event.target.getAttribute("content")
  console.log(elementDataId)
  console.log(elementValue)

  if (elementDataId != "default") {
    data[data.indexOf(elementDataId)] = elementValue
  } else {
    data.push(elementValue)
  }

  updateList(data)
  event.target.value = ""
  resetDataValue()
}

function deleteElement() {
  const removeElement = event.target.parentNode
  const index = data.indexOf(removeElement.textContent);
  if (index > -1) {
    data.splice(index, 1);
    updateList(data)
    resetDataValue()
  }
}

function setUpdateElement() {
  const input = document.getElementById("name")
  input.value = event.target.textContent
  input.setAttribute("content", input.value )
  input.focus()
}

function resetDataValue() {
  document.getElementById("name").setAttribute("content", "default")
}

function clearList(list) {
  list.innerHTML = ""
}
