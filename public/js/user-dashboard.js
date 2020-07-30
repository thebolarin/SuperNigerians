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
const View = {};
const Controller = {
  init() {
    Controller.initEventListeners();
  },
  initEventListeners() {
    document.getElementById('btnUpdateProfile').addEventListener("click", (event) => {
      event.preventDefault();
      let {
        firstname,
        lastname,
        username,
        location,
        phone,
        photo,
      } = Model.getFormData(document.forms.updateProfileForm);
      console.log(firstname, lastname, username, location, phone, photo);
      $('#updateProfileModal').modal('hide')
    });
  },
};

Controller.init();
