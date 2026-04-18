

function saveFeedback() {
    let category = document.getElementById("feedback-category").value;
    let message = document.getElementById("user-message").value;
    let all = JSON.parse(localStorage.getItem("feedback")) || [];
    let newFeedback = {
        category: category,
        message: message
    };
    all.push(newFeedback);
    localStorage.setItem("feedback", JSON.stringify(all));

    document.getElementById("user-message").value = "";
    alert("Thank you for your feedback!");
}
