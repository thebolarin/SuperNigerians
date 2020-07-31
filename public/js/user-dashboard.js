const Model = {
  getFormData(formEl) {
    const formData = Object.fromEntries(new FormData(formEl).entries());
    formData["location"] = Model.getLocation(formData);
    return formData;
  },
  getLocation({ country, stateOrCity }) {
    let location = country ? country + ", " : "";
    location += stateOrCity || "";
    return location;
  },
};

const View = {
  displayToastProfileUpdateNotif(message) {
    document.querySelector(".toast-body").innerHTML = message;
    $("#tstProfileUpdate").toast("show");
  },
};

const Controller = {
  init() {
    Controller.initEventListeners();
  },
  initEventListeners() {
    document
      .getElementById("btnUpdateProfile")
      .addEventListener("click", Controller.onSubmitForm);
  },
  onSubmitForm(event) {
    event.preventDefault();
    let userData = Model.getFormData(document.forms.updateProfileForm);
    try {
      axios
        .put("/user/update", JSON.stringify(userData), {
          "content-type": "application/json",
        })
        .then((resp) => {
          console.log(resp);
          View.displayToastProfileUpdateNotif(
            `Your profile has been successfully updated.`
          );
        })
        .catch((err) => {
          console.error(err);
          View.displayToastProfileUpdateNotif(
            `Sorry. An error occured while updating your profile`
          );
        });
    } catch (err) {
      console.error(err);
    }
    $("#updateProfileModal").modal("hide");
  },
};

Controller.init();
