var WebsiteName = document.getElementById("bookmarkName");
var url = document.getElementById("w-url");
var addBtn = document.getElementById("add-Btn");
var modal = document.getElementById("regexModal");

var websites = importFromLocalDB();
displayWebsites();

function addLink() {
    if (isValidInputs()) {
        hideModal();
        websites.push(getInputValues());
        onDataChange();
    } else {
        showModal();
    }
}

function getInputValues() {
    return {
        name: WebsiteName.value,
        url: url.value
    };
}

function displayWebsites() {
    var content = "";
    for (var i = 0; i < websites.length; i++) {
        content += `<tr>
            <td>${i + 1}</td>
            <td>${websites[i].name}</td>
            <td>
                <a class="btn btn-success" href="${websites[i].url}" target="_blank">
                    <i class="fa fa-eye me-2"></i>Visit
                </a>
            </td>
            <td>
                <button onclick="deleteWebsite(${i})" class="btn btn-danger">
                    <i class="fa fa-trash-can me-2"></i>Delete
                </button>
            </td>
        </tr>`;
    }
    document.getElementById("table-body").innerHTML = content;
}

function deleteWebsite(index) {
    websites.splice(index, 1);
    onDataChange();
}

function onDataChange() {
    exportToLocalDB();
    displayWebsites();
    clearForm();
}

function clearForm() {
    WebsiteName.value = "";
    url.value = "";
}

function importFromLocalDB() {
    return JSON.parse(localStorage.getItem("websites")) ?? [];
}

function exportToLocalDB() {
    localStorage.setItem("websites", JSON.stringify(websites));
}

function isValidInputs() {
    return /^[\w ]{3,}$/.test(WebsiteName.value) && isValidURL(url.value);
}

function isValidURL(url) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
    );
    return urlPattern.test(url);
}

function alertUser_Name() {
    if (/^[\w ]{3,}$/.test(WebsiteName.value)) {
        WebsiteName.classList.remove("is-invalid");
        WebsiteName.classList.add("is-valid");
    } else {
        WebsiteName.classList.remove("is-valid");
        WebsiteName.classList.add("is-invalid");
    }
}

function alertUser_URL() {
    if (isValidURL(url.value)) {
        url.classList.remove("is-invalid");
        url.classList.add("is-valid");
    } else {
        url.classList.remove("is-valid");
        url.classList.add("is-invalid");
    }
}

function showModal() {
    var modalElement = new bootstrap.Modal(modal);
    modalElement.show();
}

function hideModal() {
    var modalElement = bootstrap.Modal.getInstance(modal);
    if (modalElement) {
        modalElement.hide();
    }

    var backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
    }

    document.body.classList.remove('modal-open');
    document.body.style = '';
}

modal.addEventListener('hidden.bs.modal', function () {
    hideModal();
});
