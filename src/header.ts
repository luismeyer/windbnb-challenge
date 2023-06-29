import { getRequiredElementById } from "./getRequiredElement";
import { filter } from "./results";

const header = getRequiredElementById("header");

const locationInput =
  getRequiredElementById<HTMLInputElement>("location-input");
const guestInput = getRequiredElementById<HTMLInputElement>("guest-input");

const adultMinus = getRequiredElementById("adult-minus");
const adultPlus = getRequiredElementById("adult-plus");
const adultCount = getRequiredElementById("adult-count");

const childMinus = getRequiredElementById("child-minus");
const childPlus = getRequiredElementById("child-plus");
const childCount = getRequiredElementById("child-count");

const searchButton = getRequiredElementById("search-button");

const HEADER_OPEN_CLASS = "header-open";

function openFilterHeader() {
  header.classList.add(HEADER_OPEN_CLASS);
}

function updateGuestInput(adult: number, child: number) {
  guestInput.value = `${adult + child} guests`;
  adultCount.textContent = adult.toString();
  childCount.textContent = child.toString();
}

function setupGuestInput(adult: number, child: number) {
  updateGuestInput(adult, child);

  guestInput.addEventListener("focus", () => {
    openFilterHeader();
  });

  guestInput.addEventListener("blur", () => {
    const number = Number(guestInput.value);

    if (isNaN(number)) {
      return;
    }

    adult = number;
    child = 0;
    updateGuestInput(adult, child);
  });

  adultMinus.addEventListener("click", () => {
    if (adult < 1) {
      return;
    }

    adult = adult - 1;
    updateGuestInput(adult, child);
  });

  adultPlus.addEventListener("click", () => {
    adult = adult + 1;
    updateGuestInput(adult, child);
  });

  childMinus.addEventListener("click", () => {
    if (child < 1) {
      return;
    }

    child = child - 1;
    updateGuestInput(adult, child);
  });

  childPlus.addEventListener("click", () => {
    child = child + 1;
    updateGuestInput(adult, child);
  });
}

export function renderHeader() {
  locationInput.addEventListener("focus", () => {
    openFilterHeader();
  });

  const { adults, children } = filter.getState();

  // local state until the search button is clicked
  let adult = adults;
  let child = children;

  setupGuestInput(adult, child);

  searchButton.addEventListener("click", () => {
    header.classList.toggle(HEADER_OPEN_CLASS);

    filter.setState({
      location: locationInput.value ?? "",
      children: adult,
      adults: child,
    });
  });
}
