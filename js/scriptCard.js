const API_URL = "https://wistful-lying-blender.glitch.me/";

const card = document.querySelector(".card");
const cardTitle = document.querySelector(".card__title");
const cardContacts = document.querySelector(".card__contacts");

const cardImg = document.querySelector(".card__img");
const cardFrom = document.querySelector(".card__from");
const cardTo = document.querySelector(".card__to");
const cardMessage = document.querySelector(".card__message");

const rearrangeElement = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 580) {
    card.after(cardContacts);
  } else {
    cardTitle.after(cardContacts);
  }
};

const getIdFromUrl = () => {
  const params = new URLSearchParams(location.search);
  return params.get("id");
};

const getGiftData = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/gift/${id}`);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Открытка не найдена`);
    }
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  rearrangeElement();
  window.addEventListener("resize", rearrangeElement);

  const id = getIdFromUrl();
  if (id) {
    const data = await getGiftData(id);
    if (data) {
      cardImg.src = `img/${data.card}.png`;
      cardFrom.textContent = data.sender_name;
      cardTo.textContent = data.receiver_name;
      const formattedMessage = data.message.replaceAll("\n", "<br>");
      cardMessage.innerHTML = formattedMessage;
    } else {
      alert(`Открытка не найдена`)
    }
  }
};
init();
