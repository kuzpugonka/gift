const API_URL = "https://wistful-lying-blender.glitch.me/";
const swiperThumb = new Swiper(".gift__swiper_thumb", {
  spaceBetween: 12,
  slidesPerView: "auto",
  freeMode: true,
  breakpoints: {
    320: {
      spaceBetween: 12,
    },
    1141: {
      spaceBetween: 16,
    },
  },
});

const swiperNain = new Swiper(".gift__swiper_card", {
  spaceBetween: 16,
  thumbs: {
    swiper: swiperThumb,
  },
});

const form = document.querySelector(".form");
const submitButton = form.querySelector(".form__button");
const phoneInputs = form.querySelectorAll(".form__field_phone");
const cardInput = form.querySelector(".form__card");

const updateCardInput = () => {
  const activeSlide = document.querySelector(
    ".gift__swiper_card .swiper-slide-active"
  );

  const cardData = activeSlide.querySelector(".gift__card-img").dataset.card;
  cardInput.value = cardData;
};

updateCardInput();

swiperNain.on("slideChangeTransitionEnd", updateCardInput);

for (let index = 0; index < phoneInputs.length; index++) {
  const element = phoneInputs[index];
  IMask(element, {
    mask: "+{7}(000)000-00-00",
  });
}

const updateSubmitButton = () => {
  let isFormField = true;
  for (const field of form.elements) {
    if (field.classList.contains("form__field")) {
      if (!field.value.trim()) {
        isFormField = false;
        break;
      }
    }
  }
  submitButton.disabled = !isFormField;
};
const phoneValidateOptions = {
  format: {
    pattern: "\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}",
    message:
      'Номер телефона должен соответствовать формату: "+7(XXX)XXX-XX-XX"',
  },
};
form.addEventListener("input", updateSubmitButton);
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const errors = validate(form, {
    sender_phone: phoneValidateOptions,
    receiver_phone: phoneValidateOptions,
  });
  if (errors) {
    for (const key in errors) {
      const errorString = errors[key];
      alert(errorString);
    }
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch(`${API_URL}/api/gift`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      prompt(
        "Открытка успешно сохранена и доступна по адресу: ",
         `${location.origin}/card.html?id=${result.id}`
      );
      form.reset();
    } else {
      alert(`Ошибка про отправке: ${result.message}`);
    }
  } catch (error) {
    console.error(`Произошла ошибка про отправке: ${error}`);
    alert(`Произошла ошибка, попробуйте снова!`);
  }
});
