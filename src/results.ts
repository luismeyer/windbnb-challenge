import { getRequiredElementById } from "./getRequiredElement";
import { createState } from "./state";

import DATA from "./stays.json";

const resultsElement = getRequiredElementById("results");
const titleElement = getRequiredElementById("title");
const metaElement = getRequiredElementById("meta");

type Filter = {
  location: string;
  adults: number;
  children: number;
};

export const filter = createState<Filter>({
  location: "",
  adults: 1,
  children: 0,
});

type ResultItem = {
  city: string;
  country: string;
  superHost: boolean;
  title: string;
  rating: number;
  maxGuests: number;
  type: string;
  beds: number;
  photo: string;
};

function filterResults(filter: Filter) {
  return (DATA as ResultItem[]).filter((item: ResultItem) => {
    const location = filter.location.toLowerCase();

    const locationMatch = location.length
      ? location.includes(item.city.toLowerCase()) ||
        location.includes(item.country.toLowerCase())
      : true;

    const guestMatch = item.maxGuests >= filter.adults + filter.children;

    return locationMatch && guestMatch;
  });
}

function createResult(item: ResultItem) {
  const container = document.createElement("div");

  const image = document.createElement("img");
  image.classList.add("stay-photo");
  image.src = item.photo;

  const type = document.createElement("span");
  type.classList.add("stay-type");
  type.textContent = item.type;

  const star = document.createElement("img");
  star.classList.add("stay-star");
  star.src = "/star.svg";

  const rating = document.createElement("span");
  rating.classList.add("stay-rating");
  rating.textContent = item.rating.toString();

  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("stay-rating-container");
  ratingContainer.appendChild(star);
  ratingContainer.appendChild(rating);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("stay-info");
  infoContainer.appendChild(type);
  infoContainer.appendChild(ratingContainer);

  const title = document.createElement("h2");
  title.classList.add("stay-title");
  title.textContent = item.title;

  container.appendChild(image);
  container.appendChild(infoContainer);
  container.appendChild(title);

  return container;
}

function renderMetaInfo(location: string, resultCount: number) {
  if (location.length) {
    titleElement.innerText = `Stays in ${location}`;
  } else {
    titleElement.innerText = `Stays all around the world`;
  }

  metaElement.innerText = `${resultCount} stays`;
}

function renderResults(filter: Filter) {
  resultsElement.innerHTML = "";

  const results = filterResults(filter);
  const elements = results.map(createResult);

  elements.forEach((element) => {
    resultsElement.appendChild(element);
  });

  renderMetaInfo(filter.location, results.length);
}

export function renderMain() {
  filter.subscribe((newFilter) => {
    renderResults(newFilter);
  });

  const intialFilter = filter.getState();
  renderResults(intialFilter);
}
