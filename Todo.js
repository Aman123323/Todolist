const addUserBtn = document.getElementById("addUser");
const usernameTextField = document.getElementById("username");
const recordDisplay = document.getElementById("records");
let userArray = [];
let objStr = localStorage.getItem("users");
if (objStr != null) {
  userArray = JSON.parse(objStr);
}
DisplayInfo();

addUserBtn.onclick = () => {
  const name = usernameTextField.value;
  userArray.push({ name: name });
  SaveInfo(userArray);
  usernameTextField.value = "";
  DisplayInfo(); // Re-display after adding a user
};

function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
}

function DisplayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
        <th scope="row">${i}</th>
        <td>${user.name}</td>
        <td>
          <i class="btn text-white fa fa-edit btn-info mx-3" onclick="EditInfo(${i})"></i>
          <i class="btn btn-danger text-white fa fa-trash" onclick="DeleteInfo(${i})"></i>
        </td>
      </tr>`;
  });
  recordDisplay.innerHTML = statement;
}

function EditInfo(index) {
  const newName = prompt("Enter new name:", userArray[index].name);
  if (newName !== null && newName.trim() !== "") {
    userArray[index].name = newName;
    SaveInfo(userArray);
    DisplayInfo();
  }
}

function DeleteInfo(index) {
  userArray.splice(index, 1);
  SaveInfo(userArray);
  DisplayInfo();
}
