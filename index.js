document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    { question: "Click on France", lat: 46.603354, lng: 1.888334 },
    { question: "Click on Brazil", lat: -14.235004, lng: -51.92528 },
    { question: "Click on Japan", lat: 36.204824, lng: 138.252924 },
    { question: "Click on Canada", lat: 56.130366, lng: -106.346771 },
    { question: "Click on Australia", lat: -25.274398, lng: 133.775136 },
    { question: "Click on India", lat: 20.593684, lng: 78.96288 },
    { question: "Click on South Africa", lat: -30.559482, lng: 22.937506 },
    { question: "Click on Russia", lat: 61.52401, lng: 105.318756 },
    { question: "Click on China", lat: 35.86166, lng: 104.195397 },
    { question: "Click on Egypt", lat: 26.820553, lng: 30.802498 },
    { question: "Click on USA", lat: 37.09024, lng: -95.712891 },
  ];

  let currentQuestionIndex = 0;

  const map = L.map("map").setView([20, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const questionElement = document.getElementById("question");
  const nextButton = document.getElementById("next-question");

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  }

  function showCorrectLocation(lat, lng) {
    const marker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: "correct-location",
        html: '<div style="background: red; width: 12px; height: 12px; border-radius: 50%;"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    }).addTo(map);

    setTimeout(() => {
      map.removeLayer(marker);
    }, 2000);
  }

  function checkAnswer(e) {
    const currentQuestion = questions[currentQuestionIndex];
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const distance = map.distance(
      [lat, lng],
      [currentQuestion.lat, currentQuestion.lng]
    );

    if (distance < 500000) {
      alert("Correct!");
    } else {
      alert("Incorrect! The correct location will be shown.");
      showCorrectLocation(currentQuestion.lat, currentQuestion.lng);
    }

    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
  }

  map.on("click", checkAnswer);

  nextButton.addEventListener("click", () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
  });

  loadQuestion();
});
