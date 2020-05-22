document.addEventListener("DOMContentLoaded", start)
let data = ["One", "Two", "Three", "Four", "Five"]

function start() {
  preventFormSubmit()
  updateList(data)

  let inputName = document.getElementById("name")
  inputName.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      createUpdateElement()
    }
  })
  inputName.focus()
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

  liElement.append(createDeleteButton(id))
  liElement.append(creatSpanText(name))

  return liElement
}

function creatSpanText(name) {
  const spanElement = document.createElement("span")
  spanElement.textContent = name
  spanElement.addEventListener("click", setUpdateElement)
  return spanElement
}

function createDeleteButton(id) {
  const imgElement = document.createElement("img")

  let attImgElement = document.createAttribute("src");
  attImgElement.value = `./assets/img/delete.svg`;
  imgElement.setAttributeNode(attImgElement);

  attImgElement = document.createAttribute("class");
  attImgElement.value = `delete`;
  imgElement.setAttributeNode(attImgElement);

  imgElement.addEventListener("click", function () {
    if (id > -1) {
      data.splice(id, 1);
      updateList(data)
      resetDataValue()
    }
  })

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

  if (elementDataId != "default") {
    data[data.indexOf(elementDataId)] = elementValue
  } else {
    data.push(elementValue)
  }

  updateList(data)
  event.target.value = ""
  resetDataValue()
}

function setUpdateElement() {
  const input = document.getElementById("name")
  input.value = event.target.textContent
  input.setAttribute("content", input.value)
  input.focus()
}

function resetDataValue() {
  document.getElementById("name").setAttribute("content", "default")
}

function clearList(list) {
  list.innerHTML = ""
}
