let todoList = [];
const $todoList = document.querySelector("#todo-list");


/**
 * Esta función crea el elemento HTML del item de la lista dado un objeto como parámetro
 */
const createItem = (itemData) => {
    const text = itemData.text
    const id = itemData.id
    const isChecked = itemData.isChecked


    // creamos el elemento li (que será el padre)
    const $item = document.createElement("li");
    $item.classList.add("item");

    // se crea el elemento de checkbox y se asignan propiedades
    const $checkbox = document.createElement("input");
    $checkbox.classList.add("item-checkbox");
    $checkbox.setAttribute("type", "checkbox");
    $checkbox.setAttribute("id", id);
    $checkbox.addEventListener("change", () => toggleCheckbox(id));
    $checkbox.checked = isChecked;

    // se crea el elemento label y se asignan propiedades
    const $label = document.createElement("label");
    $label.classList.add("item-label");
    $label.setAttribute("for", id);
    $label.append(text);

    // se crea el elemento button y se asignan propiedades
    const $button = document.createElement("button");
    $button.classList.add("item-delete");
    $button.addEventListener("click", () => removeItem(id));

    // se crea el elemento del icono
    const $icon = document.createElement("i");
    $icon.classList.add("fa-solid", "fa-circle-xmark", "item-delete-icon");

    // se agrega el elemento icono como hijo del boton
    $button.appendChild($icon);

    // se agregan todos los elementos dentro del elemento li
    $item.append($checkbox, $label, $button);
    return $item;
};

/**
 * 
 * Busca un item de la lista (todoList) por su id y lo retorna
 *  
 */
const findItemIndex = (id) => {
    return todoList.findIndex((item) => item.id === id);
};


/**
 * 
 * Busca el item en el la lista (todoList) y cambia el estado isChecked del item
 */
const toggleCheckbox = (id) => {
    const itemIndex = findItemIndex(id);
    const newIsChecked = !todoList[itemIndex].isChecked;
    todoList[itemIndex].isChecked = newIsChecked;
    saveTodoList();
};


/**
 * 
 * Agrega el nuevo item a la lista (todoList)
 */
const addItem = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const itemData = {
        id: new Date().getTime(),
        text: data.get("todo-input"),
        isChecked: false,
    };

    todoList.push(itemData);
    event.target.reset();
    render();
};

/**
 * 
 * Busca el item en la lista (todoList) por su id y lo elimina
 */
const removeItem = (id) => {
    const itemIndex = findItemIndex(id);
    todoList.splice(itemIndex, 1);
    render();
};


/**
 * Guarda la lista en localStorage
 */
const saveTodoList = () => {
    if (localStorage) {
        localStorage.setItem("todo", JSON.stringify(todoList));
    }
};


/**
 * Consulta los datos del todoList en el localStorage y lo asigna a la lista
 */
const loadTodoList = () => {
    if (localStorage) {
        const localTodoList = localStorage.getItem("todo");
        if (localTodoList) {
            todoList = JSON.parse(localTodoList);
            render();
        }
    }
};

/**
 * Itera cada elemento de la lista (todoList) para crear y agregar los elementos HTML en el DOM
 */
const render = () => {
    $todoList.replaceChildren();
    const todoListHtml = todoList.map((item) => createItem(item));
    $todoList.append(...todoListHtml);
    saveTodoList();
};

document.addEventListener("DOMContentLoaded", loadTodoList);
